const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/peliculas', { useNewUrlParser: true, useUnifiedTopology: true });

const Pelicula = mongoose.model('Pelicula', {
  titulo: String,
  director: String,
  genero: String,
  duracion: Number,
  calificacion: Number,
});

app.get('/peliculas', (req, res) => {
  Pelicula.find().then((peliculas) => {
    res.json(peliculas);
  });
});

app.post('/peliculas', (req, res) => {
  const pelicula = new Pelicula(req.body);
  pelicula.save().then(() => {
    res.json({ status: 'Pelicula agregada' });
  });
});

app.put('/peliculas/:id', (req, res) => {
  Pelicula.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.json({ status: 'Pelicula actualizada' });
  });
});

app.delete('/peliculas/:id', (req, res) => {
  Pelicula.findByIdAndDelete(req.params.id).then(() => {
    res.json({ status: 'Pelicula eliminada' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});