var dashboardModel = require("../models/dashboardModel");

function pontosInsePorRegiao(req, res) {
    dashboardModel.pontosInsePorRegiao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        }).catch(function (erro) {
            console.log("Erro ao buscar pontos INSE por região: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function mediaInsePorRede(req, res) {
    dashboardModel.mediaInsePorRede()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        }).catch(function (erro) {
            console.log("Erro ao buscar média INSE por rede: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function alunosPorNivelInse(req, res) {
    dashboardModel.alunosPorNivelInse()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        }).catch(function (erro) {
            console.log("Erro ao buscar alunos por nível INSE: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function escolasCriticasPorRegiao(req, res) {
    dashboardModel.escolasCriticasPorRegiao()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        }).catch(function (erro) {
            console.log("Erro ao buscar escolas críticas por região: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function totalEscolasCriticas(req, res) {
    dashboardModel.totalEscolasCriticas()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar total de escolas críticas: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function totalAlunosCriticos(req, res) {
    dashboardModel.totalAlunosCriticos()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum dado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar total de alunos críticos: ", erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    pontosInsePorRegiao,
    mediaInsePorRede,
    alunosPorNivelInse,
    escolasCriticasPorRegiao,
    totalEscolasCriticas,
    totalAlunosCriticos
};