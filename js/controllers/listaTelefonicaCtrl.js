angular.module("listaTelefonica").controller("listaTelefonicaCtrl",[
			'$scope', '$filter', 'contatosAPI', 'config', function($scope, $filter, contatosAPI, config){
			
			$scope.app = config.appName;

			$scope.contatos = [];
			$scope.operadoras = [
				{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
				{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 2.5},
				{nome: "Tim", codigo: 41, categoria: "Celular", preco: 1.8},
				{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2},
				{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 2.9},
			];
			var carregarContatos = function (){
				contatosAPI.getContatos()
					.success(function(data){
						$scope.contatos = data;
					})
					.error(function(data){
						$scope.message = "Aconteceu um problema: "+ data;
					});
			};
			$scope.adicionarContato = function(contato){
				//$scope.contatos.push(angular.copy(contato));
				contato.color = 'brown';
				contatosAPI.save(contato)
					.success(function(data){
						delete $scope.contato;
						$scope.contatoForm.$setPristine();		
						carregarContatos();	
					})
					.error(function(data){
						$scope.message = "Aconteceu um problema: "+ data;
					});
				
			};
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
			carregarContatos();	
		}]);