// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { env } from "process";

import { QueryLogsBatch, Durations, LogsQueryClient } from "../../src";
import { runWithTelemetry } from "../setupOpenTelemetry";

import {
  assertQueryTable,
  createTestClientSecretCredential,
  getMonitorWorkspaceId,
  loggerForTest
} from "./shared/testShared";
import { ErrorInfo } from "../../src/generated/logquery/src";
import { RestError } from "@azure/core-http";

describe("LogsQueryClient live tests", function() {
  let monitorWorkspaceId: string;
  let client: LogsQueryClient;
  let testRunId: string;

  beforeEach(function(this: Context) {
    monitorWorkspaceId = getMonitorWorkspaceId(this);

    const disableHttpRetries = (this.currentTest?.title?.indexOf("#disablehttpretries") ?? -1) >= 0;

    if (disableHttpRetries) {
      loggerForTest.verbose(`Disabling http retries for test '${this.currentTest?.title}'`);
    }

    client = new LogsQueryClient(createTestClientSecretCredential(), {
      retryOptions: {
        maxRetries: disableHttpRetries ? 0 : undefined
      }
    });
  });

  it("queryLogs (bad query)", async () => {
    // Kind (coming from Properties) is of type `dynamic`, so you can't sort on it (so we should get back an error from the service)
    const kustoQuery = `completely invalid syntax`;

    try {
      // TODO: there is an error details in the query, but when I run an invalid query it
      // throws (and ErrorDetails are just present in the exception.)
      await client.queryLogs(monitorWorkspaceId, kustoQuery, Durations.lastDay);
      assert.fail("Should have thrown an exception");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
      const { request: _request, response: _response, ...stringizableError } = err;
      const innermostError = getInnermostErrorDetails(err);

      if (innermostError == null) {
        throw new Error("No innermost error - error reporting would break.");
      }

      loggerForTest.verbose(`(Diagnostics) Actual error thrown when we use a bad query: `, err);

      assert.deepNestedInclude(
        err as RestError,
        {
          name: "RestError",
          statusCode: 400
        },
        `Query should throw a RestError. Message: ${JSON.stringify(stringizableError)}`
      );

      assert.deepNestedInclude(
        innermostError,
        {
          code: "SYN0002"
          // other fields that are not stable, but are interesting:
          //  message: "Query could not be parsed at 'invalid' on line [1,11]",
        },
        `Query should indicate a syntax error in innermost error. Innermost error: ${JSON.stringify(
          innermostError
        )}`
      );
    }
  });

  // disabling http retries otherwise we'll waste retries to realize that the
  // query has timed out on purpose.
  it("serverTimeoutInSeconds #disablehttpretries", async () => {
    try {
      await client.queryLogs(
        monitorWorkspaceId,
        // slow query suggested by Pavel.
        "range x from 1 to 10000000000 step 1 | count",
        Durations.last24Hours,
        {
          // the query above easily takes longer than 1 second.
          serverTimeoutInSeconds: 1
        }
      );

      assert.fail("Should have thrown a RestError for a GatewayTimeout");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- eslint doesn't recognize that the extracted variables are prefixed with '_' and are purposefully unused.
      const { request: _request, response: _response, ...stringizableError } = err;
      const innermostError = getInnermostErrorDetails(err);

      assert.deepNestedInclude(
        err as RestError,
        {
          name: "RestError",
          statusCode: 504
        },
        `Query should throw a RestError. Message: ${JSON.stringify(stringizableError)}`
      );

      assert.deepNestedInclude(
        innermostError,
        {
          code: "GatewayTimeout"
          // other fields that are not stable, but are interesting:
          // "message":"Kusto query timed out"
        },
        `Should get a code indicating the query timed out. Innermost error: ${JSON.stringify(
          innermostError
        )}`
      );
    }
  });

  it("includeQueryStatistics", async () => {
    const query = await client.queryLogs(
      monitorWorkspaceId,
      "AppEvents | limit 1",
      Durations.last24Hours,
      {
        includeQueryStatistics: true
      }
    );

    // TODO: statistics are not currently modeled in the generated code.

    // do a very basic check that the statistics were returnedassert.
    assert.ok(query.statistics?.query?.executionTime);
  });

  describe("Ingested data tests (can be slow due to loading times)", () => {
    before(async function(this: Context) {
      if (env.TEST_RUN_ID) {
        loggerForTest.warning(`Using cached test run ID ${env.TEST_RUN_ID}`);
        testRunId = env.TEST_RUN_ID;
      } else {
        testRunId = `ingestedDataTest-${Date.now()}`;

        // send some events
        await runWithTelemetry(this, (provider) => {
          const tracer = provider.getTracer("logsClientTests");

          tracer
            .startSpan("testSpan", {
              attributes: {
                testRunId,
                kind: "now"
              }
            })
            .end();
        });
      }

      loggerForTest.info(`testRunId = ${testRunId}`);

      // (we'll wait until the data is there before running all the tests)
      // by coincidence one of the tests tries this same query.
      await checkLogsHaveBeenIngested({
        maxTries: 240,
        secondsBetweenQueries: 1
      });
    });

    it("queryLogs (last day)", async () => {
      const kustoQuery = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`;

      const singleQueryLogsResult = await client.queryLogs(
        monitorWorkspaceId,
        kustoQuery,
        Durations.lastDay
      );

      // TODO: the actual types aren't being deserialized (everything is coming back as 'string')
      // this is incorrect, it'll be updated.

      assertQueryTable(
        singleQueryLogsResult.tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Kind", "Name", "Target", "TestRunId"],
          rows: [["now", "testSpan", "testSpan", testRunId.toString()]]
        },
        "Query for the last day"
      );
    });

    it("queryLogsBatch", async () => {
      const batchRequest: QueryLogsBatch = {
        queries: [
          {
            workspace: monitorWorkspaceId,
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`
          },
          {
            workspace: monitorWorkspaceId,
            query: `AppDependencies | where Properties['testRunId'] == '${testRunId}' | count`,
            timespan: Durations.last24Hours,
            includeQueryStatistics: true,
            serverTimeoutInSeconds: 60 * 10
          }
        ]
      };

      const response = await client.queryLogsBatch(batchRequest);

      assertQueryTable(
        response.results?.[0].tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Kind", "Name", "Target", "TestRunId"],
          rows: [["now", "testSpan", "testSpan", testRunId.toString()]]
        },
        "Standard results"
      );

      assertQueryTable(
        response.results?.[1].tables?.[0],
        {
          name: "PrimaryResult",
          columns: ["Count"],
          rows: [["1"]]
        },
        "count table"
      );
    });

    async function checkLogsHaveBeenIngested(args: {
      secondsBetweenQueries: number;
      maxTries: number;
    }): Promise<void> {
      const query = `AppDependencies | where Properties['testRunId'] == '${testRunId}' | project Kind=Properties["kind"], Name, Target, TestRunId=Properties['testRunId']`;

      const startTime = Date.now();

      loggerForTest.verbose(
        `Polling for results to make sure our telemetry has been ingested....\n${query}`
      );

      for (let i = 0; i < args.maxTries; ++i) {
        const result = await client.queryLogs(monitorWorkspaceId, query, Durations.last24Hours);

        const numRows = result.tables?.[0].rows?.length;

        if (numRows != null && numRows > 0) {
          loggerForTest.verbose(
            `[Attempt: ${i}/${args.maxTries}] Results came back, done waiting.`
          );
          return;
        }

        loggerForTest.verbose(
          `[Attempt: ${i}/${args.maxTries}, elapsed: ${Date.now() -
            startTime} ms] No rows, will poll again.`
        );

        await new Promise((resolve) => setTimeout(resolve, args.secondsBetweenQueries * 1000));
      }

      throw new Error(`All retries exhausted - no data returned for query '${query}'`);
    }
  });
});

function getInnermostErrorDetails(thrownError: any): undefined | ErrorInfo {
  if (
    thrownError.details == null ||
    typeof thrownError.details !== "object" ||
    typeof thrownError.details.error !== "object"
  ) {
    loggerForTest.error(`Thrown error was incorrect: `, thrownError);
    throw new Error("Error does not contain expected `details` property");
  }

  let errorInfo: ErrorInfo = thrownError.details.error;

  while (errorInfo.innererror) {
    errorInfo = errorInfo.innererror;
  }

  return errorInfo;
}
