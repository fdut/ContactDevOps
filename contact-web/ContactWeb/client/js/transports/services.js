/***
This file contains all the services for Transports module providing the following:


***/


angular.module('bnp.unicity.transports.services', [])

.factory("CalendarSrv", CalendarSrv);

//CalendarSrv.$inject = ['$scope'];

function CalendarSrv() {
	
	 return {
		  retrieveReservation: _retrieveReservation,
		  clearRedBullets: _clearRedBullets
	    };
	    
	    
	    function _retrieveReservation() {
	    	var dates = [];
	        $('.redBallon').each(function (i) {
	            var eventMonth = $(this).attr('date-month');
	            if (eventMonth.length == 1) {
	                eventMonth = "0" + eventMonth;
	            }
	            var eventDay = $(this).attr('date-day');
	            if (eventDay.length == 1) {
	                eventDay = "0" + eventDay;
	            }
	            var eventYear = $(this).attr('date-year');
	            var dateReservation = eventYear + "-" + eventMonth + "-" + eventDay;
	            dates.push(dateReservation);
	        });
	         return dates;
    	    };
    	    
    	    
    	    function _clearRedBullets(){
    	    	  $('.redBallon').each(function (i) {
    	              $(this).removeClass('redBallon');
    	          });
    	    }
    	   
 
}