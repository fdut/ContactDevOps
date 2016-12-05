/***
This file contains the main application module BNPUnicity containing the whole  modules( Accueil,Assistance, Espaces de Travail,
 Livret d'Accueil, Restauration, Transports, Vie du Batiment) providing the routing,

***/

angular.module(
        'bnp.unicity', ['ui.router',
                        'pascalprecht.translate',
                        'bnp.unicity.accueil',
                    	'bnp.unicity.assistance',
                        'bnp.unicity.espaces',
                        'bnp.unicity.livret',
                        'bnp.unicity.restauration',
                        'bnp.unicity.transports',
                        'bnp.unicity.batiment',
                        'bnp.unicity.controller'
                        ])
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$translatePartialLoaderProvider', '$logProvider',
         function ($stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider, $logProvider) {
            $logProvider.debugEnabled(false);

            $urlRouterProvider.otherwise('/accueil');

            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'i18n/{part}/{lang}.json'
            });

            $translatePartialLoaderProvider.addPart('homePage');
            $translateProvider.preferredLanguage('fr');
         }])
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$evalAsync(attr.onFinishRender);
                    }, 0);
                }
            }
        }
    })
    .directive("ngCalendarcustom", function ($compile) {
        return {
            templateUrl: 'views/transports/calendar.html',
            restrict: 'E',
            scope: true,
            scope: {
            	proposer: '@proposer',
            	trouver: '@trouver',
            	lots: "="
            },
            controller: 'CalendarCtrl'
            
        }
    })
    .directive('imageonload', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                 $timeout(function () {
                    scope.$apply(attrs.imageonload);
                   }, 0);
            });
        }
    }
    })   
    .filter('capitalizeVelib', function () {
        return function (input) {
            if (input) {
                var firstName = input.split(" ")[2];
                var secondName = input.split(" ")[3];
                firstName = firstName[0] + firstName.slice(1, firstName.length).toLowerCase() + " ";
                secondName = secondName.slice(0, 2) + secondName.slice(2, secondName.length).toLowerCase();
                return input.split(" ")[0] + input.split(" ")[1] + firstName + secondName;
            }
        };
    })
    .run(['$state', '$rootScope', 'DataSrv', function ($state, $rootScope, DataSrv) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            DataSrv.getDataFrom("headerSource").then(function (response) {
                imageSource = response[toState.name];
                console.log(imageSource);
                $rootScope.headerSource = {
                        'background-image': 'url("images/jpg/' + imageSource + '")'
                };

            });

        });
}])
