import mongoose, { Schema } from "mongoose";
import { Salarie } from "./salarie.js";

const NiveauCompetence = new Schema({
    mastery: String,
    evaluatedBy: String,
    evaluatedAt: { type: Date, default: () => Date.now() },
})

const CompetenceSchema = new Schema({
    competenceName: String,
    autoEval: NiveauCompetence,
    counterEval: [NiveauCompetence]
})

const EvaluationSchema = new Schema({
    evaluationName: String,
    competences: [CompetenceSchema],
    assignedTo: { type: Schema.Types.ObjectId, ref: "Salarie" },
    doneAt: { type: Date, default: () => Date.now() },
})

EvaluationSchema.pre('save', async function (next) {
    if (this.isNew) {
        const salarie = await Salarie.findById(this.assignedTo)
        salarie.evaluations.push(this._id)
        await salarie.save()
        next()
    }
})

//quand on delete un quiz faut le delier du salarie
EvaluationSchema.post('deleteOne', async function (doc, next) {
    if (doc.deletedCount == 0) return
    const evaluation = await Evaluation.findById(this._conditions._id)
    if (!evaluation) return
    const salarie = await Salarie.findById(evaluation.assignedTo)
    if (!salarie) return
    salarie.evaluations = salarie.evaluations.filter(q => !q.equals(evaluation._id))
    await salarie.save()
    next()
})


export const Evaluation = mongoose.model("Evaluation", EvaluationSchema)
