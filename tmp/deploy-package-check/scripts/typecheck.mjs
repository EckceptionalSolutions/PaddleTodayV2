import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const mobileWorkspace = "apps/mobile/package.json";

if (!existsSync(mobileWorkspace)) {
  console.log(`[typecheck] Skipping mobile typecheck; missing ${mobileWorkspace}.`);
  process.exit(0);
}

execSync("npm run typecheck --workspace @paddletoday/mobile", {
  stdio: "inherit",
});
