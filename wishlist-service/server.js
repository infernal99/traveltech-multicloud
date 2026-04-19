const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

let wishlist = [];

// TEST
app.get("/", (req, res) => {
  res.json({ message: "Servicio de wishlist en funcionamiento" });
});

// GET ALL
app.get("/wishlist", (req, res) => {
  res.json(wishlist);
});

// ADD
app.post("/wishlist", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "El nombre del país es obligatorio"
    });
  }

  const exists = wishlist.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({
      error: "El país ya está en la wishlist"
    });
  }

  const newItem = { name };
  wishlist.push(newItem);

  res.status(201).json(newItem);
});

// DELETE
app.delete("/wishlist/:name", (req, res) => {
  const name = req.params.name;

  const exists = wishlist.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (!exists) {
    return res.status(404).json({ error: "No encontrado" });
  }

  wishlist = wishlist.filter(
    item => item.name.toLowerCase() !== name.toLowerCase()
  );

  res.json({ message: "Eliminado de wishlist" });
});

app.listen(PORT, () => {
  console.log(`Wishlist service ejecutándose en puerto ${PORT}`);
});