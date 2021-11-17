import * as React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./ButtonProps";

export function Button(props: ButtonProps) {
	return (
		<button onClick={() => props.onClick ? props.onClick() : null} className={`${styles.root} ${props.fluid ? styles.fluid : {}} ${props.primary ? styles.primary : {}} ${props.className ?? {}}`} style={props.styles}>{props.children}</button>
	);
}