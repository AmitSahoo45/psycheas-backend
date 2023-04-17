const whodunitModel = require('../models/whodunit')
const SolvedModel = require('../models/solved')
const AttemptModel = require('../models/attempts')

const { StatusCodes } = require('http-status-codes');

const createWhodunitStoryline = async (req, res) => {
    try {
        const { title, storyline, options, correct, explaination } = req.body
        const whodunit = await whodunitModel.create({
            title,
            storyline,
            options,
            correct,
            explaination
        })
        res.status(StatusCodes.CREATED).json({ whodunit })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const getAllWhodunitStorylines = async (req, res) => {
    try {
        const whodunits = await whodunitModel.find()
        const total = await whodunitModel.countDocuments()
        res.status(StatusCodes.OK).json({ count: total, whodunits })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const RandomlySelectPuzzle = async (req, res) => {
    try {
        const { user: { id } } = req
        console.log(id)
        let solveddocx = await SolvedModel.findOne({ User: id })

        if (!solveddocx) {
            const whodunits = await whodunitModel.find()
            const total = await whodunitModel.countDocuments()

            const random = Math.floor(Math.random() * total)
            const whodunit = whodunits[random]

            solveddocx = await SolvedModel.create({
                User: id,
                solving: {
                    id: whodunit._id,
                    timeTaken: 0,
                    exited: 0,
                    previosChosen: 0,
                    attemptedAt: Date.now()
                }
            })

            return res.status(StatusCodes.OK).json({
                whodunit,
                solveddocx,
                message: 'Puzzle fetched successfully'
            })
        } else {
            if (solveddocx.solving?.id) {
                if (solveddocx.solving.exited >= 3) {
                    const whodunits = await whodunitModel.find()
                    const total = await whodunitModel.countDocuments()

                    const random = Math.floor(Math.random() * total)
                    const whodunit = whodunits[random]

                    solveddocx = await SolvedModel.create({
                        User: id,
                        solving: {
                            id: whodunit._id,
                            timeTaken: 0,
                            exited: 0,
                            previosChosen: 0,
                            attemptedAt: Date.now()
                        }
                    })

                    return res.status(StatusCodes.OK).json({
                        whodunit,
                        solveddocx,
                        message: 'You have exited the puzzle 3 times. You are redirected to a new puzzle'
                    })
                }

                const whodunit = await whodunitModel.findById(solveddocx.solving.id)
                return res.status(StatusCodes.OK).json({ whodunit, solveddocx })
            } else {
                const whodunits = await whodunitModel.find()
                const total = await whodunitModel.countDocuments()

                // choose a random puzzle such that it does not exits in the solving.solved array
                // do that by checking if the random puzzle id exists in the solving.solved array
                // if solveddocx.solving.solved.length === total which means all puzzles have been solved
                // then clear the solved array and start over again

                if (solveddocx.solved.length == total) {
                    solveddocx.solved = []
                    await solveddocx.save()
                }

                let random = Math.floor(Math.random() * total)
                let whodunit = whodunits[random]

                while (solveddocx.solved.includes(whodunit._id)) {
                    random = Math.floor(Math.random() * total)
                    whodunit = whodunits[random]
                }

                solveddocx.solving.id = whodunit._id
                solveddocx.solving.previosChosen = 0
                solveddocx.solving.exited = 0
                solveddocx.solving.timeTaken = 0
                solveddocx.solving.attemptedAt = Date.now()

                await solveddocx.save()

                return res.status(StatusCodes.OK).json({
                    whodunit,
                    solveddocx,
                    message: 'Puzzle fetched successfully'
                })
            }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const CheckSolutionAndAccuracy = async (req, res) => {
    try {
        // qid is the puzzle _id
        const { isCorrect, time, qid } = req.body
        const { user: { id } } = req
        console.log(isCorrect, time, qid)
        const UserSolve = await SolvedModel.findOne({ User: id })

        UserSolve.solving = {
            id: null,
            timeTaken: 0,
            exited: 0,
            previosChosen: 0,
            attemptedAt: Date.now()
        }

        UserSolve.solved.push({
            puzzleId: qid,
            timeTaken: time,
            solved: isCorrect,
            attemptedAt: Date.now()
        })
        await UserSolve.save()

        // accuracy calculation
        const WIN_CREDIT = 0.5, LOSE_CREDIT = 0.1
        let accuracy = isCorrect ? WIN_CREDIT * time : LOSE_CREDIT * time
        const normalize = parseFloat((50 - ((accuracy - 0) / (300 - 0)) * (50 - 0) + 0).toFixed(2))
        accuracy = isCorrect ? 50 + normalize : normalize

        // percentile calculation
        const previousAttempts = await AttemptModel.find({ Whodunit: qid })
        const percentile = (((previousAttempts.filter(attempt => attempt.timeTaken <= timeTaken).length + 1) / (previousAttempts.length + 1)).toFixed(2)) * 100

        const pp = await AttemptModel.create({
            User: id,
            Puzzle: qid,
            timeTaken: time,
            correct: isCorrect,
            accuracy,
            percentile,
            attemptNo: previousAttempts.length + 1
        })

        res.status(StatusCodes.OK).json({
            UserSolve, attempt: pp,
            message: 'Puzzle solved successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const getNextQuestion = async (req, res) => {
    try {
        const { user: { id } } = req

        const whodunits = await whodunitModel.find()
        const total = await whodunitModel.countDocuments()
        const solvedPuzzle = await SolvedModel.findOne({ User: id })

        if (solvedPuzzle.solved.length == total) {
            solvedPuzzle.solved = []
            await solvedPuzzle.save()
        }

        let random = Math.floor(Math.random() * total)
        let whodunit = whodunits[random]

        while (solvedPuzzle.solved.includes(whodunit._id)) {
            random = Math.floor(Math.random() * total)
            whodunit = whodunits[random]
        }

        solvedPuzzle.solving.id = whodunit._id
        solvedPuzzle.solving.previosChosen = 0
        solvedPuzzle.solving.exited = 0
        solvedPuzzle.solving.timeTaken = 0
        solvedPuzzle.solving.attemptedAt = Date.now()

        await solvedPuzzle.save()

        return res.status(StatusCodes.OK).json({
            whodunit,
            solvedPuzzle,
            message: 'Puzzle fetched successfully'
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const getAllUserData = async (req, res) => {
    try {
        const attemptsByUser = await AttemptModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "User",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $group: {
                    _id: "$User",
                    name: { $first: "$user.name" },
                    attempts: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    attempts: {
                        $map: {
                            input: "$attempts",
                            as: "attempt",
                            in: {
                                _id: "$$attempt._id",
                                User: "$$attempt.User",
                                attemptNo: "$$attempt.attemptNo",
                                timeTaken: "$$attempt.timeTaken",
                                correct: "$$attempt.correct",
                                accuracy: "$$attempt.accuracy",
                                percentile: "$$attempt.percentile",
                            }
                        }
                    }
                }
            }
        ]);


        res.status(StatusCodes.OK).json({ attemptsByUser })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    createWhodunitStoryline,
    getAllWhodunitStorylines,
    RandomlySelectPuzzle,
    CheckSolutionAndAccuracy,
    getNextQuestion,
    getAllUserData
}

