
import { ConfigFlags } from "./inputhandler";
import { execFile } from "child_process";
import path from "path";

export class Executor {

    public storedData: ConfigFlags
    public linuxOs: Boolean

    constructor(data: ConfigFlags) {
        this.storedData = data
        this.linuxOs = false
    }

    checkOS(): boolean {
        const platform = process.platform; // Node built-in

        if (platform === "linux") {
            console.log("Linux OS detected");
            this.linuxOs = true;
            return true;
        } else {
            console.error(`Unsupported OS detected: ${platform}`);
            this.linuxOs = false;
            return false;
        }
    }

    executeSetUp(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.linuxOs) {
                console.log("unable to run set-up, os is NOT Linux");
                return resolve(false);
            }

            const playbookPath = path.resolve(__dirname, "../ansible/playbook.yml");
            const jsonString = JSON.stringify(this.storedData);

            execFile(
                "ansible-playbook",
                [playbookPath, "--extra-vars", jsonString],
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(stderr);
                        reject(error);
                    } else {
                        console.log(stdout);
                        resolve(true);
                    }
                }
            );
        });
    }

}