import * as readline from "node:readline";

export class Cli {
    public userSetup: string;
    public userBrowser: string;
    public userCypress: string;
    public userAnswer: string;

    constructor() {
        this.userSetup = "";
        this.userBrowser = "";
        this.userCypress = "";
        this.userAnswer = "";
    }

    async askUser(question: string): Promise<string> {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(question, (answer) => {
                rl.close();
                resolve(
                    this.userAnswer = answer.toLowerCase()
                )
            });
        })
    }

    async setUp() {
        let q1 = "What type of setup do you want? (Full, Minimal) "
        enum choice {
            choiceA = 'full',
            choiceB = 'minimal'
        }

        await this.askUser(q1)
        if (this.userAnswer === choice.choiceA) {
            console.log("Full set-up selected")
        } else if (this.userAnswer === choice.choiceB) {
            console.log("Minimal set-up selected")
        }
        else {
            console.log("Invalid Choice")
        }
        this.userSetup = this.userAnswer
        return this.userSetup;
    }

    async installCy() {
        let q2 = "Would you like to install cypress? (Yes/No) "
        enum choice {
            choiceA = "yes",
            choiceB = "no"
        }

        await this.askUser(q2)
        if (this.userAnswer === choice.choiceA) {
            console.log("Cypress Selected to be Installed")
        } else if (this.userAnswer === choice.choiceB) {
            console.log("Cypress Not Selected to be Installed")
        }
        else {
            console.log("Invalid Choice")
        }
        this.userCypress = this.userAnswer;
        return this.userCypress;
    }

    async installWebBrw() {
        let q3 = "Would you like to install Chrome OR Firefox? "
        enum choice {
            choiceA = "chrome",
            choiceB = "firefox"
        }

        await this.askUser(q3)
        if (this.userAnswer === choice.choiceA) {
            console.log("Chrome selected to be installed")
        } else if (this.userAnswer === choice.choiceB) {
            console.log("Firefox selected to installed")
        }
        else {
            console.log("Invalid Choice")
        }
        this.userBrowser = this.userAnswer
        return this.userBrowser
    }

    summary() {
        let setup = this.userSetup;
        let cypress = this.userCypress;
        let browser = this.userBrowser;
        console.log(setup, cypress, browser)
    }

    async runProg(){
        await this.setUp()
        await this.installCy()
        await this.installWebBrw()
        this.summary()
    }
}
