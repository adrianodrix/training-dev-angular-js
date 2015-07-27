angular.module("listaTelefonica").factory('contatosAPI', ['$http', 'config', function($http, config){
	var _getContatos = function(){
		return $http.get(config.baseUrl + '/contact');
	};

	var _save = function(contato){
		return $http.post(config.baseUrl + '/contact', contato);
	};

	return {
		getContatos: _getContatos,
		save: _save
	};
}]);