const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ message: 'Authentication is required' })

        const token = authHeader.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = auth