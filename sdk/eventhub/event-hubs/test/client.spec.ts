// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import * as os from "os";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import chaiString from "chai-string";
chai.use(chaiString);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:client-spec");
import { TokenCredential, earliestEventPosition, EventHubProducerClient } from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { packageJsonInfo } from "../src/util/constants";
import { EnvVarKeys, getEnvVars, isNode } from "./utils/testUtils";
import { EnvironmentCredential } from "@azure/identity";
import { EventHubConsumer } from "../src/receiver";
import { sendMessagesToPartitionForTest } from "./utils/sendHelpers";
const env = getEnvVars();

describe("Create EventHubClient using connection string #RunnableInBrowser", function(): void {
  it("throws when it cannot find the Event Hub name", function(): void {
    const connectionString = "Endpoint=sb://abc";
    const test = function(): EventHubClient {
      return new EventHubClient(connectionString);
    };
    test.should.throw(
      Error,
      `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
        `must contain "EntityPath=<your-event-hub-name>".`
    );
  });

  it("throws when EntityPath in Connection string doesn't match with event hub name parameter", function(): void {
    const connectionString =
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c=;EntityPath=my-event-hub-name";
    const eventHubName = "event-hub-name";
    const test = function(): EventHubClient {
      return new EventHubClient(connectionString, eventHubName);
    };
    test.should.throw(
      Error,
      `The entity path "my-event-hub-name" in connectionString: "${connectionString}" ` +
        `doesn't match with eventHubName: "${eventHubName}".`
    );
  });

  it("creates an EventHubClient from a connection string", function(): void {
    const client = new EventHubClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubClient);
    should.equal(client.eventHubName, "my-event-hub-name");
  });

  it("Verify fullyQualifiedNamespace creating an EventHubClient using a connection string", function(): void {
    const client = new EventHubClient(
      "Endpoint=sb://test.servicebus.windows.net/;SharedAccessKeyName=a;SharedAccessKey=b;EntityPath=my-event-hub-name"
    );
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });

  it("creates an EventHubClient from a connection string and an Event Hub name", function(): void {
    const client = new EventHubClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c",
      "my-event-hub-name"
    );
    client.should.be.an.instanceof(EventHubClient);
    should.equal(client.eventHubName, "my-event-hub-name");
  });

  it("creates an EventHubClient from a custom TokenCredential", function(): void {
    const dummyCredential: TokenCredential = {
      getToken: async () => {
        return {
          token: "boo",
          expiresOnTimestamp: 12324
        };
      }
    };
    const client = new EventHubClient("abc", "my-event-hub-name", dummyCredential);
    client.should.be.an.instanceof(EventHubClient);
    should.equal(client.eventHubName, "my-event-hub-name");
  });
});

