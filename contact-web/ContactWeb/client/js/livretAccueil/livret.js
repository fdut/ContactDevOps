/***
This file contains the LivretAccueil module providing the routing,

***/

angular.module('bnp.unicity.livret', ['ui.router','ngAnimate','ui.bootstrap','bnp.unicity.livret.controllers'])
    .config(['$stateProvider', '$urlRouterProvider', '$translatePartialLoaderProvider',
         function ($stateProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
            $stateProvider.state('livretAccueil', {
                abstract: true,
                url: '/livret-d-accueil',
                templateUrl: 'views/livretAccueil/livretAccueil.html'
            }).state('livretAccueil.One', {
                url: '/one',
                templateUrl: 'views/livretAccueil/1.html'
            })
    
            .state('livretAccueil.OneOne', {
        url: '/one',
        templateUrl: 'views/livretAccueil/1.html'
    })
           
            .state('livretAccueil.Two', {
                url: '/two',
                templateUrl: 'views/livretAccueil/2.html'
            })
            
            .state('livretAccueil.TwoOne', {
                url: '/two',
                templateUrl: 'views/livretAccueil/2.html'
            })
           
            .state('livretAccueil.Three', {
                url: '/three',
                templateUrl: 'views/livretAccueil/3.html'
            })
            
               .state('livretAccueil.ThreeOne', {
                url: '/three',
                templateUrl: 'views/livretAccueil/3.html'
            })
            
             .state('livretAccueil.Four', {
                url: '/four',
                templateUrl: 'views/livretAccueil/4.html'
            })
            
             .state('livretAccueil.FourOne', {
                url: '/four',
                templateUrl: 'views/livretAccueil/4.html'
            })
            
            .state('livretAccueil.Five', {
                url: '/five',
                templateUrl: 'views/livretAccueil/5.html'
            })
            
            .state('livretAccueil.FiveOne', {
                url: '/five',
                templateUrl: 'views/livretAccueil/5.html'
            })
            
            .state('livretAccueil.Six', {
                url: '/six',
                templateUrl: 'views/livretAccueil/6.html'
            })

            .state('livretAccueil.SixOne', {
                url: '/six',
                templateUrl: 'views/livretAccueil/6.html'
            })
            
             .state('livretAccueil.Seven', {
                url: '/seven',
                templateUrl: 'views/livretAccueil/7.html'
            })
             .state('livretAccueil.SevenOne', {
                url: '/seven',
                templateUrl: 'views/livretAccueil/7.html'
            })
            
            .state('livretAccueil.Eight', {
                url: '/eight',
                templateUrl: 'views/livretAccueil/8.html'
            })
            
             .state('livretAccueil.EightOne', {
                url: '/eight',
                templateUrl: 'views/livretAccueil/8.html'
            })
            
             .state('livretAccueil.Nine', {
                url: '/nine',
                templateUrl: 'views/livretAccueil/9.html'
            })
            
             .state('livretAccueil.NineOne', {
                url: '/nine',
                templateUrl: 'views/livretAccueil/9.html'
            })
            ;
            $translatePartialLoaderProvider.addPart('livretAccueil');
    }]);
