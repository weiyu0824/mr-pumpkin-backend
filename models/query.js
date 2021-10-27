import { userModel, bookModel, wordModel } from './model.js';

export async function createWord(req, res, next, word, definition, bookId) {
    // create a word
    try {
        let newWord = new wordModel({
            word: word,
            definition: definition,
            bookId: bookId
        });
        newWord = await newWord.save();
        console.log(newWord);
        let book = await bookModel.findById(bookId)
        book.words.push(newWord._id)
        book = await book.save()
    } catch (err) {
        next(err, req, res, next);
    }
}
export async function updateWord(req, res, next, word, definition, wordId) {
    // update a word
    console.log("___________")
    console.log(word)
    console.log(definition)
    console.log(wordId)
    console.log("___________")
    try {
        await wordModel.updateOne({ '_id': wordId }, {
            'word': word,
      'definition': definition
        })

    } catch (err) {
        next(err, req, res, next);
    }
}
export async function deleteWord(req, res, next, wordId, bookId) {
    // delete only a word
    try {
        await wordModel.deleteOne({ '_id': wordId })
        let book = bookModel.findById(bookId)
        let filtered = book.words.filter(function (value, index, arr) {
            return value != wordId
        });
        book.words = filtered
        await book.save()

    } catch (err) {
        next(err, req, res, next);
    }
}
// function reorderWord(wordId, bookId, currentPos, targetPos) {

// }
// export default {
//     createWord, 
//     updateWord, 
//     deleteWord, 
//     reorderWord
// }