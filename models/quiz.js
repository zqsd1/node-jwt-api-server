import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    note: Number,
    nom: String,
    prenom: String,
    quizName: String,
    doneAt: Date,
    assignedTo: mongoose.Schema.ObjectId,
})

export const Quiz = mongoose.model('Quiz', QuizSchema)