// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ModifiedAccessConditions,
  LeaseAccessConditions,
  SequenceNumberAccessConditions,
  AppendPositionAccessConditions,
  AccessTier,
  CpkInfo
} from "./generatedModels";
import { EncryptionAlgorithmAES25 } from "./utils/constants";

export interface Metadata {
  [propertyName: string]: string;
}

export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {}

export interface PageBlobRequestConditions
  extends BlobRequestConditions,
    SequenceNumberAccessConditions {}

export interface AppendBlobRequestConditions
  extends BlobRequestConditions,
    AppendPositionAccessConditions {}

export enum BlockBlobTier {
  Hot = "Hot",
  Cool = "Cool",
  Archive = "Archive"
}

export enum PremiumPageBlobTier {
  P4 = "P4",
  P6 = "P6",
  P10 = "P10",
  P15 = "P15",
  P20 = "P20",
  P30 = "P30",
  P40 = "P40",
  P50 = "P50",
  P60 = "P60",
  P70 = "P70",
  P80 = "P80"
}

export function toAccessTier(
  tier: BlockBlobTier | PremiumPageBlobTier | string | undefined
): AccessTier | undefined {
  if (tier == undefined) {
    return undefined;
  }

  return tier as AccessTier; // No more check if string is a valid AccessTier, and left this to underlay logic to decide(service).
}

export function ensureCpkIfSpecified(cpk: CpkInfo | undefined, isHttps: boolean) {
  if (cpk && !isHttps) {
    throw new RangeError("Customer-provided encryption key must be used over HTTPS.");
  }

  if (cpk && !cpk.encryptionAlgorithm) {
    cpk.encryptionAlgorithm = EncryptionAlgorithmAES25;
  }
}
