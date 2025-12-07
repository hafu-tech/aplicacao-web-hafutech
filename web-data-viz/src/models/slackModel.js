var database = require("../database/config")

function ligar(empresa_id) {
    var instrucao = `
        INSERT INTO Status_slack_atividade (estado, empresa_id) VALUES
        ('ATIVO', ${empresa_id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function ativar(empresa_id, estado){
    var instrucao =`
    UPDATE Status_slack_atividade SET estado = '${estado}' WHERE empresa_id = ${empresa_id}
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    ligar,
    ativar
};