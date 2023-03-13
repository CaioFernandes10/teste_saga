const { Builder, By, Key, Select, Promise, until } = require('selenium-webdriver');
const chromedriver = require('chromedriver');



let chrome = require('selenium-webdriver/chrome');

let service = new chrome.ServiceBuilder()
    .loggingTo('/my/log/file.txt')
    .enableVerboseLogging()
    .build();

let options = new chrome.Options();

const { type } = require('os');
let driver = chrome.Driver.createSession(options, service);

async function run() {
    const path = require('path');
    var fs = require('fs');
    var nome = require('../Funcoes/index.js').nome;
    var escreverRelatorio = require('../Funcoes/index.js').escreverRelatorio;
    var nome_formado = nome();
    const downloadDir = '/home/caiofernandes/Downloads'; // diretório de download
    const chrome = require('selenium-webdriver/chrome');
    const options = new chrome.Options();

    options.setUserPreferences({
        'download.default_directory': downloadDir,
        'download.prompt_for_download': false,
        'download.directory_upgrade': true
    });

    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //tela de login
        await driver.get('http://sagapoc.unisuam.edu.br/saga/nucleo/login.php');
        const searchBar = await driver.findElement(By.name('login'));
        const senha = await driver.findElement(By.name('senha'));
        await searchBar.sendKeys('1002562');
        await senha.sendKeys('123456');
        await senha.sendKeys(Key.ENTER);
        log_funcionalidade = 'tela de login';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de login';
        log_resultado = 'Falhou1';
        log_erro = 'Erro ao acessar a tela de login';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //tela de graduacao    
        const gra = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'))
        await gra.click();
        log_funcionalidade = 'tela de graduacao';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de graduacao';
        log_resultado = 'Falhou1';
        log_erro = 'Erro ao clikar no botao de Graduacao';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    

    try {
        //bolsa>cadastro>cadastro de motivos
        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();

        const cadastro_motivos = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[1]/a/div'));
        await cadastro_motivos.click();
        log_funcionalidade = 'Cadastro de motivos para bolsa';
        log_resultado = 'Sucesso';
        log_erro = ''

    } catch (error) {
        log_funcionalidade = 'Cadastro de motivos para bolsa';
        log_resultado = 'Falhou1';
        log_erro = 'Erro ao entrar na tela de Cadastro de motivos para bolsa';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        //inclusao de cadastro de bolsa
        const incluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[2]'));
        await incluir.click();

        const status = await driver.findElement(By.name('frm_statuspedidos'));
        await status.click();

        let select = new Select(status);
        await select.selectByIndex(1);

        const desc = await driver.findElement(By.name('frm_descricao'));
        await desc.sendKeys('teste');
        await desc.sendKeys(Key.ENTER);
        log_funcionalidade = 'Inclusão de motivos de bolsa';
        log_resultado = 'Sucesso';
        log_erro = ''

    } catch (error) {
        log_funcionalidade = 'Inclusão de motivos de bolsa';
        log_resultado = 'Falhou1';
        log_erro = 'Erro na tela de Inclusão de motivos de bolsa';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    //confirma o cadastro
    const confirmacao = await driver.findElement(By.name('ok'));
    await confirmacao.click();

    try {
        //pesquisar elemento criado na tela de cadastro de bolsa
        const pesquisa = await driver.findElement(By.name('pesquisa'));
        await pesquisa.sendKeys('teste');
        await pesquisa.sendKeys(Key.ENTER);
        log_funcionalidade = 'Pesquisa do elemento criado';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'Pesquisa do elemento criado(Cadastro de motivos para bolsa)';
        log_resultado = 'Falhou1';
        log_erro = 'Erro na pesquisa';

    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //alterar cadastro de motivo bolsa
        const alerar = await driver.findElement(By.xpath('//*[@id="grid_tr_0"]/td[4]/a'));
        await alerar.click();

        const status_alterar = await driver.findElement(By.name('frm_statuspedidos'));
        await status_alterar.click();

        let select_alterar = new Select(status_alterar);
        await select_alterar.selectByIndex(2);

        const desc_alterar = await driver.findElement(By.name('frm_descricao'));
        await desc_alterar.sendKeys('teste alterado');
        await desc_alterar.sendKeys(Key.ENTER);

        const confirmacao_alterar = await driver.findElement(By.name('ok'));
        await confirmacao_alterar.click();
        log_funcionalidade = 'alterar cadastro de motivo bolsa';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'alterar cadastro de motivo bolsa';
        log_resultado = 'Falhou';
        log_erro = 'Erro na tela de alterar cadastro de motivo bolsa'
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //excluir cadastro de motivo bolsa
        const pesquisa = await driver.findElement(By.name('pesquisa'));
        await pesquisa.sendKeys('teste alterado');
        await pesquisa.sendKeys(Key.ENTER);

        const check = await driver.findElement(By.name('check_excluir[]'));
        await check.click();

        const excluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[3]/a'));
        await excluir.click();

        const confirma_excluir = await driver.findElement(By.name('sim'));
        await confirma_excluir.click();


        const confirma_excluir1 = await driver.findElement(By.name('ok'));
        await confirma_excluir1.click();
        log_funcionalidade = 'excluir cadastro de motivo bolsa';
        log_resultado = 'Sucesso';
        log_erro = ''

    } catch (error) {
        log_funcionalidade = 'excluir cadastro de motivo bolsa';
        log_resultado = 'Falhou';
        log_erro = 'Erro na tela de excluir cadastro de motivo bolsa'
    }

    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    //bolsa>cadastro>modificadores de bolsas 
    try {
        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();
        const mod_bolsas = await driver.wait(until.elementLocated(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[4]/a/div')), 10000);
        await mod_bolsas.click();

        log_funcionalidade = 'modificadores de bolsas';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'Erro na tela de modificadores de bolsas';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de modificadores de bolsas';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //incluir modificadores de bolsas 
        const incluir_mod = await driver.findElement(By.xpath('//*[@id="frmGrid"]/table/tbody/tr[1]/td/table/tbody/tr/td[2]'));
        await incluir_mod.click();

        const codigo = await driver.wait(until.elementLocated(By.name('dados[label]')), 5000);
        await codigo.sendKeys('unisuam123');


        const nome = await driver.findElement(By.name('dados[nome]'));
        await nome.sendKeys('unisuam123');

        const categoria = await driver.findElement(By.name('dados[categoria]'));
        await categoria.click();

        let select = new Select(categoria);
        await select.selectByIndex(6);

        const confirmar = await driver.wait(until.elementLocated(By.xpath('//*[@id="formulario"]/div/table/tbody/tr[7]/td/img[1]')), 10000);
        await confirmar.click();

        const confirmar_inclusao = await driver.wait(until.elementLocated(By.className(' ok_button')), 10000);
        await confirmar_inclusao.click();
        log_funcionalidade = 'inclusao modificadores de bolsas';
        log_resultado = 'Sucesso';
        log_erro = ''


    } catch (error) {
        log_funcionalidade = 'inclusao modificadores de bolsas';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de inclusao modificadores de bolsas'
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        //alterar modificador
        const pesquisa_mod_bolsa = await driver.wait(until.elementLocated(By.xpath('//*[@id="pesquisaValor"]')), 10000);
        await pesquisa_mod_bolsa.sendKeys('unisuam123');
        await pesquisa_mod_bolsa.sendKeys(Key.ENTER);

        const alterar_mod = await driver.wait(until.elementLocated(By.xpath('//*[@id="divGrid"]/div/table/tbody/tr[2]/td[9]/img[2]')), 10000);
        await alterar_mod.click();


        const codigo_alterar = await driver.wait(until.elementLocated(By.name('dados[label]')), 5000);
        await codigo_alterar.sendKeys('selenium');


        const nome_alterar = await driver.findElement(By.name('dados[nome]'));
        await nome_alterar.sendKeys('unisuam123');

        const categoria_alterar = await driver.findElement(By.name('dados[categoria]'));
        await categoria_alterar.click();

        let select_alterar = new Select(categoria_alterar);
        await select_alterar.selectByIndex(8);

        const confirmar_alterar = await driver.findElement(By.name('btnConfirmar'));
        await confirmar_alterar.click();
        const confirmar_inclusao_alterar = await driver.wait(until.elementLocated(By.className('ok_button')), 10000);
        await confirmar_inclusao_alterar.click();

        log_funcionalidade = 'alterar modificadores de bolsas';
        log_resultado = 'Sucesso';
        log_erro = '';

    } catch (error) {
        log_funcionalidade = 'alterar modificadores de bolsas';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de alterar modificadores de bolsas'
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //excluir modificador
        const check = await driver.wait(until.elementLocated(By.xpath('//*[@id="checkbox_grid[codigo][]_0"]')), 10000);
        await check.click();


        const excluir = await driver.wait(until.elementLocated(By.xpath('//*[@id="frmGrid"]/table/tbody/tr[1]/td/table/tbody/tr/td[3]/img')), 15000);
        await excluir.click();

        const confirmar_excluir = await driver.wait(until.elementLocated(By.className(' ok_button')), 15000);
        await confirmar_excluir.click();


        log_funcionalidade = 'excluir modificadores de bolsas';
        log_resultado = 'Sucesso';
        log_erro = '';

    } catch (error) {
        log_funcionalidade = 'excluir modificadores de bolsas';
        log_resultado = '';
        log_erro = 'Erro ao excluir modificadores de bolsas';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    //bolsa>cadastro>parametro
    try {
        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();


        const parametro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[5]/a'));
        await parametro.click();

        log_funcionalidade = 'tela de parametros';
        log_resultado = 'Sucesso';
        log_erro = '';
    } catch (error) {
        log_funcionalidade = 'tela de parametros';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de parametros';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);

    try {
        //bolsa>cadastro>tela de Tabela Percentual

        const gra = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'))
        await gra.click();

        const bolsa = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/div'));
        await bolsa.click();

        const cadastro = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/div'));
        await cadastro.click();

        const Tabela_Percentual = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[1]/ul/li[1]/ul/li[6]'));
        await Tabela_Percentual.click();
        log_funcionalidade = 'tela de Tabela Percentual';
        log_resultado = 'Sucesso';
        log_erro = '';

    } catch (error) {
        log_funcionalidade = 'tela de Tabela Percentual';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de Tabela Percentual';
    }

    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        // incluir tela de Tabela Percentual
        const incluir_percentual = await driver.wait(until.elementLocated(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[2]/a/img')), 10000);
        await incluir_percentual.click();

        const cod = await driver.findElement(By.name('label'));
        await cod.sendKeys('teste');

        const categoria = await driver.findElement(By.name('descricao'));
        await categoria.sendKeys('teste');

        const confirma = await driver.wait(until.elementLocated(By.name('btnConfirmar')), 10000);
        await confirma.click();

        const confirma_modal = await driver.findElement(By.name('ok'));
        await confirma_modal.click()

    } catch (error) {
        log_funcionalidade = 'tela de Tabela Percentual incluir';
        log_resultado = '';
        log_erro = 'Erro ao entrar na tela de Tabela Percentual';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        const pesquisa_percentual = await driver.findElement(By.name('pesquisa'));
        await pesquisa_percentual.sendKeys('teste');
        await pesquisa_percentual.sendKeys(Key.ENTER);


        const check_excluir_percentual = await driver.findElement(By.id('check_exclui_0'));
        await check_excluir_percentual.click()


        const excluir_percentual = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[3]/a/img'));
        await excluir_percentual.click()


        const confirma_excluir = await driver.wait(until.elementLocated(By.name('sim')), 10000);
        await confirma_excluir.click();

        const confirma_modal_excluir = await driver.wait(until.elementLocated(By.name('ok')), 10000);
        await confirma_modal_excluir.click();
        log_funcionalidade = 'tela de Tabela Percentual excluir';
        log_resultado = 'Sucesso';
        log_erro = '';

    } catch (error) {
        log_funcionalidade = 'tela de Tabela Percentual excluir';
        log_resultado = ' Falhou1';
        log_erro = 'Erro ao entrar na tela de Tabela Percentual excluir';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        //tela de protocolo online   
        const proto = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[20]/a'));
        await proto.click();
        log_funcionalidade = 'tela de protocolo por departamento';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de protocolo por departamento';
        log_resultado = 'Falhou';
        log_erro = 'Erro ao clikar no botao de protocolo por departamento';
    }
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
    try {
        const relatorios = await driver.wait(until.elementLocated(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[2]/div')), 10000);
        await relatorios.click();
    
        const protocolos_departamento = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[2]/ul/li[4]/a'));
        await protocolos_departamento.click();
    
        const tipo_requerimento = await driver.wait(until.elementLocated(By.xpath('//*[@id="frm"]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[1]/td/img')), 10000);
        await tipo_requerimento.click();
    
        const curso = await driver.wait(until.elementLocated(By.xpath('//*[@id="frm"]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[1]/td/img')), 10000);
        await curso.click();
    
        const data_inicio = await driver.wait(until.elementLocated(By.name('datainicio')), 10000);
        await data_inicio.sendKeys('01122022');
    
        const data_fim = await driver.wait(until.elementLocated(By.name('datafinal')), 10000);
        await data_fim.sendKeys('18022023');
    
        const departamento = await driver.wait(until.elementLocated(By.xpath('//*[@id="frm"]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[4]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[1]/td/img')), 10000);
        await departamento.click();
    
        const status = await driver.wait(until.elementLocated(By.xpath('//*[@id="frm"]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[5]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[1]/td/img')), 10000);
        await status.click();
    
        const gera_excell = await driver.wait(until.elementLocated(By.id('bt_excel')), 10000);
        await gera_excell.click();
        log_funcionalidade = 'tela de protocolo por departamento(gerar xls)';
        log_resultado = 'Sucesso';
        log_erro = ''
    } catch (error) {
        log_funcionalidade = 'tela de protocolo por departamento(gerar xls)';
        log_resultado = 'Falha';
        log_erro = 'Erro ao clicar no botao de gerar xls';
    }
    
    escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);


    driver.wait(() => {
        const files = fs.readdirSync(downloadDir);
        return files.some(file => file.endsWith('.xls')); // substitua '.pdf' pelo tipo de arquivo que você espera baixar
    }, 70000);
    
    
    setInterval(() => {
        const downloadedFilePath = path.join(downloadDir, 'pro0001.xls'); // substitua 'arquivo-baixado.pdf' pelo nome do arquivo que você espera baixar
        if (fs.existsSync(downloadedFilePath)) {
           
            log_funcionalidade = 'verificação de Download do xls';
            log_resultado = 'Sucesso';
            log_erro = ''
        } else {
            log_funcionalidade = 'verificação de Download do xls';
            log_resultado = 'Falha';
            log_erro = 'O arquivo não foi baixado.'
            
        }
        escreverRelatorio(nome_formado, log_funcionalidade, log_resultado, log_erro);
        
    }, 60000);

    setInterval(() => {
        driver.quit();
    }, 70000);
    
    
}






run();

