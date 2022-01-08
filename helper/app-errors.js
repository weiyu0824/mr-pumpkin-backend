class BaseError extends Error {
    /**
     * 
     * @param {*} message 
     * @param {*} statusCode 
     */
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = true; // This variable indicates if the Error is operational error.
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor.name);
    }
};
class ApiError extends BaseError {
    constructor(message="This api does no exist.", statusCode) {
        super(message, statusCode);
    }
}
class UnAuthorizedError extends BaseError {
    constructor(message="The resources you are aquiring is unauthorized.", statusCode){
        super(message, statusCode);
    }
}
class UsernameError extends BaseError {
    constructor (message="The username you entered doesn't belong to an account. Please check your username and try again.", statusCode) {
        super(message, statusCode);
    }
}
class PasswordError extends BaseError {
    constructor(message="Sorry, your password was incorrect. Please double-check your password.", statusCode){
        super(message, statusCode);
    }
}

export default {
    ApiError,
    UnAuthorizedError,
    UsernameError,
    PasswordError
}