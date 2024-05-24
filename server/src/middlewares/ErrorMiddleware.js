const handleError = (error, req, res, next) => {
    console.log("Error: ", error)
    console.log("Request: ", req.body)
    res.status(error.status || 500).send({ result: { message: error.message || "Internal server error", type: "error", status: error.status || 500, instance: req.originalUrl } })
}

const handleNotFound = (req, res, next) => {
    console.log("Not found error")
    console.log("Request: ", req.body)
    res.status(404).send({ result: { message: "Not found", type: "error", status: 404, instance: req.originalUrl } })
}

module.exports = { handleError, handleNotFound }