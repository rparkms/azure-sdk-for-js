/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/pipelinesMappers";
import * as Parameters from "../models/parameters";
import { DataFactoryManagementClientContext } from "../dataFactoryManagementClientContext";

/** Class representing a Pipelines. */
export class Pipelines {
  private readonly client: DataFactoryManagementClientContext;

  /**
   * Create a Pipelines.
   * @param {DataFactoryManagementClientContext} client Reference to the service client.
   */
  constructor(client: DataFactoryManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists pipelines.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param [options] The optional parameters
   * @returns Promise<Models.PipelinesListByFactoryResponse>
   */
  listByFactory(resourceGroupName: string, factoryName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.PipelinesListByFactoryResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param callback The callback
   */
  listByFactory(resourceGroupName: string, factoryName: string, callback: coreHttp.ServiceCallback<Models.PipelineListResponse>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByFactory(resourceGroupName: string, factoryName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.PipelineListResponse>): void;
  listByFactory(resourceGroupName: string, factoryName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.PipelineListResponse>, callback?: coreHttp.ServiceCallback<Models.PipelineListResponse>): Promise<Models.PipelinesListByFactoryResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        options
      },
      listByFactoryOperationSpec,
      callback) as Promise<Models.PipelinesListByFactoryResponse>;
  }

  /**
   * Creates or updates a pipeline.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param pipelineParameter Pipeline resource definition.
   * @param [options] The optional parameters
   * @returns Promise<Models.PipelinesCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, pipelineName: string, pipelineParameter: Models.PipelineResource, options?: Models.PipelinesCreateOrUpdateOptionalParams): Promise<Models.PipelinesCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param pipelineParameter Pipeline resource definition.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, pipelineName: string, pipelineParameter: Models.PipelineResource, callback: coreHttp.ServiceCallback<Models.PipelineResource>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param pipelineParameter Pipeline resource definition.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, pipelineName: string, pipelineParameter: Models.PipelineResource, options: Models.PipelinesCreateOrUpdateOptionalParams, callback: coreHttp.ServiceCallback<Models.PipelineResource>): void;
  createOrUpdate(resourceGroupName: string, factoryName: string, pipelineName: string, pipelineParameter: Models.PipelineResource, options?: Models.PipelinesCreateOrUpdateOptionalParams | coreHttp.ServiceCallback<Models.PipelineResource>, callback?: coreHttp.ServiceCallback<Models.PipelineResource>): Promise<Models.PipelinesCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        pipelineName,
        pipelineParameter,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.PipelinesCreateOrUpdateResponse>;
  }

  /**
   * Gets a pipeline.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param [options] The optional parameters
   * @returns Promise<Models.PipelinesGetResponse>
   */
  get(resourceGroupName: string, factoryName: string, pipelineName: string, options?: Models.PipelinesGetOptionalParams): Promise<Models.PipelinesGetResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param callback The callback
   */
  get(resourceGroupName: string, factoryName: string, pipelineName: string, callback: coreHttp.ServiceCallback<Models.PipelineResource>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, factoryName: string, pipelineName: string, options: Models.PipelinesGetOptionalParams, callback: coreHttp.ServiceCallback<Models.PipelineResource>): void;
  get(resourceGroupName: string, factoryName: string, pipelineName: string, options?: Models.PipelinesGetOptionalParams | coreHttp.ServiceCallback<Models.PipelineResource>, callback?: coreHttp.ServiceCallback<Models.PipelineResource>): Promise<Models.PipelinesGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        pipelineName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.PipelinesGetResponse>;
  }

  /**
   * Deletes a pipeline.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  deleteMethod(resourceGroupName: string, factoryName: string, pipelineName: string, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, factoryName: string, pipelineName: string, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, factoryName: string, pipelineName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, factoryName: string, pipelineName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        pipelineName,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Creates a run of a pipeline.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param [options] The optional parameters
   * @returns Promise<Models.PipelinesCreateRunResponse>
   */
  createRun(resourceGroupName: string, factoryName: string, pipelineName: string, options?: Models.PipelinesCreateRunOptionalParams): Promise<Models.PipelinesCreateRunResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param callback The callback
   */
  createRun(resourceGroupName: string, factoryName: string, pipelineName: string, callback: coreHttp.ServiceCallback<Models.CreateRunResponse>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param pipelineName The pipeline name.
   * @param options The optional parameters
   * @param callback The callback
   */
  createRun(resourceGroupName: string, factoryName: string, pipelineName: string, options: Models.PipelinesCreateRunOptionalParams, callback: coreHttp.ServiceCallback<Models.CreateRunResponse>): void;
  createRun(resourceGroupName: string, factoryName: string, pipelineName: string, options?: Models.PipelinesCreateRunOptionalParams | coreHttp.ServiceCallback<Models.CreateRunResponse>, callback?: coreHttp.ServiceCallback<Models.CreateRunResponse>): Promise<Models.PipelinesCreateRunResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        pipelineName,
        options
      },
      createRunOperationSpec,
      callback) as Promise<Models.PipelinesCreateRunResponse>;
  }

  /**
   * Lists pipelines.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.PipelinesListByFactoryNextResponse>
   */
  listByFactoryNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase): Promise<Models.PipelinesListByFactoryNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByFactoryNext(nextPageLink: string, callback: coreHttp.ServiceCallback<Models.PipelineListResponse>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByFactoryNext(nextPageLink: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.PipelineListResponse>): void;
  listByFactoryNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.PipelineListResponse>, callback?: coreHttp.ServiceCallback<Models.PipelineListResponse>): Promise<Models.PipelinesListByFactoryNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByFactoryNextOperationSpec,
      callback) as Promise<Models.PipelinesListByFactoryNextResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const listByFactoryOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.pipelineName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.ifMatch,
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "pipelineParameter",
    mapper: {
      ...Mappers.PipelineResource,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.pipelineName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.ifNoneMatch,
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const deleteMethodOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.pipelineName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createRunOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/pipelines/{pipelineName}/createRun",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.pipelineName
  ],
  queryParameters: [
    Parameters.apiVersion,
    Parameters.referencePipelineRunId,
    Parameters.isRecovery,
    Parameters.startActivityName
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: [
      "options",
      "parameters"
    ],
    mapper: {
      serializedName: "parameters",
      type: {
        name: "Dictionary",
        value: {
          type: {
            name: "Object"
          }
        }
      }
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.CreateRunResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listByFactoryNextOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
