const esbuild = require('esbuild')
const fs = require('fs')
const sass = require('sass')

if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true })
}

fs.mkdirSync('./dist')

esbuild.buildSync({
    entryPoints: ['./src/index.ts'],
    treeShaking: true,
    outfile: './dist/bundle.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    minify: false
})

esbuild.buildSync({
    entryPoints: ['./src/worker.ts'],
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
