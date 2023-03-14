const { Builder, By, Key, Select, Promise, until } = require('selenium-webdriver');
const chromedriver = require('chromedriver');

let chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder()
   .loggingTo('/my/log/file.txt')
   .enableVerboseLogging()
   .build();
let options = new chrome.Options();
let driver = chrome.Driver.createSession(options, service);


async function run() {
   const geraLog = require('../../FuncoesComuns/funcoes').gerarLog;
   const gerarArquivo = require('../../FuncoesComuns/funcoes').gerarArquivo;
   const gerarNomeDoc = require('../../FuncoesComuns/funcoes').gerarNomeDoc;
   const abrirSAGA = require('../../FuncoesComuns/funcoes').abrirSAGA;
   const login = require('../../FuncoesComuns/funcoes').login;
   const telaGraduacao = require('../../FuncoesComuns/funcoes').telaGraduacao;

   const downloadDir = 'C:\Users\iago_\Downloads'; // diretório de download
   const chrome = require('selenium-webdriver/chrome');
   const options = new chrome.Options();

   //variaveis de tratamento de erro
   var log = geraLog();

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
          (await log).resultado = 'Sucesso';
          (await log).erro = '';

       } catch (error) {
          (await log).funcionalidade = 'Tela de Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
          (await log).resultado = 'Falhou';
          (await log).erro = 'Erro ao clikar no botão de Áreas de Conhecimento';
       }
       await gerarArquivo(gerarNome, log);


       try {
           //tela de inclusão da áreas de conhecimento do módulo de estrutura acadêmica
           const botaoIncluir = await driver.findElement(By.xpath('//*[@id="T_principal"]/center/table/tbody/tr/td/table/tbody/tr[1]/td/table/tbody/tr/td[2]/a/img'))
           await botaoIncluir.click();

          (await log).funcionalidade = 'Tela de inclusão da Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
          (await log).resultado = 'Sucesso';
          (await log).erro = '';
       } catch (error) {
          (await log).funcionalidade = 'Tela de inclusão da Áreas de Conhecimento do Módulo de Estrutura Acadêmica';
          (await log).resultado = 'Falhou';
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
          (await log).resultado = 'Falhou';
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
          (await log).resultado = 'Falhou';
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
          (await log).resultado = 'Falhou';
          (await log).erro = 'Erro ao excluir conhecimento';
       }
       await gerarArquivo(gerarNome, log);

       //navega até a pendências para o censo do módulo de relatório
       try {
          //tela de pendências para do módulo de relatório
           const relstorio = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[7]/div'))
           await relstorio.click();

           const censo = await driver.wait(until.elementLocated(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[7]/ul/li[4]/div')), 5000);
           await censo.click();

           const pendeias_censo = await driver.wait(until.elementLocated(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[7]/ul/li[4]/ul/li/a')), 5000);
           await pendeias_censo.click();

          (await log).funcionalidade = 'Tela de Pendências para Censo do Módulo de Relatório';
          (await log).resultado = 'Sucesso';
          (await log).erro = '';

       } catch (error) {
          (await log).funcionalidade = 'Tela de Pendências para Censo do Módulo de Relatório';
          (await log).resultado = 'Falhou';
          (await log).erro = 'Erro ao clikar no botão de Pendências para Censo';
       }
       await gerarArquivo(gerarNome, log);
}

run();