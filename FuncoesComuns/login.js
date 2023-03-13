const { By, Key } = require('selenium-webdriver');
var fs = require('fs');
const geraLog = require('./gerarLog');
const gerarArquivo = require('./gerarArquivo');

async function login(driver, gerarNome) {
    //variaveis de tratamento de erro
    const log = geraLog();

    //tela de login
    try {

        const searchBar = await driver.findElement(By.name('login'));
        const senha = await driver.findElement(By.name('senha'));
        await searchBar.sendKeys('1002562');
        await senha.sendKeys('123456'); //123456
        await senha.sendKeys(Key.ENTER);

        (await log).funcionalidade = 'Tela de login';
        (await log).resultado = 'Passou';
        (await log).erro = '';

    } catch (error) {

        (await log).funcionalidade = 'Tela de login';
        (await log).resultado = 'Não Passou';
        (await log).erro = 'Erro ao acessar a tela de login';
    }

    await gerarArquivo(gerarNome, log);

}

module.exports = login;