var express = require("express");
var url = require("url");
var querystring = require("querystring");

// Créé un serveur "app"
var app = express();

app.get("/", function(req, res) {
  // On paramètre l'en-tête renvoyée (header)
  res.setHeader("Content-Type", "text/html");
  // On envoie de la données 
  res.send("<strong>Hello World</strong>");
});

app.get("/form.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(
    "<!DOCTYPE html>" +
      "<html>" +
      "    <head>" +
      "        <meta charset='utf-8'/>" +
      "        <title>Mon formulaire</title>" +
      "    </head>" +
      "    <body>" +
      "     	<form action='/resultat.html' method='GET'>" +
      "           <input type='text' name='nom' placeholder='votre nom'>" +
      "           <input type='text' name='prenom' placeholder='votre prénom'>" +
      "           <button type='submit'>GO</button>" +
      "       </form>" +
      "    </body>" +
      "</html>"
  );
});

app.get("/resultat.html", function(req, res) {
  res.setHeader("Content-Type", "text/html");

  // Créé un tableau associatif des queries de l'url
  var params = querystring.parse(url.parse(req.url).query);

  if ("prenom" in params || "nom" in params) {
    if (params["prenom"] === "" || params["nom"] === "") {
      res.send("Il faut remplir TOUT le formulaire");
    } else {
      res.send(
        "Hey! Vous vous appelez : " + params["prenom"] + " " + params["nom"]
      );
    }
  } else {
    res.send("Données incorrectes");
  }
});

// Si y'a aucune route trouvée => utilise app.use
app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/html");
  // On revoie le status 404 (erreur 404)
  res.status(404).send("404 : Y'a personne ici...");
  console.error("Une erreur 404 a été retournée");
});

// Le serveur écoute sur le port => 8080
app.listen(8080);
