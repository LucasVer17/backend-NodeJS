import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", (req, res) => {
  res.send("Olá mundo");
});

// Lista de Personagens
const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

//Read all => GET
app.get("/item", (req, res) => {
  res.send(lista);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
