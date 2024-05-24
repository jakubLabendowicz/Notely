const router = require("express").Router()
const { verifyUser, verifyUserOwner, verifyNoteOwner, verifyNoteAccessOwner } = require("../middlewares/AuthorizationMiddleware")
const { selectUserNote } = require("../services/UserNoteService")

//select many
router.get("/:userId/notes",
    verifyUser,
    verifyUserOwner,
    selectUserNote
)

module.exports = router;