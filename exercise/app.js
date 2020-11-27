const express = require("express"); // import express
const app = express();
const Post = require("./api/models/posts"); //get the specific class
const postsData = new Post();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/posts", (req, res) => {
	res.status(200).send(postsData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
	const postId = req.params.post_id;
	const foundPost = postsData.getIndividualBlog(postId);
	if (foundPost) {
		res.status(200).send(foundPost);
	} else {
		res.status(404).send("not found");
	}
});

app.listen(3000, () => console.log("Listening on http://localhost:3000")); //initialize the server

/* with the lines bellow above res.status(200) we've tested putting a new blog to data.json file.
const test = {
	testing: "testing"
}
postsData.add(test); */