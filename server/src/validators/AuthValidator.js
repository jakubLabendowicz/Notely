const Joi = require('joi');

const authenticateSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
})

module.exports = {
    authenticateSchema
}