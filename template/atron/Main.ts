import { app, BrowserWindow, screen } from "electron";

function createWindow() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const window = new BrowserWindow({
		width: displaySize.width - 40,
		height: displaySize.height - 40,
		show: false
	});

	const rendererLoaded = () => {
		process.stdout.write("[SYS]-ready");
	};

	window.loadURL("https://google.com").then(() => rendererLoaded());
	window.show();
}

app.on("ready", () => createWindow());