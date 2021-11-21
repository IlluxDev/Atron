import React, { useState } from "react";
import { NavigationViewProps } from "./NavigationViewProps";
import styles from "./NavigationView.module.scss";
import { Icon } from "@iconify/react";
import { TextBox } from "../TextBox/TextBox";
import { DropDownButton } from "./DropDownButton";
import { HashRouter, Route, Routes } from "react-router-dom";

let onWindowResize = () => {};
new ResizeObserver(() => {
	onWindowResize();
}).observe(document.body);

export function NavigationView(props: NavigationViewProps) {
	const [sideBarOpened, setSideBarOpenedState] = useState(document.body.offsetWidth > 1000);

	function handleBodyClick() {
		if (window.innerWidth < 1000) {
			setSideBarOpenedState(false);
		}
	}

	onWindowResize = () => {
		setSideBarOpenedState(false);
	}

	return (
		<div className={styles.root}>
			<HashRouter>
				{props.position == "top" ? <div className={styles.topContainer}>
					<div>
						<span>{props.title}</span>
					</div>
				</div> : null}

				{props.position != "top" ? <div className={styles.leftContainer}>
					<div className={styles.largeTitleBar}>
						<div
							className={`${styles.largeTitleBarCover} ${sideBarOpened ? styles.largeTitleBarCoverOpened : {}}`}/>
						<button
							onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)}
							className={styles.largeTitleBarNavigationButton}>
							<Icon icon="fluent:navigation-16-regular" fr/>
						</button>

						<span>{props.title}</span>
					</div>

					<div className={styles.leftMainArea}>
						<div className={`${styles.leftSideBar} ${sideBarOpened ? styles.leftSideBarOpened : {}}`}>
							<div>
								<button className={`${styles.leftButton} ${styles.leftButtonNavigation}`}
										onClick={() => sideBarOpened ? setSideBarOpenedState(false) : setSideBarOpenedState(true)}>
									<Icon fr icon="fluent:navigation-16-regular"/>
								</button>

								{!sideBarOpened ?
									<button onClick={() => setSideBarOpenedState(true)} className={styles.leftButton}>
										<Icon fr icon="fluent:search-16-regular"/>
									</button> : null}

								{sideBarOpened ? <div className={styles.leftSearchBar}>
									<TextBox placeholder="Search Here"/>
								</div> : null}
							</div>

							<div className={styles.leftSideBarMain}>
								{(props.links ?? []).map(link => {
									return <DropDownButton onCloseList={() => setSideBarOpenedState(false)} displayFull={sideBarOpened} {...link} />
								})}
							</div>

							<div>
								<button
									className={`${styles.leftTextButton} ${sideBarOpened ? styles.leftTextButtonOpened : {}}`}>
									<Icon fr icon="fluent:settings-16-regular"/>
									<span className={styles.leftTextButtonText}>Settings</span>
								</button>
							</div>
						</div>

						<div
							onClick={() => handleBodyClick()}
							className={`${styles.leftContentArea} ${sideBarOpened ? styles.leftContentAreaSideBarOpened : {}}`}>
							<Routes>
								{(props.routes ?? []).map(route => {
									return <Route path={route.path} element={route.element} />
								})}
							</Routes>
						</div>
					</div>
				</div> : null}
			</HashRouter>
		</div>
	);
}