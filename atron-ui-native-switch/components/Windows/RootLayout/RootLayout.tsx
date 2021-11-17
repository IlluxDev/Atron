import React, { useState } from "react";
import { webFrame } from "../../../electron/WebFrame";
import { RootLayoutProps } from "../../Shared/RootLayout/RootLayoutProps";
import styles from "./RootLayout.module.scss";
import { Dialog } from "../Dialog/Dialog";
import { ipc } from "../../../electron/Ipc";

let onAccentColorReturn = (message: any) => {};
let initialFetchColor = false;

ipc.on("_atron:system:getAccentColor _reply", (message: any) => {
	onAccentColorReturn(message);
	console.log(message);
});

export function RootLayout(props: RootLayoutProps) {
	webFrame.setZoomFactor(1);
	const [accentColor, setAccentColorState] = useState(null as any);

	onAccentColorReturn = (accent: any) => {
		setAccentColorState("#" + accent.rgba);
	}

	const getAndSetAccent = () => {
		ipc.send("_atron:system:getAccentColor", {});
	}

	ipc.on("_atron:system:accentColorUpdated", () => {
		getAndSetAccent();
	});

	if (!initialFetchColor) {
		initialFetchColor = true;
		getAndSetAccent();
	}

	return (
		<div className={styles.root}>
			{props.children}
			<Dialog />
		</div>
	);
}