const mongoose = require('mongoose')

const SolvedSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    solved: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Whodunit'
        },
        timeTaken: {
            type: Number,
            required: true
        },
        solved: {
            type: Boolean,
            required: true
        },
        attemptedAt: Date,
    }],
    solving: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Whodunit'
        },
        timeTaken: {
            type: Number,
            required: true
        },
        exited: {
            type: Number,
            default: 0,
            max: 3
        },
        previosChosen: Number,
        attemptedAt: Date
    }
}, { timestamps: true })

module.exports = mongoose.model('Solved', SolvedSchema)