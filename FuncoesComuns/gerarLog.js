async function gerarLog() {
    var log_funcionalidade = '';
    var log_resultado = '';
    var log_erro = 'erro';

    return {
        funcionalidade: log_funcionalidade,
        resultado: log_resultado,
        erro: log_erro
    };
}

module.exports = gerarLog;