const mongoose = require('mongoose');
const CategorySchema = require('./category.js');
const CommentSchema = require('./comment.js');

const postSchema = new mongoose.Schema({
	title: String,
	postTitle: String,
	date: String,
	content: String,
	picture: String,
	category: CategorySchema,
	preview: String,
	comments: [CommentSchema]
});

mongoose.model('posts', postSchema);

module.exports = postSchema;
