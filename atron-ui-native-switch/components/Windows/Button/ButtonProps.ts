import { CSSProperties } from "react";

export interface ButtonProps {
	children: any;
	onClick?: () => void;
	fluid?: boolean;
	primary?: boolean;
	styles?: CSSProperties;
	className?: any;
}