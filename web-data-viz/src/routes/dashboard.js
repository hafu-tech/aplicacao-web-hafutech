var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/pontos-inse-regiao", function (req, res) {
    dashboardController.pontosInsePorRegiao(req, res);
});


router.get("/media-inse-rede", function (req, res) {
    dashboardController.mediaInsePorRede(req, res);
});

router.get("/alunos-nivel-inse", function (req, res) {
    dashboardController.alunosPorNivelInse(req, res);
});

router.get("/escolas-criticas-regiao", function (req, res) {
    dashboardController.escolasCriticasPorRegiao(req, res);
});

router.get("/total-escolas-criticas", function (req, res) {
    dashboardController.totalEscolasCriticas(req, res);
});

router.get("/total-alunos-criticos", function (req, res) {
    dashboardController.totalAlunosCriticos(req, res);
});

module.exports = router;
