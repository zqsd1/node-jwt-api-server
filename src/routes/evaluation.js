import { Router } from "express";
import { addCounterEvaluation, addEvaluation, deleteEvaluation, getEvaluation, listEvaluation } from "../controllers/evaluation.js";

export const router = new Router()

router.get('/', listEvaluation)

router.get('/:id', getEvaluation)

router.post('/', addEvaluation)

router.put('/:id', addCounterEvaluation)

router.delete('/:id', deleteEvaluation)
