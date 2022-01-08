import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true

	},
	email: {
		type: String,
		required: true
	}
})
const bookSchema = new mongoose.Schema({
	bookName: {
		type: String,
		required: true
	},
	belongerId: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: true
	},
	words: {
		type: [String],
		required: true
	}


})
const wordSchema = new mongoose.Schema({
	word: {
		type: String,
		required: true
	},
	definition: {
		type: String,
		required: true
	},
	bookId: {
		type: String,
		required: true
	}
})
const tokenSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
})

export const userModel = mongoose.model('User', userSchema);
export const bookModel = mongoose.model('Collection', bookSchema);
export const wordModel = mongoose.model('Word', wordSchema);
export const tokenModel = mongoose.model('Token', tokenSchema);
