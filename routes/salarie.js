import express from "express"
import { addSalarie, deleteSalarie, detailSalarie, listSalarie, updateSalarie } from "../controllers/salarie.js"

export const router = express.Router()

router.get('/', listSalarie)
router.get('/:id', detailSalarie)
router.post('/', addSalarie)
router.put('/:id', updateSalarie)
router.delete('/:id', deleteSalarie)