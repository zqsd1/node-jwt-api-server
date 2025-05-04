import express from "express"
import 'dotenv/config'
import { router as quizRouter } from "./routes/quiz.js"
import { router as salarieRouter } from "./routes/salarie.js";
import mongoose from "mongoose";
import { Salarie } from "./models/salarie.js";
import { Quiz } from "./models/quiz.js";

mongoose.connect('mongodb://127.0.0.1:27017/quizs')
    .then(() => {
        console.log("connected")
    }).catch(err => console.error(err))

const app = express()
app.use(express.json())

app.use('/api/quiz', quizRouter)
app.use('/api/salarie', salarieRouter)

//voir transaction
app.post('/createQuiz', async (req, res) => {
    try {
        const { userid, quiz } = req.body
        const user = await Salarie.findById(userid)
        const newQuiz = new Quiz({ ...quiz, assignedTo: user })
        const q = await newQuiz.save()
        user.quizs.push(q)
        await user.save()
        res.json('ok')
    } catch (err) {
        res.status(500).json(err.message)
    }

})


app.post("/linkto", async (req, res) => {
    const { userid, quizid } = req.body
    try {
        const user = await Salarie.findById(userid)
        const quiz = await Quiz.findById(quizid)
        if (!(user && quiz)) return res.statusCode(404)
        if (quiz.assignedTo) {
            const olduser = await Salarie.findById(quiz.assignedTo)
            olduser.quizs = olduser.quizs.filter(q => !q.equals(quiz._id))
            await olduser.save()
        }
        user.quizs.push(quiz)
        quiz.assignedTo = user
        await user.save()
        await quiz.save()
        return res.json({ user, quiz })
    } catch (err) {

        res.status(500).json(err.message)
    }


})


app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on http://localhost:${process.env.SERVER_PORT}`)
})