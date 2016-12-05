angular.module('bnp.unicity.transports.covoiturage', [])

.controller('CovoiturageCtrl', CovoiturageCtrl);

CovoiturageCtrl.inject = ['$scope',
                          'DataSrv'];

function CovoiturageCtrl(
		$scope,
		DataSrv) {
	
	$scope.routeCovoiturage="https://muc-mfpf.eu-gb.mybluemix.net/MyUnicityWeb/adapters/CovoiturageAdapter/routes/";
	$scope.covoiturage={};
	var itemPerPage=20;
	$scope.pageNr=0;
	$scope.pageArray=new Array();
	$scope.currentPage=0;
	$scope.hasNoData=false;
	
    $scope.init = function () {
    	$scope.covoiturage.searchWord="";
        //DataSrv.getDataFrom("mockCovoiturage").then(function (response) {
         //   $scope.cars = response.carsAvailable;           
        //});
    	$scope.searchCovoiturage();
    }
    	
    
	$scope.searchCovoiturage=function()
	 {
		if($scope.covoiturage.searchWord==undefined || $scope.covoiturage.searchWord=="") 
		  {	
			//return;
			$scope.covoiturage.searchWord="";
		  }	
	
		DataSrv.getCovoiturage([]).then(function (response) 
			    {//response.carsAvailable
			        $scope.hasNoData=false;
			        $scope.allCars=filterJson(response.carsAvailable, $scope.covoiturage.searchWord); //response.carsAvailable; 	
					if($scope.allCars==undefined || $scope.allCars.length==0)
					 {
						$scope.hasNoData=true;
					 }			
					else if($scope.allCars!=undefined)
		             {		
					   $scope.pageNr=Math.ceil($scope.allCars.length/itemPerPage);
			           $scope.pageArray=Array.apply(null, {length: $scope.pageNr}).map(Number.call, Number);
			           $scope.setDataPagination(0);
		             } 

			    })  
			   .then(function (err) {
			      console.log(err);
			    });
	
	 }

	
	// get 3(itemPerPage) elements
	$scope.setDataPagination=function(pag)
	  {
		$scope.currentPage=pag;
		$scope.cars=new Array();
		for(var i=(pag*itemPerPage);i<(pag*itemPerPage+itemPerPage);i++)
		  {
			if($scope.allCars[i]!=undefined)
			  $scope.cars.push($scope.allCars[i]);
			else
			  break;	
		  }	
	  }
	
	$scope.prev=function()
	  {
		if($scope.currentPage>0)
		 {  
			$scope.currentPage--;
			$scope.setDataPagination($scope.currentPage);
		 }
	  }
	
	$scope.next=function()
	  {
		if($scope.currentPage<$scope.pageNr-1)
		   {
			 $scope.currentPage++;
			 $scope.setDataPagination($scope.currentPage);
		   }
	  }
	
	filterJson=function(objJson, sw)
	 {
		var str;
		sw=sw.toLowerCase();
		for(var i=0;i<objJson.length;i++)
		  {
			str=objJson[i].name + " " + objJson[i].city;
			if(str.toLowerCase().indexOf(sw)==-1)
			  {
				objJson.splice(i, 1);
				i--;
			  }
		  }
		return objJson;
	 }
	
};
