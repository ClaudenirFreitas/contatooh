var passport = require("passport"),
        GitHubStrategy = require("passport-github").Strategy,
        mongoose = require("mongoose");

module.exports = function () {

    var Usuario = mongoose.model("Usuario");

    passport.use(new GitHubStrategy(
            {
                clientID: "882c979665ea37a281d3",
                clientSecret: "ed8a4acbe35ae429fe506f0bef5c9dd9e45691c4",
                callbackURL: "http://localhost:3000/auth/github/callback"
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