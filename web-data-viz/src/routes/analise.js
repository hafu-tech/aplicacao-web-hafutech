var express = require("express");
var router = express.Router();

var analiseController = require("../controllers/analiseController");

router.get("/listar", function (req, res) {
    analiseController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    analiseController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    analiseController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    analiseController.publicar(req, res);
});

router.put("/editar/:idAnalise", function (req, res) {
    analiseController.editar(req, res);
});

router.delete("/deletar/:idAnalise", function (req, res) {
    analiseController.deletar(req, res);
});

module.exports = router;