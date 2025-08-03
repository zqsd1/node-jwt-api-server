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
            if (!data) throw new HttpError(404, "salarie not found")
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
            logger.info(`salarie ${nom} ${prenom} added`, { userId: req.userinfo?.sub })
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
            if (!result) throw new HttpError(404, "salarie not found")
            return result.updateOne({ nom, prenom })
        }).then(data => {
            logger.info(`salarie ${id} updated`, { userId: req.userinfo?.sub })
            res.json({
                success: true,
                message: `salarie ${id} updated`,
                data
            })
        }).catch(err => {
            next(err)
        })
}

export const deleteSalarie = (req, res, next) => {
    const id = req.params.id
    Salarie.deleteOne({ _id: id }).then(data => {
        if (!data) throw new HttpError(404, "salarie not found")
        logger.info(`salarie ${id} deleted`, { userId: req.userinfo?.sub })
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
        if (!data) throw new HttpError(404, `salarie ${nom} ${prenom} doesnt exist`)
        return res.json({
            success: true,
            message: `salarie name found`,
            data: data._id
        })
    }).catch(err =>
        next(err)
    )
}