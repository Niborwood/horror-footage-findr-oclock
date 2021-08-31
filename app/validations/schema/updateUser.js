const Joi = require('joi');

module.exports = Joi.object({
    pseudo: Joi.string().min(2).max(20),
    email: Joi.string().pattern(new RegExp('^[0-9a-z._%+-]+@[a-z0-9.-]+\\.[a-z]{1,4}}*$')),
    token: Joi.string().alphanum().min(3).max(200).required()
}).required().length(3);