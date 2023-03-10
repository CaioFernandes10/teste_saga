const fs = require('fs');

async function gerarArquivo(gerarNome, log) {
    const linha = (await log).resultado + ':' + (await log).funcionalidade + ';' + (await log).erro + ';' + '\n';
    fs.appendFile(gerarNome, linha, function (err) {
        if (err) throw err;
    });
}

module.exports = gerarArquivo;