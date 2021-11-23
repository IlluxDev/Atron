import { app, BrowserWindow, screen, systemPreferences, dialog } from "electron";
import { AtronElectron } from "@illuxdev/atron-electron/AtronElectron";
import * as path from "path";

function createElectron() {
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

	const loadingPreWindow = new BrowserWindow({
		width: 300,
		height: 350,
		titleBarStyle: "hidden",
		show: false,
		resizable: false
	});

	const loadingView = "data:text/html;charset=UTF-8," + encodeURIComponent("<!DOCTYPE html>\n" +
		"<html lang='en'>\n" +
		"<head>\n" +
		"    <meta charset='UTF-8'>\n" +
		"    <title>Loading</title>\n" +
		"\n" +
		"    <style>\n" +
		"        .loader {\n" +
		"            width: 100vw;\n" +
		"            height: 100vh;\n" +
		"            background: #181818;\n" +
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
		"        0% {\n" +
		"          background: #555;\n" +
		"        }\n" +
		"        \n" +
		"        50% {\n" +
		"          background: #50ffab;\n" +
		"        }\n" +
		"        \n" +
		"        100% {\n" +
		"          background: #555;\n" +
		"        } \n" +
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

		window.loadURL("http://localhost:3000").then(() => {
			loadingPreWindow.hide();
			rendererLoaded();
		});
	});
}

app.on("ready", () => createElectron());