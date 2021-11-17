import React, { useState } from "react";
import styles from "./DropDownButton.module.scss";
import { DropDownButtonProps } from "./DropDownButtonProps";
import { Icon } from "@iconify/react";

export function DropDownButton(props: DropDownButtonProps) {
	return (
		<div className={`${styles.root} ${props.innerTree && props.displayFull ? styles.innerTree : {}}`}>
			<button className={`${styles.button} ${!props.displayFull ? styles.buttonHideText : {}}`}>
				<span>
					<span>
						<Icon icon={"fluent:search-16-regular"} />
					</span>

					<span>{props.label}</span>
				</span>

				<button>
					<Icon icon={"fluent:chevron-down-16-regular"} />
				</button>
			</button>

			{props.displayFull ? <div className={styles.list}>
				{props.tree?.map(item => {
					return <DropDownButton displayFull={props.displayFull} innerTree={true} label={item.label} tree={item.list ?? []} />
				})}
			</div> : null}
		</div>
	)
}