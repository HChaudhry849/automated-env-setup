"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./cli");
const inputhandler_1 = require("./inputhandler");
const executor_1 = require("./executor");
async function main() {
    const cli = new cli_1.Cli();
    // 1. Run CLI and wait for user input
    await cli.runProg();
    // 2. Process input
    const inputHandler = new inputhandler_1.InputHandler(cli);
    inputHandler.applyDefault();
    const config = inputHandler.mapToConfigObj();
    // 3. Execute setup
    const executor = new executor_1.Executor(config);
    await executor.checkOS();
    await executor.executeSetUp();
}
main().catch(console.error);
