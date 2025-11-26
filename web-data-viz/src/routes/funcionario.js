var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    console.log("passei aqui")
    funcionarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    console.log("passei aqui no .js")
    funcionarioController.autenticar(req, res);
});

router.put("/editar/:id", function (req, res) {
    funcionarioController.editar(req, res);
});

router.delete("/deletar/:email", function (req, res) {
    funcionarioController.deletar(req, res);
});

module.exports = router;