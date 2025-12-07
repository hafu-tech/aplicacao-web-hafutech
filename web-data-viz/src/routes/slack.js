var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.put("/ligar/:empresa_id", (req, res) => {
    slackController.ligar(req, res)
})

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.put("/ativar/:empresa_id/:estado", function (req, res) {
    console.log("passei aqui")
    slackController.cadastrar(req, res);
})

module.exports = router;