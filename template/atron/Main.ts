import { app, BrowserWindow, screen } from "electron";

function createWindow() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const window = new BrowserWindow({
		width: displaySize.width - 40,
		height: displaySize.height - 40,
		show: false
	});

	const rendererLoaded = () => {
		window.show();
		process.stdout.write("[SYS]-ready");
	};

	window.on("closed", () => {
		console.log("[SYS]-exit");
		app.exit();
	});

	window.loadURL("http://localhost:3000");
	window.webContents.on("did-finish-load", () => rendererLoaded());
}

app.on("ready", () => createWindow());