/***
This file contains the EspacesTravail module providing the routing,

***/

angular.module('bnp.unicity.espaces', ['ui.router','bnp.unicity.espaces.controllers'])
    .config(['$stateProvider', '$urlRouterProvider', '$translatePartialLoaderProvider',
         function ($stateProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
            $stateProvider.state('espacesTravail', {
                    abstract: true,
                    url: '/espaces-de-travail',
                    templateUrl: 'views/espacesTravail/espaces.html'
                })
                .state('espacesTravail.pointCopie', {
                    url: '/point-copie',
                    templateUrl: 'views/espacesTravail/pointCopie.html'
                })
                 .state('espacesTravail.acceuil', {
                    url: '/acceuil',
                    templateUrl: 'views/espacesTravail/acceuil.html'
                })
                
                 .state('espacesTravail.infirmerie', {
                    url: '/infirmerie',
                    templateUrl: 'views/espacesTravail/infirmerie.html'
                })
                .state('espacesTravail.sallesDeReunion', {
                    url: '/salles-de-reunion',
                    templateUrl: 'views/espacesTravail/sallesDeReunion.html'
                })
                .state('espacesTravail.bullesDuo', {
                    url: '/bulles-duo',
                    templateUrl: 'views/espacesTravail/bullesDuo.html'
                })
                .state('espacesTravail.bullesTrio', {
                    url: '/bulles-trio',
                    templateUrl: 'views/espacesTravail/bullesTrio.html'
                })
                .state('espacesTravail.bullesLounge', {
                    url: '/bulles-lounge',
                    templateUrl: 'views/espacesTravail/bullesLounge.html'
                })
                .state('espacesTravail.bullesBanquette', {
                    url: '/bulles-banquette',
                    templateUrl: 'views/espacesTravail/bullesBanquette.html'
                })
                 .state('espacesTravail.pointCafe', {
                    url: '/point-cafe',
                    templateUrl: 'views/espacesTravail/pointCafe.html'
                })    
               .state('espacesTravail.fitness', {
                    url: '/fitness',
                    templateUrl: 'views/espacesTravail/fitness.html'
                })
               .state('espacesTravail.auditorium', {
                    url: '/auditorium',
                    templateUrl: 'views/espacesTravail/auditorium.html'
                })       
               .state('espacesTravail.kiosque', {
                    url: '/kiosque',
                    templateUrl: 'views/espacesTravail/kiosque.html'
                })     
              .state('espacesTravail.localVelo', {
                    url: '/local-velo',
                    templateUrl: 'views/espacesTravail/localVelo.html'
                }) 
               .state('espacesTravail.pcSecurite', {
                    url: '/pc-securite',
                    templateUrl: 'views/espacesTravail/pcSecurite.html'
                }) 
              .state('espacesTravail.cantine', {
                    url: '/cantine',
                    templateUrl: 'views/espacesTravail/cantine.html'
                }) 
               .state('espacesTravail.cafeteria', {
                    url: '/cafeteria',
                    templateUrl: 'views/espacesTravail/cafeteria.html'
                })
               .state('espacesTravail.conciergeria', {
                    url: '/conciergeria',
                    templateUrl: 'views/espacesTravail/conciergeria.html'
                })
               .state('espacesTravail.echangeur', {
                    url: '/echangeur',
                    templateUrl: 'views/espacesTravail/echangeur.html'
                }) 
              .state('espacesTravail.bureauBadges', {
                    url: '/bureau-badges',
                    templateUrl: 'views/espacesTravail/bureauBadges.html'
                })    
                
            $translatePartialLoaderProvider.addPart('espacesTravail');
    }]);
