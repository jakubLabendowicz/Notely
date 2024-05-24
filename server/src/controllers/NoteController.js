const router = require("express").Router()
const { verifyUser, verifyUserOwner, verifyNoteOwner, verifyNoteAccessOwner } = require("../middlewares/AuthorizationMiddleware")
const { verifyBodyData } = require("../middlewares/ValidationMiddleware")
const { createNoteSchema } = require("../validators/NoteValidator")
const { createNote, selectNote, selectNotes, updateNote, deleteNote, archiveNote, unarchiveNote, summarizeNote, askNote } = require("../services/NoteService")

// create one
router.post("/",
    verifyUser,
    verifyBodyData(createNoteSchema),
    createNote
)


//select one
router.get("/:noteId",
    verifyUser,
    verifyNoteOwner,
    selectNote
)


//select many
router.get("/",
    verifyUser,
    selectNotes
)


//update one
router.put("/:noteId",
    verifyUser,
    verifyNoteOwner,
    updateNote
)


//delete one
router.delete("/:noteId",
    verifyUser,
    verifyNoteOwner,
    deleteNote
)


//archive one
router.post("/:noteId/archive",
    verifyUser,
    verifyNoteOwner,
    archiveNote
)


//unarchive one
router.post("/:noteId/unarchive",
    verifyUser,
    verifyNoteOwner,
    unarchiveNote
)


//summary one
router.get("/:noteId/summarize",
    verifyUser,
    verifyNoteOwner,
    summarizeNote
)


//ask one
router.get("/:noteId/ask",
    verifyUser,
    verifyNoteOwner,
    askNote
)

module.exports = router