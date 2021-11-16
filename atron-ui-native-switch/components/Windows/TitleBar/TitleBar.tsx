import React from "react";
import style from "./TitleBar.module.scss";

export function TitleBar() {
	return (
		<div className={style.root}>
			<div>
				<span>Application</span>
			</div>
		</div>	
	);
}