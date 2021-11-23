export function getOsName(): "windows" | "linux" | "mac" | "unix" | "other" {
	let osName = "" as any;
	let appVersion = navigator.appVersion;

	if (appVersion.indexOf("Win") !=-1) {
		osName = "windows";
	} else if (appVersion.indexOf("Mac") !=-1) {
		osName = "mac";
	} else if (appVersion.indexOf("X11") !=-1) {
		osName = "unix"
	} else if (appVersion.indexOf("Linux") !=-1) {
		osName = "linux";
	} else {
		osName = "other";
	}

	return osName;
}