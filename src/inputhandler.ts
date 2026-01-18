import { Cli } from "./cli";

// ConfigFlags is a blueprint for the flags object.
// It tells TypeScript what properties exist and their types,
// so we can safely pass this object between classes.
export interface ConfigFlags {
   fullSetupFlag: boolean;
   minimalSetupFlag: boolean;
   cypressFlag: boolean;
   chromeFlag: boolean;
   fireFoxFlag: boolean;
}

export class InputHandler {

   public setup: string;
   public cypress: string;
   public browser: string;

   constructor(source: Cli) {
      this.setup = source.userSetup
      this.cypress = source.userCypress
      this.browser = source.userBrowser
   }

   applyDefault() {
      if (this.setup !== "full" && this.setup !== "minimal") {
         this.setup = "minimal"
      }
      if (this.cypress !== "yes" && this.cypress !== "no") {
         this.cypress = "yes"
      }
      if (this.browser !== "chrome" && this.browser !== "firefox") {
         this.browser = "chrome"
      }
   }

   mapToConfigObj(): ConfigFlags {
      return {
         fullSetupFlag: this.setup === "full",
         minimalSetupFlag: this.setup === "minimal",
         cypressFlag: this.cypress === "yes",
         chromeFlag: this.browser === "chrome",
         fireFoxFlag: this.browser === "firefox"
      }
   }

}