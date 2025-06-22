import express from "express"

import cors from "cors"

import { router as quizRouter } from "./src/routes/quiz.js"
import { router as salarieRouter } from "./src/routes/salarie.js";
import { router as evaluationRouter } from "./src/routes/evaluation.js";
import { router as templateRouter } from "./src/routes/templates.js";

import { logger } from "./src/winston.js";
import "dotenv/config"
// if (process.env.NODE_ENV != "production") await import('dotenv/config')
import "./src/db/mongo.js"
import { errors } from "./src/middlewares/errors.js";

const app = express()
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

app.use('/api/quizs', quizRouter)
app.use('/api/salaries', salarieRouter)
app.use('/api/evaluations', evaluationRouter)
app.use('/api/templates',templateRouter)

app.use(errors)

const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`server started on http://0.0.0.0:${port}`)
})

const gracefullShutdown = () => {
    logger.info('closing server')
    server.close(() => {
        logger.info('Server closed.');
    });
}

process.on('SIGTERM', gracefullShutdown)
process.on("SIGINT", gracefullShutdown)