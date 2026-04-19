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

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Comments service running on port ${PORT}`);
});