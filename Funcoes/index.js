function nome(){
    var dataAtual = new Date();
    var dia = dataAtual.getDate().toString().padStart(2, '0');
    var mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    var ano = dataAtual.getFullYear().toString();
    var hora = dataAtual.getHours().toString().padStart(2, '0');
    var minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    var dataFormatada = ano + '_' + mes + '_' + dia + '_' + hora + '_' + minutos;
    var nome = 'relatorio_sagapoc' + dataFormatada + '.csv';
    return nome;
}

function escreverRelatorio(nome_formado,log_resultado,log_funcionalidade,log_erro){

    const path = require('path');
    var fs = require('fs');
    const folderPath = path.join(__dirname, '../relatorios'); // caminho absoluto da pasta "relatorios" na raiz do diretório do usuário atual
    const filePath = path.join(folderPath, nome_formado);
    fs.appendFile(filePath, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
       
             if (err) throw err;
            
         });
}


module.exports.nome = nome;

module.exports.escreverRelatorio = escreverRelatorio;