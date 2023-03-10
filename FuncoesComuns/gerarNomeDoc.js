async function gerarNomeDoc(){
    //formato da data atual, criar nome do arquivo csv
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

module.exports = gerarNomeDoc;