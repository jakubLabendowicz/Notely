const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },

    createdAt: { type: Date, required: false },

    isUpdated: { type: Boolean, default: false },
    updatedById: { type: String, required: false },
    updatedAt: { type: Date, required: false },
})

const User = mongoose.model("User", userSchema)

module.exports = User;
