import esbuild from "esbuild"
import * as sass from "sass"
import fs from "fs"

if (fs.existsSync("./dist")) {
	fs.rmSync("./dist", { recursive: true })
}

fs.mkdirSync("./dist")

esbuild
	.build({
		entryPoints: ["./src/index.ts"],
		platform: "browser",
		treeShaking: true,
		outfile: "./dist/bundle.js",
		tsconfig: "tsconfig.json",
		bundle: true,
		minify: false,
	})
	.then(console.log)

esbuild.buildSync({
	entryPoints: ["./src/worker.ts"],
	platform: "browser",
	treeShaking: true,
	outfile: "./dist/worker.js",
	tsconfig: "tsconfig.json",
	bundle: true,
	minify: false,
})

const style = sass.compile("./src/style/index.scss")

fs.writeFileSync("./dist/index.css", style.css)
fs.copyFileSync("./src/pages/index.html", "./dist/index.html")
fs.copyFileSync("./src/pages/cube.ico", "./dist/favicon.ico")
