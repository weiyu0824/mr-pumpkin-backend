import express from 'express';
import bodyParser from 'body-parser';
import { userModel, bookModel, wordModel } from '../models/model.js';
import { createWord, updateWord, deleteWord } from '../models/query.js';

const router = express.Router();
router.use(bodyParser.json())

// get all words (Testing function)
router.get('/', async (req, res, next) => {
    try {
        const words = await wordModel.find();
        res.send(words);
    }catch(err){
        next(err);
    }

})

// get all words of the book
router.get('/:bid', async (req, res, next) => {
    try {
        const words = await wordModel.find().where('bookId').equals(req.params.bid);
        res.send(words);
    }catch(err){
        next(err);
    }
})

// update a word for the book
router.put('/:wid', async (req, res, next) => {
    
})

export default router;