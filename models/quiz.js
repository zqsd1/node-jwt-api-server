import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/quizs')
    .then(() => {
        console.log("connected")
    }).catch(err => console.error(err))

const QuizSchema = new mongoose.Schema({
    note: Number,
    nom: String,
    prenom: String,
    quizName: String,
    doneAt: Date,
    assignedTo: mongoose.Schema.ObjectId,
})

export const Quiz = mongoose.model('Quiz', QuizSchema)