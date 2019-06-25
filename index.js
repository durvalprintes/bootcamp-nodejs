const express = require("express");
const server = express();
server.use(express.json());

const users = ["Durval", "Vanessa", "Paulo", "Edilene"];
//Middlewares global
server.use((req, res, next) => {
  console.time("delay");
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("delay");
});
//Middlewares local - Check body
const checkNameUser = (req, res, next) => {
  if (!req.body.name) res.status(400).json({ error: "User name is required" });
  else next();
};
//Middlewares local - Check route
const checkIdUser = (req, res, next) => {
  const user = users[req.params.id];
  if (!user) res.status(400).json({ error: "User is not found" });
  else {
    req.user = user;
    next();
  }
};
//Teste
server.get("/", (req, res) => {
  res.send("Hello World!");
});
//Recuperar usuarios
server.get("/users", (req, res) => {
  res.json(users);
});
//Recuperar usuario
server.get("/users/:id", checkIdUser, (req, res) => {
  res.json(req.user);
});
//Adicionar usuario
server.post("/users", checkNameUser, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.json("Ok");
});
//Editar usuario
server.put("/users/:id", checkIdUser, checkNameUser, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users[id] = name;
  res.json("Ok");
});

//Excluir usuario
server.delete("/users/:id", checkIdUser, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  res.json("Ok");
});

server.listen(3000);
