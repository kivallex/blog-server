const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const keys = require('./config');

require('./models/category.js');
require('./models/post.js');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'production') {
	app.use(cors('*'));
}

require('./api')(app);

app.listen(PORT);
