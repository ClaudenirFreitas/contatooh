"use strict";

class contatoPage {

    setPage() {
        browser.get("http://localhost:3000/#/contato");
    };

    setNome(nome) {
        element(by.model("contato.nome")).sendKeys(nome);
    };
    
    setEmail(email) {
        element(by.model("contato.email")).sendKeys(email);
    };
    
    salvar() {
      element(by.css(".btn-primary")).click();
    };
    
    getMensagem() {
      return element(by.binding("mensagem.texto")).getText();
    };
    
    setFirstItemEmergencia() {
      element(by.css("option[value=0]")).click();
    };

};

module.exports = contatoPage;