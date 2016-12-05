/***
This file contains the controller for Assistance module providing the following:

***/

angular.module('bnp.unicity.assistance.controllers', [])

.controller('AssistanceCtrl', ['$scope', '$rootScope', '$timeout','$document', 'DataSrv', function($scope, $rootScope, $timeout, $document, DataSrv) 
 {

	$scope.init=function()
	  {	
		DataSrv.getData("assistance");
	  }
		
	
	$scope.renderRightInfo=function(itemNr)
	 {
		$scope.currentArea=$rootScope.info.items[itemNr];
		var date = new Date();
		var hour = date.getHours();
	    var minutes = date.getMinutes();
	    
	    var startHour = parseInt($scope.currentArea.schedule.startHour);
	    var endHour = parseInt($scope.currentArea.schedule.endHour);
	    var startMinutes = parseInt($scope.currentArea.schedule.startMinutes);
	    var endMinutes = parseInt($scope.currentArea.schedule.endMinutes);

	    var timeInterval=DataSrv.getTime(startHour, endHour, startMinutes, endMinutes);
	 
	    $scope.currentArea.msgState=timeInterval.msgState;
	    $scope.currentArea.msgWait=timeInterval.msgWait;
	 }
	
	$scope.select= function(index) 
	 {
	       $scope.selected = index; 
     };
     
     
     $scope.finishRenderMenu=function()
	  {		
		 $timeout(function() 
		  {
		    var el =document.getElementById('it-0');
            angular.element(el).triggerHandler('click');
            $scope.selected=0;
          }, 0);
         
	  }
	    
}]);
			