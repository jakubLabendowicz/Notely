const { Router } = require("express");
const authControler = require("../controllers/AuthController");
const userControler = require("../controllers/UserController");
const userNoteController = require("../controllers/UserNoteController");
const noteController = require("../controllers/NoteController");
const noteAccessController = require("../controllers/NoteAccessController");

const { handleNotFound, handleError } = require("../middlewares/ErrorMiddleware");

const routes = Router()
    .use((req, res, next) => {console.log("Requested: " + req.originalUrl); next();})
    .use("/auth", authControler)
    .use("/users", userControler, userNoteController)
    .use("/notes", noteAccessController, noteController)
    .use(handleError)
    .use("*", handleNotFound)

module.exports = routes