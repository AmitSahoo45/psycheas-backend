const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const authHeader = req.headers.authorization
        console.log('1')
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ message: 'Authentication is required' })
        console.log('2')
        const token = authHeader.replace('Bearer ', '')
        console.log(process.env.JWT_SECRET, 'JWT_SECRET')
        console.log(token, 'token')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded, 'decoded')
        console.log(token)
        console.log('3')

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = auth