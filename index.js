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

//Read By Id -> GET /item/:id
app.get("/item/:id", (req, res) => {
  // Acesso ID no parâmetro de rota
  const id = req.params.id;

  // Acesso item na lista baseado no ID recebido
  const item = lista[id];

  // Envio o item obtido como resposta HTTP
  res.send(item);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
