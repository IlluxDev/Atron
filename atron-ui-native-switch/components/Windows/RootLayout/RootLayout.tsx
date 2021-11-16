import React from "react";
import { RootLayoutProps } from "./RootLayoutProps";
import styles from "./RootLayout.module.scss";

export function RootLayout(props: RootLayoutProps) {
	return (
		<div className={styles.root}>{props.children}</div>
	);
}