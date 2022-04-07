/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { TenantConfiguration } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClient } from "../apiManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DeployConfigurationParameters,
  ConfigurationIdName,
  TenantConfigurationDeployOptionalParams,
  TenantConfigurationDeployResponse,
  SaveConfigurationParameter,
  TenantConfigurationSaveOptionalParams,
  TenantConfigurationSaveResponse,
  TenantConfigurationValidateOptionalParams,
  TenantConfigurationValidateResponse,
  TenantConfigurationGetSyncStateOptionalParams,
  TenantConfigurationGetSyncStateResponse
} from "../models";

/** Class containing TenantConfiguration operations. */
export class TenantConfigurationImpl implements TenantConfiguration {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class TenantConfiguration class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * This operation applies changes from the specified Git branch to the configuration database. This is
   * a long running operation and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Deploy Configuration parameters.
   * @param options The options parameters.
   */
  async beginDeploy(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<TenantConfigurationDeployResponse>,
      TenantConfigurationDeployResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<TenantConfigurationDeployResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options
      },
      deployOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * This operation applies changes from the specified Git branch to the configuration database. This is
   * a long running operation and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Deploy Configuration parameters.
   * @param options The options parameters.
   */
  async beginDeployAndWait(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams
  ): Promise<TenantConfigurationDeployResponse> {
    const poller = await this.beginDeploy(
      resourceGroupName,
      serviceName,
      configurationName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * This operation creates a commit with the current configuration snapshot to the specified branch in
   * the repository. This is a long running operation and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Save Configuration parameters.
   * @param options The options parameters.
   */
  async beginSave(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<TenantConfigurationSaveResponse>,
      TenantConfigurationSaveResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<TenantConfigurationSaveResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options
      },
      saveOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * This operation creates a commit with the current configuration snapshot to the specified branch in
   * the repository. This is a long running operation and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Save Configuration parameters.
   * @param options The options parameters.
   */
  async beginSaveAndWait(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams
  ): Promise<TenantConfigurationSaveResponse> {
    const poller = await this.beginSave(
      resourceGroupName,
      serviceName,
      configurationName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * This operation validates the changes in the specified Git branch. This is a long running operation
   * and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Validate Configuration parameters.
   * @param options The options parameters.
   */
  async beginValidate(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationValidateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<TenantConfigurationValidateResponse>,
      TenantConfigurationValidateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<TenantConfigurationValidateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options
      },
      validateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * This operation validates the changes in the specified Git branch. This is a long running operation
   * and could take several minutes to complete.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param parameters Validate Configuration parameters.
   * @param options The options parameters.
   */
  async beginValidateAndWait(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationValidateOptionalParams
  ): Promise<TenantConfigurationValidateResponse> {
    const poller = await this.beginValidate(
      resourceGroupName,
      serviceName,
      configurationName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets the status of the most recent synchronization between the configuration database and the Git
   * repository.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param configurationName The identifier of the Git Configuration Operation.
   * @param options The options parameters.
   */
  getSyncState(
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    options?: TenantConfigurationGetSyncStateOptionalParams
  ): Promise<TenantConfigurationGetSyncStateResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, configurationName, options },
      getSyncStateOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deployOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/deploy",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationResultContract
    },
    201: {
      bodyMapper: Mappers.OperationResultContract
    },
    202: {
      bodyMapper: Mappers.OperationResultContract
    },
    204: {
      bodyMapper: Mappers.OperationResultContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters57,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const saveOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/save",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationResultContract
    },
    201: {
      bodyMapper: Mappers.OperationResultContract
    },
    202: {
      bodyMapper: Mappers.OperationResultContract
    },
    204: {
      bodyMapper: Mappers.OperationResultContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters58,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const validateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/validate",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.OperationResultContract
    },
    201: {
      bodyMapper: Mappers.OperationResultContract
    },
    202: {
      bodyMapper: Mappers.OperationResultContract
    },
    204: {
      bodyMapper: Mappers.OperationResultContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters57,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSyncStateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{configurationName}/syncState",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TenantConfigurationSyncStateContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
