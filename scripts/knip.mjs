import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const localBinary = process.platform === "win32" ? "node_modules/.bin/knip.cmd" : "node_modules/.bin/knip";
const configPath = "knip.json";
const transientArgs = [
  "--yes",
  "--package=knip@5.0.0",
  "knip",
  "--config",
  configPath,
  "--production",
  "--no-progress",
];

const command = existsSync(localBinary) ? localBinary : npxCommand;
const commandArgs = existsSync(localBinary)
  ? ["--config", configPath, "--production", "--no-progress"]
  : transientArgs;

const result = process.platform === "win32"
  ? spawnSync("cmd.exe", ["/c", command, ...commandArgs], { stdio: "inherit" })
  : spawnSync(command, commandArgs, { stdio: "inherit" });

process.exit(result.status ?? 1);
