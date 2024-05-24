const NoteAccess = require("../models/NoteAccess")
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const createNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteId) throw new BadRequestError("Note id is required")
        const noteAccess = await new NoteAccess({ ...req.body.data, noteId: req.params.noteId, ownerId: req.body.user.id, createdAt: Date.now(), createdById: req.body.user.id }).save()
        if(!noteAccess) throw new InternalServerError("Note access not created")
        res.status(201).send({ data: noteAccess, result: { message: "Note access created", type: "success", status: 201, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required")
        const noteAccess = await NoteAccess.findById(req.params.noteAccessId)
        if(!noteAccess) throw new NotFoundError("Note access not found")
        res.status(200).send({ data: noteAccess, result: { message: "Note access found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectNoteAccesses = async (req, res, next) => {
    try {
        const deactivated = req.query.deactivated || false;
        if(!req.params.noteId) throw new BadRequestError("Note id is required")
        const noteAccesses = await NoteAccess.find({ noteId: req.params.noteId, isDeactivated: deactivated })
        if(!noteAccesses || noteAccesses.length === 0) throw new NotFoundError("Note accesses not found")
        res.status(200).send({ data: noteAccesses, result: { message: "Note accesses found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectNotesAccesses = async (req, res, next) => {
    try {
        let noteAccesses;
        const deactivated = req.query.deactivated || false;
        if(req.body.user.role !== "admin") {
            noteAccesses = await NoteAccess.find({ $or: [{ userId: req.body.user.id }, { ownerId: req.body.user.id }], isDeactivated: deactivated })
        } else {
            noteAccesses = await NoteAccess.find({ isDeactivated: deactivated })
        }
        if(!noteAccesses || noteAccesses.length === 0) throw new NotFoundError("Note accesses not found")
        res.status(200).send({ data: noteAccesses, result: { message: "Note accesses found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const updateNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required");
        const noteAccess = await NoteAccess.findByIdAndUpdate(req.params.noteAccessId, { ...req.body.data, isUpdated: true, updatedAt: Date.now(), updatedById: req.body.user.id }, { new: true })
        if(!noteAccess) throw new NotFoundError("Note access not found")
        res.status(200).send({ data: noteAccess, result: { message: "Note access updated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const deleteNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required");
        const noteAccess = await NoteAccess.findByIdAndDelete(req.params.noteAccessId)
        if(!noteAccess) throw new NotFoundError("Note access not found")
        res.status(200).send({ data: noteAccess, result: { message: "Note access deleted", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const deactivateNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required")
        const noteAccess = await NoteAccess.findByIdAndUpdate(req.params.noteAccessId, { isDeactivated: true, deactivatedAt: Date.now(), deactivatedById: req.body.user.id }, { new: true })
        if(!noteAccess) throw new NotFoundError("Note access not found")
        res.status(200).send({ data: noteAccess, result: { message: "Note access deactivated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const activateNoteAccess = async (req, res, next) => {
    try {
        if(!req.params.noteAccessId) throw new BadRequestError("Note access id is required")
        const noteAccess = await NoteAccess.findByIdAndUpdate(req.params.noteAccessId, { isDeactivated: false, deactivatedAt: null, deactivatedById: null }, { new: true })
        if(!noteAccess) throw new NotFoundError("Note access not found")
        res.status(200).send({ data: noteAccess, result: { message: "Note access activated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNoteAccess,
    selectNoteAccess,
    selectNoteAccesses,
    selectNotesAccesses,
    updateNoteAccess,
    deleteNoteAccess,
    deactivateNoteAccess,
    activateNoteAccess
}