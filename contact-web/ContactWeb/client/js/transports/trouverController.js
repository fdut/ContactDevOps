angular.module('bnp.unicity.transports.trouverCalendar', [])

.controller('TrouverCtrl', TrouverCtrl);

TrouverCtrl.inject = ['$scope',
                      'DataSrv',
                      'CalendarSrv'];

function TrouverCtrl($scope,
		DataSrv,
		CalendarSrv) {	
	
	$scope.init= function(){
		DataSrv.getFreeDays(["example"]).then(function (response) {
    	console.log(response);
        $scope.freePlaces = response.freePlaces;
        $scope.freePlaces.forEach(function (item, index) {
            item.forEach(function (day) {
                $scope.lots.push({
                    month: index % 12,
                    day: day,
                    year: new Date().getFullYear() + parseInt(index / 12)
                })
            })

        })
        setEvent();

    })
    .then(function (err) {
        console.log(err);
    });


	}
	


	function setEvent() {
	    var yearNumber = (new Date).getFullYear();
	    var freeLots = $scope.lots;

	    for (var i = 0; i < freeLots.length; i++) {
	        $('.list').append('<div class="day-freeLot" date-day="' + freeLots[i].day + '" date-month="' + freeLots[i].month + '" date-year="' + freeLots[i].year + '" data-number="' + i + '">');
	    }
	    $('.day-freeLot').each(function (i) {
	        var eventMonth1 = $(this).attr('date-month');
	        var eventDay1 = $(this).attr('date-day');
	        var eventYear1 = $(this).attr('date-year');
	        if (parseInt(eventYear1) === yearNumber) {
	            $('tbody.event-calendar tr td[date-month="' + eventMonth1 + '"][date-day="' + eventDay1 + '"]').find('span').addClass('greyBullet');
	        }
	    });

	    $('tbody.event-calendar td').each(function () {
	        if (!$(this).find('span').hasClass('greyBullet')) {
	            $(this).addClass('notAllowed');
	        }
	    });

	}
	

    $scope.trouverLot = function () {
    	
    	$scope.reservations = {
	            email: "",
	            type: "",
	            dates: [],
	        };
    	
        var pattern = /^(\w|\.)*(@bnpparibas)(-)*\w*(\.com)$/;
        
        $scope.reservations.email = $scope.formTrouver.userEmailReserver;
        $scope.errorEmailReserver = pattern.test($scope.reservations.email);        	
        $scope.reservations.type = "RESERVE";
        $scope.reservations.dates = CalendarSrv.retrieveReservation();
        $scope.modalTextTrouver = "";
        
        if(!$scope.reservations.email){
        	 $("#modalTextTrouver").modal();
        	 $scope.modalTextTrouver = "Vous devez renseigner votre e-mail"
        }
        else if(!$scope.errorEmailReserver){
        	  $("#modalTextTrouver").modal();
        	  $scope.modalTextTrouver = "Votre adresse e-mail est invalide"
         }
        else if($scope.reservations.dates.length === 0){
        	  $("#modalTextTrouver").modal();
        	 $scope.modalTextTrouver = "Vous avez oublié de sélectionner vos jours"
        }
        else{
        	  DataSrv.sendReservation([$scope.reservations]).then(function (response) {
                  $("#modalTrouver").modal();
              })
              .then(function (err) {
                  console.log(err);
              });
        	
        }

        CalendarSrv.clearRedBullets();

    }


};
