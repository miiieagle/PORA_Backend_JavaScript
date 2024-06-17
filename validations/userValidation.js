const Joi = require('joi');
const STATUSCODE = require("../utils/statusCodes");
const formatResult = require("../utils/formatResult");

exports.authValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email required valid email',
            'any.required': 'Email required valid email'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        }),
    });

    const validateOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    const result = schema.validate(req.body, validateOptions);

    if (result.error) {
        const formattedResult = formatResult(result);
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: formattedResult.message,
            },
        });
    }

    next();
};
