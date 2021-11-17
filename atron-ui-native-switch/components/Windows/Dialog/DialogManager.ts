import { DialogManagerEventSetter } from "./DialogManagerEventSetter";

export class DialogManager {
    public events: DialogManagerEventSetter;

    public constructor(handlerGet: () => DialogManagerEventSetter) {
        this.events = handlerGet();
    }

    public show(title: string, body: string) {
        this.events.openListener(title, body);
    }

    public close() {
        this.events.closeListener();
    }
}