
async function imports(){
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
}

module.exports = imports;