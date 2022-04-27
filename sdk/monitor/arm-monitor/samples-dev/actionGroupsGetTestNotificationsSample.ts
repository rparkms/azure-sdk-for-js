/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get the test notifications by the notification id
 *
 * @summary Get the test notifications by the notification id
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2021-09-01/examples/getTestNotifications.json
 */
async function getNotificationDetails() {
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const notificationId = "11000222191287";
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.actionGroups.getTestNotifications(notificationId);
  console.log(result);
}

getNotificationDetails().catch(console.error);