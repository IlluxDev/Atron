import deepmerge from "deepmerge";
import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from "electron";

export class AtronElectron {
	private browserWindow?: BrowserWindow;

	public setBrowserWindow(browserWindow: BrowserWindow) {
		if (!this.browserWindow) {
			this.browserWindow = browserWindow;

			ipcMain.on("_atron:window:button:minimize", (event) => {
				this.browserWindow?.minimize();
			});

			ipcMain.on("_atron:window:button:maximize", (event) => {
				this.browserWindow?.maximize();
			});

			ipcMain.on("_atron:window:button:restore", (event) => {
				this.browserWindow?.restore();
			});

			this.browserWindow.on("maximize", () => {
				browserWindow.webContents.send("_atron:window:maximized _event");
			});

			this.browserWindow.on("unmaximize", () => {
				browserWindow.webContents.send("_atron:window:unMaximized _event");
			});
 
			this.browserWindow.on("ready-to-show", () => {
				if (this.browserWindow?.isMaximized()) {
					browserWindow.webContents.send("_atron:window:maximized _event");
					return;
				}

				browserWindow.webContents.send("_atron:window:unMaximized _event");
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