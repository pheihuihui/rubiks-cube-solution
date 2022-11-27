const esbuild = require('esbuild')
const fs = require('fs')

esbuild.buildSync({
    entryPoints: ['./src/index.ts'],
    treeShaking: true,
    outfile: './dist/bundle.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: true
})

esbuild.buildSync({
    entryPoints: ['./src/worker.ts'],
    treeShaking: true,
    outfile: './dist/worker.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: false
})

fs.copyFileSync('./src/pages/index.html', './dist/index.html')

fs.copyFileSync('./src/pages/cube.ico', './dist/favicon.ico')
