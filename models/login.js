const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
	password: String
});

mongoose.model('login', loginSchema);

module.exports = loginSchema;
