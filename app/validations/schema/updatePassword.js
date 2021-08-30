const Joi = require('joi');

module.exports = Joi.object({
    password: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]\\S+$'))
}).required().length(1);
