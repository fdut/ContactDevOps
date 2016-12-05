/***
This file contains the VieBatiment module providing the routing,

***/

angular.module('bnp.unicity.batiment', ['bnp.unicity.batiment.controllers','ui.router'])
    .config(['$stateProvider',
             '$urlRouterProvider', 
             '$translatePartialLoaderProvider',
         function ($stateProvider, 
        		 $urlRouterProvider, 
        		 $translatePartialLoaderProvider) {
            $stateProvider.state('vieBatiment', {
                    abstract: true,
                    url: '/vie-du-batiment',
                    templateUrl: 'views/vieBatiment/vieBatiment.html'
                })
                .state('vieBatiment.kiosque', {
                    url: '/kiosque',
                    templateUrl: 'views/vieBatiment/kiosque.html'
                })
                .state('vieBatiment.fitness', {
                    url: '/fitness',
                    templateUrl: 'views/vieBatiment/fitness.html'
                })
                .state('vieBatiment.conciergerie', {
                    url: '/conciergerie',
                    templateUrl: 'views/vieBatiment/conciergerie.html'
                })
                .state('vieBatiment.incident', {
                    url: '/incident',
                    templateUrl: 'views/vieBatiment/incident.html'
                })
                .state('vieBatiment.courrier', {
                    url: '/courrier',
                    templateUrl: 'views/vieBatiment/courrier.html'
                })
                .state('vieBatiment.salons', {
                    url: '/petits-salons',
                    templateUrl: 'views/vieBatiment/salons.html'
                })
                .state('vieBatiment.reprographie', {
                    url: '/reprographie',
                    templateUrl: 'views/vieBatiment/reprographie.html'
                })
                .state('vieBatiment.reservation', {
                    url: '/reservation-salles-specifiques',
                    templateUrl: 'views/vieBatiment/reservation.html'
                })
                
             $translatePartialLoaderProvider.addPart('vieBatiment');
}]);
