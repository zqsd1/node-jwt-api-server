import express from "express"
import 'dotenv/config'
import { router as quizRouter } from "./routes/quiz.js"
import { router as salarieRouter } from "./routes/salarie.js";
import mongoose from "mongoose";
import cors from "cors"

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("connected")
    }).catch(err => console.error(err))

const app = express()
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

app.use('/api/quiz', quizRouter)
app.use('/api/salarie', salarieRouter)


app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on http://localhost:${process.env.SERVER_PORT}`)
})