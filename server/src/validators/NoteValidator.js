const Joi = require('joi');

const createNoteSchema = Joi.object({
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
    color: Joi.string().optional().label("Color"),
})

module.exports = {
    createNoteSchema
}