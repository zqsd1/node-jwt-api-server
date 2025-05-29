import { response } from "express"
import { Evaluation } from "../models/evaluation.js"

export const listEvaluation = (req, res) => {
    Evaluation.find()
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
}

export const getEvaluation = (req, res) => {
    const { id } = req.params
    Evaluation.findById(id)
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
}

export const deleteEvaluation = (req, res) => {
    const { id } = req.params
    Evaluation.deleteOne({ _id: id })
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
}

export const addEvaluation = (req, res) => {
    const evaluation = new Evaluation(req.body.evaluation)
    evaluation.save().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err.message)
    })
}

export const addCounterEvaluation = (req, res) => {
    const { id } = req.params
    const { competence } = req.body
    Evaluation.findById(id)
        .then(result => {
            const to_update = result.competences.find(comp => comp._id = competence._id)
            to_update.push(competence)
            return result.save()
        }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err.message)
        })
}