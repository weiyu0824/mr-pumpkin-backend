import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs'
import usersRouter from './routers/users.js';
import booksRouter from './routers/books.js';
import wordsRouter from './routers/words.js';
import Error from './helper/AppError.js'
import errorHandler from './middlewares/error-handler.js';
import accessController from './middlewares/access-controller.js';
const ApiError = Error.ApiError;
const DataNotFoundError = Error.DataNotFoundError;
const PasswordError = Error.PasswordError;

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
// db
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
});
db.once('open', () => {
    console.log('connected to Mongodb');
});

// access controller
app.use('/', accessController);

// routers
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/words', wordsRouter);

// error handler
app.use('/', errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

