import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Salarie } from "./salarie.js";

const QuizSchema = new Schema({
    note: {
        type: Number,
        min: 0,
        required: true,
        immutable: true

    },
    nom: {
        type: String,
        lowercase: true,
        // required: true,
        match: /^[a-zA-Z\é\ç\è\-]+$/,
        immutable: true
    },
    prenom: {
        type: String,
        lowercase: true,
        // required: true,
        match: /^[a-zA-Zéçè-]+$/,
        immutable: true

    },
    quizName: {
        type: String,
        required: true,
        immutable: true

    },
    doneAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true

    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Salarie" }
})

//si on ajoute un quiz faut le lier a un salarie
QuizSchema.pre('save', async function (next) {
    const salarie = await Salarie.findById(this.assignedTo)
    salarie.quizs.push(this._id)
    await salarie.save()
    next()
})

//quand on delete un quiz faut le delier du salarie
QuizSchema.pre('deleteOne', async function (next) {
    console.log("quiz delete")
    const quiz = await Quiz.findById(this._conditions._id)
    const salarie = await Salarie.findById(quiz.assignedTo)
    salarie.quizs = salarie.quizs.filter(q => q.equals(quiz._id))
    await salarie.save()
    next()
})

export const Quiz = mongoose.model('Quiz', QuizSchema)
