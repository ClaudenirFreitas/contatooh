describe("ContatosController", function () {

    var $httpBackend, $scope, $controller;

    beforeEach(function () {
        // define module
        module('contatooh');
        // inject dependencies
        inject(function ($injector, _$controller_, _$httpBackend_) {
            $scope = $injector.get("$rootScope").$new();
            $controller = _$controller_("ContatosController", {"$scope": $scope, "$routeParams": {contatoId: 1}});
            $httpBackend = _$httpBackend_;
            $httpBackend.when("GET", "api/contatos/").respond([{_id: 1}, {_id: 2}]);
            $httpBackend.when("GET", "api/contatos/1").respond({_id: 1});
        });
    });

    it("listar todos os contatos", function () {
        $scope.buscarTodos();
        $httpBackend.flush();
        expect($scope.contatos.length).toBe(2);
    });

    it("listar um contato especifico", function () {
        $scope.buscarPorId();
        $httpBackend.flush();
        expect($scope.contato._id).toBe(1);
    });

});