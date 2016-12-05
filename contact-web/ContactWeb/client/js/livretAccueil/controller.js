/***
This file contains the controller for LivretAccueil module providing the following:


***/

angular.module('bnp.unicity.livret.controllers', [])

.controller('LivretCtrl', LivretCtrl);

LivretCtrl.inject = ['$scope', 
                           '$rootScope', 
                           '$timeout', 
                           '$document',
                           'OccupiedSrv', 
                           'DataSrv',
                           '$state'];

function LivretCtrl(
		$scope, 
		$rootScope, 
		$timeout,
		$document,
		OccupiedSrv,
		DataSrv,
		$state) {
	
    $scope.init = function () {
        DataSrv.getDataFrom("livret").then(function(response) {
        	$scope.listItems=response.sections;
        	var firstSubsection= $scope.listItems[0].subsections[0];
        	$scope.currentSubitem=firstSubsection.name.substr(firstSubsection.name.indexOf(" ") + 1);
        	$scope.currentSubitemNo=firstSubsection.name.split(" ")[0];
        });
        
        $scope.status = {
        	    isFirstOpen: true,
        	    oneAtATime: true,
        	    isItemOpen: [true]
        	  };
    }  
    
    $scope.doThis = function(crtname, location, image){
    	$scope.currentSubitem=crtname.substr(crtname.indexOf(" ") + 1)
    	$scope.currentSubitemNo=crtname.split(" ")[0];
    	$scope.currentSubitemLocation=location;
    	$scope.currentSubitemImageName= "images/png/"+image;
    	$scope.showPlan = image;
    	}
    
    $scope.ShowFirstSubitem = function(NoAccordeon, crtname, location, image) {
    	 if (NoAccordeon) {
    		$scope.currentSubitem=crtname.substr(crtname.indexOf(" ") + 1)
    		$scope.currentSubitemNo=crtname.split(" ")[0];
    		$scope.currentSubitemLocation=location;
    		$scope.currentSubitemImageName= "images/png/"+image;
    		$scope.showPlan = image;
    	}
    	
    }
    
    
}; 