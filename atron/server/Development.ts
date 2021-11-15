import { exec } from "child_process";
import path from "path";

export class DevelopmentServer {
	public constructor() {
		this.runElectron();
	}

	private runElectron() {
		this.startElectronCompiler();
	}

	private startElectronCompiler() {
		const compileCommand = "npx tsc --watch --outDir ../.atron";
		const atronLocation = path.join(process.cwd(), "./atron");

		const typescriptCompiler = exec(compileCommand, { cwd: atronLocation });
		
	}
}