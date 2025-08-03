import { Router } from "express";
import { addCounterEvaluation, addEvaluation, deleteEvaluation, evalCounter, getEvaluation, listEvaluation } from "../controllers/evaluation.js";
import { authenticate } from "../middlewares/auth.js";

export const router = new Router()

router.use(authenticate)

router.get('/', listEvaluation)

router.get('/counter', evalCounter)

router.get('/:id', getEvaluation)

router.post('/', addEvaluation)

router.put('/:id', addCounterEvaluation)

router.delete('/:id', deleteEvaluation)
