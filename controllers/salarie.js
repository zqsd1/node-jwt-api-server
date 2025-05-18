import { Salarie } from "../models/salarie.js"


export const listSalarie = (req, res) => {
    Salarie.find().then(result => {
        res.json(result)
    }).catch(err =>
        res.status(500).json(err.message)
    )
}

export const detailSalarie = (req, res) => {
    const id = req.params.id
    Salarie.findById(id).populate().then(result => {
        res.json(result)
    }).catch(err =>
        res.status(500).json(err.message)
    )
}

export const addSalarie = (req, res) => {
    const { nom, prenom, genre } = req.body
    const newSalarie = new Salarie({ nom, prenom, genre })
    newSalarie.save().then(result => {
        res.json(result)
    }).catch(err =>
        res.status(500).json(err.message)
    )
}

export const updateSalarie = (req, res) => {
    const id = req.params.id
    const { quizs } = req.body
    Salarie.findById(id).then(result => {
        return result.updateOne({ quizs: quizs })
    }).then(result => {
        res.json(result)
    }).catch(err =>
        res.status(500).json(err.message)
    )

}

export const deleteSalarie = (req, res) => {
    const id = req.params.id
    Salarie.deleteOne({ _id: id }).then(result => {
        res.json(result)
    }).catch(err =>
        res.status(500).json(err.message)
    )
}

//return salarie id if nom prenom  exists
export const findByName = (req, res) => {
    const { nom, prenom } = req.body
    Salarie.findOne({ nom, prenom }).then(result => {
        if (!result) return res.status(404).json("vous n'existez pas")
        return res.json({ id: result._id })
    }).catch(err =>
        res.status(500).json(err.message)
    )
}