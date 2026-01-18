"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cli = void 0;
const readline = __importStar(require("node:readline"));
class Cli {
    constructor() {
        this.userSetup = "";
        this.userBrowser = "";
        this.userCypress = "";
        this.userAnswer = "";
    }
    async askUser(question) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(question, (answer) => {
                rl.close();
                resolve(this.userAnswer = answer.toLowerCase());
            });
        });
    }
    async setUp() {
        let q1 = "What type of setup do you want? (Full, Minimal) ";
        let choice;
        (function (choice) {
            choice["choiceA"] = "full";
            choice["choiceB"] = "minimal";
        })(choice || (choice = {}));
        await this.askUser(q1);
        if (this.userAnswer === choice.choiceA) {
            console.log("Full set-up selected");
        }
        else if (this.userAnswer === choice.choiceB) {
            console.log("Minimal set-up selected");
        }
        else {
            console.log("Invalid Choice");
        }
        this.userSetup = this.userAnswer;
        return this.userSetup;
    }
    async installCy() {
        let q2 = "Would you like to install cypress? (Yes/No) ";
        let choice;
        (function (choice) {
            choice["choiceA"] = "yes";
            choice["choiceB"] = "no";
        })(choice || (choice = {}));
        await this.askUser(q2);
        if (this.userAnswer === choice.choiceA) {
            console.log("Cypress Selected to be Installed");
        }
        else if (this.userAnswer === choice.choiceB) {
            console.log("Cypress Not Selected to be Installed");
        }
        else {
            console.log("Invalid Choice");
        }
        this.userCypress = this.userAnswer;
        return this.userCypress;
    }
    async installWebBrw() {
        let q3 = "Would you like to install Chrome OR Firefox? ";
        let choice;
        (function (choice) {
            choice["choiceA"] = "chrome";
            choice["choiceB"] = "firefox";
        })(choice || (choice = {}));
        await this.askUser(q3);
        if (this.userAnswer === choice.choiceA) {
            console.log("Chrome selected to be installed");
        }
        else if (this.userAnswer === choice.choiceB) {
            console.log("Firefox selected to installed");
        }
        else {
            console.log("Invalid Choice");
        }
        this.userBrowser = this.userAnswer;
        return this.userBrowser;
    }
    summary() {
        let setup = this.userSetup;
        let cypress = this.userCypress;
        let browser = this.userBrowser;
        console.log(setup, cypress, browser);
    }
    async runProg() {
        await this.setUp();
        await this.installCy();
        await this.installWebBrw();
        this.summary();
    }
}
exports.Cli = Cli;