describe("Create EventHubClient using Azure Identity", function(): void {
  it("creates an EventHubClient from an Azure.Identity credential", async function(): Promise<
    void
  > {
    should.exist(
      env[EnvVarKeys.AZURE_CLIENT_ID],
      "define AZURE_CLIENT_ID in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.AZURE_TENANT_ID],
      "define AZURE_TENANT_ID in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.AZURE_CLIENT_SECRET],
      "define AZURE_CLIENT_SECRET in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );

    // This is of the form <your-namespace>.servicebus.windows.net
    const endpoint = (env.EVENTHUB_CONNECTION_STRING.match("Endpoint=sb://(.*)/;") || "")[1];

    const credential = new EnvironmentCredential();
    const client = new EventHubClient(endpoint, env.EVENTHUB_NAME, credential);

    // Extra check involving actual call to the service to ensure this works
    const hubInfo = await client.getProperties();
    should.equal(hubInfo.name, client.eventHubName);
    await client.close();
  });

  it("Verify fullyQualifiedNamespace when creating an EventHubClient from an Azure.Identity credential", function(): void {
    const endpoint = "test.servicebus.windows.net";
    const credential = new EnvironmentCredential();
    const client = new EventHubClient(endpoint, "my-event-hub-name", credential);
    should.equal(client.fullyQualifiedNamespace, "test.servicebus.windows.net");
  });
});

describe("ServiceCommunicationError for non existent namespace #RunnableInBrowser", function(): void {
  let client: EventHubClient;
  const expectedErrCode = isNode ? "ENOTFOUND" : "ServiceCommunicationError";
  beforeEach(() => {
    client = new EventHubClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw ServiceCommunicationError while getting hub runtime info", async function(): Promise<
    void
  > {
    try {
      await client.getProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError while getting partition runtime info", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });

  it("should throw ServiceCommunicationError while creating a sender", async function(): Promise<
    void
  > {
    let badProducerClient: EventHubProducerClient | undefined;

    try {
      badProducerClient = new EventHubProducerClient(
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
      );

      await badProducerClient.createBatch({ partitionId: "0" });
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    } finally {
      if (badProducerClient) {
        badProducerClient.close();
      }
    }
  });

  it("should throw ServiceCommunicationError while creating a receiver", async function(): Promise<
    void
  > {
    try {
      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        "0",
        earliestEventPosition
      );
      await receiver.receiveBatch(10, 5);
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, expectedErrCode);
    }
  });
});

describe("MessagingEntityNotFoundError for non existent eventhub #RunnableInBrowser", function(): void {
  let client: EventHubClient;

  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    client = new EventHubClient(env[EnvVarKeys.EVENTHUB_CONNECTION_STRING], "bad" + Math.random());
  });

  afterEach(() => {
    return client.close();
  });

  it("should throw MessagingEntityNotFoundError while getting hub runtime info", async function(): Promise<
    void
  > {
    try {
      await client.getProperties();
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, "MessagingEntityNotFoundError");
    }
  });

  it("should throw MessagingEntityNotFoundError while getting partition runtime info", async function(): Promise<
    void
  > {
    try {
      await client.getPartitionProperties("0");
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, "MessagingEntityNotFoundError");
    }
  });

  it("should throw MessagingEntityNotFoundError while creating a sender", async function(): Promise<
    void
  > {
    let producerClient: EventHubProducerClient | undefined;

    try {
      producerClient = new EventHubProducerClient(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "bad" + Math.random()
      );

      await producerClient.createBatch({
        partitionId: "0"
      });
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, "MessagingEntityNotFoundError");
    } finally {
      if (producerClient) {
        producerClient.close();
      }
    }
  });

  it("should throw MessagingEntityNotFoundError while creating a receiver", async function(): Promise<
    void
  > {
    try {
      const receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        "0",
        earliestEventPosition
      );
      await receiver.receiveBatch(10, 5);
      throw new Error("Test failure");
    } catch (err) {
      debug(err);
      should.equal(err.code, "MessagingEntityNotFoundError");
    }
  });
});

describe("User Agent on EventHubClient on #RunnableInBrowser", function(): void {
  let client: EventHubClient;

  beforeEach(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  afterEach(() => {
    return client.close();
  });

  it("should correctly populate the default user agent", function(done: Mocha.Done): void {
    client = new EventHubClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );
    const packageVersion = packageJsonInfo.version;
    const properties = client["_context"].connection.options.properties;
    properties!["user-agent"].should.startWith(`azsdk-js-azureeventhubs/${packageVersion}`);
    should.equal(properties!.product, "MSJSClient");
    should.equal(properties!.version, packageVersion);
    should.equal(properties!.framework, `Node/${process.version}`);
    should.equal(properties!.platform, `(${os.arch()}-${os.type()}-${os.release()})`);
    done();
  });

  it("should correctly populate the custom user agent", function(done: Mocha.Done): void {
    const customua = "/js-event-processor-host=0.2.0";

    client = new EventHubClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME],
      {
        userAgent: customua
      }
    );
    const packageVersion = packageJsonInfo.version;
    const properties = client["_context"].connection.options.properties;
    properties!["user-agent"].should.startWith(`azsdk-js-azureeventhubs/${packageVersion}`);
    properties!["user-agent"].should.endWith(customua);
    should.equal(properties!.product, "MSJSClient");
    should.equal(properties!.version, packageVersion);
    should.equal(properties!.framework, `Node/${process.version}`);
    should.equal(properties!.platform, `(${os.arch()}-${os.type()}-${os.release()})`);
    done();
  });
});

