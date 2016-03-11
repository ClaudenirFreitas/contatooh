describe("página principal", function () {

    beforeEach(function () {
        browser.get("http://localhost:3000/#/contatos");
    });

    it("deve estar logado no sistema", function () {
        element(by.id("usuario-logado")).getText()
                .then(function (texto) {
                    expect(texto.trim().length).toBeGreaterThan(0);
                });
    });
    
});