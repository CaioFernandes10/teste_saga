const {Builder, By, Key } = require('selenium-webdriver');
var fs = require('fs');

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

async function gerarLog(){
    var log_funcionalidade = '';
    var log_resultado = '';
    var log_erro = 'erro';

    return {
        funcionalidade: log_funcionalidade,
        resultado: log_resultado,
        erro: log_erro
    };
}

async function gerarArquivo(gerarNome, log) {
    const path = require('path');
    const folderPath = path.join(__dirname, '../relatorios'); // caminho absoluto da pasta "relatorios" na raiz do diretório do usuário atual
    const filePath = path.join(folderPath, gerarNome);
    const linha = (await log).resultado + ':' + (await log).funcionalidade + ';' + (await log).erro + ';' + '\n';
    fs.appendFile(filePath, linha, function (err) {
        if (err) throw err;
    });
}

async function abrirSAGA(builder) {
    let driver = await builder.forBrowser('chrome').build();
    await driver.get('http://sagapoc.unisuam.edu.br/saga/nucleo/login.php');
    return driver;
  }

async function login(driver, gerarNome){
    
    //variaveis de tratamento de erro
    const log = gerarLog();

    //tela de login
    try {

        const searchBar = await driver.findElement(By.name('login'));
        const senha = await driver.findElement(By.name('senha'));
        await searchBar.sendKeys('1002562');
        await senha.sendKeys('123456'); //123456
        await senha.sendKeys(Key.ENTER);

        (await log).funcionalidade = 'Tela de login';
        (await log).resultado = 'Sucesso';
        (await log).erro = '';

    } catch (error) {

        (await log).funcionalidade = 'Tela de login';
        (await log).resultado = 'Falhou';
        (await log).erro = 'Erro ao acessar a tela de login';
    }
    
    await gerarArquivo(gerarNome, log);

}

async function telaGraduacao(driver, gerarNome) {
    const geraLog = require('./funcoes').gerarLog;
    const gerarArquivo = require('./funcoes').gerarArquivo;
    //variaveis de tratamento de erro
    const log = geraLog();

    try {
        //tela de graduacao
        const graduacao = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'))
        await graduacao.click();

        (await log).funcionalidade = 'Tela de graduacao';
        (await log).resultado = 'Sucesso';
        (await log).erro = '';
    } catch (error) {

        (await log).funcionalidade = 'Tela de graduacao';
        (await log).resultado = 'Falhou';
        (await log).erro = 'Erro ao clikar no botao de Graduacao';
    }
    await gerarArquivo(gerarNome, log);
  }

module.exports.telaGraduacao = telaGraduacao;

module.exports.abrirSAGA = abrirSAGA;

module.exports.login = login;

module.exports.gerarNomeDoc = gerarNomeDoc;

module.exports.gerarArquivo = gerarArquivo;

module.exports.gerarLog = gerarLog;