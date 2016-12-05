/***
This file contains all the common services for the app providing the following:
***/

angular.module('bnp.unicity.services', [])

.factory("DataSrv", DataSrv);

DataSrv.$inject = ['$rootScope', '$http', '$translate', '$q'];

function DataSrv($rootScope, $http, $translate, $q) {

    //var log = WL.Logger.create({pkg: "DataSrv"});
	
    return {
        getData: _getData,
        getTime: _getTime,
        getDataFrom: _getDataFrom,
        getVelib:_getVelib,
        getDepartures:_getDepartures,
        getFreeDays:_getFreeDays,
        sendReservation: _sendReservation,
        getCovoiturage:_getCovoiturage
    };
    
    function _getData(state) {
    	var path='';
    	
    	if($translate.use() === 'en'){
    		path= "i18n/"+state+"/en.json";
    	}
    	else{
    		path= "i18n/"+state+"/fr.json";
    	}
    	
    	  var defered = $q.defer();
    	
        $http.get(path).then(function (response) {
           $rootScope.info = response.data;
           defered.resolve(response);
        }, function (error) {});
        
        return defered.promise;
    };
    

    
    
    function _getDataFrom(givenPath) {
        var defered = $q.defer();
        var path='data/' + givenPath+ ".json";
        $http.get(path).success(function (response) {
            defered.resolve(response);
        });
        return defered.promise;
    };
   
    
    
    function _getTime(startHour, endHour, startMinutes, endMinutes ) {
    	
    	var timeInterval={
    			msgState :"",
    			msgWait: ""  	
    			
    	}    	
    	
		var date = new Date();
		var hour = date.getHours();
	    var minutes = date.getMinutes();

	    var stateText = "Fermé maintenant";
        var waitText = "Ouvre dans ";
        var opened = false;
        var timeDiffHours = 0;
        var timeDiffMinutes = 0;
        
        var cMinutes=hour*60+minutes;
        var sMinutes=startHour*60+startMinutes;
        var eMinutes=endHour*60+endMinutes;
        
        if((cMinutes>=sMinutes)&&(cMinutes<=eMinutes))
         { //ouvert
        	opened = true;
        	timeDiffMinutes=eMinutes-cMinutes;
         }
        else
         { //ferme
        	opened = false;
           if(cMinutes<sMinutes)
        	  {
        	    timeDiffMinutes=sMinutes-cMinutes;
        	  }
           else if(cMinutes>eMinutes)
        	  {
        	    timeDiffMinutes=1440-cMinutes+sMinutes;
        	  }  
         }
        if(opened)
        {
            stateText = "Ouvert maintenant";
            waitText = "Ferme dans ";
        }
        
        var h_=parseInt(timeDiffMinutes/60);
        var m_=timeDiffMinutes%60;
        var time_="0m";
        if(h_==0)
        	time_=addZeroPrefix(m_)+"m";
        else if(m_==0)
        	time_=h_+"h";
        else 
        	time_=h_+"h"+addZeroPrefix(m_)+"m";

        if(new Date().getDay()==0)  //is Sunday 
        	time_="1jour"+time_;
        else if(new Date().getDay()==6)  //is Saturday
        	time_="2jours"+time_;
        	
        timeInterval.msgState=stateText;
     	timeInterval.msgWait=waitText+time_;
        if((startHour==0)&&(endHour==24)&&(startMinutes==0)&&(endMinutes==0))
        {
        	timeInterval.msgWait="Toujours ouvert";
        }

	    return  timeInterval;
    }
    
    function addZeroPrefix(m)
     {
    	var str=m.toString();
    	if(str.length==1)
    		return "0"+str;
    	else
    		return str;
     }
    
    function _getVelib()
     {
        
        
        	return callAdapterProc("velibAdapter", "_retrieve", []);
     }
    
    function _getDepartures( gare )
    {
     	return callAdapterProc("sncfAdapter", "departures", gare);
    }
    
    function _getFreeDays(email)
    {
     	return callAdapterProc("parkingAdapter", "getReservations", email);
    }
    
    function _sendReservation(reservation)
    {
     	return callAdapterProc("parkingAdapter", "sendReservation", reservation);
    }
    
    function _getCovoiturage()
    {
     	return callAdapterProc("covoiturageAdapterJS", "getCovoiturage", []);  
    }
    
   
    function callAdapterProc(adapterName, procedureName, parameters) {
    	


    	var defer = $q.defer();
    	
    	//log.debug("Calling adapter function " + procedureName + "(" + parameters.join() + ")");    	
    	var options = {  timeout : 120000  }; 
    	var defer = $q.defer();


        var resourceRequest = new WLResourceRequest("/adapters/" + adapterName + "/" + procedureName, WLResourceRequest.GET);
  
        console.log("callAdapterProc: " + adapterName + " " + procedureName);

        resourceRequest.send().then(
            function(response) {
                WL.Logger.debug("Success: " + response.responseText);
                // window.plugins.spinnerDialog.hide();

                defer.resolve(response.responseJSON); 
            },
            function(response) {
             	defer.reject({
    			isConnectionError: true,
    			error: response
    		    });
            }
        )

    /***
    	WL.Client.invokeProcedure({
    		adapter : adapterName,
			procedure : procedureName,
			parameters : parameters
			//compressResponse : false  
    	}, options).then(function(response) {
    		//We have a response from the MFP server
    		//log.debug("<<<< 1 >>>>");
    		defer.resolve(response.invocationResult); 
    	}, function(err) {
    		//log.debug("<<<< 2 >>>>");
    		//There's no connection to the MFP server
    		defer.reject({
    			isConnectionError: true,
    			error: err
    		});
    	});
    	***/


    	return defer.promise;
    }
    
    
    
}
