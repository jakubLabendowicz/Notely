const router = require("express").Router()
const { verifyUser, verifyUserOwner, verifyNoteOwner, verifyNoteAccessOwner } = require("../middlewares/AuthorizationMiddleware")
const { verifyBodyData } = require("../middlewares/ValidationMiddleware")
const { createUserSchema } = require("../validators/UserValidator")
const { createUser, selectUser, selectUsers, updateUser, deleteUser } = require("../services/UserService")

// create one
router.post("/", 
    verifyBodyData(createUserSchema),
    createUser
)


//select one
router.get("/:userId",
    verifyUser,
    selectUser
)


//select many
router.get("/",
    verifyUser, 
    selectUsers
)


//update one
router.put("/:userId",
    verifyUser,
    verifyUserOwner,
    updateUser
)


//delete one
router.delete("/:userId",
    verifyUser,
    verifyUserOwner,
    deleteUser
)

module.exports = router