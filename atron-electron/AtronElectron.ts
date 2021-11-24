import deepmerge from "deepmerge";
import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain, systemPreferences, app } from "electron";
import { AtronElectronOptions } from "./AtronElectronOptions";

export class AtronElectron {
	private browserWindow?: BrowserWindow;
	private settings: AtronElectronOptions;

	public constructor(options: AtronElectronOptions = {}) {
		this.settings = deepmerge<AtronElectronOptions>({
			title: "Atron Application"
		}, options);
	}

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
				nodeIntegration: true,
				webviewTag: true
			},
			titleBarStyle: "hidden",
			title: this.settings.title
		}, options ?? {});
	}

	public start() {
		if (!this.browserWindow) {
			throw new Error("BrowserWindow has not been assigned");
		}

		const window = this.browserWindow;

		const rendererLoaded = () => {
			window.show();

			window.on("show", () => {
				window.focus();
			});

			process.stdout.write("[SYS]-ready");
		};

		window.on("close", () => {
			console.log("[SYS]-exit");
			app.exit();
		});

		const loadingPreWindow = new BrowserWindow({
			width: 500,
			height: 350,
			titleBarStyle: "hidden",
			show: false,
			resizable: false
		});

		const loadingView = "data:text/html;charset=UTF-8," + encodeURIComponent("<!DOCTYPE html>\n" +
			"<html lang='en'>\n" +
			"<head>\n" +
			"    <meta charset='UTF-8'>\n" +
			"    <title>\" + \"\" + \"</title>\n" +
			"\n" +
			"    <style>\n" +
			"      :root {\n" +
			"        --accent: #fff;\n" +
			"      }\n" +
			"      \n" +
			"        .loader {\n" +
			"            width: 100vw;\n" +
			"            height: 100vh;\n" +
			"            background: #202020;\n" +
			"            display: flex;\n" +
			"            align-items: center;\n" +
			"            justify-content: center;\n" +
			"            flex-direction: column;\n" +
			"        }\n" +
			"\n" +
			"        h1 {\n" +
			"            color: #fff;\n" +
			"            font-family: 'Segoe UI', sans-serif;\n" +
			"            letter-spacing: 4px;\n" +
			"            font-weight: 400;\n" +
			"        }\n" +
			"\n" +
			"        .spinner {\n" +
			"            width: 20vw;\n" +
			"            padding-top: 20%;\n" +
			"            border-radius: 100%;\n" +
			"            border: 4px solid #151515;\n" +
			"            border-top-color: #fff;\n" +
			"            animation-name: spin;\n" +
			"            animation-timing-function: cubic-bezier(.52,.31,.18,.91);\n" +
			"            animation-duration: 1s;\n" +
			"            animation-iteration-count: infinite;\n" +
			"        }\n" +
			"\n" +
			"        @keyframes spin {\n" +
			"            from {\n" +
			"                transform: rotate(0deg);\n" +
			"            }\n" +
			"\n" +
			"            to {\n" +
			"                transform: rotate(1080deg);\n" +
			"            }\n" +
			"        }\n" +
			"\n" +
			"        body {\n" +
			"            margin: 0;\n" +
			"        }\n" +
			"      \n" +
			"      .dots {\n" +
			"        display: flex;\n" +
			"        gap: 5px;\n" +
			"      }\n" +
			"      \n" +
			"      .dots div {\n" +
			"        width: 10px;\n" +
			"        height: 10px;\n" +
			"        display: flex;\n" +
			"        background: #555;\n" +
			"        border-radius: 100%;\n" +
			"        animation-name: dots;\n" +
			"        animation-duration: 1s;\n" +
			"        animation-iteration-count: infinite;\n" +
			"        align-items: center;\n" +
			"      }\n" +
			"      \n" +
			"      .dots div:nth-child(2) {\n" +
			"        animation-delay: 0.2s;\n" +
			"      }\n" +
			"      \n" +
			"      .dots div:nth-child(3) {\n" +
			"        animation-delay: 0.3s;\n" +
			"      }\n" +
			"      \n" +
			"      @keyframes dots {\n" +
			"        0% {}\n" +
			"        \n" +
			"        50% {\n" +
			"          background: var(--accent);\n" +
			"        }\n" +
			"        \n" +
			"        100% {} \n" +
			"      }\n" +
			"      \n" +
			"      @media (prefers-color-scheme: light) {\n" +
			"        .dots div {\n" +
			"          background: #f1f1f1;\n" +
			"        }\n" +
			"        \n" +
			"        .loader {\n" +
			"          background: #fff;\n" +
			"        }\n" +
			"        \n" +
			"        :root {\n" +
			"          --accent: #000;\n" +
			"        }\n" +
			"      }\n" +
			"    </style>\n" +
			"</head>\n" +
			"<body>\n" +
			"    <div class='loader'>\n" +
			"<!--         <div class='spinner'></div> -->\n" +
			"        <div class=\"dots\">\n" +
			"          <div></div>\n" +
			"          <div></div>\n" +
			"          <div></div>\n" +
			"        </div>\n" +
			"    </div>\n" +
			"</body>\n" +
			"</html>");

		loadingPreWindow.loadURL(loadingView).then(() => {
			loadingPreWindow.show();

			window.loadURL("http://localhost:3000").then(() => null);

			window.webContents.on('did-finish-load', () => {
				loadingPreWindow.hide();
				rendererLoaded();
			});
		});
	}
}