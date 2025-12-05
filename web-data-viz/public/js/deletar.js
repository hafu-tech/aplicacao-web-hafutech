function exibirMensagem(mensagem) {
  cardErro.innerText = mensagem;
}


function deletarFuncionario() {
  var email = input_email_funcionario.value
  fetch(`/funcionario/deletar/${email}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {

    if (resposta.ok) {
      window.alert("Usuário deletado com sucesso!");
      window.location = "../empresa/criar-usuario.html"
    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}