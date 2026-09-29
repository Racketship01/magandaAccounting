/** @format */

const fs = require("fs");
const log = fs.readFileSync("/tmp/nuxt-dev3.log", "utf8");
const lines = log.split("\n");
const re = /error|fail|crash|ipc|closed|exception|panic|fatal|unhandled|warn/i;
console.log("Total log lines:", lines.length);
const matched = lines.filter((l) => re.test(l));
console.log(
  "Matches (error/fail/crash/ipc/closed/exception/panic/fatal/unhandled/warn):",
  matched.length,
);
matched.slice(0, 40).forEach((l) => console.log("  >", l.slice(0, 300)));
console.log("");
console.log("Last 20 log lines:");
lines.slice(-20).forEach((l) => console.log(l));
