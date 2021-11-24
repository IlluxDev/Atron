import { app, BrowserWindow, screen, systemPreferences, dialog } from "electron";
import { AtronElectron } from "@illuxdev/atron-electron/AtronElectron";

function createElectron() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const atron = new AtronElectron({
		dirname: __dirname
	});

	const window = new BrowserWindow(atron.extendElectronOptions({
		width: displaySize.width - 180,
		height: displaySize.height - 180,
		show: false
	})); 

	// Set atron source
	atron.setBrowserWindow(window);
	atron.start();
}

app.on("ready", () => createElectron());