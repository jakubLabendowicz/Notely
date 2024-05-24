const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const noteAccessSchema = new Schema({
    userId: { type: String, required: true },
    noteId: { type: String, required: true },

    ownerId: { type: String, required: false },

    createdById: { type: String, required: false },
    createdAt: { type: Date, required: false },

    isUpdated: { type: Boolean, default: false },
    updatedById: { type: String, required: false },
    updatedAt: { type: Date, required: false },
    
    isDeactivated: { type: Boolean, default: false },
    deactivatedById: { type: String, required: false },
    deactivatedAt: { type: Date, required: false },
})

const NoteAccess = mongoose.model("NoteAccess", noteAccessSchema)

module.exports = NoteAccess;
