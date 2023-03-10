const importsModel = require('../../FuncoesComuns/importsModel');

const { Builder, By, Key, Select, Promise,until } = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const gerarNomeDoc = require('../../FuncoesComuns/gerarNomeDoc');
const geraLog = require('../../FuncoesComuns/gerarLog');
const gerarArquivo = require('../../FuncoesComuns/gerarArquivo');
const abrirSAGA = require('../../FuncoesComuns/abrirSAGA');
const login = require('../../FuncoesComuns/login');
const telaGraduacao = require('../../FuncoesComuns/telaGraduacao');
let chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder()
    .loggingTo('/my/log/file.txt')
    .enableVerboseLogging()
    .build();
let options = new chrome.Options();
let driver = chrome.Driver.createSession(options, service);
var fs = require('fs');

async function runAreasConhecimento () {
    importsModel();
    //variaveis de tratamento de erro
    const log = geraLog();

    //gera o nome
    let gerarNome = await gerarNomeDoc();

    //abreo browser e navega até o saga
    let driver = await abrirSAGA(new Builder());
    
    //faz o login
    await login(driver, gerarNome);
    
    //navega até  a tela de graduação
    await telaGraduacao(driver, gerarNome);

    //navega até a área de conhecimento do módulo de estrutura acadêmica
    try {
       //tela de áreas de conhecimento do módulo de estrutura acadêmica
        const estruturaAcademica = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[2]/div'))
        await estruturaAcademica.click();

        const areasConhecimento = await driver.wait(until.elementLocated(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[2]/ul/li[1]/a')), 5000);
        await areasConhecimento.click();

        (await log).funcionalidade = 'Tela de Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
        (await log).resultado = 'Passou';
        (await log).erro = '';

    } catch (error) {
        (await log).funcionalidade = 'Tela de Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
        (await log).resultado = 'Não Passou';
        (await log).erro = 'Erro ao clikar no botão de Áreas de Conhecimento';
    }
    await gerarArquivo(gerarNome, log);
    
    
    try {
        //tela de inclusão da áreas de conhecimento do módulo de estrutura acadêmica
        const botaoIncluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[2]/a/img'))
        await botaoIncluir.click();

        (await log).funcionalidade = 'Tela de inclusão da Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
        (await log).resultado = 'Passou';
        (await log).erro = '';
    } catch (error) {
        (await log).funcionalidade = 'Tela de inclusão da Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
        (await log).resultado = 'Não Passou';
        (await log).erro = 'Erro ao clikar no botão de incluir da Áreas de Conhecimento';
    }
    await gerarArquivo(gerarNome, log);
 
    try {
        //incluir áres de conhecimento
        const codigo = await driver.findElement(By.name('label'));
        const descricao = await driver.findElement(By.name('descricao'));
        const mnemonico = await driver.findElement(By.name('mnemonico'));
        
        await codigo.sendKeys('Teste');
        await descricao.sendKeys('Teste');
        await mnemonico.sendKeys('Tes');
        
        const btnConfirmar = await driver.findElement(By.name('btnConfirmar'));
        await btnConfirmar.click();

        const confirmarinclusao = await driver.wait(until.elementLocated(By.name('ok')), 10000);
        await confirmarinclusao.click();

        (await log).funcionalidade = 'Inclusão de Conhecimento';
        (await log).resultado = 'Sucesso';
        (await log).erro = '';
    } catch (error) {
        
        (await log).funcionalidade = 'Inclusão de Conhecimento';
        (await log).resultado = 'Falha';
        (await log).erro = 'Erro ao incluir conhecimento';
    }
    await gerarArquivo(gerarNome, log);

    try {
        //Alterar áres de conhecimento
        const pesquisa = await driver.findElement(By.name('pesquisa'));
    
        await pesquisa.sendKeys('Teste');
        await pesquisa.sendKeys(Key.ENTER);
        
        
        const btnAlterar = await driver.findElement(By.xpath('//*[@id="grid_tr_0"]/td[5]/a/img'));
        await btnAlterar.click();

        const codigo = await driver.findElement(By.name('label'));
        codigo.clear();
        const descricao = await driver.findElement(By.name('descricao'));
        descricao.clear();
        const mnemonico = await driver.findElement(By.name('mnemonico'));
        mnemonico.clear();
        
        await codigo.sendKeys('Teste1');
        await descricao.sendKeys('Teste1');
        await mnemonico.sendKeys('Te1');
        
        const btnConfirmar = await driver.findElement(By.name('btnConfirmar'));
        await btnConfirmar.click();

        const confirmarinclusao = await driver.wait(until.elementLocated(By.name('ok')), 10000);
        await confirmarinclusao.click();

        (await log).funcionalidade = 'Alteração de Conhecimento';
        (await log).resultado = 'Sucesso';
        (await log).erro = '';
    } catch (error) {
        
        (await log).funcionalidade = 'Alteração de Conhecimento';
        (await log).resultado = 'Falha';
        (await log).erro = 'Erro ao alterar conhecimento';
    }
    await gerarArquivo(gerarNome, log);

    try {
        //Excluir áres de conhecimento
        const pesquisa = await driver.findElement(By.name('pesquisa'));
    
        await pesquisa.sendKeys('Teste1');
        await pesquisa.sendKeys(Key.ENTER);
        
        const check = await driver.findElement(By.name('check_excluir[]'));
        await check.click();

        const excluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[3]/a/img'));
        await excluir.click();

        const confirmaExclusao = await driver.findElement(By.name('sim'));
        await confirmaExclusao.click();

        const registrarExclusao = await driver.wait(until.elementLocated(By.name('ok')), 10000);
        await registrarExclusao.click();

        (await log).funcionalidade = 'Exclusão de Conhecimento';
        (await log).resultado = 'Sucesso';
        (await log).erro = '';
    } catch (error) {
        (await log).funcionalidade = 'Exclusão de Conhecimento';
        (await log).resultado = 'Falha';
        (await log).erro = 'Erro ao excluir conhecimento';
    }
    await gerarArquivo(gerarNome, log);
}

runAreasConhecimento();