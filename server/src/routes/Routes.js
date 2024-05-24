const { Router } = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const useragent = require('express-useragent');

const authControler = require("../controllers/AuthController");
const userControler = require("../controllers/UserController");
const userNoteController = require("../controllers/UserNoteController");
const noteController = require("../controllers/NoteController");
const noteAccessController = require("../controllers/NoteAccessController");

const { handleNotFound, handleError } = require("../middlewares/ErrorMiddleware");

const routes = Router()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
    .use(useragent.express())
    .use((req, res, next) => {console.log("Requested: " + req.originalUrl); next();})
    .use("/auth", authControler)
    .use("/users", userControler, userNoteController)
    .use("/notes", noteAccessController, noteController)
    .use(handleError)
    .use("*", handleNotFound)

module.exports = routes