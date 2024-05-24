const router = require("express").Router()
const { verifyUser, verifyUserOwner, verifyNoteOwner, verifyNoteAccessOwner } = require("../middlewares/AuthorizationMiddleware")
const { verifyBodyData } = require("../middlewares/ValidationMiddleware")
const { createNoteAccessSchema } = require("../validators/NoteAccessValidator")
const { createNoteAccess, selectNoteAccess, selectNoteAccesses, selectNotesAccesses, updateNoteAccess, deleteNoteAccess, deactivateNoteAccess, activateNoteAccess} = require("../services/NoteAccessService")

// create one
router.post("/:noteId/accesses",
    verifyUser,
    verifyNoteOwner,
    verifyBodyData(createNoteAccessSchema),
    createNoteAccess
)


//select one
router.get("/accesses/:noteAccessId",
    verifyUser,
    verifyNoteAccessOwner,
    selectNoteAccess
)


//select many
router.get("/accesses",
    verifyUser,
    selectNotesAccesses
)

router.get("/:noteId/accesses",
    verifyUser,
    verifyNoteOwner,
    selectNoteAccesses
)


//update one
router.put("/accesses/:noteAccessId",
    verifyUser,
    verifyNoteAccessOwner,
    updateNoteAccess
)


//delete one
router.delete("/accesses/:noteAccessId",
    verifyUser,
    verifyNoteAccessOwner,
    deleteNoteAccess
)


//deactivate one
router.post("/accesses/:noteAccessId/deactivate",
    verifyUser,
    verifyNoteAccessOwner,
    deactivateNoteAccess
)


//reactivate one
router.post("/accesses/:noteAccessId/reactivate",
    verifyUser,
    verifyNoteAccessOwner,
    activateNoteAccess
)

module.exports = router