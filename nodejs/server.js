const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
});

// Rota para adicionar um novo usuário
app.post("/api/usuarios", (req, res) => {
  const { nome, sobrenome } = req.body;
  connection.query(
    "INSERT INTO dados_form (nome, sobrenome) VALUES (?, ?)",
    [nome, sobrenome],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar usuário");
      } else {
        res.status(201).send("Usuário adicionado com sucesso");
      }
    }
  );
});

app.get("/api/usuarios", function (req, res) {
  connection.query("select * from dados_form", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erro ao adicionar usuário");
    } else {
      res.status(200).json(results);
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
