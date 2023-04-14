const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
require('dotenv').config()

const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const oldUser = await User.findOne({ email })

        if (!oldUser)
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect)
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Password is Incorrect" })

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id }
            , process.env.JWT_SECRET,
            { expiresIn: "15d" })

        res.status(StatusCodes.OK).json({
            result: {
                name: oldUser.name,
                email: oldUser.email,
                id: oldUser._id
            }, token
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const oldUser = await User.findOne({ email })

        if (oldUser)
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already exist' })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { email: result.email, id: result._id }
            , process.env.JWT_SECRET,
            { expiresIn: "15d" })

        res.status(StatusCodes.CREATED).json({
            result: {
                name: result.name,
                email: result.email,
                id: result._id
            }, token
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    SignIn,
    SignUp
}
