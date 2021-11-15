import { ChildProcessWithoutNullStreams, exec, spawn } from "child_process";
import path from "path";
import chokidar from "chokidar";
import { DevelopmentOptions } from "./DevelopmentOptions";
import deepmerge from "deepmerge";

export class DevelopmentServer {
	private electronDistLocation?: string;
	private onServerStopping = [] as any[];
	private settings: DevelopmentOptions;

	public constructor(options: DevelopmentOptions) {
		this.settings = deepmerge({
			electron: {
				saveReloadTime: 3000
			}
		}, options);

		this.runReact().then(port => {
			this.runElectron();
		});
	}

	private runReact(): Promise<number> {
		return new Promise(resolve => {
			const reactServer = exec("npx vite", {
				cwd: process.cwd()
			});

			let initialReady = false;

			reactServer.stdout?.on("data", data => {
				if (!initialReady) {
					if (data.startsWith("  > Local: http://localhost")) {
						let portRegExp = /> Local: http:\/\/localhost:(.*?)\n/.exec(data);

						if (portRegExp) {
							console.log("ReactJS development server is ready");
							resolve(+portRegExp[1] as number);
						}
					}
				}
			});
		});
	}

	private stopDevelopment() {
		this.onServerStopping.forEach(event => event());
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
			const compiledWindowLocation = path.join(process.cwd(), "./.atron");

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
							if (response == "ready" && !initialReady) {
								initialReady = true;
								resolve();
							}

							if (response == "exit") {
								this.stopDevelopment();
								windowProcess.kill();
							}
							break;
					}
				});
			}

			let restartTimer: NodeJS.Timer;

			const restart = () => {
				if (restartTimer) {
					clearTimeout(restartTimer);
				}

				restartTimer = setTimeout(() => {
					windowProcess.kill();
					reRunElectron();
				}, this.settings.electron?.saveReloadTime);
			}

			const compiledWatcher = chokidar.watch(compiledWindowLocation);
			compiledWatcher
				.on("add", restart)
				.on("unlink", restart)
				.on("unlinkDir", restart)
				.on("change", restart);

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

			this.onServerStopping.push(() => {
				process.kill(-typescriptCompiler.pid!);
			});
		});
	}
}