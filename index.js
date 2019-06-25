const express = require("express");
const server = express();
server.use(express.json());

const users = ["Durval", "Vanessa", "Paulo", "Edilene"];
//Teste
server.get("/", (req, res) => {
  res.send("Hello World!");
});
//Recuperar usuarios
server.get("/users", (req, res) => {
  res.json(users);
});
//Recuperar usuario
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json(users[id]);
});
//Adicionar usuario
server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.json("Ok");
});
//Editar usuario
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users[id] = name;
  res.json("Ok");
});

//Excluir usuario
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  res.json("Ok");
});

server.listen(3000);
