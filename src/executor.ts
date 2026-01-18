
import { ConfigFlags } from "./inputhandler";
import { execFile } from "child_process";
import path from "path";

const scriptDirectoryPath = path.resolve(__dirname, "../bash/setupdirectory.sh");
const scriptcheckosPath = path.resolve(__dirname, "../bash/checkos.sh");

export class Executor {

    public storedData: ConfigFlags
    public windowsOs: Boolean

    constructor(data: ConfigFlags) {
        this.storedData = data
        this.windowsOs = false
    }

    checkOS(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            execFile(scriptcheckosPath, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                    this.windowsOs = true
                }
            });
        })
    }

    setUpFolderStructure(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.windowsOs == true) {
                if (this.storedData.fullSetupFlag === true) {
                    execFile(scriptDirectoryPath, (error, stdout, stderr) => {
                        if (error) {
                            console.error("Error:", error);
                            reject(error);
                        } else {
                            console.log("Folders have been set-up!");
                            resolve(true);
                        }
                    });
                }
                else {
                    resolve(false)
                }
            }
            else {
                resolve(false)
            }
        });
    }

    executeSetUp(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let jsonString = JSON.stringify(this.storedData);
            //command path is wrong 
            const command = `ansible-playbook playbook.yml -e '${jsonString}'`;
            if (this.windowsOs == true) {
                execFile(command, (error, stdout, stderr) => {
                    resolve(true)
                })
            }
            else {
                console.log("unable to run set-up, os is NOT Windows");
                resolve(false)
            }
        })
    }
}