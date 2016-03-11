angular.module("contatooh").controller("ContatosController", ['$scope', '$routeParams', '$location', 'ContatoService', function ($scope, $routeParams, $location, ContatoService) {

        var getError = function (error) {
            console.log(error);
        };

        $scope.buscarTodos = function () {
            ContatoService.get()
                    .success(function (data) {
                        $scope.contatos = data;
                        $scope.mensagem = {};
                    })
                    .error(getError);
        };

        $scope.buscarPorId = function () {
            var id = $routeParams.contatoId;
            if (id) {
                ContatoService.getById($routeParams.contatoId)
                        .success(function (data) {
                            $scope.contato = data || {};
                        })
                        .error(getError);
            } else {
                $scope.contato = {};
            }
        };

        $scope.novo = function () {
            $location.path("/contato");
        };

        $scope.salvar = function (contato) {
            ContatoService.save(contato)
                    .success(function () {
                        $location.path("/contatos");
                    })
                    .error(getError);
        };

        $scope.remover = function (id) {
            ContatoService.remove(id)
                    .success(function () {
                        $scope.buscarTodos();
                    })
                    .error(getError);
        };

    }
]);