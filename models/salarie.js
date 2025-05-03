import mongoose from "mongoose";

const SalarieSchema = new mongoose.Schema({
    genre: String,
    nom: String,
    prenom: String,
    quizs: [mongoose.Schema.ObjectId]
})

export const Salarie = mongoose.model('Salarie', SalarieSchema)