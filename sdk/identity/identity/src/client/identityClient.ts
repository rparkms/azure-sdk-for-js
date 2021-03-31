// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import qs from "qs";
import {
  AccessToken,
  ServiceClient,
  PipelineOptions,
  WebResource,
  RequestPrepareOptions,
  GetTokenOptions,
  createPipelineFromOptions,
  isNode
} from "@azure/core-http";
import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-node";

import { SpanStatusCode } from "@azure/core-tracing";
import { AuthenticationError, AuthenticationErrorName } from "./errors";
import { createSpan } from "../util/tracing";
import { logger } from "../util/logging";
import { getAuthorityHostEnvironment } from "../util/authHostEnv";
import { getIdentityTokenEndpointSuffix } from "../util/identityTokenEndpoint";

const DefaultAuthorityHost = "https://login.microsoftonline.com";

/**
 * An internal type used to communicate details of a token request's
 * response that should not be sent back as part of the access token.
 */
export interface TokenResponse {
  /**
   * The AccessToken to be returned from getToken.
   */
  accessToken: AccessToken;

  /**
   * The refresh token if the 'offline_access' scope was used.
   */
  refreshToken?: string;
}

export class IdentityClient extends ServiceClient implements INetworkModule {
  public authorityHost: string;

  constructor(options?: TokenCredentialOptions) {
    if (isNode) {
      options = options || getAuthorityHostEnvironment();
    }
    options = options || IdentityClient.getDefaultOptions();
    super(
      undefined,
      createPipelineFromOptions({
        ...options,
        deserializationOptions: {
          expectedContentTypes: {
            json: ["application/json", "text/json", "text/plain"]
          }
        }
      })
    );

    this.baseUri = this.authorityHost = options.authorityHost || DefaultAuthorityHost;

    if (!this.baseUri.startsWith("https:")) {
      throw new Error("The authorityHost address must use the 'https' protocol.");
    }
  }

  createWebResource(requestOptions: RequestPrepareOptions): WebResource {
    const webResource = new WebResource();
    webResource.prepare(requestOptions);
    return webResource;
  }

  async sendTokenRequest(
    webResource: WebResource,
    expiresOnParser?: (responseBody: any) => number
  ): Promise<TokenResponse | null> {
    logger.info(`IdentityClient: sending token request to [${webResource.url}]`);
    const response = await this.sendRequest(webResource);

    expiresOnParser =
      expiresOnParser ||
      ((responseBody: any) => {
        return Date.now() + responseBody.expires_in * 1000;
      });

    if (response.status === 200 || response.status === 201) {
      const token = {
        accessToken: {
          token: response.parsedBody.access_token,
          expiresOnTimestamp: expiresOnParser(response.parsedBody)
        },
        refreshToken: response.parsedBody.refresh_token
      };

      logger.info(
        `IdentityClient: [${webResource.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`
      );
      return token;
    } else {
      const error = new AuthenticationError(
        response.status,
        response.parsedBody || response.bodyAsText
      );
      logger.warning(
        `IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`
      );
      throw error;
    }
  }

  async refreshAccessToken(
    tenantId: string,
    clientId: string,
    scopes: string,
    refreshToken: string | undefined,
    clientSecret: string | undefined,
    expiresOnParser?: (responseBody: any) => number,
    options?: GetTokenOptions
  ): Promise<TokenResponse | null> {
    if (refreshToken === undefined) {
      return null;
    }
    logger.info(
      `IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`
    );

    const { span, updatedOptions: newOptions } = createSpan("IdentityClient-refreshAccessToken", options);

    const refreshParams = {
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: refreshToken,
      scope: scopes
    };

    if (clientSecret !== undefined) {
      (refreshParams as any).client_secret = clientSecret;
    }

    try {
      const urlSuffix = getIdentityTokenEndpointSuffix(tenantId);
      const webResource = this.createWebResource({
        url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
        method: "POST",
        disableJsonStringifyOnBody: true,
        deserializationMapper: undefined,
        body: qs.stringify(refreshParams),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        spanOptions: newOptions.tracingOptions && newOptions.tracingOptions.spanOptions,
        tracingContext: newOptions.tracingOptions && newOptions.tracingOptions.tracingContext,
        abortSignal: options && options.abortSignal
      });

      const response = await this.sendTokenRequest(webResource, expiresOnParser);
      logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
      return response;
    } catch (err) {
      if (
        err.name === AuthenticationErrorName &&
        err.errorResponse.error === "interaction_required"
      ) {
        // It's likely that the refresh token has expired, so
        // return null so that the credential implementation will
        // initiate the authentication flow again.
        logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message
        });

        return null;
      } else {
        logger.warning(
          `IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`
        );
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message
        });
        throw err;
      }
    } finally {
      span.end();
    }
  }

  sendGetRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const webResource = new WebResource(url, "GET", options?.body, {}, options?.headers);

    return this.sendRequest(webResource).then((response) => {
      return {
        body: response.parsedBody as T,
        headers: response.headers.rawHeaders(),
        status: response.status
      };
    });
  }

  sendPostRequestAsync<T>(
    url: string,
    options?: NetworkRequestOptions
  ): Promise<NetworkResponse<T>> {
    const webResource = new WebResource(url, "POST", options?.body, {}, options?.headers);

    return this.sendRequest(webResource).then((response) => {
      return {
        body: response.parsedBody as T,
        headers: response.headers.rawHeaders(),
        status: response.status
      };
    });
  }

  static getDefaultOptions(): TokenCredentialOptions {
    return {
      authorityHost: DefaultAuthorityHost
    };
  }
}

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory.
 */
export interface TokenCredentialOptions extends PipelineOptions {
  /**
   * The authority host to use for authentication requests.  The default is
   * "https://login.microsoftonline.com".
   */
  authorityHost?: string;
}
