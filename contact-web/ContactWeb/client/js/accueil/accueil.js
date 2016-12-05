/***
This file contains the Accueil module providing the routing,

***/

angular.module('bnp.unicity.accueil', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', '$translatePartialLoaderProvider',
         function ($stateProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
	
        $stateProvider.state('accueil', {
                url: '/accueil',
                templateUrl: 'views/accueil/accueil.html'
            });  
        
       
        $translatePartialLoaderProvider.addPart('accueil');
}]);

