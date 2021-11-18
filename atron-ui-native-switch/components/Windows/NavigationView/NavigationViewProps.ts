import { DropDownButtonProps } from "./DropDownButtonProps";

export interface NavigationViewProps {
	children?: any;
	navigationContent?: any;
	position?: "left" | "top";
	title: string;
	routes?: {
		element: any;
		path: string;
	}[];
	links?: DropDownButtonProps[];
}