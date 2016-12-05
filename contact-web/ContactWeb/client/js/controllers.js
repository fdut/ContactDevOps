angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $state){
  $scope.contacts = [];
  $scope.displayError = false;

  $scope.getcontacts = function() {
  var contactsRequest = new WLResourceRequest(
    "/adapters/contactAdapter/getcontacts",
    WLResourceRequest.GET
  );

  contactsRequest.setQueryParameter("params", "[]");

  contactsRequest.send().then(
    getcontactsSuccess,
    getcontactsFailure
  );

  function getcontactsSuccess(result){
    console.log('We got a contacts list', result.responseJSON.results);
    $scope.contacts = result.responseJSON.results;
    $scope.$apply();
  };

  function getcontactsFailure(result){
    console.log('Failed to get a contacts list', result);
  }
};

  $scope.goto = function(contact) {
    console.log('Current contact', contact);
    $scope.currentcontact = contact;
    $state.go('details');
  }

  $scope.doLogout = function() {
    WL.Client.logout("AuthRealm");
    $scope.username = '';
    $scope.password = '';
    $scope.username = [];
    $state.go('login');
  }

  $scope.doLogin = function(username, password) {
    $scope.getcontacts();
    $state.go('main');

    // var AuthRealmChallengeHandler = WL.Client.createChallengeHandler("AuthRealm");

// AuthRealmChallengeHandler.isCustomResponse = function(response) {
// 	if (!response || !response.responseJSON	|| response.responseText === null) {
// 		return false;
// 	}
// 	if (typeof(response.responseJSON.authRequired) !== 'undefined'){
// 		return true;
// 	} else {
// 		return false;
// 	}
// };
//
// AuthRealmChallengeHandler.handleChallenge = function(response){
// 	var authRequired = response.responseJSON.authRequired;
//
// 	if (authRequired == true){
//       console.log('authRequired ', authRequired);
//
// 		if (response.responseJSON.errorMessage)
//         console.log('Auth error ', response.responseJSON.errorMessage);
//         $scope.displayError = true;
//         $scope.displayMessage = response.responseJSON.errorMessage;
//         $scope.$apply();
//
// 	} else if (authRequired == false){
// 		console.log('authRequired ', authRequired);
// 		AuthRealmChallengeHandler.submitSuccess();
//     $scope.displayError = false;
//     $scope.getcontacts();
//     $state.go('main');
// 	}
// };

	// var invocationData = {
	// 	adapter : "contactAuthAdapter",
	// 	procedure : "submitAuthentication",
	// 	parameters : [ username, password ]
	// };
  //
	// AuthRealmChallengeHandler.submitAdapterAuthentication(invocationData, {});



  }

})