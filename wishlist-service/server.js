const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let wishlist = [];

app.get("/wishlist", (req, res) => {
  res.json(wishlist);
});

app.post("/wishlist", (req, res) => {
  wishlist.push(req.body);
  res.json({ message: "Added to wishlist" });
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Wishlist service running on port ${PORT}`);
});