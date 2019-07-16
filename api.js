const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const Category = mongoose.model('categories');
const Comment = mongoose.model('comments');

module.exports = app => {
	app.post('/api/login', (req, res) => {
		const password = req.body.password;

		if (password === (process.env.PASSWORD || 'kivallex')) {
			res.send();
		} else {
			res.status(401).send();
		}
	});

	// load all the posts
	app.get('/api/posts', async (req, res) => {
		const posts = await Post.find({});
		res.send(posts);
	});

	app.get('/api/post', async (req, res) => {
		const category = req.query.category;
		const title = req.query.title;

		const post = await Post.findOne({
			'category.name': category,
			postTitle: title
		});
		res.send(post);
	});

	app.post('/api/create', async (req, res) => {
		const categoryName = req.body.category;
		const category = await Category.findOne({ name: categoryName });

		const post = {
			title: req.body.title,
			picture: req.body.picture,
			content: req.body.content,
			preview: req.body.preview,
			date: new Date().toLocaleDateString('en-US'),
			comments: [],
			category
		};

		post.postTitle = post.title
			.split(' ')
			.join('-')
			.toLowerCase();

		await new Post(post).save();

		res.send();
	});

	app.post('/api/create/category', async (req, res) => {
		const name = req.body.name;
		const category = new Category({ name });
		await category.save();

		res.send();
	});

	app.post('/api/create/comment', async (req, res) => {
		const commentContent = req.body.comment;
		const comment = new Comment({
			content: commentContent,
			date: new Date().toLocaleDateString('en-US')
		});
		const postID = req.body.postID;

		const post = await Post.findById(postID);
		post.comments.push(comment);

		await post.save();

		res.send();
	});

	app.get('/api/category', async (req, res) => {
		const categories = await Category.find({});
		res.send(categories);
	});

	// test route
	app.get('/api/posts/test', async (req, res) => {
		// let category = new Category({
		// 	name: 'meme'
		// });
		// const post = new Post({
		// 	title: 'Kappa King',
		// 	postTitle: 'kappa-king',
		// 	date: 'July 9, 2019',
		// 	content: '<p>I am big bird that knows big meme</p>',
		// 	preview: 'I am big bird that knows big meme',
		// 	picture: 'https://i.imgur.com/6Z3rkgv.jpg',
		// 	category: category
		// });
		//
		// await category.save();
		// await post.save();
		//
		// category = new Category({
		// 	name: 'food'
		// });
		// await category.save();
		// category = new Category({
		// 	name: 'travel'
		// });
		// await category.save();

		// const posts = await Post.find({});
		//
		// const removePromise = [];
		// for (const post of posts) {
		// 	removePromise.push(post.remove());
		// }
		//
		// const categories = await Category.find({});
		// for (const category of categories) {
		// 	removePromise.push(category.remove());
		// }
		// await Promise.all(removePromise);

		res.send('Success');
	});
};
