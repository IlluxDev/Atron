import React from "react";
import { NavigationViewProps } from "./NavigationViewProps";
import styles from "./NavigationView.module.scss";
import { Icon } from "@iconify/react";

export function NavigationView(props: NavigationViewProps) {
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<button className={styles.headerButton}>
					<Icon icon="fluent:arrow-left-16-regular" />
				</button>

				<span className={styles.headerTitle}>Application</span>
			</div>

			<div className={styles.mainArea}>
				<div className={styles.sideBar}>
					<div>
						<button className={styles.sideBarButton}>
							<Icon icon="fluent:navigation-16-regular" />
						</button>
					</div>
				</div>

				<div className={styles.mainContent}>{props.children}</div>	
			</div>
		</div>
	);
}