import deepmerge from "deepmerge";
import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain, systemPreferences, app } from "electron";

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

			ipcMain.on("_atron:system:getAccentColor", () => {
				this.browserWindow?.webContents.send("_atron:system:getAccentColor _reply", {
					rgba: systemPreferences.getAccentColor()
				});
			});

			systemPreferences.on("accent-color-changed", () => {
				this.browserWindow?.webContents.send("_atron:system:accentColorUpdated", {});
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

			ipcMain.on("_atron:app:restart", () => {
				app.relaunch();
				app.exit();
			});
			return;
		}

		throw new Error("Cannot set BrowserWindow multiple times");
	}

	public extendElectronOptions(options?: BrowserWindowConstructorOptions): BrowserWindowConstructorOptions {
		return deepmerge<BrowserWindowConstructorOptions>({
			frame: true,
			minHeight: 100,
			minWidth: 320,
			webPreferences: {
				contextIsolation: false,
				nodeIntegration: true
			},
			titleBarStyle: "hidden"
		}, options ?? {});
	} 
}