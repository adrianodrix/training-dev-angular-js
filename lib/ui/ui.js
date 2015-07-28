(function(window, angular, undefined) {'use strict';

angular.module('ui', []);

angular.module('ui').run(function($templateCache){
	$templateCache.put("view/accordion.html", '<div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>');	
	$templateCache.put("view/alert.html", '<div class="ui-alert"><div class="ui-alert-title">{{ title }}</div><div class="ui-alert-message" ng-transclude></div></div>');	
});

angular.module('ui').directive('uiAccordions', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			var accordions = [];
			
			this.registerAccordion = function(accordion){
				accordions.push(accordion);	
			}

			this.closeAll = function () {
				accordions.forEach(function(accordion){
					accordion.isOpened = false;
				});
			}
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		//link: function($scope, iElm, iAttrs, controller) {}
	};
});

angular.module('ui').directive('uiAccordion', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			title: "@"
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: '^uiAccordions', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: "view/accordion.html",
		// replace: true,
		transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, element, attrs, ctrl) {
			ctrl.registerAccordion(scope);
			scope.open = function(){
				var _opened = scope.isOpened;
				ctrl.closeAll();
				return scope.isOpened = !_opened;
			}			
		}
	};
});

angular.module('ui').directive('uiAlert', function(){
	return {
		templateUrl: "view/alert.html",
		replace: true,
		restrict: "AE",
		scope: {
			title: "@",
		},
		transclude: true
	};
});

angular.module('ui').directive('uiDate', ['$filter', function($filter){
	return {
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){
			var _formateDate = function(date){
				date = date.replace(/[^0-9]+/g, '');
				if(date.length > 2){
					date = date.substring(0,2) + '/'+ date.substring(2);
				}
				if(date.length > 5){
					date = date.substring(0,5) + '/'+ date.substring(5, 9);
				}
				return date;
			};

			element.bind('keyup', function(){
				ctrl.$setViewValue(_formateDate(ctrl.$viewValue));
				ctrl.$render();
			});

			ctrl.$parsers.push(function(value){				
				if (value.length === 10){
					var dateArray = value.split('/');
					return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
				}
			});
			ctrl.$formatters.push(function(value){
				return $filter('date')(value, 'dd/MM/yyyy');
			});
		}
	}
}]);


})(window, window.angular);