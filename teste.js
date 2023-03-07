const {Builder,By,Key} = require('selenium-webdriver');

// const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

     let chrome = require('selenium-webdriver/chrome');
 
      let service = new chrome.ServiceBuilder()
          .loggingTo('/my/log/file.txt')
          .enableVerboseLogging()
          .build();
    
      let options = new chrome.Options();
      // configure browser options ...  
 
      let driver = chrome.Driver.createSession(options, service);
 

async function run(){

    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://sagapoc.unisuam.edu.br/saga/nucleo/login.php');
    const searchBar = await driver.findElement(By.name('login'));
    const senha = await driver.findElement(By.name('senha'));
    await searchBar.sendKeys('1002562');
    await senha.sendKeys('123456');
    await senha.sendKeys(Key.ENTER);

     const gra = await driver.findElement(By.xpath('/html/body/table/tbody/tr[1]/td/table[2]/tbody/tr[1]/td/table/tbody/tr/td[13]/a'));
     await gra.click();

     const registro_aluno = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[6]/div'));
     await  registro_aluno.click();
     
     const matricula_aluno = await driver.findElement(By.xpath('/html/body/table/tbody/tr[2]/td/form/table/tbody/tr/td[1]/ul/li[6]/ul/li[7]/a'));
     await matricula_aluno.click();

     const  input_matricula = await driver.findElement(By.name('PesquisaValorText'));
     await  input_matricula.sendKeys('18102647');
     await  input_matricula.sendKeys(Key.ENTER);
        

     const  processos = await driver.findElement(By.id('bt_man123'));
     await  processos.click();
}   

run();