import { Command } from "commander";

const terminal = {
	log(text: string) {
		console.log(text);
	}
}

const atron = new Command();
atron.version("0.1.0");
atron
	.option("--start", "Start a development server")
	.option("--build", "Build your application for production")
	.parse();

const options = atron.opts();

if (options.start) {
	terminal.log("Starting development server");
} else if (options.build) {
	terminal.log("Sorry but this han't been implemented yet");
}