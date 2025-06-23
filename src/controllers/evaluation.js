import { Evaluation } from "../models/evaluation.js"

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
            result.competences.forEach(competence => {
                const comp = competences.find(c => competence._id.equals(c._id))
                if (comp) {
                    competence.counterEval.push({ ...comp.counterEval })
                }
            })
            return result.save()
        }).then(data => {
            res.json({
                success: true,
                message: "counter evaluation ajouté",
                data
            })
        }).catch(err => {
            next(err)
        })
}