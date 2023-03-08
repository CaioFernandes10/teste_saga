const { Builder, By, Key, Select, Promise,until } = require('selenium-webdriver');
const chromedriver = require('chromedriver');

let chrome = require('selenium-webdriver/chrome');

let service = new chrome.ServiceBuilder()
    .loggingTo('/my/log/file.txt')
    .enableVerboseLogging()
    .build();

let options = new chrome.Options();
var fs = require('fs');
let driver = chrome.Driver.createSession(options, service);



async function runEstrutAcademica() {

    //formato da data atual, criar nome do arquivo csv
    var dataAtual = new Date();
    var dia = dataAtual.getDate().toString().padStart(2, '0');
    var mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    var ano = dataAtual.getFullYear().toString();
    var hora = dataAtual.getHours().toString().padStart(2, '0');
    var minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    var dataFormatada = ano + '_' + mes + '_' + dia + '_' + hora + '_' + minutos;
    var nome = 'relatorio_sagapoc' + dataFormatada + '.csv';
    //variaveis de tratamento de erro
    var log_funcionalidade = '';
    var log_resultado = '';
    var log_erro = 'erro';

    // function verifcar_url(url){
    //     if(url.tpSting().includes('sagapoc')){
    //         return true;
    //     }
    //     return false;

    // }

    var errors = [];

    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://sagapoc.unisuam.edu.br/saga/nucleo/login.php');

    // if(!verifcar_url(driver.getCurrentUrl)){
    //  throw 'url invalida, nao e o sagapoc';   
    // }
    try {
        //tela de login   
        const searchBar = await driver.findElement(By.name('login'));
        const senha = await driver.findElement(By.name('senha'));
        await searchBar.sendKeys('1002562');
        await senha.sendKeys('123456');
        await senha.sendKeys(Key.ENTER);
        log_funcionalidade = 'tela de login';
        log_resultado = 'Passou';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de login';
        log_resultado = 'Nao Passou';
        log_erro = 'Erro ao acessar a tela de login';
    }
    fs.appendFile(nome, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
        if (err) throw err;

    });

    try {
        //tela de graduacao    
        const gra = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'))
        await gra.click();
        log_funcionalidade = 'tela de graduacao';
        log_resultado = 'Passou';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de graduacao';
        log_resultado = 'Nao Passou';
        log_erro = 'Erro ao clikar no botao de Graduacao';
    }
    fs.appendFile(nome, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
        if (err) throw err;
    });


}

runEstrutAcademica();