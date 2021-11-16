const { webFrame: electronWebFrame } = (window as any).require("electron");

class WebFrame {
	public setZoomFactor(factor: number) {
		electronWebFrame.setZoomFactor(factor);
	}
}

const webFrame = new WebFrame();
export { webFrame };