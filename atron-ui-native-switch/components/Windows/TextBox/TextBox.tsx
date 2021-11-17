import { TextBoxProps } from "./TextBoxProps";
import React from "react";
import styles from "./TextBox.module.scss";

export function TextBox(props: TextBoxProps) {
	return (
		<div className={styles.root}>
			<div className={styles.input}>
				<input defaultValue={props.value} placeholder={props.placeholder} />
			</div>
		</div>
	);
}