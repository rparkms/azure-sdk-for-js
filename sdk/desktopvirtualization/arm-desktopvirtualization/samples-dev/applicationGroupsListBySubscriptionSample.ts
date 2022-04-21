/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ApplicationGroupsListBySubscriptionOptionalParams,
  DesktopVirtualizationAPIClient
} from "@azure/arm-desktopvirtualization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to List applicationGroups in subscription.
 *
 * @summary List applicationGroups in subscription.
 * x-ms-original-file: specification/desktopvirtualization/resource-manager/Microsoft.DesktopVirtualization/preview/2021-09-03-preview/examples/ApplicationGroup_ListBySubscription.json
 */
async function applicationGroupList() {
  const subscriptionId = "daefabc0-95b4-48b3-b645-8a753a63c4fa";
  const filter = "applicationGroupType eq 'RailApplication'";
  const options: ApplicationGroupsListBySubscriptionOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new DesktopVirtualizationAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.applicationGroups.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

applicationGroupList().catch(console.error);