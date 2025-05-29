import mongoose, { Schema } from "mongoose";

const NiveauCompetence = new Schema({
    mastery: String,
    evaluateBy: String,
    evaluateAt: { type: Date, default: () => Date.now() },
})

const CompetenceSchema = new Schema({
    competenceName: String,
    eval: NiveauCompetence,
    counterEval: [NiveauCompetence]
})

const EvaluationSchema = new Schema({
    EvaluationName: String,
    competences: [CompetenceSchema],
    assignedTo: { type: Schema.Types.ObjectId, ref: "Salarie" },
    doneAt: { type: Date, default: () => Date.now() },
})

export const Evaluation = mongoose.model("Evaluation", EvaluationSchema)
