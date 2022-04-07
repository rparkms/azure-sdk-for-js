/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { NamedValue } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClient } from "../apiManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  NamedValueContract,
  NamedValueListByServiceNextOptionalParams,
  NamedValueListByServiceOptionalParams,
  NamedValueListByServiceResponse,
  NamedValueGetEntityTagOptionalParams,
  NamedValueGetEntityTagResponse,
  NamedValueGetOptionalParams,
  NamedValueGetResponse,
  NamedValueCreateContract,
  NamedValueCreateOrUpdateOptionalParams,
  NamedValueCreateOrUpdateResponse,
  NamedValueUpdateParameters,
  NamedValueUpdateOptionalParams,
  NamedValueUpdateResponse,
  NamedValueDeleteOptionalParams,
  NamedValueListValueOptionalParams,
  NamedValueListValueResponse,
  NamedValueRefreshSecretOptionalParams,
  NamedValueRefreshSecretResponse,
  NamedValueListByServiceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing NamedValue operations. */
export class NamedValueImpl implements NamedValue {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class NamedValue class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of named values defined within a service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  public listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams
  ): PagedAsyncIterableIterator<NamedValueContract> {
    const iter = this.listByServicePagingAll(
      resourceGroupName,
      serviceName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByServicePagingPage(
          resourceGroupName,
          serviceName,
          options
        );
      }
    };
  }

  private async *listByServicePagingPage(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams
  ): AsyncIterableIterator<NamedValueContract[]> {
    let result = await this._listByService(
      resourceGroupName,
      serviceName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByServiceNext(
        resourceGroupName,
        serviceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByServicePagingAll(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams
  ): AsyncIterableIterator<NamedValueContract> {
    for await (const page of this.listByServicePagingPage(
      resourceGroupName,
      serviceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists a collection of named values defined within a service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  private _listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams
  ): Promise<NamedValueListByServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      listByServiceOperationSpec
    );
  }

  /**
   * Gets the entity state (Etag) version of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetEntityTagOptionalParams
  ): Promise<NamedValueGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      getEntityTagOperationSpec
    );
  }

  /**
   * Gets the details of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetOptionalParams
  ): Promise<NamedValueGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates named value.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: NamedValueCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<NamedValueCreateOrUpdateResponse>,
      NamedValueCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<NamedValueCreateOrUpdateResponse> => {
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
      { resourceGroupName, serviceName, namedValueId, parameters, options },
      createOrUpdateOperationSpec
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
   * Creates or updates named value.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: NamedValueCreateOrUpdateOptionalParams
  ): Promise<NamedValueCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      serviceName,
      namedValueId,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates the specific named value.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: NamedValueUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<NamedValueUpdateResponse>,
      NamedValueUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<NamedValueUpdateResponse> => {
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
        namedValueId,
        ifMatch,
        parameters,
        options
      },
      updateOperationSpec
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
   * Updates the specific named value.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: NamedValueUpdateOptionalParams
  ): Promise<NamedValueUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      serviceName,
      namedValueId,
      ifMatch,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes specific named value from the API Management service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    options?: NamedValueDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, ifMatch, options },
      deleteOperationSpec
    );
  }

  /**
   * Gets the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  listValue(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueListValueOptionalParams
  ): Promise<NamedValueListValueResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      listValueOperationSpec
    );
  }

  /**
   * Refresh the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  async beginRefreshSecret(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueRefreshSecretOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<NamedValueRefreshSecretResponse>,
      NamedValueRefreshSecretResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<NamedValueRefreshSecretResponse> => {
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
      { resourceGroupName, serviceName, namedValueId, options },
      refreshSecretOperationSpec
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
   * Refresh the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  async beginRefreshSecretAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueRefreshSecretOptionalParams
  ): Promise<NamedValueRefreshSecretResponse> {
    const poller = await this.beginRefreshSecret(
      resourceGroupName,
      serviceName,
      namedValueId,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  private _listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: NamedValueListByServiceNextOptionalParams
  ): Promise<NamedValueListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options },
      listByServiceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.isKeyVaultRefreshFailed
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getEntityTagOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.NamedValueGetEntityTagHeaders
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
    Parameters.namedValueId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueGetHeaders
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
    Parameters.namedValueId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters42,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.namedValueId
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters43,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.namedValueId
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch1
  ],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
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
    Parameters.namedValueId
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch1],
  serializer
};
const listValueOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/listValue",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueSecretContract,
      headersMapper: Mappers.NamedValueListValueHeaders
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
    Parameters.namedValueId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const refreshSecretOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/refreshSecret",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders
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
    Parameters.namedValueId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.isKeyVaultRefreshFailed
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
