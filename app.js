const express = require("express"); // import express
const app = express();
const Post = require("./api/models/posts"); //get the specific class
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
	},
});

const getExt = (mimetype) => {
	switch (mimetype) {
		case "image/png":
			return ".png";
		case "image/jpeg":
			return ".jpg";
	}
};

var upload = multer({ storage: storage });
const postsData = new Post();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));
// למה אצל נאז האקספרס מופיע בכחול?

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

app.post("/api/posts", upload.single("post-image"), (req, res) => {
	const newPost = {
		id: `${Date.now()}`, //id,title en the rest where in "" but prettier changed it like this without the ""
		title: req.body.title,
		content: req.body.content,
		post_image: req.file.path,
		added_date: `${Date.now()}`,
	};
	postsData.add(newPost);
	res.status(201).send("ok"); // 201 = something has been created or added
});

app.listen(3000, () => console.log("Listening on http://localhost:3000")); //initialize the server

// with the lines bellow above res.status(200) we've tested putting a new blog to data.json file.
// const test = {
// 	testing: "testing"
// }
// postsData.add(test)
