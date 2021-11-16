import React, { useState } from "react";
import styles from "./TitleBar.module.scss";
import { Icon } from "@iconify/react";

export function TitleBar() {
	const [isMaximized, setIsMaximizedState] = useState(false);

	return (
		<div className={styles.root}>
			<div>
				<span className={styles.title}>Microsoft Store</span>
			</div>

			<button onClick={() => isMaximized ? setIsMaximizedState(false) : setIsMaximizedState(true)}>Toggle</button>

			<div className={styles.windowButtonsWrapper}>
				<button className={styles.windowButton}>
					<Icon fr icon="fluent:minimize-16-regular" />
				</button>

				{ !isMaximized ? <button className={styles.windowButton}>
					<Icon fr icon="fluent:maximize-16-regular" />
				</button> : null }

				{ isMaximized ? <button className={styles.windowButton}>
					<Icon fr icon="fluent:restore-16-regular" />
				</button> : null }

				<button className={styles.windowButton}>
					<Icon fr icon="fluent:dismiss-16-regular" />
				</button>
			</div>
		</div>	
	);
}