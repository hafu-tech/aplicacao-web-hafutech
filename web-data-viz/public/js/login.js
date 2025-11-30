function exibirMensagem(mensagem) {
    cardErro.innerText = mensagem;
}

function entrar() {

    let emailVar = email_input.value;
    let senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        exibirMensagem("Verifique os dados e tente novamente.")
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/empresa/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome_fantasia;
                sessionStorage.ID_USUARIO = json.id;
                exibirMensagem("Login efetuado com sucesso!");

                setTimeout(function () {
                    window.location = "../index-logado.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {
            exibirMensagem("Verifique os dados e tente novamente.")
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function entrarFuncionario() {

    let emailVar = email_input.value;
    let senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        exibirMensagem("Verifique os dados e tente novamente.")
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/funcionario/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome_funcionario;
                sessionStorage.ID_USUARIO = json.id;
                exibirMensagem("Login efetuado com sucesso!");

                if (emailVar == senhaVar) {
                    setTimeout(function () {
                        window.location = "../dashboard/funcionario/edicao-funcionario.html";
                        sessionStorage.MOSTRAR_MODAL = true
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        window.location = "../dashboard/funcionario/dashboard-funcionario.html";
                    }, 1000); // apenas para exibir o loading

                }

            });

        } else {
            exibirMensagem("Verifique os dados e tente novamente.")
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}