const mongoose = require('mongoose');

const WhodunitSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    storyline: {
        type: String,
        required: true,
        trim: true
    },
    options: [{
        id: {
            type: Number,
            required: true
        },
        option: {
            type: String,
            required: true,
            trim: true
        }
    }],
    correct: {
        id: {
            type: Number,
            required: true
        },
        option: {
            type: String,
            required: true,
            trim: true
        }
    },
    explaination: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Whodunit', WhodunitSchema);