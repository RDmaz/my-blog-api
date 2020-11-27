const PATH = "./data.json";
const fs = require("fs");

class Post {
	get() {
		/* get posts */
		return this.readData();
	}

	getIndividualBlog(postId) {
		/* get one blog post */
		const posts = this.readData(); //this will give me the list of posts
		const foundPost = posts.find((post) => post.id == postId);
		return foundPost;
	}

	add(newPost) {
		/* add new post */
		const currentPosts = this.readData();
		currentPosts.unshift(newPost);
		this.storeData(currentPosts);
	}

	readData() {
		let rawdata = fs.readFileSync(PATH);
		let posts = JSON.parse(rawdata);
		return posts;
	}

	storeData(rawData) {
		let data = JSON.stringify(rawData);
		fs.writeFileSync(PATH, data);
	}
}

module.exports = Post; //we need to export in order to be able to import it, like we do in app.js
