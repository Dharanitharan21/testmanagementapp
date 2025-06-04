const adminmodel = require('../Models/adminmodel')
const {promisify} =require('util')
const jwt = require('jsonwebtoken')
exports.protect = async (req, res, next) => {
    try {
        let token
        if (
            req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return res.status(401).json({ message: "You are not logged in!!! Please log in to get access" })
        }
        const decoded = await promisify(jwt.verify)(token, process.env.jwt_secret)
        const currentuser = await adminmodel.findById(decoded.id);
        if (!currentuser) {
            return res.status(401).json({ message: "User not found." });
        }
        req.user = currentuser;
        next()
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
}