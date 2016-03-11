exports.config = {
    specs: ["../test/e2e/*Spec.js"],
    onPrepare: function () {
        browser.driver.get("http://localhost:3000/");
        browser.driver.findElement(by.id("entrar")).click();
        browser.driver.findElement(by.id("login_field")).sendKeys("claudenirfreitas.cf@gmail.com");
        browser.driver.findElement(by.id("password")).sendKeys("freitasCF123");
        browser.driver.findElement(by.name("commit")).click();
    }
};