const dotenv = require('dotenv')
const database = require('./database')
const express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
const useragent = require('express-useragent');
const routes = require('./src/routes/Routes')
dotenv.config()
const port = process.env.PORT || 8080


database()
    .then(() => {
        const app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(useragent.express());
        app.use("/api/v1", routes);
        app.listen(port, () => console.log(`Started server at http://localhost:${port}`));
    })




