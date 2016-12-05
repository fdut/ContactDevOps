/***
This file contains all the services for Restauration module providing the following:


***/


angular.module('bnp.unicity.restauration.services', [])

.factory("OccupiedSrv", OccupiedSrv);

OccupiedSrv.$inject = ['$rootScope', 
                       '$http', 
                       '$q' ];

function OccupiedSrv(
		$rootScope,
		$http, 
		$q) {
	
	 return {
	    	retrieveData: _retrieveData
	    };
	    
	    
	    function _retrieveData() {
    	        var defered = $q.defer();
    	        $http.get('data/roomOccupation.json').success(function (response) {
    	            defered.resolve(response);
    	        });
    	        return defered.promise;
    	    };
    	   
 
}
