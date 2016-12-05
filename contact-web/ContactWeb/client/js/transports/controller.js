/***
This file contains the controller for Transports module providing the following:


***/

angular.module('bnp.unicity.transports.controllers', ['leaflet-directive'])

.controller('TransportsCtrl', TransportsCtrl);

TransportsCtrl.inject = ['$scope',
                           '$rootScope',
                           '$timeout',
                           '$document',
                           'OccupiedSrv',
                           'DataSrv',
                           '$state'];

function TransportsCtrl(
    $scope,
    $rootScope,
    $timeout,
    $document,
    OccupiedSrv,
    DataSrv,
    $state) {



    $scope.init = function () {
        $(".leaflet-bottom").css("zIndex", 2);
        $scope.markers = [];
        $scope.velibs = [];
        $scope.lots = [];
        getVelibsMarkers();
        getMarkers();
        $scope.formEliberer = {};
        $scope.formTrouver = {};


    }    
    
    
    $scope.center = {
        lat: 48.898889,
        lng: 2.281398,
        zoom: 14
    };

    $scope.defaults = {
        zoomControlPosition: 'bottomright',
        scrollWheelZoom: false
    }


    $scope.$on('leafletDirectiveMarker.click', function (e, args) {
        //    	console.log(args.leafletEvent.target.options.values.extra_info.info);
        $scope.markerType = args.leafletEvent.target.options.type;
        switch ($scope.markerType) {
            case 'MYUNICITY':
                $scope.schedule = args.leafletEvent.target.options.values.schedule.info;
                break;
            case 'VELIB':
                $scope.bikes = args.leafletEvent.target.options.bikes;
                $scope.schedule = "24h/24 et 7 jours sur 7";
                $scope.availableBikes = args.leafletEvent.target.options.available_bikes;
                $scope.availableStands = args.leafletEvent.target.options.available_stand_bikes;
                $scope.disponibilitePercent = ($scope.availableBikes * 100) / $scope.bikes;
                $scope.affluencePercent = ($scope.availableStands * 100) / $scope.bikes;
                $scope.bikeWidth = {
                    'width': ($scope.disponibilitePercent * 540) / 100 + "px",
                };
                $scope.bikeStandWidth = {
                    'width': ($scope.affluencePercent * 540) / 100 + "px",
                };
                break;
            case 'AUTOLIB':
                $scope.schedule = args.leafletEvent.target.options.values.schedule.info;
                $scope.capacite = args.leafletEvent.target.options.values.capacity;
                break;
            case 'PARKING':
                $scope.schedule = args.leafletEvent.target.options.values.schedule.info;
                $scope.servicesParking = args.leafletEvent.target.options.values.services.info;
                $scope.priceParking = args.leafletEvent.target.options.values.tarifs.info;
                break;
            case 'BUS':
                $scope.lines = args.leafletEvent.target.options.values.lignes.info;
                break;
            case 'TRANSILIEN':
            	getDepartures([args.leafletEvent.target.options.values.gareNumber]);
                break;
            case 'METRO':
                $scope.metroLines = args.leafletEvent.target.options.values.lignes.info;
                break;
            default:

        }
        //  updateStation(args.leafletEvent.target.options.name.name, args.leafletEvent.target.options.name.location.info, args.leafletEvent.target.options.name.schedule.info, args.leafletEvent.target.options.name.services.info, args.leafletEvent.target.options.name.tarifs.info, args.leafletEvent.target.options.name.subcategory, args.leafletEvent.target.options.name.extra_info.info);
        $scope.distance = args.leafletEvent.target.options.distance;
        $scope.stationName = args.leafletEvent.target.options.name;
        $scope.stationAddress = args.leafletEvent.target.options.address;

    });

    function getMarkers() {
        DataSrv.getDataFrom("transports").then(function (response) {
            $scope.markersFromJson = response.items;
            angular.forEach($scope.markersFromJson, function (value, key) {
                var iconPath;
                var marker;
                switch (value.subcategory) {
                    case 'MYUNICITY':
                        marker = {
                            lat: parseFloat(value.location.latitude),
                            lng: parseFloat(value.location.longitude),
                            message: '<span> Ma position</span>',
                            name: value.name,
                            values: value,
                            address: value.location.info,
                            type: "MYUNICITY",
                            focus: false,
                            distance: getDistanceFromLatLonInKm(value.location.latitude, value.location.longitude, 48.896248, 2.2810443),
                            icon: {
                                iconUrl: value.icon,
                                iconSize: [25, 37],
                            }

                        }
                        break;
                    default:
                        marker = {
                            lat: parseFloat(value.location.latitude),
                            lng: parseFloat(value.location.longitude),
                            message: '<span>' + value.location.info + '</span>',
                            name: value.name,
                            values: value,
                            address: value.location.info,
                            type: value.subcategory,
                            focus: false,
                            distance: getDistanceFromLatLonInKm(value.location.latitude, value.location.longitude, 48.896248, 2.2810443),
                            icon: {
                                iconUrl: value.icon,
                                iconSize: [35, 35],
                            }
                        }

                };
                $scope.markers.push(marker);
            });


        });
    }
    

    function getVelibsMarkers() {
        DataSrv.getVelib().then(function (response) {
            $scope.markersFromVelib = response.records;

            angular.forEach($scope.markersFromVelib, function (value, key) {
                var address = value.fields.address;
                if (address === "157 Anatole France - 92300 Levallois") {
                    address = "157 Rue Anatole France - 92300 Levallois-Perret";
                }
                var iconPath;
                if (value.fields.available_bikes > 5) {
                    iconPath = 'images/png/velib.png'
                } else {
                    iconPath = 'images/png/velib_red.png'
                }
                var velibMarker = {
                    lat: value.fields.position[0],
                    lng: value.fields.position[1],
                    message: '<span>' + address + '</span>',
                    address: address,
                    name: value.fields.name,
                    available_bikes: value.fields.available_bikes,
                    available_stand_bikes: value.fields.available_bike_stands,
                    bikes: value.fields.bike_stands,
                    type: "VELIB",
                    focus: false,
                    distance: getDistanceFromLatLonInKm(value.fields.position[0], value.fields.position[1], 48.896248, 2.2810443),
                    icon: {
                        iconUrl: iconPath,
                        iconSize: [35, 35],
                    }

                }

                $scope.markers.push(velibMarker);

            });
        }).then(function (err) {
            console.log(err);
        });
    }
    


    function getDepartures(gareNumber) {
        DataSrv.getDepartures(gareNumber).then(function (result) {
            $scope.departures = result.trains;
            $scope.departuresList = new Array();
            angular.forEach($scope.departures, function (value, key) {
                var train = {
                    "destinationName": value.destinationName,
                    "departureTime": getTimeDifference(value.date),
                    //	"departureTime":    getTimeDifference("28/05/2016 17:50") ,
                    "state": value.state
                }

                $scope.departuresList.push(train);

            });
        }).then(function (err) {
            console.log(err)
        });
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    

    function getTimeDifference(givenDate) {
        var givenDay = getGivenDateInMiliseconds(givenDate);
        var today = Date.now();
        var difference_ms = givenDay - today;
        var minutesLeft = Math.floor((difference_ms / (1000 * 60)) % 60);
        var hoursToMinutesLeft = 60 * Math.floor((difference_ms / (1000 * 60 * 60)) % 24);
        var totalMinutesLeft = hoursToMinutesLeft + minutesLeft;
        return totalMinutesLeft;
    }

    function getGivenDateInMiliseconds(givenDate) {
        var dayMonthYear = givenDate.split(" ")[0].split("/");
        var hoursMinutes = givenDate.split(" ")[1];
        dayMonthYear = dayMonthYear[2] + "/" + dayMonthYear[1] + "/" + dayMonthYear[0];
        var newDate = dayMonthYear + " " + hoursMinutes;
        return Date.parse(newDate);

    }    
  






}
