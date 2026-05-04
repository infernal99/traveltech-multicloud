const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


let favorites = [];

// TEST
app.get("/", (req, res) => {
  res.json({ message: "Servicio de favoritos en funcionamiento" });
});

// GET ALL
app.get("/favorites", (req, res) => {
  res.json(favorites);
});

// ADD
app.post("/favorites", (req, res) => {
  const { name, capital, region, population, flag } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre del país es obligatorio" });
  }

  const exists = favorites.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({ error: "El país ya está en favoritos" });
  }

  const newFavorite = { name, capital, region, population, flag };
  favorites.push(newFavorite);

  res.status(201).json(newFavorite);
});

// DELETE
app.delete("/favorites/:name", (req, res) => {
  const name = req.params.name;

  const exists = favorites.find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (!exists) {
    return res.status(404).json({ error: "No encontrado" });
  }

  favorites = favorites.filter(
    item => item.name.toLowerCase() !== name.toLowerCase()
  );

  res.json({ message: "Favorito eliminado" });
});

app.listen(PORT, () => {
  console.log(`Favorites service ejecutándose en puerto ${PORT}`);
});