import React from "react";
import { webFrame } from "../../../electron/WebFrame";
import { RootLayoutProps } from "../../Shared/RootLayout/RootLayoutProps";
import styles from "./RootLayout.module.scss";
import { Dialog } from "../Dialog/Dialog";

export function RootLayout(props: RootLayoutProps) {
	webFrame.setZoomFactor(1);

	return (
		<div className={styles.root}>
			{props.children}
			<Dialog />
		</div>
	);
}