const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: String,
	date: String
});

mongoose.model('comments', commentSchema);

module.exports = commentSchema;
