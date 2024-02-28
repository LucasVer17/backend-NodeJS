import express from "express";
import { MongoClient, ObjectId } from "mongodb";
require("dotenv").config();

const app = express();
const port = 3000;

const dbUrl = process.env.DATABASE_URL;
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

  const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

  const db = client.db(dbName);
  const collection = db.collection("items");

  app.get("/item", async (req, res) => {
    const items = await collection.find().toArray();
    res.send(items);
  });

  app.get("/item/:id", async (req, res) => {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  });

  app.use(express.json());

  app.post("/item", async (req, res) => {
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });

  app.put("/item/:id", async (req, res) => {
    const id = req.params.id;
    const novoItem = req.body;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: novoItem });
    res.send("Item atualizado!");
  });

  app.delete("/item/:id", async (req, res) => {
    const id = req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.send("Item removido com sucesso");
  });

  app.listen(port, () => {
    console.log("Rodando na porta " + port);
  });
}

main();
