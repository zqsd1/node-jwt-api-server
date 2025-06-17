import mongoose from "mongoose";
import { Quiz } from "./quiz.js";
import { Evaluation } from "./evaluation.js";

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
    quizs: { type: [mongoose.Schema.ObjectId], ref: "Quiz" },
    evaluations: { type: [mongoose.Schema.ObjectId], ref: "Evaluation" }
})
SalarieSchema.index({ nom: 1, prenom: 1 }, { unique: true })

//quand on delete un salarie faut delete les quiz associé
SalarieSchema.pre('deleteOne', async function (next) {
    await Quiz.deleteMany({ assignedTo: this._conditions._id })
    await Evaluation.deleteMany({ assignedTo: this._conditions._id })
    next()
})

SalarieSchema.post('deleteOne', function (doc) {
})

export const Salarie = mongoose.model('Salarie', SalarieSchema)