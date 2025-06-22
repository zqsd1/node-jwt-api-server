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
            // console.log(err)
            // res.status(500).json(err.message)
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
            // console.log(err)
            // res.status(500).json(err.message)
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
            // console.log(err)
            // res.status(500).json(err.message)
        })
}

export const addEvaluation = (req, res, next) => {
    const evaluation = new Evaluation(req.body.evaluation)
    evaluation.save()
        .then(data => {
            res.json({
                success: true,
                message: "evaluation ajouté",
                data
            })
        }).catch(err => {
            next(err)
            // console.log(err)
            // res.status(500).json(err.message)
        })
}

export const addCounterEvaluation = (req, res,next) => {
    const { id } = req.params
    const { competence } = req.body
    Evaluation.findById(id)
        .then(result => {
            const to_update = result.competences.find(comp => comp._id = competence._id)
            to_update.push(competence)
            return result.save()
        }).then(data => {
            res.json({
                success: true,
                message: "counter evaluation ajouté",
                data
            })
        }).catch(err => {
            next(err)
            // console.log(err)
            // res.status(500).json(err.message)
        })
}