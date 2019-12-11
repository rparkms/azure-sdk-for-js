/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { runSample } from './sampleHelpers';
import { EventHubProducerClient } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);

  const producer = new EventHubProducerClient(connectionString, eventHubName);

  console.log("Creating and sending a batch of events...");

  const eventsToSend = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  try {
    // By not specifying a partition ID or a partition key we allow the server to choose
    // which partition will accept this message.
    //
    // This pattern works well if the consumers of your events do not have any particular
    // requirements about the ordering of batches against other batches or if you don't care 
    // which messages are assigned to which partition.
    //
    // If you would like more control you can pass either a `partitionKey` or a `partitionId`
    // into the createBatch() `options` parameter which will allow you full control over the 
    // destination.
    const batchOptions = {
      // The maxSizeInBytes lets you manually control the size of the batch.
      // if this is not set we will get the maximum batch size from Event Hubs.
      // 
      // For this sample you can change the batch size to see how different parts
      // of the sample handle batching. In production we recommend using the default
      // and not specifying a maximum size.
      //
      // maxSizeInBytes: 200
    };

    let batch = await producer.createBatch(batchOptions);

    let numEventsSent = 0;

    // add events to our batch
    let i = 0;

    while (i < eventsToSend.length) {
      // messages can fail to be added to the batch if they exceed the maximum size configured for
      // the EventHub.
      const isAdded = batch.tryAdd({ body: eventsToSend[i] });

      if (isAdded) {
        console.log(`Added eventsToSend[${i}]`);
        ++i;
        continue;
      }
      
      if (batch.count === 0) {
        // If we can't add it and the batch is empty that means the message we're trying to send
        // is too large, even when it would be the _only_ message in the batch.
        //
        // At this point you'll need to decide if you're okay with skipping this message entirely
        // or find some way to shrink it.
        console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
        ++i;
        continue;
      }

      // otherwise this just signals a good spot to send our batch
      console.log(`Batch is full - sending ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch);
      numEventsSent += batch.count;

      // and create a new one to house the next set of messages
      batch = await producer.createBatch(batchOptions);
    }
    
    // send any remaining messages, if any.
    if (batch.count > 0) {
      console.log(`Sending remaining ${batch.count} messages as a single batch.`)
      await producer.sendBatch(batch);
      numEventsSent += batch.count;
    }

    console.log(`Sent ${numEventsSent} events`);

    if (numEventsSent !== eventsToSend.length) {
      throw new Error(`Not all messages were sent (${numEventsSent}/${eventsToSend.length})`);
    }
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }

  await producer.close();
  console.log(`Exiting sendEvents sample`);
}

runSample(main);
