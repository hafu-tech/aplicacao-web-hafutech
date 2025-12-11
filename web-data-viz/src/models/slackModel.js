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

function deletar(id) {
    console.log("ACESSEI O EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", id);
    var instrucaoSql = `
        DELETE FROM Status_slack_atividade WHERE empresa_id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    ligar,
    ativar,
    deletar
};