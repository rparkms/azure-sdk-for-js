// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getTracer } from "@azure/core-tracing";
import { Span, SpanKind, StatusCode } from "@opentelemetry/api";
import { SpanOptions } from "@azure/core-tracing";

import { RestError } from "@azure/core-http";

/**
 * @internal
 */
export interface Spannable {
  spanOptions?: SpanOptions;
}

/**
 * @internal
 */
export class Spanner<TClient> {
  constructor(private baseOperationName: string) { }

  /**
   * Traces an operation and properly handles reporting start, end and errors for a given span
   *
   * @param operationName - Name of a method in the TClient type
   * @param options - An options class, typically derived from \@azure/core-http/RequestOptionsBase
   * @param fn - The function to call with an options class that properly propagates the span context
   */
  async trace<OptionsT extends Spannable, ReturnT>(
    operationName: keyof TClient,
    options: OptionsT,
    fn: (options: OptionsT, span: Span) => Promise<ReturnT>
  ): Promise<ReturnT> {
    const { newOptions, span } = this.createSpan<OptionsT>(options, operationName);

    try {
      return await fn(newOptions, span);
    } catch (err) {
      span.setStatus({
        code: StatusCode.ERROR,
        message: err.message
      });
      throw err;
    } finally {
      span.end();
    }
  }

  private createSpan<T extends Spannable>(options: T, operationName: keyof TClient) {
    const span = getTracer().startSpan(`${this.baseOperationName}.${operationName}`, {
      ...options.spanOptions,
      kind: SpanKind.INTERNAL
    });
    span.setAttribute("az.namespace", "Microsoft.AppConfiguration");

    let newOptions = options;

    if (span.isRecording()) {
      newOptions = Spanner.addParentToOptions<T>(options, span);
    }
    return { span, newOptions };
  }

  static isRestError(err: Error): err is RestError {
    return err instanceof RestError;
  }

  static addParentToOptions<T extends Spannable>(options: T, span: Span): T {
    const spanOptions = options.spanOptions || {};
    return {
      ...options,
      spanOptions: {
        ...spanOptions,
        parent: span.context(),
        attributes: {
          ...spanOptions.attributes,
          "az.namespace": "Microsoft.AppConfiguration"
        }
      }
    };
  }
}
