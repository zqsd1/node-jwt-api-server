import { HttpError } from "../httpError.js"
import { Evaluation } from "../models/evaluation.js"
import { logger } from "../winston.js"

export const listEvaluation = (req, res, next) => {
    Evaluation.find()
        .then(data => {
            res.json({
                success: true,
                message: "list evaluation",
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const getEvaluation = (req, res, next) => {
    const { id } = req.params
    Evaluation.findById(id)
        .populate('assignedTo')
        .then(data => {
            if (!data) throw new HttpError(404, "eval not found")
            res.json({
                success: true,
                message: `evaluation ${id}`,
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const deleteEvaluation = (req, res, next) => {
    const { id } = req.params
    Evaluation.deleteOne({ _id: id })
        .then(data => {
            if (!data) throw new HttpError(404, "eval not found")
            logger.info("eval deleted", { userId: req.userinfo?.sub, data })
            res.json({
                success: true,
                message: `evaluation ${id} deleted`,
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const addEvaluation = (req, res, next) => {
    const { assignedTo, competences, evaluationName } = req.body
    const evaluation = new Evaluation({ assignedTo, evaluationName, competences })
    evaluation.save()
        .then(data => {
            logger.info("eval added", { userId: req.userinfo?.sub, data })
            res.json({
                success: true,
                message: "evaluation ajouté",
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const addCounterEvaluation = (req, res, next) => {
    const { id } = req.params
    const { competences } = req.body
    Evaluation.findById(id)
        .then(result => {
            if (!result) throw new HttpError(404, "evaluation not found")
            result.competences.forEach(competence => {
                const comp = competences.find(c => competence._id.equals(c._id))
                if (comp) {
                    competence.counterEval.push({ ...comp.counterEval })
                }
            })
            return result.save()
        }).then(data => {
            logger.info(`counter eval added to ${id}`, { userId: req.userinfo?.sub, data })
            res.json({
                success: true,
                message: "counter evaluation ajouté",
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const evalCounter = (req, res, next) => {
    Evaluation.aggregate([{
        $group: {
            _id: "$assignedTo",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            assignedTo: "$_id",
            count: 1
        }
    }]).then(result => {
        res.json(result)
    }).catch(err => {
        next(err)
    })
}