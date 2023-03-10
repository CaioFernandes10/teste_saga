const { Builder } = require('selenium-webdriver');

async function abrirSAGA(builder) {
  let driver = await builder.forBrowser('chrome').build();
  await driver.get('http://sagapoc.unisuam.edu.br/saga/nucleo/login.php');
  return driver;
}

module.exports = abrirSAGA;