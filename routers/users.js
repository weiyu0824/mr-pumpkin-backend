import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { userModel, bookModel, wordModel, tokenModel } from '../models/model.js';

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
	const { username, password } = req.body;
	try {
		throw Error('self defined')
	}
	catch(err) {
		next(err);
	}
	// try {
		// authentication
		let user = await userModel.findOne().where('userName').equals(username);
		if (user == null || user.password !== password) {
			res.status(401).json({
				message: "wrong username or password"
			});
		} else {
			// token
			const payload = { "username": username };
			const accessToken = generateAccessToken(payload);
			const refreshToken = generateRefreshToken(payload);

			res.json({
				"accessToken": accessToken,
				"refreshToken": refreshToken
			});

			// put to token db
			const token = tokenModel.new({
				"username": payload.username,
				"token": refreshToken
			})
			tokenModel.save(token);
			next();
		}
	// } catch (err) {
	// 	next(err);
	// }
});

router.post('/token', async (req, res, next) => {
	const token = req.body.token;
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			res.sendStatus(401);
			return;
		}
		
		const payload = {
			username: decoded.username
		}
		const accessToken = generateAccessToken(decoded);
		res.json({
			"accessToken": accessToken
		});
	})
})

router.delete('/logout', async (req, res, next) => {
	const token = req.token;
	try {
		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
	}catch (err) {
		return res.sendStatus(401);
	}

	try {
		const token = tokenModel.findOne().where('token').equals(token);
		if (token == null)
			return res.sendStatus(401);
		await tokenModel.deleteOne.where('token').equals(token);
		next();
	}catch (err) {
		 next(err);
	}
})

function generateAccessToken(payload) {
	const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
	return accessToken;
}

function generateRefreshToken(payload) {
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
	return refreshToken;
}

export default router;