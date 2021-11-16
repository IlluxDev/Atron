import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./TitleBarOverlay.module.scss";
import { ipc } from "../../../electron/Ipc";

export function TitleBarOverlay() {
	const [isMaximized, setIsMaximizedState] = useState(false);

	function minimizeWindow() {
		ipc.send("_atron:window:button:minimize", {});
	}
	
	return (
		<div className={styles.root}>
			<button onClick={() => minimizeWindow()} className={styles.button}>
				<Icon fr icon="fluent:minimize-16-regular" />
			</button>

			{ !isMaximized ? <button className={styles.button}>
				<Icon fr icon="fluent:maximize-16-regular" />
			</button> : null }

			{ isMaximized ? <button className={styles.button}>
				<Icon fr icon="fluent:restore-16-regular" />
			</button> : null }

			<button className={styles.button}>
				<Icon fr icon="fluent:dismiss-16-regular" />
			</button>
		</div>
	);
}