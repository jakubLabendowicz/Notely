const Note = require("../models/Note")
const NoteAccess = require("../models/NoteAccess")
const axios = require('axios')
const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const createNote = async (req, res, next) => {
    try {
        const note = await new Note({ ...req.body.data, ownerId: req.body.user.id, createdAt: Date.now(), createdById: req.body.user.id }).save()
        if (!note) throw new InternalServerError("Note not created")
        res.status(201).send({ data: note, result: { message: "Note created", type: "success", status: 201, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const selectNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findById(req.params.noteId)
        if (!note) throw new NotFoundError("Note not found")
        res.status(200).send({ data: note, result: { message: "Note found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}


const selectNotes = async (req, res, next) => {
    try {
        let notes;

        const userId = req.body.user.id;
        const noteAccesses = await NoteAccess.find({ userId: userId })
        const noteIds = noteAccesses.map(noteAccess => noteAccess.noteId)

        const search = req.query.search || '';
        const archived = req.query.archived || false;
        const color = req.query.color || '';
        if (req.body.user.role !== "admin") {
            notes = await Note.find({
                $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }],
                isArchived: archived,
                color: { $regex: color, $options: 'i' },
                $or: [{ _id: { $in: noteIds } }, { ownerId: userId }],
            })
        } else {
            notes = await Note.find({
                $or: [{ title: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } }],
                isArchived: archived,
                color: { $regex: color, $options: 'i' }
            })
        }
        if (!notes || notes.length === 0) throw new NotFoundError("Notes not found")
        res.status(200).send({ data: notes, result: { message: "Notes found", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const updateNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findByIdAndUpdate(req.params.noteId, { ...req.body.data, isUpdated: true, updatedAt: Date.now(), updatedById: req.body.user.id }, { new: true })
        if (!note) throw new NotFoundError("Note not found")
        res.status(200).send({ data: note, result: { message: "Note updated", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const deleteNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findByIdAndDelete(req.params.noteId)
        if (!note) throw new NotFoundError("Note not found")
        res.status(200).send({ data: note, result: { message: "Note deleted", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const archiveNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findByIdAndUpdate(req.params.noteId, { isArchived: true, archivedAt: Date.now(), archivedById: req.body.user.id }, { new: true })
        if (!note) throw new NotFoundError("Note not found")
        res.status(200).send({ data: note, result: { message: "Note archived", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const unarchiveNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findByIdAndUpdate(req.params.noteId, { isArchived: false, archivedAt: null, archivedById: null }, { new: true })
        if (!note) throw new NotFoundError("Note not found")
        res.status(200).send({ data: note, result: { message: "Note unarchived", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}


const summarizeNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required")
        const note = await Note.findById(req.params.noteId)
        if (!note) throw new NotFoundError("Note not found")
        const lmResponse = await axios.post('http://localhost:1234/v1/chat/completions', {
            model: "lmstudio-ai/gemma-2b-it-GGUF",
            messages: [
                { role: "user", content: note.content },
                { role: "user", content: "Podsumuj ten tekst" }
            ],
            temperature: 0.7,
            max_tokens: -1,
            stream: false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (lmResponse.status !== 200 || !lmResponse.data.choices || !lmResponse.data.choices[0].message) {
            throw new InternalServerError("Failed to get summary from AI service")
        }
        const summary = lmResponse.data.choices[0].message.content
        res.status(200).send({ data: summary, result: { message: "Note summarized", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

const askNote = async (req, res, next) => {
    try {
        if (!req.params.noteId) throw new BadRequestError("Note id is required");
        const note = await Note.findById(req.params.noteId);
        if (!note) throw new NotFoundError("Note not found");
        const lmResponse = await axios.post('http://localhost:1234/v1/chat/completions', {
            model: "lmstudio-ai/gemma-2b-it-GGUF",
            messages: [
                { role: "user", content: "Note query json: " + JSON.stringify(note) },
                { role: "user", content: "Note content: " + note.content },
                { role: "user", content: req.query.question }
            ],
            temperature: 0.7,
            max_tokens: -1,
            stream: false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (lmResponse.status !== 200 || !lmResponse.data.choices || !lmResponse.data.choices[0].message) {
            throw new InternalServerError("Failed to get summary from AI service")
        }
        const summary = lmResponse.data.choices[0].message.content
        res.status(200).send({ data: summary, result: { message: "Question answered", type: "success", status: 200, instance: req.originalUrl } })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNote,
    selectNote,
    selectNotes,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    summarizeNote,
    askNote
}