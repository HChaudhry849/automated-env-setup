"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandler = void 0;
class InputHandler {
    constructor(source) {
        this.setup = source.userSetup;
        this.cypress = source.userCypress;
        this.browser = source.userBrowser;
    }
    applyDefault() {
        if (this.setup !== "full" && this.setup !== "minimal") {
            this.setup = "minimal";
        }
        if (this.cypress !== "yes" && this.cypress !== "no") {
            this.cypress = "yes";
        }
        if (this.browser !== "chrome" && this.browser !== "firefox") {
            this.browser = "chrome";
        }
    }
    mapToConfigObj() {
        return {
            fullSetupFlag: this.setup === "full",
            minimalSetupFlag: this.setup === "minimal",
            cypressFlag: this.cypress === "yes",
            chromeFlag: this.browser === "chrome",
            fireFoxFlag: this.browser === "firefox"
        };
    }
}
exports.InputHandler = InputHandler;
