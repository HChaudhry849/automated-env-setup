import { Cli } from "./cli";
import { InputHandler } from "./inputhandler";
import { Executor } from "./executor";

async function main() {
    const cli = new Cli();

    // 1. Run CLI and wait for user input
    await cli.runProg();

    // 2. Process input
    const inputHandler = new InputHandler(cli);
    inputHandler.applyDefault();
    const config = inputHandler.mapToConfigObj();

    // 3. Execute setup
    const executor = new Executor(config);

    await executor.checkOS();
    await executor.executeSetUp();
}

main().catch(console.error);
