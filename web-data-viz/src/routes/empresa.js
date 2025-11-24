var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    console.log("passei aqui")
    empresaController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    console.log("passei aqui no .js")
    empresaController.autenticar(req, res);
});

router.put("/editar/:idEmpresa", function (req, res) {
    empresaController.editar(req, res);
});

router.delete("/deletar/:idEmpresa", function (req, res) {
    empresaController.deletar(req, res);
});

module.exports = router;