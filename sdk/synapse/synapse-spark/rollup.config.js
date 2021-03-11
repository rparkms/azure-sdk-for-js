import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import cjs from "@rollup/plugin-commonjs";
import { openTelemetryCommonJs } from "@azure/dev-tool/shared-config/rollup";

/**
 * @type {rollup.RollupFileOptions}
 */
const config = {
  input: "./dist-esm/sparkClient.js",
  external: ["@azure/core-http", "@azure/core-arm"],
  output: {
    file: "./dist/index.js",
    format: "cjs",
    name: "Azure.SynapseSpark",
    sourcemap: true,
    globals: {
      "@azure/core-http": "coreHttp",
      "@azure/core-arm": "coreArm"
    },
    banner: `/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */ `
  },
  plugins: [
    nodeResolve({ module: true }),
    sourcemaps(),
    cjs({
      namedExports: {
        assert: ["ok", "deepEqual", "equal", "fail", "deepStrictEqual", "strictEqual"],
        ...openTelemetryCommonJs()
      }
    })
  ]
};

export default config;
