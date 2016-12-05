/***
This file contains the controller for EspacesTravail module providing the following:


***/
angular.module('bnp.unicity.espaces.controllers', [])

.controller('EspacesCtrl', EspacesCtrl);

EspacesCtrl.inject = ['$scope',
                           '$rootScope',
                           '$timeout',
                           '$document',
                           'OccupiedSrv',
                           'DataSrv',
                           '$state'];

function EspacesCtrl(
    $scope,
    $rootScope,
    $timeout,
    $document,
    OccupiedSrv,
    DataSrv,
    $state) { 

    $scope.init = function () {
        DataSrv.getDataFrom("espaces").then(function (response) {
            $scope.listItems = response.sections;
            $scope.currentSubitem = $scope.listItems[1].name;
            $scope.currentKey = $scope.setDefaultKey(); //$scope.listItems[0].keyName;
            $scope.currentFloor = 1;
            $scope.isImgLoaded=true;
 
            DataSrv.getData("espacesTravail").then(function (response) {
            	var menuObj=$rootScope.info[$scope.currentKey];
            	$scope.setEnabledFloors();
            	if($scope.isDisableFloor($scope.currentFloor))
                {
              	  $scope.triggerClickOnValidFloor();
                }	
            	$scope.loadMap();
            });
        });
    }

    $scope.setSection = function (crtname, currentKey) {
        $scope.currentSubitem = crtname;
        $scope.currentKey = currentKey;
        $scope.setEnabledFloors();
        if($scope.isDisableFloor($scope.currentFloor))
          {
        	$scope.triggerClickOnValidFloor();
          }	

        $scope.loadMap();

    }

    $scope.setFloor = function (flnr) {
    	if(!$scope.listEnabledFloors[flnr+1]) return;
        $scope.currentFloor = flnr;
        $scope.loadMap();
    }

    $scope.loadMap = function () {
    	$scope.noInfo = false;
        var data = $rootScope.info[$scope.currentKey][$scope.currentFloor + 1];
        if (data.image !== "") {  
        	if($scope.currentImgFloor!=data.image)
        	 {
        		$scope.isImgLoaded=false;
        		$scope.currentImgFloor = data.image;
        	 }
            $scope.noInfo = false;
            $scope.pointsArray = data.points;   
            $scope.drawPoints();   
        } else {
            $scope.noInfo = true;
        }
    }

    $scope.drawPoints=function()
     {
    	  for (var i = 0; i < $scope.pointsArray.length; i++) {
             $scope.pointsArray[i].cssStyle = {
                 "margin-top": Math.round(($scope.pointsArray[i].y - 257) / 1.338) + "px",
                 "margin-left": Math.round($scope.pointsArray[i].x / 1.338 - 14) + "px"
             }
         }
     }
    
    $scope.imageLoaded=function()
     { 
    	$scope.isImgLoaded=true;
     }

    $scope.setEnabledFloors=function()
     {
    	var menuObj=$rootScope.info[$scope.currentKey];
    	$scope.listEnabledFloors=new Array();
    	for(var i=0;i<menuObj.length;i++)
    	  {
    		if(menuObj[i].image=="")
    			$scope.listEnabledFloors.push(0);
    		else
    			$scope.listEnabledFloors.push(1);
    	  }
    	return $scope.listEnabledFloors;
     }
    
    
    $scope.triggerClickOnValidFloor=function()
     {
    	var nrF=$scope.listEnabledFloors.length-1;
    	var k=0;
    	for(var i=nrF;i>=0;i--)
  	     {	  	   
    	   if(!$scope.isDisableFloor(i-1))
    	    { 
    	       $timeout(function() 
                {
    	    	   var el=document.getElementById('floor'+k).firstElementChild;
    	    	   angular.element(el).triggerHandler('click');                  
                }, 0); 
    	       return;
    	    }  
  	       k++;
  	     } 
     }
    
    //if current floor has no data(is disable) search another floor
    $scope.isDisableFloor=function(floor)
     {
    	 if($scope.listEnabledFloors[floor+1]==0)  
        	return true;
    	 else
    		return false;
     }
    
    $scope.setDefaultKey=function()
     {
    	var currentState=$state.current.name;
    	return currentState.substring(currentState.lastIndexOf(".") + 1, currentState.length);
     }
    
};
