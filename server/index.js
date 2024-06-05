const dotenv = require('dotenv')
const database = require('./database')
const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/Routes')
dotenv.config()
const port = process.env.PORT || 8080


database()
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use("/api/v1", routes);
        app.listen(port, () => console.log(`Started server at http://localhost:${port}`));
    })




