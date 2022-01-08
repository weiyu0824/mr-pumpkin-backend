import fs from 'fs';

function errorLogger (err, req, res, next) {
    console.error('\x1b[31m', err)
    next(err);
}
function errorResponder (err, req, res, next) {
    if (err.isOperational == true){
        return res.status(err.statusCode).send(err.message);
    }else {
        next(err);
    }
}
function failSafeHandler (err, req, res, next) {
    return res.status(500).send("Internal Sever Error");
}

export default {
    errorLogger,
    errorResponder,
    failSafeHandler
};