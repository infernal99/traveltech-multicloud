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

app.listen(4003, () => {
  console.log("Wishlist service running on port 4003");
});