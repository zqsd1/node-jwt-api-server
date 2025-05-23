import mongoose from "mongoose";
import { Quiz } from "./quiz.js";

const SalarieSchema = new mongoose.Schema({
    genre: {
        type: String,
        enum: ["H", "F"],
        default: "H",
        required: true
    },
    nom: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Zéçè-]+$/
    },
    prenom: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Zéçè-]+$/
    },
    quizs: { type: [mongoose.Schema.ObjectId], ref: "Quiz" }
})
SalarieSchema.index({ nom: 1, prenom: 1 }, { unique: true })

//quand on delete un salarie faut delete les quiz associé
SalarieSchema.pre('deleteOne', async function (next) {

    console.log("salarie delete")
    const salarie = await Salarie.findById(this._conditions._id)
    if (salarie.quizs)
        await Quiz.deleteMany({ _id: { $in: salarie.quizs } })
    next()
})

export const Salarie = mongoose.model('Salarie', SalarieSchema)