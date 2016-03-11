var mongoose = require("mongoose");

module.exports = function (uri) {
    mongoose.connect(uri, {server: {poolSize: 15}});
    mongoose.set("debug", true);

    mongoose.connection.on("connected", function () {
        console.log("Mongoose! Conectado em %s", uri);
    });

    mongoose.connection.on("disconnected", function () {
        console.log("Mongoose! Desconectado em %s", uri);
    });

    mongoose.connection.on("error", function (erro) {
        console.log("Mongoose! Erro na conexão: %s", erro);
    });

    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log("Mongoose! Desconectado pelo termino da aplicação!");
            // indica que a finalização ocorreu sem erros
            process.exit(0);
        });
    });
};