const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let favorites = [];

app.get("/favorites", (req, res) => {
  res.json(favorites);
});

app.post("/favorites", (req, res) => {
  favorites.push(req.body);
  res.json({ message: "Added to favorites" });
});

app.listen(4001, () => {
  console.log("Favorites service running on port 4001");
});