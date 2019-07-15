const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: String
});

mongoose.model('categories', categorySchema);

module.exports = categorySchema;
