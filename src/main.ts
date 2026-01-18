import { Cli } from "./cli";
import { InputHandler } from "./inputhandler";
import { Executor } from "./executor";


const cl = new Cli()
const ip = new InputHandler(cl);
const myData = ip.mapToConfigObj()
const ex = new Executor(myData);
//ex.executePreRequsites()
/*RUN ALL CODE FROM HERE* */