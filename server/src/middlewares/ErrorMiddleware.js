const handleError = (error, req, res, next) => {
    console.log("Error: ", error)
    res.status(error.status || 500).send({ result: { message: error.message || "Internal server error", type: "error", status: error.status || 500, instance: req.originalUrl } })
}

const handleNotFound = (req, res, next) => {
    console.log("Not found error")
    res.status(404).send({ result: { message: "Not found", type: "error", status: 404, instance: req.originalUrl } })
}

module.exports = { handleError, handleNotFound }