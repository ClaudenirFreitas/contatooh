angular.module("contatooh", ["ngRoute", "ngResource"])
        .config(function ($routeProvider) {

            $routeProvider
                    .when("/contatos", {
                        templateUrl: "partials/contatos.html"
                    })
                    .when("/contato/:contatoId", {
                        templateUrl: "partials/contato.html"
                    })
                    .when("/contato", {
                        templateUrl: "partials/contato.html"
                    })
                    .otherwise({redirecTo: "/contatos"});

        });