angular.module('app.controllers', [])

  .controller('MainCtrl', function ($scope, $state, $http, $ionicPopup) {
    $scope.contacts = [];
    $scope.displayError = false;

    //Switch for using MFP Adapter (true) or not (False)
    $scope.useMFPAdapter = false;

    //Switch for using MFP Security (true) or not (False)
    //You need to add 'UserLogin' security check to the scope for Mandatory Application Scope in the MobileFirst Console 
    // Before deploy contactAuthAdapter Adapter
    $scope.useMFPSecurity = false;


    $scope.getcontacts = function () {


      if ($scope.useMFPAdapter) {

        // -- START -- Code for MFP Adapter  

        var contactsRequest = new WLResourceRequest(
          "/adapters/contactAdapter/getcontacts",
          WLResourceRequest.GET
        );

        contactsRequest.setQueryParameter("params", "[]");

        contactsRequest.send().then(
          getcontactsSuccess,
          getcontactsFailure
        );

        function getcontactsSuccess(result) {
          console.log('We got a contacts list', result.responseJSON.results);
          $scope.contacts = result.responseJSON.results;
          $scope.$apply();
        };

        function getcontactsFailure(result) {
          console.log('Failed to get a contacts list', result);
        }

        // --- END --  Code for MFP Adapter  

      } else {

        // -- START -- Code Direct API  (SANS MFP ADAPTER)

        var urlBase = 'https://randomuser.me/api/?results=25&nat=fr'; //MUST REPLACE WITH API URL

        var headersBase =

          {
            'content-type': 'application/json',
            'accept': 'application/json'
          }

        var req = {
          method: 'GET',
          url: urlBase,
          headers: headersBase
        }

        $http(req).then(function (response) {
          console.log(JSON.stringify(response));
          $scope.contacts = response.data.results;
        });

        // --- END --  Code Direct API   

      }



    }; //End of getContact

    $scope.goto = function (contact) {
      console.log('Current contact', contact);
      $scope.currentcontact = contact;
      $state.go('details');
    }


    $scope.isChallenged = false;
    $scope.securityCheckName = 'UserLogin';
    $scope.userLoginChallengeHandler = null;

    $scope.doLogin = function (username, password) {


      if ($scope.useMFPSecurity) {

        /* START With Authentication */

        console.log(">> loginCtrl - doLogin - $scope.username:" + username);
        if ($scope.isChallenged) {
          console.log(">> loginCtrl - doLogin -  $scope.isChallenged == true");
          $scope.userLoginChallengeHandler.submitChallengeAnswer({
            'username': username,
            'password': password
          });
        } else {
          console.log(">> loginCtrl - doLogin -  $scope.isChallenged == false");
          WLAuthorizationManager.login($scope.securityCheckName, {
            'username': username,
            'password': password
          }).then(function () {
              console.log(">> WLAuthorizationManager.login - onSuccess");
              $scope.getcontacts();
              $state.go('main');
            },
            function (response) {
              console.log(">> WLAuthorizationManager.login - onFailure: " + JSON.stringify(response));
              $scope.showLoginError("Erreur", "Erreur lors de l'authentification");

            });
        }
        /* END With Authentication */

      } else {

        /* START Without Authentication */

        $scope.getcontacts();
        $state.go('main');

        /* END Without Authentication */
      }


    } //End dologin

    $scope.doLogout = function () {
      WLAuthorizationManager.logout($scope.securityCheckName).then(
        function () {
          WL.Logger.debug("logout onSuccess");
          $scope.username = '';
          $scope.password = '';
          $scope.username = [];
          $state.go('login');
        },
        function (response) {
          WL.Logger.debug("logout onFailure: " + JSON.stringify(response));
        });
    };

    // Triggered on a popup alert
    $scope.showLoginError = function (titletxt, templatetxt) {
      var alertPopup = $ionicPopup.alert({
        title: titletxt,
        template: templatetxt
      });
      alertPopup.then(function (res) {
        console.log(templatetxt);
      });
    }; //End of showpopup


  })
