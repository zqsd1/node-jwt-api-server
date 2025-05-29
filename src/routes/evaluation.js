import { Router } from "express";
import { addEvaluation, deleteEvaluation, getEvaluation, listEvaluation } from "../controllers/evaluation.js";

export const router = new Router()

router.get('/', listEvaluation)

router.get('/:id', getEvaluation)

router.post('/', addEvaluation)

router.put('/:id', () => { })

router.delete('/:id', deleteEvaluation)
