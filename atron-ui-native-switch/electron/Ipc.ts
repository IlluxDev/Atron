const { ipcRenderer } = (window as any).require("electron");

class Ipc {
	public send<MessageType>(channel: string, message: MessageType) {
		ipcRenderer.send(channel, message);
	}
}

const ipc = new Ipc();
export { ipc };