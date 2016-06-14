var app = angular.module('ticket-app', []);

var venueName = "Bristol Motor Speedway";
var teamName = "Falcons";

app.factory('ticketCall', function($http) {
  return {
    getTicketInfo: function(callback) {
      $http({
        method: 'GET',
        url:'https://app.ticketmaster.com/discovery/v2/events.json?',
        params: {
          apikey: 'E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG',
          keyword: 'NASCAR Sprint Cup Series'
        }
      }).success(function(ticketData) {
          console.log(ticketData);
          callback(ticketData);
        });
    }
  };
});
app.controller('TicketController', function($http, $scope, ticketCall){
  ticketCall.getTicketInfo(function(ticketData){
    var theTicketData = ticketData;
  });
});
