const esbuild = require('esbuild')
const fse = require('fs-extra')

esbuild.buildSync({
    entryPoints: ['./src/index.ts'],
    treeShaking: 'ignore-annotations',
    outfile: './dist/bundle.js',
    tsconfig: 'tsconfig.json',
    bundle: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: true
})

fse.copy('./src/pages/index.html', './dist/index.html')
    .then(() => console.log('copy html success!'))
    .catch(err => console.error(err))