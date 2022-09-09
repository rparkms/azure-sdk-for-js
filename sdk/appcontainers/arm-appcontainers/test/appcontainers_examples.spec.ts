/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, use } from "chai";
import { Context } from "mocha";
import { ContainerAppsAPIClient } from "../src/containerAppsAPIClient";
import { ContainerApp, ManagedEnvironment } from "../src/models";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id"
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("AppContainer test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ContainerAppsAPIClient;
  let location: string;
  let resourceGroup: string;
  let containerAppName: string;
  let environmentEnvelope: ManagedEnvironment;
  let containerAppEnvelope: ContainerApp;
  let environmentName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new ContainerAppsAPIClient(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "eastus";
    resourceGroup = "myjstest";
    containerAppName = "mycontainerappxxx";
    environmentName = "testcontainerenv12";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("managedEnvironments create test", async function () {
    environmentEnvelope = {
      location: "East US",
      zoneRedundant: false
    };
    const res = await client.managedEnvironments.beginCreateOrUpdateAndWait(
      resourceGroup,
      environmentName,
      environmentEnvelope,
      testPollingOptions
    );
    assert.equal(res.name, environmentName);
  })

  it("containerApp create test", async function () {
    containerAppEnvelope = {
      "location": location,
      "managedEnvironmentId": "/subscriptions/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/Microsoft.App/managedEnvironments/" + environmentName,
      template: {
        containers: [
          {
            name: "simple-hello-world-container",
            image: "mcr.microsoft.com/azuredocs/containerapps-helloworld",
            resources: {
              cpu: 0.25,
              memory: "0.5Gi"
            }
          }
        ]
      }
    }
    const res = await client.containerApps.beginCreateOrUpdateAndWait(resourceGroup, containerAppName, containerAppEnvelope, testPollingOptions);
    assert.equal(res.name, containerAppName);
  });

  it("containerapp list Secrets test", async function () {
    const res = await client.containerApps.listSecrets(
      resourceGroup,
      containerAppName
    );
  });

  it("containerapp delete test", async function () {
    const res = await client.containerApps.beginDeleteAndWait(resourceGroup, containerAppName);
    const resArray = new Array();
    for await (let item of client.containerApps.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  })

  it("managedEnvironments delete test", async function () {
    const res = await client.managedEnvironments.beginDeleteAndWait(resourceGroup, environmentName);
    const resArray = new Array();
    for await (let item of client.managedEnvironments.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  })
})