var passport = require("passport"),
        GitHubStrategy = require("passport-github").Strategy,
        mongoose = require("mongoose"),
        gitStratety = require("./.config");

module.exports = function () {

    var Usuario = mongoose.model("Usuario");
    
    passport.use(new GitHubStrategy(
            {
                clientID: gitStratety.clientID,
                clientSecret: gitStratety.clientSecret,
                callbackURL: gitStratety.callbackURL
            }, function (accessToken, refreshToken, profile, done) {

        Usuario.findOrCreate(
                {
                    "login": profile.username,
                    "nome": profile.username
                },
                function (erro, usuario) {
                    if (erro) {
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }

        );
    }));

    /*
     Chamado apenas uma vez e recebe o usuário do banco de dados disponibilizado pelo
     call de estrategia de autenticacao. Realizara a autenticacao apenas o ObjectId do
     usuario na sessao.
     */
    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    /*
     Recupera o id armazenado na sessao e a cada requisicao realizada a validacao
     */
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
                .then(function (usuario) {
                    done(null, usuario);
                });
    });

};