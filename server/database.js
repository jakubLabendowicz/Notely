const mongoose = require("mongoose")
const database = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB || "mongodb://127.0.0.1:27017/notely", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to database at ' + process.env.DB);
            resolve();
        }).catch((error) => {
            console.error('Error connecting to database at ' + process.env.DB + ' \n', error);
            reject();
        });
    })
}

module.exports = database