function exibirModalSenha() {

    if (sessionStorage.MOSTRAR_MODAL == "true") {
        
        var mudarSenha = document.createElement("div")
        mudarSenha.className = "mudar_senha"
        document.body.appendChild(mudarSenha)

        var conteudo = document.createElement("p")
        conteudo.innerHTML = "Para sua segurança altere, sua senha"
        mudarSenha.appendChild(conteudo)
        
        var btnOk = document.createElement("button")
        btnOk.innerHTML = "OK"
        btnOk.className = "btn-ok"
        mudarSenha.appendChild(btnOk)

        btnOk.addEventListener("click", () => {
            mudarSenha.style.display = "none"
        })


        sessionStorage.MOSTRAR_MODAL = false
    }


}