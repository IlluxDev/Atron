import { DropDownButtonItem } from "./DropDownButtonItem";

export interface DropDownButtonProps {
	label: string;
	tree: DropDownButtonItem[];
	innerTree?: boolean;
}