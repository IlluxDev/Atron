const { ipcRenderer } = (window as any).require("electron");

class Ipc {
	public send<MessageType>(channel: string, message: MessageType) {
		ipcRenderer.send(channel, message);
	}

	public on<MessageType>(channel: string, listener: (message: MessageType) => void) {
		ipcRenderer.on(channel, (error: any, message: MessageType) => listener(message));
	}
}

const ipc = new Ipc();
export { ipc };