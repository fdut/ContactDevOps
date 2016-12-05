/***
This file contains the Restauration module providing the routing,

***/

angular.module('bnp.unicity.restauration', ['ui.router','bnp.unicity.restauration.controllers'
                                            , 'bnp.unicity.restauration.services'])
    .config(['$stateProvider', 
             '$urlRouterProvider', 
             '$translatePartialLoaderProvider',
         function (	$stateProvider, 
        		 	$urlRouterProvider, 
        		 	$translatePartialLoaderProvider) {
    	
            $stateProvider.state('restauration', {
            	abstract: true,
                url: '/restauration',
                templateUrl: 'views/restauration/restauration.html'
            }) 
           .state('restauration.restaurant', {
            	url: '/restaurant',
            	templateUrl: 'views/restauration/restaurant.html'
            }) 
            .state('restauration.cafeteria', {
            	url: '/alto-café',
            	templateUrl: 'views/restauration/cafeteria.html'
            }) 
            .state('restauration.cafeteria2', {
            	url: '/contemporain',
            	templateUrl: 'views/restauration/cafeteria2.html'
            }) 
            $translatePartialLoaderProvider.addPart('restauration');
    }]);
