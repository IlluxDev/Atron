export interface DialogManagerEventSetter {
    openListener: (title: string, body: string) => void;
    closeListener: () => void;
}