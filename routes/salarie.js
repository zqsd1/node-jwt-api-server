import express from "express"
import { addSalarie, deleteSalarie, detailSalarie, listSalarie, updateSalarie } from "../controllers/salarie.js"
import { authenticate } from "../middlewares/auth.js"

export const router = express.Router()
router.use(authenticate)

router.get('/', listSalarie)
router.get('/:id', detailSalarie)
router.post('/', addSalarie)
router.put('/:id', updateSalarie)
router.delete('/:id', deleteSalarie)
