import { app, BrowserWindow, screen } from "electron";

function createWindow() {
	let displaySize = screen.getPrimaryDisplay().workAreaSize;

	const window = new BrowserWindow({
		width: displaySize.width - 180,
		height: displaySize.height - 180,
		show: false,
		titleBarStyle: "hidden"
	});

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