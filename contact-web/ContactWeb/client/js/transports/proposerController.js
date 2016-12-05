angular.module('bnp.unicity.transports.proposerCalendar', [])

.controller('ProposerCtrl', ProposerCtrl);

ProposerCtrl.inject = ['$scope',
                       'DataSrv',
                       'CalendarSrv'];

function ProposerCtrl($scope,
		DataSrv,
		CalendarSrv) {
	
	

    $scope.libererLot = function () {   
    	
    	$scope.emptyLots = {
                email: "",
                type: "",
                dates: [],
            };
        
        var pattern = /^(\w|\.)*(@bnpparibas)(-)*\w*(\.com)$/;
        

        $scope.emptyLots.email = $scope.formEliberer.userEmailEliberer;
        $scope.errorEmailProposer = pattern.test($scope.emptyLots.email);
        $scope.emptyLots.type = "RELEASE";
        $scope.emptyLots.dates = CalendarSrv.retrieveReservation();
        $scope.modalText = "";
        
        if(!$scope.emptyLots.email){
       	 $("#modalProposerErrors").modal();
       	 $scope.modalText = "Vous devez renseigner votre e-mail au préalable"
       }
        else if(!$scope.errorEmailProposer){
        	  $("#modalProposerErrors").modal();
        	  $scope.modalText = "Votre adresse e-mail est invalide"
         }
        else if($scope.emptyLots.dates.length === 0){
        	  $("#modalProposerErrors").modal();
        	  $scope.modalText = "Vous avez oublié de sélectionner vos jours"
        }
        else{
        	  DataSrv.sendReservation([$scope.emptyLots]).then(function (response) {
                  $("#modalProposer").modal();
              })
              .then(function (err) {
                  console.log(err);
              });
        	
        }
        
        CalendarSrv.clearRedBullets();
    }


};
