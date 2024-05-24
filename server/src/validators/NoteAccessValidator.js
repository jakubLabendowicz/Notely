const Joi = require('joi');

const createNoteAccessSchema = Joi.object({
    userId: Joi.string().required().label("User Id"),
})

module.exports = {
    createNoteAccessSchema
}