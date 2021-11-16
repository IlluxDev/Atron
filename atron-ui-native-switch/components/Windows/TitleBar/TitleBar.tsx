import React, { useState } from "react";
import styles from "./TitleBar.module.scss";

export function TitleBar() {
	return (
		<div className={styles.root}>
			<div>
				<span className={styles.title}>Microsoft Store</span>
			</div>
		</div>	
	);
}