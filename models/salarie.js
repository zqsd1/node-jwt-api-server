import mongoose from "mongoose";

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

export const Salarie = mongoose.model('Salarie', SalarieSchema)