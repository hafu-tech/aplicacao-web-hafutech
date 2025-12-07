var empresaModel = require("../models/empresaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        empresaModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome_fantasia: resultadoAutenticar[0].nome_fantasia,
                                        senha: resultadoAutenticar[0].senha
                                        
                                     });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function cadastrar(req, res) {
    
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;
    console.log("passei aqui 2")

    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else{

        empresaModel.cadastrar(nome, email, senha, cnpj)
            .then(
                function (resultado) {
                    res.status(201).json({
                        empresa_id: resultado.insertId
                    })
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novaSenha = req.body.novaSenha;
    var id = req.body.id;

    empresaModel.editar(novaSenha, id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar a senha: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {

    var id = req.params.id;

    empresaModel.deletar(id)
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
    autenticar,
    cadastrar,
    editar,
    deletar
}