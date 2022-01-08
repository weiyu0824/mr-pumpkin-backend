class BaseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor.name);
    }
};
class ApiError extends BaseError {
    constructor(message="This api does no exist", statusCode) {
        super(message, statusCode);
    }
}
class UnAuthorizedError extends BaseError {
    constructor(message="The resources you are aquiring is unauthorized", statusCode){
        super(message, statusCode);
    }
}

export default {
    ApiError,
    DataNotFoundError,
    PasswordError
}