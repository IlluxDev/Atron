import { DevelopmentOptions } from "./DevelopmentOptions";

const developmentOptionsDefault: DevelopmentOptions = {
	electron: {
		saveReloadTime: 3000,
		main: "./.atron/Main.js"
	}
};

export { developmentOptionsDefault };