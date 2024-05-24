const mongoose = require("mongoose")
const database = () => {
    return new Promise((resolve, reject) => {
        const dburl = process.env.DB || "mongodb://127.0.0.1:27017/notely"
        mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to database at ' + dburl);
            resolve();
        }).catch((error) => {
            console.error('Error connecting to database at ' + dburl + ' \n', error);
            reject();
        });
    })
}

module.exports = database