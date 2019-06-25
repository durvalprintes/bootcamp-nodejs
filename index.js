const express = require("express");
const server = express();
server.use(express.json());

const users = ["Durval", "Vanessa", "Paulo", "Edilene"];
//Rota raiz
server.get("/", (req, res) => {
  res.send("Hello World!");
});
//Rota recupera todos
server.get("/users", (req, res) => {
  res.json(users);
});
//Rota recupera usuario
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json(users[id]);
});
//Rota cria usuario
server.post("/users/:id", (req, res) => {
  const { name } = req.body;
  users.push(name);
  req.json("Ok");
});
//Rota edita usuario
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users[id] = name;
  req.json("Ok");
});

//Rota deleta usuario
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  req.json("Ok");
});

server.listen(3000);
