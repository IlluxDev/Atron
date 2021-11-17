import { app, BrowserWindow, screen, systemPreferences, dialog } from "electron";
import { AtronElectron } from "@illuxdev/atron-electron/AtronElectron";

function createWindow() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const atron = new AtronElectron();

	const window = new BrowserWindow(atron.extendElectronOptions({
		width: displaySize.width - 180,
		height: displaySize.height - 180,
		show: false
	}));

	// Set atron source
	atron.setBrowserWindow(window);

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

	window.loadURL("http://localhost:3000");
	window.webContents.on("did-finish-load", () => rendererLoaded());
}

app.on("ready", () => createWindow());