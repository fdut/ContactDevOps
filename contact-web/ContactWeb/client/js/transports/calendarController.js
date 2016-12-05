angular.module('bnp.unicity.transports.calendar', [])

.controller('CalendarCtrl', CalendarCtrl);

CalendarCtrl.inject = ['$scope'];

function CalendarCtrl($scope) {



    $scope.init = function () {
        startCalendar();
    }


    function startCalendar() {
        var mon = 'L';
        var tue = 'M';
        var wed = 'M';
        var thur = 'J';
        var fri = 'V';
        var sat = 'S';
        var sund = 'D';

        /**
         * Get current date
         */
        var d = new Date();
        var strDate = yearNumber + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var yearNumber = (new Date).getFullYear();

        /**
         * Get current month and set as '.current-month' in title
         */
        var monthNumber = d.getMonth() + 1;

        function GetMonthName(monthNumber) {
            var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'September', 'Octobre', 'November', 'Décembre'];
            return months[monthNumber - 1];
        }

        setMonth(monthNumber, mon, tue, wed, thur, fri, sat, sund);

        function setMonth(monthNumber, mon, tue, wed, thur, fri, sat, sund) {
            $('.month').text(GetMonthName(monthNumber) + ' ' + yearNumber);
            $('.month').attr('data-month', monthNumber);
            printDateNumber(monthNumber, mon, tue, wed, thur, fri, sat, sund);
        }

        $('.btn-next').on('click', function (e) {
            var monthNumber = $('.month').attr('data-month');
            if (monthNumber > 11) {
                $('.month').attr('data-month', '0');
                var monthNumber = $('.month').attr('data-month');
                yearNumber = yearNumber + 1;
                setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund);
            } else {
                setMonth(parseInt(monthNumber) + 1, mon, tue, wed, thur, fri, sat, sund);
            };
        });

        $('.btn-prev').on('click', function (e) {
            var monthNumber = $('.month').attr('data-month');
            if (monthNumber < 2) {
                $('.month').attr('data-month', '13');
                var monthNumber = $('.month').attr('data-month');
                yearNumber = yearNumber - 1;
                setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund);
            } else {
                setMonth(parseInt(monthNumber) - 1, mon, tue, wed, thur, fri, sat, sund);
            };
        });

        /**
         * Get all dates for current month
         */

        function printDateNumber(monthNumber, mon, tue, wed, thur, fri, sat, sund) {

            $($('tbody.event-calendar tr')).each(function (index) {
                $(this).empty();
            });

            $($('thead.event-days tr')).each(function (index) {
                $(this).empty();
            });

            function getDaysInMonth(month, year) {
                // Since no month has fewer than 28 days
                var date = new Date(year, month, 1);
                var days = [];
                while (date.getMonth() === month) {
                    days.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                return days;
            }

            i = 0;

            setDaysInOrder(mon, tue, wed, thur, fri, sat, sund);



            function setDaysInOrder(mon, tue, wed, thur, fri, sat, sund) {
                var myIndex = 0;
                var monthDay = getDaysInMonth(monthNumber - 1, yearNumber)[0].toString().substring(0, 3);
                $('thead.event-days tr').append('<td>' + mon + '</td><td>' + tue + '</td><td>' + wed + '</td><td>' + thur + '</td><td>' + fri + '</td><td>' + sat + '</td><td>' + sund + '</td>');
                if (monthDay === 'Mon') {
                    myIndex = 0;
                } else if (monthDay === 'Tue') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td>');
                    myIndex = 1;
                } else if (monthDay === 'Wed') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td><td class="notAllowed"></td>');
                    myIndex = 2;
                } else if (monthDay === 'Thu') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td>');
                    myIndex = 3;
                } else if (monthDay === 'Fri') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td>');
                    myIndex = 4;
                } else if (monthDay === 'Sat') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td>');
                    myIndex = 5;
                } else if (monthDay === 'Sun') {
                    $('tbody.event-calendar tr.1').append('<td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td><td class="notAllowed"></td>');
                    myIndex = 6;
                }
                $(getDaysInMonth(monthNumber - 1, yearNumber)).each(function (index) {
                    var index = index + 1;
                    if (index < (8 - myIndex)) {
                        $('tbody.event-calendar tr.1').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '<span></td>');
                    } else if (index < (15 - myIndex)) {
                        $('tbody.event-calendar tr.2').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '<span></td>');
                    } else if (index < (22 - myIndex)) {
                        $('tbody.event-calendar tr.3').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '<span></td>');
                    } else if (index < (29 - myIndex)) {
                        $('tbody.event-calendar tr.4').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '<span></td>');
                    } else if (index < 32) {
                        $('tbody.event-calendar tr.5').append('<td date-month="' + monthNumber + '" date-day="' + index + '" date-year="' + yearNumber + '">' + index + '<span></td>');
                    }
                    i++;
                });

            };

            $('.calendarA tr td:nth-child(6)').each(function (i) {
                $(this).addClass("notAllowed");
            });
            $('.calendarA tr td:nth-child(7)').each(function (i) {
                $(this).addClass("notAllowed");
            });

            var date = new Date();
            var month = date.getMonth() + 1;
            var thisyear = new Date().getFullYear();

            $('tbody.event-calendar tr td[date-month]').each(function (i) {
                $(this).addClass("customDay");
            });

            $('tbody.event-calendar td').on('click', function (e) {
                if (!$(this).hasClass('notAllowed')) {
                    if ($(this).hasClass("redBallon")) {
                        $(this).removeClass('redBallon');
                    } else {
                        $(this).addClass('redBallon');
                    }
                }

            });
        }





    };



};
