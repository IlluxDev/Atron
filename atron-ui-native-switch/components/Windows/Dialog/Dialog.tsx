import React from "react";
import {useState} from "react";
import { DialogManager } from "./DialogManager";
import styles from "./Dialog.module.scss";
import { Button } from "../Button/Button";

let onOpenEvent = (title: string, body: string) => {};
let onCloseEvent = () => {};

const dialogManager = new DialogManager(() => {
    return {
        openListener: (title, body) => {
            onOpenEvent(title, body);
        },
        closeListener: () => {
            onCloseEvent();
        }
    };
});

export function Dialog() {
    const [isShown, setIsShownState] = useState(false);
    const [dialogData, setDialogDataState] = useState({
        title: "",
        body: ""
    });

    onOpenEvent = (title: string, body: string) => {
        setIsShownState(true);
        setDialogDataState({ title, body });
    }

    onCloseEvent = () => {
        setIsShownState(false);
    }

    return (
        <div className={`${styles.root} ${isShown ? styles.rootOpened : {}}`}>
            <div className={styles.backdrop} />

            <div className={styles.window}>
                <div className={styles.content}>
                    <h1>{dialogData.title}</h1>

                    <div>
                        <span>{dialogData.body}</span>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Button className={styles.footerButton} fluid primary>Try Again</Button>
                    <Button className={styles.footerButton} fluid onClick={() => dialogManager.close()}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export { dialogManager as dialog };
