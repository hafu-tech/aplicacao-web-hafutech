var slackModel = require("../models/slackModel");

function ligar(req, res) {

    var empresa_id = req.params.empresa_id;

    slackModel.ligar(empresa_id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function ativar(req, res) {
    var empresa_id = req.params.empresa_id;
    var estado = req.body.estado;

    slackModel.ativar(empresa_id, estado)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao ativar ou desativar a notificação : ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {

    var id = req.params.empresa_id;

    slackModel.deletar(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o usuário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    ligar,
    ativar,
    deletar
}