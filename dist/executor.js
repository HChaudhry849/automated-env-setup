"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
class Executor {
    constructor(data) {
        this.storedData = data;
        this.linuxOs = false;
    }
    checkOS() {
        const platform = process.platform; // Node built-in
        if (platform === "linux") {
            console.log("Linux OS detected");
            this.linuxOs = true;
            return true;
        }
        else {
            console.error(`Unsupported OS detected: ${platform}`);
            this.linuxOs = false;
            return false;
        }
    }
    executeSetUp() {
        return new Promise((resolve, reject) => {
            if (!this.linuxOs) {
                console.log("unable to run set-up, os is NOT Linux");
                return resolve(false);
            }
            const playbookPath = path_1.default.resolve(__dirname, "../ansible/playbook.yml");
            const jsonString = JSON.stringify(this.storedData);
            (0, child_process_1.execFile)("ansible-playbook", [playbookPath, "--extra-vars", jsonString], (error, stdout, stderr) => {
                if (error) {
                    console.error(stderr);
                    reject(error);
                }
                else {
                    console.log(stdout);
                    resolve(true);
                }
            });
        });
    }
}
exports.Executor = Executor;
