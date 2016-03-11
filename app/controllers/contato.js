var sanitize = require("mongo-sanitize");

module.exports = function (app) {

    var controller = {},
            Contato = app.models.contato; // funcao construtora

    controller.listaTodos = function (req, res) {
        Contato.find().populate("emergencia").exec()
                .then(
                        function (contatos) {
                            res.json(contatos);
                        },
                        function (erro) {
                            console.error(erro);
                            res.status(500).json(erro);
                        });
        ;
    };

    controller.obtemContato = function (req, res) {
        var _id = sanitize(req.params.id);
        Contato.findById(_id).exec()
                .then(
                        function (contato) {
                            if (!contato)
                                throw new Error("Contato não encontrado");
                            res.json(contato);
                        },
                        function (erro) {
                            console.log(erro);
                            res.status(404).json(erro);
                        }
                );
    };

    controller.removeContato = function (req, res) {
        var _id = sanitize(req.params.id);
        Contato.remove({"_id": _id}).exec()
                .then(
                        function () {
                            res.status(204).send();
                        },
                        function (erro) {
                            console.log(erro);
                            res.status(404).json(erro);
                        }
                );
    };

    controller.insereContato = function (req, res) {
        var dado = {
            "nome": req.body.nome,
            "email": req.body.email,
            "emergencia": req.body.emergencia || null
        };

        Contato.create(dado).
                then(
                        function (contato) {
                            res.status(201).json(contato);
                        },
                        function (erro) {
                            console.error(erro);
                            res.status(500).json(erro);
                        }
                );
    };

    controller.atualizaContato = function (req, res) {
        var dado = {
            "_id": sanitize(req.body._id),
            "nome": req.body.nome,
            "email": req.body.email,
            "emergencia": req.body.emergencia || null
        };

        if (dado._id) {
            Contato.findByIdAndUpdate(dado._id, dado).exec()
                    .then(
                            function (contato) {
                                res.json(contato);
                            },
                            function (erro) {
                                console.error(erro);
                                res.status(500).json(erro);
                            }
                    );
        } else {
            throw new Error("ID não informado");
        }
    };


    return controller;
};