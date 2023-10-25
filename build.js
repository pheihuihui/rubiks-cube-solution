const esbuild = require('esbuild')
const fs = require('fs')
const sass = require('sass')
const util = require('util')

if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true })
}

fs.mkdirSync('./dist')

function loadShader() {

    const readFile = util.promisify(fs.readFile);

    return {
        name: "loadShader",
        setup(build) {
            async function onLoad(args) {
                const source = await readFile(args.path, "utf8");
                return {
                    contents: source,
                    loader: "text"
                };
            }
            build.onLoad({ filter: /\.(?:frag|vert|wgsl)$/ }, onLoad);
        }
    };
}

esbuild.build({
    entryPoints: ['./src/index.ts'],
    platform: 'browser',
    treeShaking: true,
    outfile: './dist/bundle.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    minify: false,
    plugins: [loadShader()]
}).then(console.log)

esbuild.buildSync({
    entryPoints: ['./src/worker.ts'],
    platform: 'browser',
    treeShaking: true,
    outfile: './dist/worker.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    minify: false
})

const style = sass.compile('./src/style/index.scss')
fs.writeFileSync('./dist/index.css', style.css)

fs.copyFileSync('./src/pages/index.html', './dist/index.html')

fs.copyFileSync('./src/pages/cube.ico', './dist/favicon.ico')
