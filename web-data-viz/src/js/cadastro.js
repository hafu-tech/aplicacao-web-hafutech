 function exibirMensagem(mensagem) {
  cardErro.innerText = mensagem;
}

function cadastrar() {
  var nomeVar = nome_input.value;
  var emailVar = email_input.value.trim();
  var cnpjVar = cnpj_input.value.trim();
  var senhaVar = senha_input.value;
  var confirmacaoVar = confirmacao_senha_input.value;

  if (
    nomeVar.length === 0 ||
    emailVar.length === 0 ||
    senhaVar.length === 0 ||
    confirmacaoVar.length === 0 ||
    cnpjVar.length === 0 
  ) {
    exibirMensagem("Por favor, preencha todos os campos.", "erro");
    return false;
  }

  if (!emailVar.includes("@") || !emailVar.includes(".")) {
    exibirMensagem("O e-mail precisa conter '@' e '.'", "erro");
    return false;
  }

  var dominio = emailVar.toLowerCase();
  if (
    !dominio.endsWith(".com") &&
    !dominio.endsWith(".com.br") &&
    !dominio.endsWith(".edu") &&
    !dominio.endsWith(".net") &&
    !dominio.endsWith(".school")
  ) {
    exibirMensagem("O domínio do e-mail parece inválido.", "erro");
    return false;
  }

  if (cnpjVar.length != 14){
    exibirMensagem("Verifique o CNPJ e tente novamente")
    return false;
  }

  if (senhaVar.length < 6) {
    exibirMensagem("A senha deve ter no mínimo 6 caracteres.", "erro");
    return false;
  }

  if (senhaVar !== confirmacaoVar) {
    exibirMensagem("As senhas não coincidem.", "erro");
    return false;
  }
  fetch("/empresa/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })

  var spanCadastro = document.querySelector(".span-cadastro")
  spanCadastro.classList.toggle("display-none")
  exibirMensagem("Cadastro realizado com sucesso! Redirecionando para o login...", "sucesso");

  setTimeout(() => {
    window.location = "login.html";
  }, 2000);

}