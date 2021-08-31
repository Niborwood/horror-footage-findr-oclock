const Joi = require('joi');

module.exports = Joi.object({
    password: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]\\S+$')),
    token: Joi.string().alphanum().min(3).max(200).required()
}).required().length(2);
