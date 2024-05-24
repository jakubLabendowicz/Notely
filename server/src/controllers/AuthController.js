const router = require("express").Router()
const { verifyBodyData } = require("../middlewares/ValidationMiddleware")
const { authenticateSchema } = require("../validators/AuthValidator")
const { authenticate, introspect } = require("../services/AuthService")

//authenticate
router.post("/authenticate",
    verifyBodyData(authenticateSchema),
    authenticate
)


//introspect
router.post("/introspect",
    introspect
)

module.exports = router