var express = require("express");
// Lance le serveur par l'appelle d'express
var app = express();
var url = require("url");
// Module qui permet de créer des templates
var ejs = require("ejs");
// Module pour créer un tableau des queries
var querystring = require("querystring");
// Permet d'agir sur les fichiers systeme
var fs = require("fs");

app.get("/:utilisateur/creation.html", function(req, res) {
  // Renvoie le template creation.ejs
  res.render("creation.ejs", { utilisateur: req.params.utilisateur });
});

app.get("/:utilisateur/resultat.html", function(req, res) {
  // Créer un tableau associatif des queries renvoyées par le formulaire
  var params = querystring.parse(url.parse(req.url).query);

  if ("question" in params && "reponse" in params) {
    if (params["question"] === "" || params["reponse"] === "") {
      res.send("Il faut remplir TOUT le formulaire");
    } else {
      var maCarte = {
        question: params["question"],
        reponse: params["reponse"]
      };

      // Affiche la carte créée
      console.log(maCarte);

      // Mettre la carte en mode string (chaîne de caractères)
      var maCarteJson = JSON.stringify(maCarte);

      // Correspond au chemin vers lequel on va créer les cartes
      var path = "data/" + req.params.utilisateur + ".json";

      // Créer un fichier JSON avec l'apparence de maCarteJson
      fs.writeFile(path, maCarteJson, function(err) {
        if (err) {
          res.send("Désolé une erreur est survenue...");
          console.error(err);
          throw error;
        } else {
          // Utilise le template resultat.ejs avec une variable
          res.render("resultat.ejs", { utilisateur: req.params.utilisateur });
          // Affiche l'auteur de la carte
          console.log(req.params.utilisateur);
          console.log("J'ai écrit ce pu... de fichier avec succès !!!");
        }
      });
    }
  } else {
    res.send("Données incorrectes");
  }
});

app.listen(8080);
