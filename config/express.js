var express = require("express"),
        load = require("express-load"),
        bodyParser = require("body-parser"),
        cookieParser = require("cookie-parser"),
        session = require("express-session"),
        passport = require("passport"),
        helmet = require("helmet"); // middleware de seguranca - tratamento de header

module.exports = function () {
    var app = express();

    // configuracao variavel de ambiente
    app.set("port", 3000);
    app.set("view engine", "ejs");
    app.set("views", "./app/views");

    // middleware
    app.use(express.static("./public"));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require("method-override")());

    app.use(cookieParser()); // pega os cookies do header e passa pra req.cookies e armazena o ID da sessao

    app.use(session({
        secret: "homem avestruz",
        resave: false,
        saveUninitialized: true
    })); // cria a sessão do usuário em memória

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet());
    app.use(helmet.xframe()); // evitar ataques via frame e iframe
    app.use(helmet.xssFilter()); // adiciona um header para que o navegador ativar um protecao especial contra XSS
    app.use(helmet.nosniff()); // utilizar os mimes types padrão css e javascript
    app.use(helmet.hidePoweredBy({setTo: "GlassFish"})); // setando outro servidor
    app.disable("x-powered-by"); // ocultar do header a tecnologia utilizada


    load("models", {cwd: "app"})
            .then("controllers")
            .then("routes/auth.js")
            .then("routes")
            .into(app);

    app.get("*", function (req, res) {
        res.status(404).render("404");
    });

    return app;
};
