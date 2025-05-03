import express from "express"
import 'dotenv/config'
import { router as quizRouter } from "./routes/quiz.js"

const app = express()
app.use(express.json())

app.use('/api/quiz', quizRouter)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on http://localhost:${process.env.SERVER_PORT}`)
})