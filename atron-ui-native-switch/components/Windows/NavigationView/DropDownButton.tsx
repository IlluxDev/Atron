import React, { useState } from "react";
import styles from "./DropDownButton.module.scss";
import { DropDownButtonProps } from "./DropDownButtonProps";
import { Icon } from "@iconify/react";

export function DropDownButton(props: DropDownButtonProps) {
	const [displayFull, setDisplayFullState] = useState(true);

	return (
		<div className={`${styles.root} ${props.innerTree ? styles.innerTree : {}}`}>
			<button className={styles.button}>
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

			<div className={styles.list}>
				{props.tree?.map(item => {
					return <DropDownButton innerTree={true} label={item.label} tree={item.list ?? []} />
				})}
			</div>
		</div>
	)
}