const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    if (!req.cookies || !req.cookies.jwt) {
        return res.status(400).json({ "message": "No cookies found. Please register or login first." })
    }
    const token = req.cookies.jwt
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.status(403).json({ "message": "Invalid or expired session. Please login again" })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken