var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

dados = {
  winner: "none",
};

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/esp", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi a requisição de dados");
  console.log(dados['winner']);
  json = JSON.stringify(dados['winner']);
  res.send(json);
});

app.post("/esp", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req);
  console.log(req.body);
  texto = req.body;
  console.log("Recebi um dado");
  console.log(texto);
  dados['winner'] = texto['Winner'];
  console.log(dados['winner']);
  res.send(texto);
});

app.listen(port, () => {
  console.log(`Server running at:${port}/`);
});
