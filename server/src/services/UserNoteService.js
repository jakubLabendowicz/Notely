const User = require("../models/User")
const Note = require("../models/Note")
const NoteAccess = require("../models/NoteAccess")
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const selectUserNote = async (req, res, next) => {
    try {
        if(!req.params.userId) throw new BadRequestError("User id is required")
        const user = await User.findById(req.params.userId)
        if(!user) throw new NotFoundError("User not found")

        const noteAccesses = await NoteAccess.find({ userId: req.params.userId })
        const noteIds = noteAccesses.map(noteAccess => noteAccess.noteId)
        const userId = req.params.userId;
        
        const search = req.query.search || '';
        const archived = req.query.archived || false;
        const color = req.query.color || '';
        const notes = await Note.find({ $and: [
            { $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }] }, 
            { $or: [{ _id: { $in: noteIds } }, { ownerId: userId }]},
            { isArchived: archived },
            { color: { $regex: color, $options: 'i' } }
        ] });

        if(!notes || notes.length === 0) throw new NotFoundError("Notes not found")
        res.status(200).send({ data: notes, result: { message: "Notes found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    selectUserNote, 
}