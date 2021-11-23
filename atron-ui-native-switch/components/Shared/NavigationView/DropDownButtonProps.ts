import { DropDownButtonItem } from "../../Windows/NavigationView/DropDownButtonItem";

export interface DropDownButtonProps {
	label: string;
	tree?: DropDownButtonItem[];
	innerTree?: boolean;
	displayFull?: boolean;
	icon?: string;
	location: string;
	onCloseList?: () => void;
}