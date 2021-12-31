import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { userModel, bookModel, wordModel } from '../models/model.js';

const router = express.Router();
router.use(bodyParser.json());


// get all users
router.get('/', async (req, res, next) => {
	try {
		const users = await userModel.find();
		res.send(users);
	} catch (err) {
		next(err);
	}
});

// get all books of a user
router.get('/:uid/books', async (req, res, next) => {
	const userId = req.params.uid;
	try {
		const books = await bookModel.find().where('belongerId').equals(userId);
		res.send(books);
	} catch (err) {
		next(err);
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
		next(err);
	}
});

// login
router.post('/login', async (req, res, next) => {
	console.log('logins')
	const { username, password } = req.body;
	try {
		// authentication
		let user = await userModel.findOne().where('userName').equals(username);
		console.log(user)
		if (user == null || user.password !== password) {
			res.status(401).json({
				message: "wrong username or password"
			});
		}

		// token
		const accessToken = generateAccessToken({ "username": username });
		res.json({ accessToken: accessToken });
	} catch (err) {
		next(err);
	}
});

// router.delete('/logout', async (req, res, next) => {

// })

// router.get('/token', async (req, res, next) => {

// })
function generateAccessToken(payload) {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
	return accessToken;
}
// function genrationRefreshToken() {

// }
export default router;