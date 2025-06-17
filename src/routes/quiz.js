import express from "express"
import { addQuiz, deleteQuiz, getQuiz, listQuiz, updateQuiz } from "../controllers/quiz.js"

export const router = express.Router()

router.get('/', listQuiz)
router.get('/:id', getQuiz)
router.post('/', addQuiz)
// router.put('/:id', updateQuiz)
router.delete('/:id', deleteQuiz)