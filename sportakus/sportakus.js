var app = angular.module('sports-app', []);
var markerDictionary = {};

app.factory('googleMap', function() {
  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, {
    center: {lat: 39.99727, lng: -94.578567},
    zoom: 4
  });
  var infoWindow = new google.maps.InfoWindow();
  function openInfoWindow(nflStadiumResult) {
    var venueName = '';
    var venueId = nflStadiumResult.id;
    var gameObjectArray = gamesByVenueDictionary[venueId];
    var gamesData = gameObjectArray.map(function(games){
      var awayTeam = games.away.name;
      var homeTeam = games.home.name;
      venueName = games.venue.name;
      var contentString ='<h6>' + awayTeam + ' vs ' + homeTeam + '</h6>';
      return contentString;
    });
    var headerString = '<h4>' + venueName + '</h3>';
    var newGamesData = gamesData.join('');
    var marker = markerDictionary[nflStadiumResult.id];
    infoWindow.setContent(headerString + newGamesData);
    infoWindow.open(map, marker);
  }
  function makeMarkers(gamesByVenueDictionary, nflStadiumResults) {
    var nflStadiumData = nflStadiumResults.map(function(nflStadiumResult) {
      var thePosition = {lat: nflStadiumResult.lat, lng: nflStadiumResult.lng};
      var marker = new google.maps.Marker({
        position: thePosition,
        map: map,
        title: 'NFL',
        animation: google.maps.Animation. DROP,
        icon: {
          url: '/nfl logo.png',
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 25)
        }
      });
      markerDictionary[nflStadiumResult.id] = marker;
      marker.addListener('click', function(){
        openInfoWindow(nflStadiumResult);
      });
      return marker;
    });
  }
  return {
    openInfoWindow: openInfoWindow,
    makeMarkers: makeMarkers
  };
});
// NFL AJAX service
app.factory('nflCall', function($http) {
  return {
    getNflSchedule: function(callback) {
      $http({
        method: 'GET',
        url: '/nflschedule.JSON'

      }).success(function(nflScheduleData) {
          console.log(nflScheduleData);
          callback(nflScheduleData);
        });
    }
  };
});
// NFL Stadium AJAX service
app.factory('nflStadiumCall', function($http) {
  return {
    getNflStadium: function(callback) {
      $http({
        method: 'GET',
        url: '/nflStadiumData.JSON'

      }).success(function(nflStadiumData) {
          console.log(nflStadiumData);
          callback(nflStadiumData);
        });
    }
  };
});
// NFL controller
app.controller('NflController', function($http, $scope, nflCall, nflStadiumCall, googleMap) {
  nflCall.getNflSchedule(function(nflScheduleData) {
    var nflScheduleResults = nflScheduleData.weeks;
    $scope.results = nflScheduleResults;
    nflStadiumCall.getNflStadium(function(nflStadiumData){
      var nflStadiumResults = nflStadiumData.nflStadium;
      googleMap.makeMarkers(nflScheduleResults, nflStadiumResults);
      createGameDictionary(nflScheduleResults);
    });
    $scope.openInfoWindow = function(nflStadiumResults) {
      googleMap.openInfoWindow(nflStadiumResults);
    };
  });
});

var gamesByVenueDictionary = {};
function createGameDictionary (nflScheduleResults){
  for (var i = 0; i < nflScheduleResults.length; i++) {
    var data = nflScheduleResults[i];
    for (var j = 0; j < data.games.length; j++) {
      var venueId = data.games[j].venue.id;
      if (!(venueId in gamesByVenueDictionary)) {
        gamesByVenueDictionary[venueId] = [];
      }

      var gamesArray = gamesByVenueDictionary[venueId];
      gamesArray.push(data.games[j]);
    }
  }
}
