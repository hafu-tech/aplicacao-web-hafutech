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
                    sessionStorage.TIPO_USUARIO = json.tipo_usuario;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome_completo;
                    sessionStorage.ID_USUARIO = json.id_usuario;
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