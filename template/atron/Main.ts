import { app, BrowserWindow, screen } from "electron";

function createWindow() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const window = new BrowserWindow({
		width: displaySize.width - 40,
		height: displaySize.height - 40,
		show: false
	});

	window.loadURL("https://google.com");
	window.show();
}

app.on("ready", () => createWindow());