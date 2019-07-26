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
import * as Mappers from "../models/exposureControlMappers";
import * as Parameters from "../models/parameters";
import { DataFactoryManagementClientContext } from "../dataFactoryManagementClientContext";

/** Class representing a ExposureControl. */
export class ExposureControl {
  private readonly client: DataFactoryManagementClientContext;

  /**
   * Create a ExposureControl.
   * @param {DataFactoryManagementClientContext} client Reference to the service client.
   */
  constructor(client: DataFactoryManagementClientContext) {
    this.client = client;
  }

  /**
   * Get exposure control feature for specific location.
   * @param locationId The location identifier.
   * @param exposureControlRequest The exposure control request.
   * @param [options] The optional parameters
   * @returns Promise<Models.ExposureControlGetFeatureValueResponse>
   */
  getFeatureValue(locationId: string, exposureControlRequest: Models.ExposureControlRequest, options?: coreHttp.RequestOptionsBase): Promise<Models.ExposureControlGetFeatureValueResponse>;
  /**
   * @param locationId The location identifier.
   * @param exposureControlRequest The exposure control request.
   * @param callback The callback
   */
  getFeatureValue(locationId: string, exposureControlRequest: Models.ExposureControlRequest, callback: coreHttp.ServiceCallback<Models.ExposureControlResponse>): void;
  /**
   * @param locationId The location identifier.
   * @param exposureControlRequest The exposure control request.
   * @param options The optional parameters
   * @param callback The callback
   */
  getFeatureValue(locationId: string, exposureControlRequest: Models.ExposureControlRequest, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ExposureControlResponse>): void;
  getFeatureValue(locationId: string, exposureControlRequest: Models.ExposureControlRequest, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ExposureControlResponse>, callback?: coreHttp.ServiceCallback<Models.ExposureControlResponse>): Promise<Models.ExposureControlGetFeatureValueResponse> {
    return this.client.sendOperationRequest(
      {
        locationId,
        exposureControlRequest,
        options
      },
      getFeatureValueOperationSpec,
      callback) as Promise<Models.ExposureControlGetFeatureValueResponse>;
  }

  /**
   * Get exposure control feature for specific factory.
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param exposureControlRequest The exposure control request.
   * @param [options] The optional parameters
   * @returns Promise<Models.ExposureControlGetFeatureValueByFactoryResponse>
   */
  getFeatureValueByFactory(resourceGroupName: string, factoryName: string, exposureControlRequest: Models.ExposureControlRequest, options?: coreHttp.RequestOptionsBase): Promise<Models.ExposureControlGetFeatureValueByFactoryResponse>;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param exposureControlRequest The exposure control request.
   * @param callback The callback
   */
  getFeatureValueByFactory(resourceGroupName: string, factoryName: string, exposureControlRequest: Models.ExposureControlRequest, callback: coreHttp.ServiceCallback<Models.ExposureControlResponse>): void;
  /**
   * @param resourceGroupName The resource group name.
   * @param factoryName The factory name.
   * @param exposureControlRequest The exposure control request.
   * @param options The optional parameters
   * @param callback The callback
   */
  getFeatureValueByFactory(resourceGroupName: string, factoryName: string, exposureControlRequest: Models.ExposureControlRequest, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ExposureControlResponse>): void;
  getFeatureValueByFactory(resourceGroupName: string, factoryName: string, exposureControlRequest: Models.ExposureControlRequest, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ExposureControlResponse>, callback?: coreHttp.ServiceCallback<Models.ExposureControlResponse>): Promise<Models.ExposureControlGetFeatureValueByFactoryResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        factoryName,
        exposureControlRequest,
        options
      },
      getFeatureValueByFactoryOperationSpec,
      callback) as Promise<Models.ExposureControlGetFeatureValueByFactoryResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const getFeatureValueOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.DataFactory/locations/{locationId}/getFeatureValue",
  urlParameters: [
    Parameters.subscriptionId,
    Parameters.locationId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "exposureControlRequest",
    mapper: {
      ...Mappers.ExposureControlRequest,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ExposureControlResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getFeatureValueByFactoryOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/getFeatureValue",
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
  requestBody: {
    parameterPath: "exposureControlRequest",
    mapper: {
      ...Mappers.ExposureControlRequest,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.ExposureControlResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
