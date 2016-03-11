angular.module("contatooh").service('ContatoService', ['$http', function ($http) {

        var contatosURL = "api/contatos/";

        function findAll() {
            return $http.get(contatosURL);
        }

        function findById(id) {
            return $http.get(contatosURL.concat(id));
        }

        function create(data) {
            return $http.post(contatosURL, data);
        }

        function update(data) {
            return $http.put(contatosURL.concat(data._id), data);
        }

        function removeContato(id) {
            return $http.delete(contatosURL.concat(id));
        }

        this.getById = function (id) {
            return findById(id);
        };

        this.get = function () {
            return findAll();
        };

        this.save = function (contato) {
            if (contato._id)
                return update(contato);
            else
                return create(contato);
        };

        this.remove = function (id) {
            return removeContato(id);
        };

    }]);