var http = require("http");
var url = require("url");

var server = http.createServer(function(req, res) {
  // On récupère le chemin après le port
  // ex: / => chemin par défaut
  var page = url.parse(req.url).pathname;
  console.log(page); // Affiche le pathname dans la console node

  // Renvoie un en-tête (header) qui a le status 200 => "OK" avec un type de contenu défini
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  if (page == "/") {
    res.write("Page d'accueil");
  } else if (page == "/bonjour.html") {
    res.write("Bonjour !");
  } else if (page == "/au_revoir.html") {
    res.write("Au revoir !");
  } else {
    // Si le pathname n'est connu, on a une erreur 404 qui l'indique au client
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<html><h1>404</h1><p>Y'a personne ici...</p>");
    console.error("Une erreur 404 a été retournée");
  }

  res.end();
});

// Déclenche l'ouverture du serveur sur le port 8080
server.listen(8080);

// ----------------------------------------------------------------------------- //

// Ça fait 2 requêtes car par défaut, une requête est faite pour récupérer le favicon

// localhost:8080 = 127.0.0.1:8080

// On peut voir les serveurs en local avec l'ipv4:PORT
// ex: 192.168.1.66:8080 => Serveur sur le pc de Guillaume

// Status 204, erreur 204 => Contenu vide
