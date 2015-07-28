angular.module("listaTelefonica").controller("listaTelefonicaCtrl",[
	'$scope', '$filter', 'config', 'serialGenerator', 'contatos',
	function($scope, $filter, config, serialGenerator, contatos){
	
	$scope.app = config.appName;

	$scope.contatos = contatos.data;
	
	$scope.apagarContatos = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if (!contato.selecionado) return contato;
		});				
	};
	$scope.isContatosSelecionados = function(contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};			
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};		
}]);