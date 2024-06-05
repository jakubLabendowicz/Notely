const User = require("../models/User")
const bcrypt = require("bcrypt")
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const createUser = async (req, res, next) => {
    try {
        if(!req.body.data.email) throw new BadRequestError("Email is required")
        if(!req.body.data.password) throw new BadRequestError("Password is required")
        const findedUser = await User.findOne({ email: req.body.data.email })
        if (findedUser) throw new ConflictError("User already exists")
        const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10)
        if(!salt) throw new InternalServerError("Salt not generated")
        const hashedPassword = await bcrypt.hash(req.body.data.password, salt)
        if(!hashedPassword) throw new InternalServerError("Password not hashed")
        const user = await new User({ ...req.body.data, password: hashedPassword, createdAt: Date.now() }).save()
        if(!user) throw new InternalServerError("User not created")
        res.status(201).send({ data: user, result: { message: "User created", type: "success", status: 201, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectUser = async (req, res, next) => {
    try {
        if(!req.params.userId) throw new BadRequestError("User id is required")
        const user = await User.findById(req.params.userId)
        if(!user) throw new NotFoundError("User not found")
        res.status(200).send({ data: user, result: { message: "User found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectUsers = async (req, res, next) => {
    try {
        const search = req.query.search || '';
        const users = await User.find({ $or: [{ email: { $regex: search, $options: 'i' } }, { firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }] })
        if(!users || users.length === 0) throw new NotFoundError("Users not found")
        res.status(200).send({ data: users, result: { message: "Users found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        if(!req.params.userId) throw new BadRequestError("User id is required")
        if(req.body.data.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10)
            if(!salt) throw new InternalServerError("Salt not generated")
            const hashedPassword = await bcrypt.hash(req.body.data.password, salt)
            if(!hashedPassword) throw new InternalServerError("Password not hashed")
            req.body.data.password = hashedPassword
        }
        const user = await User.findByIdAndUpdate(req.params.userId, { ...req.body.data, isUpdated: true, updatedAt: Date.now(), updatedById: req.body.user.id }, { new: true })
        if(!user) throw new NotFoundError("User not found")
        res.status(200).send({ data: user, result: { message: "User updated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        if(!req.params.userId) throw new BadRequestError("User id is required")
        const user = await User.findByIdAndDelete(req.params.userId)
        if(!user) throw new NotFoundError("User not found")
        res.status(200).send({ data: user, result: { message: "User deleted", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createUser, 
    selectUser, 
    selectUsers, 
    updateUser, 
    deleteUser 
}