var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/esp", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Recebi a requisição de dados");
  dados = {
    action: 1,
    sensor: "LED",
    status: "ON",
  };
  json = JSON.stringify(dados);
  res.send(json);
});

app.post("/esp", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req);
  console.log(req.body);
  texto = req.body;
  console.log(texto);
  console.log("Recebi um dado");
  res.send(texto);
});

app.listen(port, () => {
  console.log(`Server running at:${port}/`);
});