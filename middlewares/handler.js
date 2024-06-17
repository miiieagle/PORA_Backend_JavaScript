
const notFound = (req, res, next) => {
 
    const error = new Error (`Not Found : ${req.originalUrl}`);
    res.status(409);
    next(error);
}; 


const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = 'Internal Server Error';
    console.log({ Error: error.message})

    res.status(statusCode).json({
        status: 'error',
        message: message
    });
};

const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (err) {
            next(err);
        }
    }
};

module.exports = { errorHandler, notFound, asyncHandler };