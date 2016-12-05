/***
This file contains the Assistance module providing the routing,

***/

angular.module('bnp.unicity.assistance', ['ui.router', 'bnp.unicity.assistance.controllers', 'bnp.unicity.services'])
    .config(['$stateProvider', '$urlRouterProvider', '$translatePartialLoaderProvider',
         function ($stateProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
    	     $stateProvider.state('assistance', {
                url: '/assistance',
                templateUrl: 'views/assistance/assistance.html'
            })
            
            $translatePartialLoaderProvider.addPart('assistance');
    }]);
