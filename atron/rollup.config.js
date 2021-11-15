import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import banner from "rollup-plugin-banner2";

export default {
	input: "Atron.ts",
	output: {
		dir: "dist",
		format: "cjs",
	},
	plugins: [
		typescript({ module: "ESNext" }),
		commonjs({ transformMixedEsModules: true }),
		banner(() => "#!/usr/bin/env node\n"),
	],
};