describe("Errors after close() #RunnableInBrowser", function(): void {
  let client: EventHubClient;
  let producerClient: EventHubProducerClient;
  let receiver: EventHubConsumer;

  afterEach(async () => {
    if (client) {
      await client.close();
    }

    if (producerClient) {
      await producerClient.close();
    }
  });

  async function beforeEachTest(entityToClose: string): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
    client = new EventHubClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    producerClient = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    const timeNow = Date.now();

    // Ensure sender link is opened
    await sendMessagesToPartitionForTest(
      "0",
      { body: "dummy send to ensure AMQP connection is opened" },
      producerClient
    );

    // Ensure receiver link is opened
    receiver = client.createConsumer(EventHubClient.defaultConsumerGroupName, "0", {
      enqueuedOn: timeNow
    });
    const msgs = await receiver.receiveBatch(1, 10);
    should.equal(msgs.length, 1);

    // close(), so that we can then test the resulting error.
    switch (entityToClose) {
      case "client":
        await client.close();
        break;
      case "receiver":
        await receiver.close();
        break;
      default:
        break;
    }
  }

  /**
   * Tests that each feature of the sender throws expected error
   */

  /**
   * Tests that each feature of the receiver throws expected error
   */
  async function testReceiver(expectedErrorMsg: string): Promise<void> {
    should.equal(receiver.isClosed, true, "Receiver is not marked as closed.");

    let errorReceiveBatch: string = "";
    await receiver.receiveBatch(1, 1).catch((err) => {
      errorReceiveBatch = err.message;
    });
    should.equal(
      errorReceiveBatch,
      expectedErrorMsg,
      "Expected error not thrown for receiveMessages()"
    );

    let errorReceiveStream: string = "";
    try {
      receiver.receive(
        () => Promise.resolve(),
        (e) => console.log(e)
      );
    } catch (err) {
      errorReceiveStream = err.message;
    }
    should.equal(
      errorReceiveStream,
      expectedErrorMsg,
      "Expected error not thrown for registerMessageHandler()"
    );
  }

  it("AMQP errors thrown if EventHubProducerClient is already closed and we attempt to use it", async () => {
    let producerClient = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    await producerClient.createBatch();
    await producerClient.close();
    await producerClient
      .createBatch()
      .then(() => {
        throw new Error("Should have thrown an exception");
      })
      .catch((err) => err.message.should.equal("The underlying AMQP connection is closed."));

    producerClient = new EventHubProducerClient(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      env[EnvVarKeys.EVENTHUB_NAME]
    );

    // note this time we don't actually do anything that would cause the client
    // to be open (ie, no createBatch call)
    await producerClient.close();
    await producerClient
      .createBatch()
      .then(() => {
        throw new Error("Should have thrown an exception");
      })
      .catch((err) => err.message.should.equal("The underlying AMQP connection is closed."));
  });

  it("errors after close() on client", async function(): Promise<void> {
    await beforeEachTest("client");
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    await testReceiver(expectedErrorMsg);

    let errorNewReceiver: string = "";
    try {
      receiver = client.createConsumer(
        EventHubClient.defaultConsumerGroupName,
        "0",
        earliestEventPosition
      );
    } catch (err) {
      errorNewReceiver = err.message;
    }
    should.equal(
      errorNewReceiver,
      expectedErrorMsg,
      "Expected error not thrown for createReceiver()"
    );

    let errorGetPartitionIds: string = "";
    try {
      await client.getPartitionIds({});
    } catch (err) {
      errorGetPartitionIds = err.message;
    }
    should.equal(
      errorGetPartitionIds,
      expectedErrorMsg,
      "Expected error not thrown for getPartitionIds()"
    );

    let errorGetPartitionProperties: string = "";
    try {
      await client.getPartitionProperties("0");
    } catch (err) {
      errorGetPartitionProperties = err.message;
    }
    should.equal(
      errorGetPartitionProperties,
      expectedErrorMsg,
      "Expected error not thrown for getPartitionProperties()"
    );

    let errorGetProperties: string = "";
    try {
      await client.getProperties();
    } catch (err) {
      errorGetProperties = err.message;
    }
    should.equal(
      errorGetProperties,
      expectedErrorMsg,
      "Expected error not thrown for getProperties()"
    );
  });

  it("errors after close() on receiver", async function(): Promise<void> {
    const receiverErrorMsg =
      `The EventHubConsumer for "${client.eventHubName}" has been closed and can no longer be used. ` +
      `Please create a new EventHubConsumer using the "createConsumer" function on the EventHubClient.`;
    await beforeEachTest("receiver");
    await testReceiver(receiverErrorMsg);
  });
});
