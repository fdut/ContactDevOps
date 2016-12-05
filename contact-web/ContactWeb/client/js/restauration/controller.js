/***
This file contains the controller for Restauration module providing the following:


***/

angular.module('bnp.unicity.restauration.controllers', [])

.controller('RestaurationCtrl', RestaurationCtrl);

RestaurationCtrl.inject = ['$scope', 
                           '$rootScope', 
                           '$timeout', 
                           '$document',
                           'OccupiedSrv', 
                           'DataSrv',
                           '$state'];

function RestaurationCtrl(
		$scope, 
		$rootScope, 
		$timeout,
		$document,
		OccupiedSrv,
		DataSrv,
		$state) {

	$scope.mDate=new Array(5);
	$scope.currentDay=0;
	$scope.currentMenu=null;
	
    $scope.init = function () {
 //       setOverlayWidth();
       
        $scope.currentDay=new Date().getDay()-1;
        if($scope.currentDay<0||$scope.currentDay==6)
        	$scope.currentDay=0;       
        
        $scope.setDateMenu();
        DataSrv.getDataFrom("restaurant_fr").then(function(response) {
        	$scope.menuRestaurant=response;
        	 $timeout(function() 
       			  {
       			    var el =document.getElementById('hd-'+$scope.currentDay); 
       	            angular.element(el).triggerHandler('click');
       	          }, 0);
        });
       

   }  
    
    $scope.setDateMenu=function()
     {
    	
    	var fDate=getMonday();
    	for(var i=0;i<5;i++)
    	  {
    		$scope.mDate[i]=fDate;
    		fDate=new Date(fDate.getTime()+86400000);
    	  }
    	
    	//$scope.mDate[0]="14.03.2016";

     }
    
    $scope.renderMenu=function(key,index)
      {
     	 $scope.currentDay=index; 
     	 $scope.currentMenu=$scope.menuRestaurant[key];
      }
    
    
      getMonday=function() {
    	  var d = new Date();
    	  var day = d.getDay();
    	  var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    	  return new Date(d.setDate(diff));
    	}

    	getMonday(new Date()); // Mon Nov 08 2010
    
    
    //Restaurant
    $scope.startHR=11;
    $scope.endHR=14;
    $scope.startMR=30;
    $scope.endMR=0;
    
    $scope.startHR2=15;
    $scope.endHR2=18;
    $scope.startMR2=0;
    $scope.endMR2=0;
    
    //get schedule format
    var date=new Date();
    var now =date.getHours() * 60 + date.getMinutes();
    var firstHR = $scope.startHR*60+$scope.startMR;
    var secondHR = $scope.endHR*60+$scope.endMR;
    var thirdHR = $scope.startHR2*60+$scope.startMR2;
    var fourthHR = $scope.endHR2*60+$scope.endMR2;
    var stateMsg = "";
    var waitMsg = "";
    
    if (now < firstHR) {
    	timeDiffMinutes = firstHR - now;
        
    	stateMsg = "Fermé maintenant";
    	waitMsg = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes) ;
        
    } else if (now < secondHR) {
    	timeDiffMinutes = secondHR - now;
        
        stateMsg = "Ouvert maintenant";
        waitMSg = "Ferme dans " + convertMinutesToFrenchString(timeDiffMinutes);
        
    } else if (now < thirdHR) {
    	timeDiffMinutes = thirdHR - now;
        
        stateMsg = "Fermé maintenant";
        waitMsg = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes);
    	
    } else if (now < fourthHR) {
    	timeDiffMinutes = fourthHR - now;
        
        stateMsg = "Ouvert maintenant";
        waitMsg = "Ferme dans "+ convertMinutesToFrenchString(timeDiffMinutes);
    	
    } else {
    	timeDiffMinutes = ((24*60) - now) + firstHR;
    
        stateMsg = "Fermé maintenant";
        waitMsg = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes);
    }
    
    $scope.msgStateR = stateMsg;
    $scope.msgWaitR = waitMsg;
    
    function convertMinutesToFrenchString(timeDiffMinutes) {
    	var h_=parseInt(timeDiffMinutes/60);
        var m_=timeDiffMinutes%60;
        var time_="0 minutes";
        if(h_==0)
        	time_=addZeroPrefix(m_)+" minutes";
        else if(m_==0)
        	time_=h_+"h";
        else 
        	time_=h_+"h"+addZeroPrefix(m_)+" minutes";

        if(new Date().getDay()==0)  //is Sunday 
        	time_="1 jour "+time_;
        else if(new Date().getDay()==6)  //is Saturday
        	time_="2 jours "+time_;
        return time_;
    }
    
    function addZeroPrefix(m)
    {
   	var str=m.toString();
   	if(str.length==1)
   		return "0"+str;
   	else
   		return str;
    }
    
    //set them from JSON if provided in the future
    
    //alto café
    $scope.startHAC=8;
    $scope.endHAC=9;
    $scope.startMAC=0;
    $scope.endMAC=30;

    $scope.startHAC2=11;
    $scope.endHAC2=14;
    $scope.startMAC2=45;
    $scope.endMAC2=30;
    
    $scope.startHAC3=18;
    $scope.startMAC3=0;
    
    var firstHAC = $scope.startHAC*60+$scope.startMAC;
    var secondHAC = $scope.endHAC*60+$scope.endMAC;
    var thirdHAC = $scope.startHAC2*60+$scope.startMAC2;
    var fourthHAC = $scope.startHAC3*60+$scope.startMAC3;
    var stateMsgAC = "";
    var waitMsgAC = "";
    
    if (now < firstHAC) {
    	timeDiffMinutes = firstHAC - now;
        
    	stateMsgAC = "Fermé maintenant";
    	waitMsgAC = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes) ;
        
    } else if (now < secondHAC) {
    	timeDiffMinutes = secondHAC - now;
        
        stateMsgAC = "Ouvert maintenant";
        waitMSgAC = "Ferme dans " + convertMinutesToFrenchString(timeDiffMinutes);
        
    } else if (now < thirdHAC) {
    	timeDiffMinutes = thirdHAC - now;
        
        stateMsgAC = "Fermé maintenant";
        waitMsgAC = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes);
    	
    } else if (now < fourthHAC) {
    	timeDiffMinutes = fourthHAC - now;
        
        stateMsgAC = "Ouvert maintenant";
        waitMsgAC = "Ferme dans "+ convertMinutesToFrenchString(timeDiffMinutes);
    	
    } else {
    	timeDiffMinutes = ((24*60) - now) + firstHAC;
    
        stateMsgAC = "Fermé maintenant";
        waitMsgAC = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes);
    }
    
    $scope.msgStateAC= stateMsgAC;
    $scope.msgWaitAC = waitMsgAC;
    
    //contemporain
    $scope.startHC=11;
    $scope.endHC=15;
    $scope.startMC=45;
    $scope.endMC=0;
    
    $scope.startHC2=18;
    $scope.startMC2=0;
    
    var firstHC = $scope.startHC*60+$scope.startMC;
    var secondHC = $scope.startHC2*60+$scope.startMC2;
    var stateMsgC = "";
    var waitMsgC = "";
    
    if (now < firstHC) {
    	timeDiffMinutes = firstHC - now;
        
    	stateMsgC = "Fermé maintenant";
    	waitMsgC = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes) ;
        
    } else if (now < secondHC) {
    	timeDiffMinutes = secondHC - now;
        
        stateMsgC = "Ouvert maintenant";
        waitMSgC = "Ferme dans " + convertMinutesToFrenchString(timeDiffMinutes);
        
    } else {
    	timeDiffMinutes = ((24*60) - now) + firstHC;
    
        stateMsgC = "Fermé maintenant";
        waitMsgC = "Ouvre dans " + convertMinutesToFrenchString(timeDiffMinutes);
    }
    
    $scope.msgStateC= stateMsgC;
    $scope.msgWaitC = waitMsgC;
    
    
    $scope.startMC2=0+"0";
    $scope.endMR=0+"0";
    $scope.endMC2=0+"0";
    $scope.startMAC=0 + "0";
    $scope.startMAC3=0 + "0";
    $scope.endMC=0 + "0";
    $scope.endMR2=0 + "0";
    $scope.startMR2=0 + "0";
    
    
       

}; 