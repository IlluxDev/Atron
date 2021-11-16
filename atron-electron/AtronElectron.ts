import deepmerge from "deepmerge";
import { BrowserWindow, BrowserWindowConstructorOptions, dialog, ipcMain } from "electron"; 

export class AtronElectron {
	private browserWindow?: BrowserWindow;

	public setBrowserWindow(browserWindow: BrowserWindow) {
		if (!this.browserWindow) {
			this.browserWindow = browserWindow;

			ipcMain.on("_atron:window:button:minimize", (event) => {
				this.browserWindow?.minimize();
			});
			return;
		}

		throw new Error("Cannot set BrowserWindow multiple times");
	}

	public extendElectronOptions(options?: BrowserWindowConstructorOptions): BrowserWindowConstructorOptions {
		return deepmerge<BrowserWindowConstructorOptions>({
			frame: true,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true
			},
			titleBarStyle: "hidden"
		}, options ?? {});
	} 
}