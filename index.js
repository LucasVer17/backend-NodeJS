import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/oi", (req, res) => {
  res.send("Olá mundo");
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
