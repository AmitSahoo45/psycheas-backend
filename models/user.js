const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your first name'],
        trim: true,
        minlength: [3, 'First name must have at least 3 characters'],
        maxlength: [25, "First name can't be more than 25 characters"],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);