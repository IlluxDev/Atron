import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./TitleBarOverlay.module.scss";
import { ipc } from "../../../electron/Ipc";

let onWindowMaximized = () => {};
let onWindowUnMaximized = () => {};

ipc.on("_atron:window:maximized _event", () => {
	onWindowMaximized();
});

ipc.on("_atron:window:unMaximized _event", () => {
	onWindowUnMaximized();
});

export function TitleBarOverlay() {
	const [isMaximized, setIsMaximizedState] = useState(false);

	onWindowMaximized = () => setIsMaximizedState(true);
	onWindowUnMaximized = () => setIsMaximizedState(false);

	function minimizeWindow() {
		ipc.send("_atron:window:button:minimize", {});
	}

	function maximizeWindow() {
		ipc.send("_atron:window:button:maximize", {});
	}

	function restoreWindow() {
		ipc.send("_atron:window:button:restore", {});
	}

	function closeWindow() {
		window.close();
	}
	
	return (
		<div className={styles.root}>
			<button onClick={() => minimizeWindow()} className={styles.button}>
				<Icon icon="fluent:minimize-16-regular" />
			</button>

			{ !isMaximized ? <button onClick={() => maximizeWindow()} className={styles.button}>
				<Icon icon="fluent:maximize-16-regular" />
			</button> : null }

			{ isMaximized ? <button onClick={() => restoreWindow()} className={styles.button}>
				<Icon icon="fluent:restore-16-regular" />
			</button> : null }

			<button onClick={() => closeWindow()} className={styles.button}>
				<Icon icon="fluent:dismiss-16-regular" />
			</button>
		</div>
	);
}