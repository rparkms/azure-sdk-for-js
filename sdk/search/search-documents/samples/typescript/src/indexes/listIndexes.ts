// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.SEARCH_API_ENDPOINT || "";
const apiKey = process.env.SEARCH_API_KEY || "";

async function main(): Promise<void> {
  console.log(`Running List Indexes Sample....`);

  const client = new SearchIndexClient(endpoint, new AzureKeyCredential(apiKey));
  const result = await client.listIndexes();
  let listOfIndexes = await result.next();

  console.log(`List of Indexes`);
  console.log(`***************`);
  while (!listOfIndexes.done) {
    console.log(`Name: ${listOfIndexes.value.name}`);
    console.log(`Similarity Algorithm: ${listOfIndexes.value.similarity?.odatatype}`);
    console.log();
    listOfIndexes = await result.next();
  }
}

main();
