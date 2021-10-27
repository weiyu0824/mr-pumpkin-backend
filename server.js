import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRouter from './routers/users.js';
import booksRouter from './routers/books.js';
import wordsRouter from './routers/words.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

// access-controller
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.get('Access-Control-Request-Headers')) {
        res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
    }
    if (req.get('Access-Control-Request-Method')) {
        res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'));
    }
    next();
});

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

// routers
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/words', wordsRouter);

// error-controller
app.use('/', (err, req, res, next) => {
    // write error log file
    // const log = `${moment().unix()} ERROR  ${err.stack}\n`;
    const log = 'log:';
    fs.appendFile('logs.txt', log, (err) => {
        if (err) console.error(err);
    });

    // send error
    res.sendStatus(err.status ? err.status : 500);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
