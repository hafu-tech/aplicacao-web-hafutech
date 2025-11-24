function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function mostrarMenu() {

    var divMenuPai = document.querySelector(".div-menu-pai")
    var divMenuFilha = document.querySelector(".div-menu-filha")

    requestAnimationFrame(() => {
      divMenuPai.classList.toggle("div-menu-pai-ativo");
      divMenuFilha.classList.toggle("div-menu-filha-ativo")}
    );

  }

