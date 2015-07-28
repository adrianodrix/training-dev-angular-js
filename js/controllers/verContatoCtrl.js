angular.module("listaTelefonica").controller("verContatoCtrl",[
	'$scope', 'config', 'contato',
	function($scope, config, contato){

	$scope.app = config.appName;
	$scope.contato = contato.data;		

}]);