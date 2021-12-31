class BaseError extends Error {
    constructor(message, status, isPublic, code) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        this.status = status;
        this.isPublic = isPublic;
        this.code = code;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(this, this.constructor.name);
    }
};
class ApiError extends BaseError {
    constructor(message="This api does no exist", status, isPublic, code) {
        super(message, status, isPublic, code);
    }
}
class DataNotFoundError extends BaseError {
    constructor(message="The data your are looking for does not exist", status, isPublic=true, code=404) {
        super(message, status, isPublic, code);

    }
}
class PasswordError extends BaseError {
    constructor(message="Wrong password, try again", status, isPublic, code){
        super(message, status, isPublic, code);
    }
}

export default {
    ApiError,
    DataNotFoundError,
    PasswordError
}