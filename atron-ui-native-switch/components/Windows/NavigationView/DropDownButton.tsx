import React, { useState } from "react";
import styles from "./DropDownButton.module.scss";
import { DropDownButtonProps } from "./DropDownButtonProps";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export function DropDownButton(props: DropDownButtonProps) {
	const [isOpen, setIsOpenState] = useState(false);
	const navigate = useNavigate();

	return (
		<div className={`${styles.root} ${props.innerTree && props.displayFull ? styles.innerTree : {}}`}>
			<button onClick={() => {
				isOpen ? setIsOpenState(false) : setIsOpenState(true);
				navigate(props.location);
			}} className={`${styles.button} ${!props.displayFull ? styles.buttonHideText : {}}`}>
				<span>
					<span>
						<Icon fr icon={props.icon ?? "fluent:search-16-regular"} />
					</span>

					<span>{props.label}</span>
				</span>

				{(props.tree ?? []).length != 0 ? <div onClick={() => isOpen ? setIsOpenState(false) : setIsOpenState(true)}>
						{ isOpen
							? <Icon fr icon={"fluent:chevron-up-16-regular"} />
							: <Icon fr icon={"fluent:chevron-down-16-regular"} /> }
				</div> : null }
			</button>

			{props.displayFull ? <div className={`${styles.dropDown} ${!isOpen ? styles.dropDownClosed : {}}`}>
				{props.tree?.map(item => {
					return <DropDownButton location={item.location} displayFull={props.displayFull} innerTree={true} label={item.label} tree={item.list ?? []} icon={item.icon} />
				})}
			</div> : null}
		</div>
	)
}