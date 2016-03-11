var passport = require("passport");

module.exports = function (app) {

    app.get("/auth/github", passport.authenticate("github"));
    app.get("/auth/github/callback", passport.authenticate("github", {successRedirect: "/#/contatos"}));
    app.get("/", function (req, res, next) {
        if (req.isAuthenticated()) {
            return next(); // permite que outras rotas sejam processadas
        } else {
            res.render("auth"); // renderiza auth.ejs
        }
    });

};