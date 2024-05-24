const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const authenticate = async (req, res, next) => {
    try {
        if(!req.body.data.email) throw new BadRequestError("Email is required")
        if(!req.body.data.password) throw new BadRequestError("Password is required")
        const user = await User.findOne({ email: req.body.data.email })
        if(!user) throw new NotFoundError("User not found")
        const validPassword = await bcrypt.compare(req.body.data.password, user.password)
        if(!validPassword) throw new UnauthorizedError("Invalid password")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        if(!token) throw new InternalServerError("Token not generated")
        res.status(200).send({ data: token, result: { message: "User authenticated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const introspect = async (req, res, next) => {
    try {
        if(!req.body.data.token) throw new BadRequestError("Token is required")
        const tokenData = jwt.verify(req.body.data.token, process.env.JWT_SECRET)
        if(!tokenData) throw new UnauthorizedError("Invalid token")
        res.status(200).send({ data: tokenData, result: { message: "Token introspected", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

module.exports = { 
    authenticate,
    introspect
}