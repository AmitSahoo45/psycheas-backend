const mongoose = require('mongoose')

const AttemptSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Whodunit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Whodunit'
    },
    attemptNo: [Number],
    timeTaken: [Number],
    correct: [Boolean],
    accuracy: [Number],
    percentile: [Number]
}, { timestamps: true })

module.exports = mongoose.model('Attempt', AttemptSchema)