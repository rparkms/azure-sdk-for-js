## API Report File for "@azure/monitor-opentelemetry"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AzureMonitorExporterOptions } from '@azure/monitor-opentelemetry-exporter';
import { InstrumentationConfig } from '@opentelemetry/instrumentation';
import { LogRecordProcessor } from '@opentelemetry/sdk-logs';
import { Resource } from '@opentelemetry/resources';
import { SpanProcessor } from '@opentelemetry/sdk-trace-base';

// @public
export interface AzureMonitorOpenTelemetryOptions {
    azureMonitorExporterOptions?: AzureMonitorExporterOptions;
    browserSdkLoaderOptions?: BrowserSdkLoaderOptions;
    enableLiveMetrics?: boolean;
    enableStandardMetrics?: boolean;
    instrumentationOptions?: InstrumentationOptions;
    logRecordProcessors?: LogRecordProcessor[];
    resource?: Resource;
    samplingRatio?: number;
    spanProcessors?: SpanProcessor[];
}

// @public
export interface BrowserSdkLoaderOptions {
    connectionString?: string;
    enabled?: boolean;
}

// @public
export interface InstrumentationOptions {
    azureSdk?: InstrumentationConfig;
    bunyan?: InstrumentationConfig;
    http?: InstrumentationConfig;
    mongoDb?: InstrumentationConfig;
    mySql?: InstrumentationConfig;
    postgreSql?: InstrumentationConfig;
    redis?: InstrumentationConfig;
    redis4?: InstrumentationConfig;
}

// @public
export function shutdownAzureMonitor(): Promise<void>;

// @public
export function useAzureMonitor(options?: AzureMonitorOpenTelemetryOptions): void;

// (No @packageDocumentation comment for this package)

```
