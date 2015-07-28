angular.module("listaTelefonica").controller("novoContatoCtrl",[
	'$scope', 'contatosAPI', 'config', '$location', 'operadoras',
	function($scope, contatosAPI, config, $location, operadoras){

	$scope.app = config.appName;
	$scope.operadoras = operadoras;

	$scope.adicionarContato = function(contato){
		contato.color = 'pink';
		contatosAPI.save(contato)
			.success(function(data){
				delete $scope.contato;
				$scope.contatoForm.$setPristine();		
				$location.path("/contatos");
			})
			.error(function(data){
				$scope.error = "Aconteceu um problema: "+ data;
			});		
	};		
}]);