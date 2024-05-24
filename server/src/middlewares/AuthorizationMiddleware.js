const User = require("../models/User")
const Note = require("../models/Note")
const NoteAccess = require("../models/NoteAccess")
const jwt = require("jsonwebtoken")
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const verifyUser = async (req, res, next) => {
    try {
        if(!req.headers.authorization) throw new UnauthorizedError("Authorization header is required");
        const token = req.headers.authorization.split(" ")[1];
        if(!token) throw new UnauthorizedError("Token is required");
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if(!tokenData) throw new UnauthorizedError("Invalid token");
        const user = await User.findById(tokenData.id);
        if(!user) throw new NotFoundError("User not found");
        req.body.user = user;
        if(req.params.userId === "me" || req.params.userId === "self") req.params.userId = tokenData.id;
        next();
    } catch (error) {
        next(error);
    }
}

const verifyUserOwner = async (req, res, next) => {
    try {
        if(!req.params.userId) throw new BadRequestError("User id is required");
        if(req.body.user.role !== "admin" && req.body.user.id !== req.params.userId) throw new ForbiddenError("No permission");
        next()
    } catch (error) {
        next(error)
    }
}

const verifyNoteOwner = async (req, res, next) => {
    try {
        if(req.body.user.role !== "admin") {
            if(!req.params.noteId) throw new BadRequestError("Note id is required")
            const note = await Note.findById(req.params.noteId)
            if(!note) throw new NotFoundError("Note not found")
            const noteAccesses = await NoteAccess.find({ noteId: req.params.noteId, isDeactivated: false })
            const userNoteAccess = noteAccesses.find(noteAccess => noteAccess.userId === req.body.user.id);
            if(note.ownerId !== req.body.user.id && !userNoteAccess) throw new ForbiddenError("No permission")
        }
        next()
    } catch (error) {
        next(error)
    }
}

const verifyNoteAccessOwner = async (req, res, next) => {
    try {
        if(req.body.user.role !== "admin") {
            if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required");
            const noteAccess = await NoteAccess.findById(req.params.noteAccessId)
            if(!noteAccess) throw new NotFoundError("Note access not found")
            if(noteAccess.ownerId !== req.body.user.id) throw new ForbiddenError("No permission")
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { 
    verifyUser,
    verifyUserOwner,
    verifyNoteOwner,
    verifyNoteAccessOwner
}