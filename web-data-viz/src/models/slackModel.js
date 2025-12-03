var database = require("../database/config")

function autenticar(email, senha) {
    var instrucao = `
        SELECT id, nome_fantasia, email, senha FROM Empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}




function ativar(id_empresa, estado){
    var instrucao =`
    UPDATE status_slack_atividade SET estado = '${estado}' WHERE empresa_id = '${id_empresa}'
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    ativar
};