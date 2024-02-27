import express from "express";
import { ClientEncryption, MongoClient } from "mongodb";

const app = express();
const port = 3000;

const dbUrl =
  "mongodb+srv://admin:zzUDlM57V2kLWxq1@cluster0.e16epq3.mongodb.net";
const dbName = "JornadaBackend";

async function main() {
  const client = new MongoClient(dbUrl);

  console.log("Conectando DB...");
  await client.connect();
  console.log("DB conectado com sucesso");

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  app.get("/oi", (req, res) => {
    res.send("Olá mundo");
  });

  // Lista de Personagens
  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName);
  const collection = db.collection("items");

  //Read all => GET
  app.get("/item", async (req, res) => {
    const items = await collection.find().toArray();
    res.send(items);
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

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json());

  // Create -> POST /item
  app.post("/item", (req, res) => {
    // Extraímos o corpo da requisição
    const body = req.body;

    // Pegamos o nome (string) que foi enviado dentro do corpo
    const item = body.nome;

    // Colocamos o nome dentro de uma lista de itens
    lista.push(item);

    // Enviamos uam resposta de suceso
    res.send("Item adicionado com sucesso");
    console.log(lista);
  });

  app.listen(port, () => {
    console.log("Rodando na porta " + port);
  });
}

main();
