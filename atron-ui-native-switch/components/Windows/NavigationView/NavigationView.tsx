import React, { useState } from "react";
import { NavigationViewProps } from "./NavigationViewProps";
import styles from "./NavigationView.module.scss";
import { Icon } from "@iconify/react";

export function NavigationView(props: NavigationViewProps) {
	const [sideBarOpened, setSideBarOpenedState] = useState(true);
	
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
						<button onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)} className={styles.sideBarButton}>
							<Icon icon="fluent:navigation-16-regular" />
						</button>

						<button className={`${styles.sideBarButton} ${sideBarOpened ? styles.sideBarButtonOpened : {}}`}>
							{ !sideBarOpened ? <Icon icon="fluent:search-16-regular" /> : null }
							{ sideBarOpened ? <input /> : null }
						</button>
					</div>

					<div className={styles.sideBarContent}>
						
					</div>

					<div>
						<button className={`${styles.sideBarButton} ${sideBarOpened ? styles.sideBarButtonOpened : {}}`}>
							<Icon icon="fluent:settings-16-regular" />
							<span>Settings</span>
						</button>
					</div>
				</div>

				<div className={styles.mainContent}>{props.children}</div>	
			</div>
		</div>
	);
}