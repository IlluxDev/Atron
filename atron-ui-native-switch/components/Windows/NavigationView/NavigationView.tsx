import React, { useState } from "react";
import { NavigationViewProps } from "./NavigationViewProps";
import styles from "./NavigationView.module.scss";
import { Icon } from "@iconify/react";
import { TextBox } from "../TextBox/TextBox";

export function NavigationView(props: NavigationViewProps) {
	const [sideBarOpened, setSideBarOpenedState] = useState(document.body.offsetWidth > 1000);
	
	return (
		<div className={styles.root}>
			{ props.position == "top" ? <div className={styles.topContainer}>
				<div>
					<span>{props.title}</span>
				</div>
			</div> : null }

			{ props.position != "top" ? <div className={styles.leftContainer}>
				<div className={styles.largeTitleBar}>
					<div className={`${styles.largeTitleBarCover} ${sideBarOpened ? styles.largeTitleBarCoverOpened : {}}`} />
					<button onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)} className={styles.largeTitleBarNavigationButton}>
						<Icon icon="fluent:navigation-16-regular" />
					</button>

					<span>{props.title}</span>
				</div>

				<div className={styles.leftMainArea}>
					<div className={`${styles.leftSideBar} ${sideBarOpened ? styles.leftSideBarOpened : {}}`}>
						<div>
							<button className={`${styles.leftButton} ${styles.leftButtonNavigation}`} onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)}>
								<Icon icon="fluent:navigation-16-regular" />
							</button>

							{ !sideBarOpened ? <button className={styles.leftButton}>
								<Icon icon="fluent:search-16-regular" />
							</button> : null }

							{ sideBarOpened ? <div className={styles.leftSearchBar}>
								<TextBox placeholder="Search Here" />
							</div> : null }
						</div>

						<div className={styles.leftSideBarMain}>
							<button className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
								<Icon icon="fluent:home-16-regular" />
								<span className={styles.leftTextButtonText}>Home</span>
							</button>

							<button className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
								<Icon icon="fluent:home-16-regular" />
								<span className={styles.leftTextButtonText}>Home</span>
							</button>

							<hr />

							<button  className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
								<Icon icon="fluent:home-16-regular" />
								<span className={styles.leftTextButtonText}>Home</span>
							</button>

							<button className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
								<Icon icon="fluent:home-16-regular" />
								<span className={styles.leftTextButtonText}>Home</span>
							</button>
						</div>

						<div>
							<button className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
								<Icon icon="fluent:settings-16-regular" />
								<span className={styles.leftTextButtonText}>Settings</span>
							</button>
						</div>
					</div>

					<div className={`${ styles.leftContentArea} ${sideBarOpened ? styles.leftContentAreaSideBarOpened : {}}`}>{props.children}</div>
				</div>
			</div> : null}
		</div>
	);
}