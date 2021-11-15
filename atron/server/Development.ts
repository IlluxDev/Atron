import { ChildProcessWithoutNullStreams, exec, spawn } from "child_process";
import path from "path";

export class DevelopmentServer {
	private electronDistLocation?: string;

	public constructor() {
		this.runElectron();
	}

	private runElectron() {
		this.startElectronCompiler().then(() => {
			console.log("TypeScript compiler is ready");

			this.initializeElectronDistLocation().then(() => {
				this.startElectronDevelopmentServer().then(() => {
					console.log("Electron development service is ready");
				});
			});
		});
	}

	private initializeElectronDistLocation(): Promise<void> {
		return new Promise(resolve => {
			const atronLocation = path.join(process.cwd(), "./atron");
			const distGetter = exec("node _GetElectron.js", { cwd: atronLocation });

			distGetter.stdout?.on("data", data => {
				this.electronDistLocation = data.replace("\n", "");
				resolve();
			});
		});
	}

	private startElectronDevelopmentServer(): Promise<void> {
		return new Promise(resolve => {
			let windowProcess: ChildProcessWithoutNullStreams;

			const reRunElectron = () => {
				windowProcess = spawn(this.electronDistLocation!, ["."], {
					cwd: process.cwd()
				});

				let initialReady = false;

				windowProcess.stdout.on("data", (data: Buffer) => {
					let response = "";
					let mode = "";

					if (data.toString().startsWith("[SYS]-")) {
						response = data.toString().substring(6);
						mode = "system";
					}

					switch (mode) {
						case "system":
							if (response == "ready") {
								resolve();
							}
							break;
					}
				});
			}

			reRunElectron();
		});
	}

	private startElectronCompiler(): Promise<void> {
		return new Promise(resolve => {
			const compileCommand = "npx tsc --watch --outDir ../.atron";
			const atronLocation = path.join(process.cwd(), "./atron");
			let initialStarted = false;

			const typescriptCompiler = exec(compileCommand, { cwd: atronLocation });
			typescriptCompiler.stdout?.on("data", () => !initialStarted 
				? (() => { 
					initialStarted = true;
					resolve();
				})()
				: null
			);
		});
	}
}