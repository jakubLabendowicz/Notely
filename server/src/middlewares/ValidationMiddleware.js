const { HTTPError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require("../types/HTTPError")

const verifyBodyData = (schema) => {
    return async (req, res, next) => {
        try {
            const { error, value } = await schema.validate(req.body.data);
            if (error) {
                throw new BadRequestError(error.details[0].message);
            }
            req.body.validationData = value;
            next();
        } catch (error) {
            next(error);
        }        
    };
};

module.exports = { verifyBodyData }