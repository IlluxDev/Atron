import * as React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "../../Shared/Button/ButtonProps";

export function Button(props: ButtonProps) {
	return (
		<button onClick={() => props.onClick ? props.onClick() : null} className={`${styles.root} ${props.fluid ? styles.fluid : {}} ${props.primary ? styles.primary : {}} ${props.className ?? {}}`} style={props.style}>{props.children}</button>
	);
}