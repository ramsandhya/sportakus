// https://app.ticketmaster.com/discovery/{API version}
//
// https://app.ticketmaster.com/discovery/v2/events.json?keyword=braves&radius=50&unit=miles&size=1&page=1&city=atlanta&apikey=E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG
//
// http://app.ticketmaster.com/discovery/v1/events.json?keyword=georgia&apikey=E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG&callback=myFunction
//
// http://app.ticketmaster.com/discovery/v1/events.json?stateCode=KEYYYWORD&apikey=E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG&callback=myFunction


// Consumer Key 	E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG
// Consumer Secret 	slFfen2M1l4iG6UH
// Key Issued 	Mon, 06/13/2016 - 21:16
// Key Expires 	Never

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $http({
    method : "GET",
    url : "http://app.ticketmaster.com/discovery/v1/events.json?keyword=georgia&apikey=E8VNq1LttN0VP5ql6bYc28kSUXfNpFjG&callback=myFunction",
    async:true,
    dataType: "jsonp"
  }).then(function mySucces(response) {
      $scope.myWelcome = response.data;
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
  });
});
