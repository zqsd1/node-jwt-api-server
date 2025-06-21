import express from "express"
import { getTemplate, listTemplates } from "../controllers/templates.js";

export const router = express.Router()

router.get('/', listTemplates)

router.get('/:name', getTemplate);