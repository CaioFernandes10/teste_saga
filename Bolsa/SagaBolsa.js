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



async function run() {

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


    try {
        //bolsa>cadastro>cadastro de motivos
        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();

        const cadastro_motivos = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[1]/a/div'));
        await cadastro_motivos.click();
        log_funcionalidade = 'Cadastro de motivos para bolsa';
        log_resultado = 'Passou';
        log_erro = ''

    } catch (error) {
        log_funcionalidade = 'Cadastro de motivos para bolsa';
        log_resultado = 'Nao Passou';
        log_erro = 'Erro ao entrar na tela de Cadastro de motivos para bolsa';
    }
    fs.appendFile(nome, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
        if (err) throw err;
    });
    try {
        //inclusao de cadastro de bolsa
        const incluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[2]'));
        await incluir.click();

        const status = await driver.findElement(By.name('frm_statuspedidos'));
        await status.click();

        let select = new Select(status);
        await select.selectByIndex(1);

        const desc = await driver.findElement(By.name('frm_descricao'));
        await desc.sendKeys('teste3');
        await desc.sendKeys(Key.ENTER);
        log_funcionalidade = 'Inclusão de motivos de bolsa';
        log_resultado = 'Passou';
        log_erro = ''

    } catch (error) {
        log_funcionalidade = 'Inclusão de motivos de bolsa';
        log_resultado = 'Nao Passou';
        log_erro = 'Erro na tela de Inclusão de motivos de bolsa';
    }
    fs.appendFile(nome, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
        if (err) throw err;
    });

    //confirma o cadastro
    const confirmacao = await driver.findElement(By.name('ok'));
    await confirmacao.click();

    try {
        //pesquisar elemento criado na tela de cadastro de bolsa
        const pesquisa = await driver.findElement(By.name('pesquisa'));
        await pesquisa.sendKeys('teste3');
        await pesquisa.sendKeys(Key.ENTER);
        log_funcionalidade = 'Pesquisa do elemento criado';
        log_resultado = 'Passou';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'Pesquisa do elemento criado(Cadastro de motivos para bolsa)';
        log_resultado = 'Nao Passou';
        log_erro = 'Erro na pesquisa';

    }
    fs.appendFile(nome, log_resultado + ';' + log_funcionalidade + ';' + log_erro + ';\n', function (err) {
        if (err) throw err;
    });


    //modificadores de bolsas
    try {
        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();

        const mod_bolsas = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[4]/a/div'));
        await mod_bolsas.click();

        const incluir_mod = await driver.findElement(By.xpath('//*[@id="frmGrid"]/table/tbody/tr[1]/td/table/tbody/tr/td[2]'));
        await incluir_mod.click();
        
        const element = await driver.wait(until.elementLocated(By.name('dados[label]')), 5000);
        
        await element.sendKeys('100000');
        

        const nome = await driver.findElement(By.name('dados[nome]'));
        await nome.sendKeys('unisuam');

        const categoria = await driver.findElement(By.name('dados[categoria]'));
        await categoria.click();

        let select = new Select(categoria);
        await select.selectByIndex(6);

        const confirmar = await driver.findElement(By.name('btnConfirmar'));
        await confirmar.click();
        const confirmar_inclusao = await driver.wait(until.elementLocated(By.className('ok_button')), 10000);
        
        await confirmar_inclusao.click();

        const cancelar = await driver.findElement(By.name('btnCancelar'));
        await cancelar.click();

    } catch (error) {
        console.log(error)
    }

    



























}


run();
