const { By } = require('selenium-webdriver');
var fs = require('fs');
const geraLog = require('./gerarLog');
const gerarArquivo = require('./gerarArquivo');

async function telaGraduacao(driver, gerarNome) {
    //variaveis de tratamento de erro
    const log = geraLog();

    try {
        //tela de graduacao
        const graduacao = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'))
        await graduacao.click();

        (await log).funcionalidade = 'Tela de graduacao';
        (await log).resultado = 'Passou';
        (await log).erro = '';
    } catch (error) {

        (await log).funcionalidade = 'Tela de graduacao';
        (await log).resultado = 'Não Passou';
        (await log).erro = 'Erro ao clikar no botao de Graduacao';
    }
    await gerarArquivo(gerarNome, log);
    // fs.appendFile(gerarNome, (await log).resultado + ';' + (await log).funcionalidade + ';' + (await log).erro + ';\n', function (err) {
    //     if (err) throw err;
    // });
  }
  
  module.exports = telaGraduacao;