import express from "express"

const app = express()
const __rootdirname = process.cwd()
app.use(express.static(`${__rootdirname}/dist`))

app.listen(3000)
