import express from "express"
import 'dotenv/config'

const app = express()

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on http://localhost:${process.env.SERVER_PORT}`)
})