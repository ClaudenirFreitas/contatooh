var isAutenticado = require("../../config/auth");

module.exports = function (app) {
    var controller = app.controllers.contato;
    app.get("/api/contatos", isAutenticado, controller.listaTodos);
    app.get("/api/contatos/:id", isAutenticado, controller.obtemContato);
    app.post("/api/contatos/", isAutenticado, controller.insereContato);
    app.put("/api/contatos/:id", isAutenticado, controller.atualizaContato);
    app.delete("/api/contatos/:id", isAutenticado, controller.removeContato);
};