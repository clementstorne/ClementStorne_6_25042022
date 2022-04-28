// On importe mongoose qui fait le lien entre Express et MongoDB
const mongoose = require("mongoose");

// On se connecte à MongoDB grâce à mongoose
mongoose
  .connect(
    "mongodb+srv://admin:azerty@cluster0.4nsox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// On importe le framework express
const express = require("express");

// On crée un raccourci pour appeler express
const app = express();

// Permet d'analyser le corps de la requête
app.use(express.json());

// Pour éviter les erreurs de CORS
app.use((req, res, next) => {
  // Pour accéder à l'API depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Pour autoriser certains headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Pour autoriser certaines méthodes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// On importe le routeur d'utilisateurs dans l'API
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);

// On importe le routeur de sauces dans l'API
const sauceRoutes = require("./routes/sauce");
app.use("/api/sauces", sauceRoutes);

// L'accès aux images doit être géré de façon statique
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

// On exporte l'API créée
module.exports = app;
