import { HttpError } from "../httpError.js"
import { Salarie } from "../models/salarie.js"


export const listSalarie = (req, res, next) => {
    Salarie.find().then(data => {
        res.json({
            success: true,
            message: `list salaries`,
            data
        })
    }).catch(err =>
        next(err)
    )
}

export const detailSalarie = (req, res, next) => {
    const id = req.params.id
    Salarie.findById(id)
        .populate('quizs')
        .populate('evaluations')
        .then(data => {
            res.json({
                success: true,
                message: `salarie ${id}`,
                data
            })
        }).catch(err =>
            next(err)
        )
}

export const addSalarie = (req, res, next) => {
    const { nom, prenom, genre } = req.body
    const newSalarie = new Salarie({ nom, prenom, genre })
    newSalarie.save()
        .then(data => {
            res.json({
                success: true,
                message: `salarie ajouté`,
                data
            })
        }).catch(err =>
            next(err)
        )
}

//peut changer nom prenom
export const updateSalarie = (req, res, next) => {
    const id = req.params.id
    const { nom, prenom } = req.body
    Salarie.findById(id)
        .then(result => {
            return result.updateOne({ nom, prenom })
        }).then(data => {
            res.json({
                success: true,
                message: `salarie ${id} updated`,
                data
            })
        }).catch(err =>
            next(err)
        )
}

export const deleteSalarie = (req, res, next) => {
    const id = req.params.id
    Salarie.deleteOne({ _id: id }).then(data => {
        res.json({
            success: true,
            message: `salarie ${id} deleted`,
            data
        })
    }).catch(err =>
        next(err)
    )
}

//return salarie id if nom prenom  exists
export const findByName = (req, res, next) => {
    const { nom, prenom } = req.body
    Salarie.findOne({ nom, prenom }).then(data => {
        if (!data) return next(new HttpError(404, `salarie ${nom} ${prenom} doesnt exist`))//res.status(404).json("vous n'existez pas")
        return res.json({
            success: true,
            message: `salarie name found`,
            data: data._id
        })
    }).catch(err =>
        next(err)
    )
}