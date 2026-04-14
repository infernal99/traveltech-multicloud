const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let comments = [];

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.post("/comments", (req, res) => {
  comments.push(req.body);
  res.json({ message: "Comment added" });
});

app.listen(4002, () => {
  console.log("Comments service running on port 4002");
});