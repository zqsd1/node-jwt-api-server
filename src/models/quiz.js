import mongoose ,{ Schema } from "mongoose";
import { Salarie } from "./salarie.js";

const QuizItemSchema = new Schema({
    question: { type: String },
    answers: { type: [String] },
    userAnswer: { type: [String] },
    goodAnswer: { type: [String] }
})

const QuizSchema = new Schema({
    note: {
        type: Number,
        min: 0,
        required: true,
        immutable: true

    },
    quizName: {
        type: String,
        required: true,
        immutable: true

    },
    quizItems: { type: [QuizItemSchema] },
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
    salarie.quizs = salarie.quizs.filter(q => !q.equals(quiz._id))
    await salarie.save()
    next()
})


//     userSchema.pre('findOneAndUpdate', function() {
//   console.log(this.getFilter()); // { name: 'John' }
//   console.log(this.getUpdate()); // { age: 30 }
//remove le quiz du salarie
QuizSchema.pre('updateOne', async function (next) {
    const quiz = await Quiz.findById(this._conditions._id)
    const salarie = await Salarie.findById(quiz.assignedTo)
    if (salarie.quizs)
        salarie.quizs = salarie.quizs.filter(q => !q.equals(quiz._id))
    await salarie.save()
    next()
})
//assign le quiz au nouveau salarie
QuizSchema.post('updateOne', async function (doc) {
    const salarie = await Salarie.findById(this._update.$set.assignedTo)
    salarie.quizs.push(this._conditions._id)
    await salarie.save()

})

export const Quiz = mongoose.model('Quiz', QuizSchema)
