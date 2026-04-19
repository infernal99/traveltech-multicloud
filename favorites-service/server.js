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

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Favorites service running on port ${PORT}`);
});