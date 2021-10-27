import express from 'express';
import bodyParser from 'body-parser';
import { userModel, bookModel, wordModel } from '../models/model.js';

const router = express.Router();
router.use(bodyParser.json());

// get all users
router.get('/', async (req, res, next) => {
	try {
		const users = await userModel.find();
		res.send(users);
	} catch (err) {
		next(err, req, res, next);
	}
});

// get all books of a user
router.get('/:uid/books', async (req, res, next) => {
	const userId = req.params.uid;
	try {
		const books = await bookModel.find().where('belongerId').equals(userId);
		res.send(books);
	} catch (err) {
		next(err, req, res, next);
	}
});

// create an user
router.post('/', async (req, res, next) => {
	try {
		const newUser = new userModel({
			userName: req.body.userName,
			password: req.body.password,
			email: req.body.email,
		});
		const user = await newUser.save();
		res.send(user);
	} catch (err) {
		next(err, req, res, next);
	}
});

export default router;