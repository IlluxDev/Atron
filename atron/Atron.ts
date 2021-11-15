import { Command } from "commander";
import { DevelopmentServer } from "./server/Development";

const terminal = {
	log(text: string) {
		console.log(text);
	}
}

const atron = new Command();
atron.version("0.1.0");
atron
	.option("--start", "Start a development server")
	.option("--instantReload", "Reload Electron on save without a delay")
	.option("--atronMain <location>", "Atron ElectronJS main file from cache")
	.option("--build", "Build your application for production")
	.parse();

const options = atron.opts();

if (options.instantReload && !options.start) {
	terminal.log("--instantReload cannot be used without --start");
}

if (options.atronMain && !options.start) {
	terminal.log("--atronMain can only be used with --start");
}

console.log(options.atronMain == null ? undefined : options.atronMain, options)

if (options.start) {
	new DevelopmentServer({
		electron: {
			saveReloadTime: options.instantReload ? 0 : 3000
		}
	});
} else if (options.build) {
	terminal.log("Sorry but this han't been implemented yet");
}