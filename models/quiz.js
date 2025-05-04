import mongoose from "mongoose";
import { Schema } from "mongoose";

const QuizSchema = new Schema({
    note: {
        type: Number,
        min: 0,
        required: true,
        immutable:true

    },
    nom: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Z\é\ç\è\-]+$/,
        immutable:true
    },
    prenom: {
        type: String,
        lowercase: true,
        required: true,
        match: /^[a-zA-Zéçè-]+$/,
        immutable:true

    },
    quizName: {
        type: String,
        required: true,
        immutable:true

    },
    doneAt: {
        type: Date,
        default:()=> Date.now(),
        immutable:true

    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Salarie" }
})

export const Quiz = mongoose.model('Quiz', QuizSchema)
