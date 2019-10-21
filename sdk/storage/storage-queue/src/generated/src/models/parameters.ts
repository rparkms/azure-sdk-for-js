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

export const comp0: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'properties',
    type: {
      name: "String"
    }
  }
};
export const comp1: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'stats',
    type: {
      name: "String"
    }
  }
};
export const comp2: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'list',
    type: {
      name: "String"
    }
  }
};
export const comp3: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'metadata',
    type: {
      name: "String"
    }
  }
};
export const comp4: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'acl',
    type: {
      name: "String"
    }
  }
};
export const include: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "include"
  ],
  mapper: {
    serializedName: "include",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "Enum",
          allowedValues: [
            "metadata"
          ]
        }
      }
    }
  },
  collectionFormat: coreHttp.QueryCollectionFormat.Csv
};
export const marker: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "marker"
  ],
  mapper: {
    serializedName: "marker",
    type: {
      name: "String"
    }
  }
};
export const maxPageSize: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "maxPageSize"
  ],
  mapper: {
    serializedName: "maxresults",
    constraints: {
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const messageTimeToLive: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "messageTimeToLive"
  ],
  mapper: {
    serializedName: "messagettl",
    constraints: {
      InclusiveMinimum: -1
    },
    type: {
      name: "Number"
    }
  }
};
export const metadata: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "metadata"
  ],
  mapper: {
    serializedName: "x-ms-meta",
    type: {
      name: "Dictionary",
      value: {
        type: {
          name: "String"
        }
      }
    },
    headerCollectionPrefix: "x-ms-meta-"
  }
};
export const numberOfMessages: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "numberOfMessages"
  ],
  mapper: {
    serializedName: "numofmessages",
    constraints: {
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const peekonly: coreHttp.OperationQueryParameter = {
  parameterPath: "peekonly",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "peekonly",
    defaultValue: 'true',
    type: {
      name: "String"
    }
  }
};
export const popReceipt: coreHttp.OperationQueryParameter = {
  parameterPath: "popReceipt",
  mapper: {
    required: true,
    serializedName: "popreceipt",
    type: {
      name: "String"
    }
  }
};
export const prefix: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "prefix"
  ],
  mapper: {
    serializedName: "prefix",
    type: {
      name: "String"
    }
  }
};
export const requestId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "requestId"
  ],
  mapper: {
    serializedName: "x-ms-client-request-id",
    type: {
      name: "String"
    }
  }
};
export const restype: coreHttp.OperationQueryParameter = {
  parameterPath: "restype",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "restype",
    defaultValue: 'service',
    type: {
      name: "String"
    }
  }
};
export const timeoutInSeconds: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "timeoutInSeconds"
  ],
  mapper: {
    serializedName: "timeout",
    constraints: {
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const url: coreHttp.OperationURLParameter = {
  parameterPath: "url",
  mapper: {
    required: true,
    serializedName: "url",
    defaultValue: '',
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const version: coreHttp.OperationParameter = {
  parameterPath: "version",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "x-ms-version",
    defaultValue: '2019-02-02',
    type: {
      name: "String"
    }
  }
};
export const visibilityTimeout0: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "visibilityTimeout"
  ],
  mapper: {
    serializedName: "visibilitytimeout",
    constraints: {
      InclusiveMaximum: 604800,
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const visibilityTimeout1: coreHttp.OperationQueryParameter = {
  parameterPath: "visibilityTimeout",
  mapper: {
    required: true,
    serializedName: "visibilitytimeout",
    constraints: {
      InclusiveMaximum: 604800,
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
