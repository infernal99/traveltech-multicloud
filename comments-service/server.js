const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

let comments = [];

// TEST
app.get("/", (req, res) => {
  res.json({ message: "Servicio de comentarios en funcionamiento" });
});

// GET ALL
app.get("/comments", (req, res) => {
  res.json(comments);
});

// ADD COMMENT
app.post("/comments", (req, res) => {
  const { country, comment } = req.body;

  if (!country || !comment) {
    return res.status(400).json({
      error: "País y comentario son obligatorios"
    });
  }

  const newComment = {
    id: Date.now(),
    country,
    comment
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});

// DELETE COMMENT
app.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const exists = comments.find(c => c.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Comentario no encontrado" });
  }

  comments = comments.filter(c => c.id !== id);

  res.json({ message: "Comentario eliminado" });
});

app.listen(PORT, () => {
  console.log(`Comments service ejecutándose en puerto ${PORT}`);
});