var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.put("/ligar/:empresa_id", (req, res) => {
    slackController.ligar(req, res)
})

router.put("/ativar/:empresa_id", function (req, res) {
    console.log("passei aqui")
    slackController.ativar(req, res);
})

router.delete("/excluir/config/:empresa_id", function (req, res) {
    slackController.deletar(req, res);
});

module.exports = router;