/***
This file contains the controller for VieBatiment module providing the following:


***/



angular.module('bnp.unicity.batiment.controllers', [])

.controller('BatimentCtrl', BatimentCtrl);

BatimentCtrl.inject = ['$scope',
                       'DataSrv'];

function BatimentCtrl(
		$scope,
		DataSrv) {
	
    $scope.init = function () {
    	$scope.currentItem=" Kiosque",
    	
    	//Schedule conciengerie
    	$scope.startHC1=8;
    	$scope.endHC1=10;
    	$scope.startMC1=30;
    	$scope.endMC1=0;    	
    	
    	$scope.startHC2=11;
    	$scope.endHC2=14;
    	$scope.startMC2=30;
    	$scope.endMC2=0;
    	
    	$scope.startHC3=16;
    	$scope.endHC3=18;
    	$scope.startMC3=30;
    	$scope.endMC3=30;
    	
    	//Schedule for courrier interne
    	$scope.startHCI1=8;
    	$scope.endHCI1=16;
    	$scope.startMCI1=0;
    	$scope.endMCI1=30;
    	
    	//Schedule fitness
    	$scope.startHF0=7;
    	$scope.endHF0=9;
    	$scope.startMF0=30;
    	$scope.endMF0=0;
    	
    	$scope.startHF1=11;
    	$scope.endHF1=14;
    	$scope.startMF1=30;
    	$scope.endMF1=30;
    	
    	$scope.startHF2=17;
    	$scope.endHF2=19;
    	$scope.startMF2=0;
    	$scope.endMF2=30;
    	
    	//Schedule for kiosque A
     	$scope.startHKA=9;
    	$scope.endHKA=19;
    	$scope.startMKA=0;
    	$scope.endMKA=0;
    	
    	//Schedule for kiosque B    	
     	$scope.startHKB=8;
    	$scope.endHKB=19;
    	$scope.startMKB=0;
    	$scope.endMKB=0;
    	
    	//Schedule for Petits salons
    	$scope.startHPS1=12;
    	$scope.endHPS1=15;
    	$scope.startMPS1=0;
    	$scope.endMPS1=0;
    	
    	//Schedule for Repographie
    	$scope.startHR1=8;
    	$scope.endHR1=16;
    	$scope.startMR1=30;
    	$scope.endMR1=30;

    	//Schedule reservation de salles specifiques
    	$scope.startHRSS1=9;
    	$scope.endHRSS1=18;
    	$scope.startMRSS1=0;
    	$scope.endMRSS1=0;
    	
    	
    	 var date=new Date();
    	 var cTime=date.getHours() * 60 + date.getMinutes();
    	var timeInterval={msgState:"", msgWait:""};
    	  	
    	// FOR CONCIENGERIE 
    	if((($scope.endHC1*60+$scope.endMC1)<=cTime)&&(cTime<($scope.endHC2*60+$scope.endMC2)))
    	{
    	  timeInterval = DataSrv.getTime($scope.startHC2, $scope.endHC2,$scope.startMC2,$scope.endMC2);
    	}
      else if((($scope.endHC2*60+$scope.endMC2)<=cTime)&&(cTime<($scope.endHC3*60+$scope.endMC3)))
    	{
    	  timeInterval = DataSrv.getTime($scope.startHC3, $scope.endHC3, $scope.startMC3, $scope.endMC3);
    	}
      else	
    	{
    	  timeInterval = DataSrv.getTime($scope.startHC1, $scope.endHC1, $scope.startMC1, $scope.endMC1);
    	}  
    	
    	$scope.msgStateC=timeInterval.msgState;
    	$scope.msgWaitC=timeInterval.msgWait;
	
    	
    	// FOR FITNESS 
    	     if((($scope.endHF1*60+$scope.endMF1)<=cTime)&&(cTime<($scope.endHF2*60+$scope.endMF2)))
    	    	{
    	    	  timeInterval = DataSrv.getTime($scope.startHF2, $scope.endHF2,$scope.startMF2,$scope.endMF2);
    	    	}
    	      else
    	    	{
    	    	  timeInterval = DataSrv.getTime($scope.startHF1, $scope.endHF1,$scope.startMF1,$scope.endMF1);
    	    	}
    	
        $scope.msgStateF= timeInterval.msgState;
        $scope.msgWaitF = timeInterval.msgWait;
    	
    	// FOR KIOSQUE      
    	 timeInterval = DataSrv.getTime($scope.startHKA, $scope.endHKA,$scope.startMKA, $scope.endMKA);  
    	 $scope.msgStateKA = timeInterval.msgState;
    	 $scope.msgWaitKA = timeInterval.msgWait;
    	
    	 timeInterval = DataSrv.getTime($scope.startHKB, $scope.endHKB,$scope.startMKB, $scope.endMKB);  
    	 $scope.msgStateKB = timeInterval.msgState;
    	 $scope.msgWaitKB = timeInterval.msgWait;    	

     	$scope.startMCI1=0 + "0";
     	$scope.startMKA=0 + "0";
     	$scope.endMKA=0 + "0";
     	$scope.startMKB=0 + "0";
     	$scope.endMKB=0 + "0";
     	$scope.startMPS1=0 + "0";
     	$scope.endMPS1=0 + "0";
     	$scope.startMRSS1=0 + "0";
     	$scope.endMRSS1=0 + "0";
      	$scope.startMF2=0+"0";
    	$scope.endMF0=0 + "0";
    	$scope.endMC2=0 + "0";
    	$scope.endMC1=0 + "0";
    }  
    
    
    
  
}; 
