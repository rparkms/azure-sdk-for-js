import { join } from "path";
import { readFileSync } from "fs";
import * as assert from "assert";

// this constant isn't normally exported by the generator so you'll need to do it
// by hand if you regenerate the models.
import { packageVersion } from "../src/generated/src/appConfigurationContext";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string matches the package version", () => {
    const packageJsonFilePath = join(__dirname, "../package.json");
    const rawFileContents = readFileSync(packageJsonFilePath, { encoding: "utf-8" });
    const packageJsonContents = JSON.parse(rawFileContents);

    assert.equal(packageJsonContents.version, packageVersion);
  });
});
