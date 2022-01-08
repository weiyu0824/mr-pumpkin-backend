import express from 'express';
import bodyParser from 'body-parser';
import { userModel, bookModel, wordModel } from '../models/model.js';
import { createWord, updateWord, deleteWord } from '../models/query.js';
import authenticateToken from '../middlewares/authenticate-token.js';
const router = express.Router();
router.use(bodyParser.json());

// get all books (Testing function)
router.get('/', authenticateToken, async (req, res, next) => {
    console.log(req.username);
    try {
        const books = await bookModel.find();
        res.send(books);
    } catch (err) {
        next(err);
    }
});

// get info of the book
router.get('/:bid', async (req, res, next) => {
    const bookId = req.params.bid;
    try {
        const book = await bookModel.findById(bookId);
        res.send(book);
    } catch (err) {
        next(err);
    }
});

// get details of the book
router.get('/:bid/details', async (req, res, next) => {
    const bookId = req.params.bid;
    try {
        const book = await bookModel.findById(bookId);
        const words = await wordModel.find()
                                .where('bookId').equals(bookId)
                                .select('_id word definition');
        res.send({
            bookId: book._id,
            bookName: book.bookName,
            words,
        });
    } catch (err) {
        next(err);
    }
});

// create a book
router.post('/', async (req, res, next) => {
    try {
        // create book
        const newBook = new bookModel({
            bookName: req.body.bookName,
            belongerId: req.body.belongerId,
        });
        await newBook.save();

        res.send(newBook);
    } catch (err) {
        next(err);
    }
});
// update the book (words)
router.put('/:bid/words', async (req, res, next) => {
    try {
        const bookId = req.params.bid;
        for (const word of req.body.words) {
        //     // guardien
        //     if (word.word === "" || word.operation === ""){

        //     }
            // operation
            if (word.operation === 'create') {
                await createWord(req, res, next, word.word, word.definition, bookId);
            } else if (word.operation === 'update') {
                await updateWord(req, res, next, word.word, word.definition, word.wordId);
            } else if (word.operation === 'delete') {
                await deleteWord(req, res, next, word.wordId, bookId);
            }
        }
        res.send({
            msg: 'ok',
        });
    } catch (err) {
        next(err);
    }
});

// update only the bookname
router.put('/:bid/bookname', async (req, res, next) => {
    const newName = req.body.bookName;
    const bookId = req.params.bid;
    try {
        await bookModel.updateOne({ _id: bookId }, {
            bookName: newName,
        });
        const book = await bookModel.findById(bookId);
        res.send(book);
    } catch (err) {
        next(err);
    }
});

// update privacy setting of the book
router.put('/:bid/setting/', async (req, res, next) => {

});

// delete the book
router.delete('/:bid', async (req, res, next) => {
    const bookId = req.params.bid;
    try {
        await bookModel.deleteMany({ _id: bookId });
        await wordModel.deleteMany({ bookId });
        res.send({
            msg: 'success',
        });
    } catch (err) {
        next(err);
    }
});

export default router;
