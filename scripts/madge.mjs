import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const localBinary = process.platform === "win32" ? "node_modules/.bin/madge.cmd" : "node_modules/.bin/madge";
const roots = [
  "src",
  "scripts",
  "apps/mobile/app",
  "apps/mobile/src",
  "packages/api-client/src",
  "packages/api-contract/src",
];
const args = [
  "--yes",
  "madge",
  "--circular",
  "--extensions",
  "ts,tsx,js,mjs",
  "--ts-config",
  "tsconfig.json",
  "--no-color",
  "--no-spinner",
  "--warning",
];

for (const root of roots) {
  console.log(`\n[madge] ${root}`);

  const command = existsSync(localBinary) ? localBinary : npxCommand;
  const commandArgs = existsSync(localBinary) ? ["--circular", "--extensions", "ts,tsx,js,mjs", "--ts-config", "tsconfig.json", "--no-color", "--no-spinner", "--warning", root] : [...args, root];
  const result = process.platform === "win32"
    ? spawnSync("cmd.exe", ["/c", command, ...commandArgs], { stdio: "inherit" })
    : spawnSync(command, commandArgs, { stdio: "inherit" });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
