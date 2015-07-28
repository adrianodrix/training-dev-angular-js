angular.module("listaTelefonica").factory('contatosAPI', ['$http', 'config', function($http, config){
	var _getContatos = function(){
		return $http.get(config.baseUrl + '/contact');
	};

	var _save = function(contato){
		return $http.post(config.baseUrl + '/contact', contato);
	};

	var _getContato = function(id){
		return $http.get(config.baseUrl + '/contact/' + id);	
	};

	return {
		getContatos: _getContatos,
		getContato: _getContato,
		save: _save
	};
}]);