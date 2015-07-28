angular.module('listaTelefonica').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/contatos', {
		templateUrl: "view/contatos.html",
		controller: "listaTelefonicaCtrl",
		resolve: {
			contatos: function(contatosAPI){
				return contatosAPI.getContatos();
			}
		},
	});

	$routeProvider.when('/novo-contato', {
		templateUrl: "view/novoContato.html",
		controller: "novoContatoCtrl",		
		resolve: {
			operadoras: function(){
				return [
					{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
					{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 2.5},
					{nome: "Tim", codigo: 41, categoria: "Celular", preco: 1.8},
					{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2},
					{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 2.9},
				];
			}
		},
	});

	$routeProvider.when('/ver-contato/:id', {
		templateUrl: "view/verContato.html",
		controller: "verContatoCtrl",
		resolve: {
			contato: function(contatosAPI, $route){
				return contatosAPI.getContato($route.current.params.id);
			}
		}

	});

	$routeProvider.otherwise({
		redirectTo: "/contatos",		
	});
}])