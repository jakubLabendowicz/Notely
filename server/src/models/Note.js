const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, required: false, default: "white" },

    ownerId: { type: String, required: true },

    createdById: { type: String, required: false },
    createdAt: { type: Date, required: false},

    isUpdated: { type: Boolean, default: false },
    updatedById: { type: String, required: false },
    updatedAt: { type: Date, required: false },
    
    isArchived: { type: Boolean, default: false },
    archivedById: { type: String, required: false },
    archivedAt: { type: Date, required: false  },
})

const Note = mongoose.model("Note", noteSchema)

module.exports = Note;
