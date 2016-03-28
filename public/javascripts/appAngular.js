/**
 * Created by Raul Lorenzo on 24/03/2016.
 */

angular.module('app', ['ui.router','angularUtils.directives.dirPagination'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'views/alta.html',
                controller: 'ctrlAlta'
            })
            .state('agregar', {
                url: '/agregar',
                templateUrl: 'views/agregar.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/editar.html',
                controller: 'ctrlEditar'
            });
        $urlRouterProvider.otherwise('alta');
    })
    .factory('comun', function($http) {

        
        var comun = {};

        comun.usuarios = [];

        comun.usuario = {};

        /***Sección de métodos remotos***/
        comun.getAll = function(){
            return $http.get('/usuarios')
            .success(function(data){
                angular.copy(data, comun.usuarios)

                return comun.usuarios
            })
        }

        comun.add = function(usuario){
            return $http.post('/usuario', usuario)
            .success(function(usuario){
                comun.usuarios.push(usuario);
            })
        }

        comun.update = function(usuario){
            return $http.put('/usuario/' + usuario._id, usuario)
            .success(function(data){
                var indice = comun.usuarios.indexOf(usuario);
                comun.usuarios[indice] = data;
            })
        }

        comun.delete = function(usuario){
            return $http.delete('/usuario/' + usuario._id)
            .success(function(){
                var indice = comun.usuarios.indexOf(usuario);
                comun.usuarios.splice(indice, 1);
            })
        }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }

        $scope.usuario = {}
        // $scope.usuarios = [];

        comun.getAll();

        $scope.usuarios = comun.usuarios;

        $scope.niveles = ['Bajo', 'Medio', 'Alto'];

        $scope.agregar = function() {
            comun.add({
                nombre: $scope.usuario.nombre,
                apellido: $scope.usuario.apellido,
                mail: $scope.usuario.mail,
                nivel: parseInt($scope.usuario.nivel)
            })

            $scope.usuario.nombre = '';
            $scope.usuario.apellido = '';
            $scope.usuario.mail = '';
            $scope.usuario.nivel = '';
            
            $state.go('alta');
        }

        $scope.masNivel = function(usuario) {
            usuario.nivel += 1;
        }

        $scope.menosNivel = function(usuario) {
            usuario.nivel -= 1;
        }

        $scope.eliminar = function(usuario) {
            comun.delete(usuario);
        }

        $scope.procesaObjeto = function(usuario) {
            comun.usuario = usuario;
            $state.go('editar');
        }

    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.usuario = comun.usuario;
        
        $scope.actualizar = function() {
            comun.update($scope.usuario);
            $state.go('alta');
        }

        $scope.eliminar = function(){
            comun.delete($scope.usuario);
            $state.go('alta');
        }
    })
