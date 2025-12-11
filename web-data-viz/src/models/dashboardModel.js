var database = require("../database/config");

function pontosInsePorRegiao() {
    var instrucao = `
    SELECT 
            regiao,
            SUM(valor_inse) AS valor_inse
        FROM Escola
        GROUP BY regiao
        ORDER BY valor_inse ASC;
    `;
    console.log("Executando instrução SQL: " + instrucao);
    return database.executar(instrucao);
}

    function mediaInsePorRede(){
        var instrucao = `
        SELECT 
            rede,
            ROUND(AVG(valor_inse), 2) AS media_inse
        FROM Escola
        GROUP BY rede;
        `;
        console.log("Executando instrução SQL: " + instrucao)
        return database.executar(instrucao);
    }

    function alunosPorNivelInse(){
        var instrucao = `
        SELECT 
            nivel_inse,
            SUM(inse_qtd_alunos) AS total_alunos
        FROM (
            SELECT 
                e.inse_qtd_alunos,
                CASE
                    WHEN e.valor_inse < 3 THEN '1'
                    WHEN e.valor_inse >= 3  AND e.valor_inse < 4   THEN '2'
                    WHEN e.valor_inse >= 4  AND e.valor_inse < 4.5 THEN '3'
                    WHEN e.valor_inse >= 4.5 AND e.valor_inse < 5 THEN '4'
                    WHEN e.valor_inse >= 5  AND e.valor_inse < 5.5 THEN '5'
                    WHEN e.valor_inse >= 5.5 AND e.valor_inse < 6 THEN '6'
                    WHEN e.valor_inse >= 6  AND e.valor_inse < 7 THEN '7'
                    WHEN e.valor_inse >= 7  THEN '8'
                END AS nivel_inse
            FROM Escola e
        ) AS t
        GROUP BY nivel_inse
        ORDER BY nivel_inse;
        `;
        console.log("Executando instrução SQL: " + instrucao);
        return database.executar(instrucao);
    }

    function escolasCriticasPorRegiao(){
        var instrucao = `
        WITH escolas_base AS (
    SELECT 
        id_escola,
        regiao,

        -- Padronização INSE 2014 em grupos 1, 4 ou 7
        CASE 
            WHEN inse_classificacao2014 IN ('não especificado', 'dado não especificado') THEN NULL
            WHEN inse_classificacao2014 = 'baixo' THEN 1
            WHEN inse_classificacao2014 IN ('médio', 'medio') THEN 4
            WHEN inse_classificacao2014 = 'alto' THEN 7
            WHEN inse_classificacao2014 REGEXP 'grupo[[:space:]]*([1-3])' THEN 1
            WHEN inse_classificacao2014 REGEXP 'grupo[[:space:]]*([4-6])' THEN 4
            WHEN inse_classificacao2014 REGEXP 'grupo[[:space:]]*([7-8])' THEN 7
            ELSE NULL
        END AS inse_2014_grupo,

        -- Padronização INSE 2015 em grupos 1, 4 ou 7
        CASE 
            WHEN inse_classificacao2015 IN ('não especificado', 'dado não especificado') THEN NULL
            WHEN inse_classificacao2015 = 'baixo' THEN 1
            WHEN inse_classificacao2015 IN ('médio', 'medio') THEN 4
            WHEN inse_classificacao2015 = 'alto' THEN 7
            WHEN inse_classificacao2015 REGEXP 'grupo[[:space:]]*([1-3])' THEN 1
            WHEN inse_classificacao2015 REGEXP 'grupo[[:space:]]*([4-6])' THEN 4
            WHEN inse_classificacao2015 REGEXP 'grupo[[:space:]]*([7-8])' THEN 7
            ELSE NULL
        END AS inse_2015_grupo,

        CASE 
            WHEN valor_inse < 5 THEN 1
            ELSE 0
        END AS critica
    FROM Escola
),

todas_regioes AS (
    SELECT DISTINCT regiao FROM Escola
),

estatistica AS (
    SELECT
        regiao,
        MAX(inse_2014_grupo) AS inse_2014_max,
        MAX(inse_2015_grupo) AS inse_2015_max,
        SUM(critica) AS qtd_escolas_criticas
    FROM escolas_base
    GROUP BY regiao
)

SELECT
    r.regiao,
    
    CASE 
        WHEN e.inse_2014_max IS NULL THEN '—'
        ELSE CONCAT('grupo ', e.inse_2014_max)
    END AS inse_2014,

    CASE 
        WHEN e.inse_2015_max IS NULL THEN '—'
        ELSE CONCAT('grupo ', e.inse_2015_max)
    END AS inse_2015,

    COALESCE(e.qtd_escolas_criticas, 0) AS qtd_escolas_criticas

FROM todas_regioes r
LEFT JOIN estatistica e ON e.regiao = r.regiao
ORDER BY r.regiao;
        `;
        console.log("Executando instrução SQL: " + instrucao);
        return database.executar(instrucao);
    }

    function totalEscolasCriticas() {
    var instrucao = `
        SELECT 
            COUNT(DISTINCT id_escola) AS total_escolas_criticas
        FROM Escola
        WHERE valor_inse < 5;
    `;
    console.log("Executando instrução SQL: " + instrucao);
    return database.executar(instrucao);
}

function totalAlunosCriticos() {
    var instrucao = `
        SELECT 
            SUM(inse_qtd_alunos) AS total_alunos_criticos
        FROM Escola
        WHERE valor_inse < 5;
    `;
    console.log("Executando instrução SQL: " + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    pontosInsePorRegiao,
    mediaInsePorRede,
    alunosPorNivelInse,
    escolasCriticasPorRegiao,
    totalEscolasCriticas,
    totalAlunosCriticos
};
