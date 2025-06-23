import { Quiz } from "../models/quiz.js"

export const listQuiz = (req, res, next) => {

    Quiz.find().then(data => {
        res.json({
            success: true,
            message: `list quizs`,
            data
        })
    }).catch(err => {
        next(err)
    })
}

export const getQuiz = (req, res, next) => {
    const id = req.params.id
    Quiz.findById(id).then(data => {
        res.json({
            success: true,
            message: `quiz ${id}`,
            data
        })
    }).catch(err => {
        next(err)
    })
}

const calculScore = (quiz) => {
    return quiz?.reduce((previous, current) => {
        const goodAnswer = current.goodAnswer
        const userAnswer = current.userAnswer
        if (Array.isArray(goodAnswer)) {
            const good = goodAnswer.sort().every((asw, i) => asw === [...userAnswer].sort()[i])
            if (good) return previous + 1
        } else {
            if (userAnswer.length === 1 && userAnswer[0] == goodAnswer) {
                return previous + 1
            }
        }
        return previous
    }, 0)
}

export const addQuiz = (req, res, next) => {
    const { quizName, assignedTo, quiz } = req.body
    const note = calculScore(questions)

    const newQuiz = new Quiz({ note, quizName, assignedTo, quizItems: quiz })
    newQuiz.save()
        .then(data => {
            res.json({
                success: true,
                message: `ajout quiz`,
                data
            })
        }).catch(err => {
            next(err)
        })

}


// export const updateQuiz = (req, res,next) => {
//     const { id } = req.params
//     const { assignedTo } = req.body
//     Quiz.findById(id).then(result => {
//         return result.updateOne({ assignedTo })
//     }).then(result => {
//         res.json(result)
//     }).catch(err => {
//         res.status(500).json(err.message)
//     })
// }

export const deleteQuiz = (req, res, next) => {
    const id = req.params.id
    Quiz.deleteOne({ _id: id }).then(data => {
        res.json({
            success: true,
            message: `quiz ${id} deleted`,
            data
        })
    }).catch(err => {
        next(err)
    })

}