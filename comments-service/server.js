const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

let comments = [];

// TEST
app.get("/", (req, res) => {
  res.json({ message: "Servicio de comentarios funcionando correctamente" });
});

// GET ALL COMMENTS
app.get("/comments", (req, res) => {
  res.json(comments);
});

// GET COMMENTS BY COUNTRY (MUY IMPORTANTE 🔥)
app.get("/comments/:country", (req, res) => {
  const country = req.params.country.toLowerCase();

  const filtered = comments.filter(
    c => c.country.toLowerCase() === country
  );

  res.json(filtered);
});

// ADD COMMENT
app.post("/comments", (req, res) => {
  const { country, comment } = req.body;

  if (!country || !comment) {
    return res.status(400).json({
      error: "Debes enviar country y comment"
    });
  }

  const newComment = {
    country,
    comment
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});

// DELETE ALL COMMENTS OF A COUNTRY
app.delete("/comments/:country", (req, res) => {
  const country = req.params.country.toLowerCase();

  const exists = comments.some(
    c => c.country.toLowerCase() === country
  );

  if (!exists) {
    return res.status(404).json({
      error: "No hay comentarios para ese país"
    });
  }

  comments = comments.filter(
    c => c.country.toLowerCase() !== country
  );

  res.json({ message: "Comentarios eliminados" });
});

app.listen(PORT, () => {
  console.log(`Comments service ejecutándose en puerto ${PORT}`);
});