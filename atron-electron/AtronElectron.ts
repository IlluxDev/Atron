import deepmerge from "deepmerge";
import { BrowserWindowConstructorOptions, dialog } from "electron"; 

export class AtronElectron {
	public constructor() {
	}

	public extendElectronOptions(options?: BrowserWindowConstructorOptions): BrowserWindowConstructorOptions {
		return deepmerge<BrowserWindowConstructorOptions>({
			frame: true,
			titleBarOverlay: false,
			titleBarStyle: "hidden",
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true
			}
		}, options ?? {});
	} 
}