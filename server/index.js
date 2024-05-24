const dotenv = require('dotenv')
const database = require('./database')
const express = require('express')
const routes = require('./src/routes/Routes')
dotenv.config()
const port = process.env.PORT || 8080

database()
    .then(() => {
        express()
            .use("/api/v1", routes)
            .listen(port, () => console.log(`Started server at http://localhost:${port}`))
    })




