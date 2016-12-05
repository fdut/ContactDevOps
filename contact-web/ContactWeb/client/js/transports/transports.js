/***
This file contains the Transports module providing the routing,

***/

angular.module('bnp.unicity.transports', ['ui.router','bnp.unicity.transports.proposerCalendar',
                                          'bnp.unicity.transports.trouverCalendar', 
                                          'bnp.unicity.transports.controllers', 
                                          'bnp.unicity.transports.calendar',
                                          'bnp.unicity.transports.covoiturage',
                                          'bnp.unicity.transports.services'])
    .config(['$stateProvider',
             '$urlRouterProvider',
             '$translatePartialLoaderProvider',
         function ($stateProvider,
            $urlRouterProvider,
            $translatePartialLoaderProvider) {
            $stateProvider.state('transports', {
                    abstract: true,
                    url: '/transports',
                    templateUrl: 'views/transports/transports.html'
                })
                .state('transports.publics', {
                    url: '/publics',
                    templateUrl: 'views/transports/publics.html'
                })
                .state('transports.parking', {
                    abstract: true,
                    url: '/parking',
                    templateUrl: 'views/transports/parking.html',
                })
                .state('transports.parking.proposer', {
                    url: '/proposer',
                    templateUrl: 'views/transports/proposer.html',
                    controller: 'ProposerCtrl'
                })
                .state('transports.parking.trouver', {
                    url: '/trouver',
                    templateUrl: 'views/transports/trouver.html',
                    controller: 'TrouverCtrl'
                    })
                .state('transports.covoiturage', {
                    url: '/covoiturage',
                    templateUrl: 'views/transports/covoiturage.html'
                })

            $translatePartialLoaderProvider.addPart('transports');
    }]);
