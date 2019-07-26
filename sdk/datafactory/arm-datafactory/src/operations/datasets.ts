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
import * as Mappers from "../models/datasetsMappers";
import * as Parameters from "../models/parameters";
import { DataFactoryManagementClientContext } from "../dataFactoryManagementClientContext";

/** Class representing a Datasets. */
export class Datasets {
  private readonly client: DataFactoryManagementClientContext;

  /**
   * Create a Datasets.
   * @param {DataFactoryManagementClientContext} client Reference to the service client.
   */
  constructor(client: DataFactoryManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists datasets.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param [options] The optional parameters
   * @returns Promise<Models.DatasetsListByFactoryResponse>
   */
  listByFactory(resourceGroupName: string, factoryName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.DatasetsListByFactoryResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param callback The callback
   */
  listByFactory(resourceGroupName: string, factoryName: string, callback: coreHttp.ServiceCallback<Models.DatasetListResponse>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByFactory(resourceGroupName: string, factoryName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.DatasetListResponse>): void;
  listByFactory(resourceGroupName: string, factoryName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.DatasetListResponse>, callback?: coreHttp.ServiceCallback<Models.DatasetListResponse>): Promise<Models.DatasetsListByFactoryResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        options
      },
      listByFactoryOperationSpec,
      callback) as Promise<Models.DatasetsListByFactoryResponse>;
  }

  /**
   * Creates or updates a dataset.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param dataset Dataset resource definition.
   * @param [options] The optional parameters
   * @returns Promise<Models.DatasetsCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, datasetName: string, dataset: Models.DatasetResource, options?: Models.DatasetsCreateOrUpdateOptionalParams): Promise<Models.DatasetsCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param dataset Dataset resource definition.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, datasetName: string, dataset: Models.DatasetResource, callback: coreHttp.ServiceCallback<Models.DatasetResource>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param dataset Dataset resource definition.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, factoryName: string, datasetName: string, dataset: Models.DatasetResource, options: Models.DatasetsCreateOrUpdateOptionalParams, callback: coreHttp.ServiceCallback<Models.DatasetResource>): void;
  createOrUpdate(resourceGroupName: string, factoryName: string, datasetName: string, dataset: Models.DatasetResource, options?: Models.DatasetsCreateOrUpdateOptionalParams | coreHttp.ServiceCallback<Models.DatasetResource>, callback?: coreHttp.ServiceCallback<Models.DatasetResource>): Promise<Models.DatasetsCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        datasetName,
        dataset,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.DatasetsCreateOrUpdateResponse>;
  }

  /**
   * Gets a dataset.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param [options] The optional parameters
   * @returns Promise<Models.DatasetsGetResponse>
   */
  get(resourceGroupName: string, factoryName: string, datasetName: string, options?: Models.DatasetsGetOptionalParams): Promise<Models.DatasetsGetResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param callback The callback
   */
  get(resourceGroupName: string, factoryName: string, datasetName: string, callback: coreHttp.ServiceCallback<Models.DatasetResource>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(resourceGroupName: string, factoryName: string, datasetName: string, options: Models.DatasetsGetOptionalParams, callback: coreHttp.ServiceCallback<Models.DatasetResource>): void;
  get(resourceGroupName: string, factoryName: string, datasetName: string, options?: Models.DatasetsGetOptionalParams | coreHttp.ServiceCallback<Models.DatasetResource>, callback?: coreHttp.ServiceCallback<Models.DatasetResource>): Promise<Models.DatasetsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        datasetName,
        options
      },
      getOperationSpec,
      callback) as Promise<Models.DatasetsGetResponse>;
  }

  /**
   * Deletes a dataset.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  deleteMethod(resourceGroupName: string, factoryName: string, datasetName: string, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, factoryName: string, datasetName: string, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param datasetName The dataset name.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, factoryName: string, datasetName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, factoryName: string, datasetName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        datasetName,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Lists datasets.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.DatasetsListByFactoryNextResponse>
   */
  listByFactoryNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase): Promise<Models.DatasetsListByFactoryNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listByFactoryNext(nextPageLink: string, callback: coreHttp.ServiceCallback<Models.DatasetListResponse>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByFactoryNext(nextPageLink: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.DatasetListResponse>): void;
  listByFactoryNext(nextPageLink: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.DatasetListResponse>, callback?: coreHttp.ServiceCallback<Models.DatasetListResponse>): Promise<Models.DatasetsListByFactoryNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listByFactoryNextOperationSpec,
      callback) as Promise<Models.DatasetsListByFactoryNextResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const listByFactoryOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets",
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
      bodyMapper: Mappers.DatasetListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.datasetName
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.ifMatch,
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "dataset",
    mapper: {
      ...Mappers.DatasetResource,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.DatasetResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.datasetName
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
      bodyMapper: Mappers.DatasetResource
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
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/datasets/{datasetName}",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.factoryName,
    Parameters.datasetName
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
      bodyMapper: Mappers.DatasetListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
