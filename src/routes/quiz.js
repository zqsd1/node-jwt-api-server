import express from "express"
import { addQuiz, deleteQuiz, getQuiz, listQuiz, quizCounter } from "../controllers/quiz.js"
import { authenticate } from "../middlewares/auth.js"

export const router = express.Router()

router.use(authenticate)

router.get('/counter', quizCounter)

router.get('/', listQuiz)

router.get('/:id', getQuiz)

router.post('/', addQuiz)
// router.put('/:id', updateQuiz)

router.delete('/:id', deleteQuiz)