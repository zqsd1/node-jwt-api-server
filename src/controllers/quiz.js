import { Quiz } from "../models/quiz.js"

export const listQuiz = (req, res) => {

    Quiz.find().then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err.message)
    })
}

export const getQuiz = (req, res) => {
    const id = req.params.id
    Quiz.findById(id).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err.message)
    })
}

export const addQuiz = (req, res) => {
    const { quizName, assignedTo, questions } = req.body
    const note = questions?.reduce((previous, current) => {
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
    
    const newQuiz = new Quiz({ note, quizName, assignedTo, questions })
    newQuiz.save().then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err.message)
    })

}


export const updateQuiz = (req, res) => {
    const { id } = req.params
    const { assignedTo } = req.body
    Quiz.findById(id).then(result => {
        return result.updateOne({ assignedTo })
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err.message)
    })
}

export const deleteQuiz = (req, res) => {
    const id = req.params.id
    Quiz.deleteOne({ _id: id }).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).json(err.message)
    })

}