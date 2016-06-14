// MLB AJAX service and controller
app.factory('mlbCall', function($http) {
  return {
    getMlbSchedule: function(callback) {
      $http({
        method: 'GET',
        url: '/mlbschedule.JSON'

      }).success(function(mlbScheduleData) {
          console.log( mlbScheduleData);
          callback(mlbScheduleData);
        });
    }
  };
});

app.controller('MlbController', function($http, $scope, mlbCall) {
  nflCall.getNflSchedule(function(mlbScheduleData) {
    var mlbScheduleResults = mlbScheduleData;
    $scope.results = mlbScheduleResults;
  });
});

// Nascar Sprint Cup Series AJAX service and controller
app.factory('nascarCall', function($http) {
  return {
    getNascarSchedule: function(callback) {
      $http({
        method: 'GET',
        url: '/nascar-sc-schedule.JSON'

      }).success(function(nascarScheduleData) {
          console.log( nascarScheduleData);
          callback(nascarScheduleData);
        });
    }
  };
});

app.controller('NascarController', function($http, $scope, nascarCall) {
  nascarCall.getNascarSchedule(function(nascarScheduleData) {
    var nascarScheduleResults = nascarScheduleData;
    $scope.results = nascarScheduleResults;
  });
});

// USA Soccer AJAX service and controller
app.factory('usSoccerCall', function($http) {
  return {
    getUsSoccerSchedule: function(callback) {
      $http({
        method: 'GET',
        url: '/ussoccerschedule.JSON'

      }).success(function(usSoccerScheduleData) {
          console.log(usSoccerScheduleData);
          callback(usSoccerScheduleData);
        });
    }
  };
});

app.controller('UsSoccerController', function($http, $scope, usSoccerCall) {
  usSoccerCall.getUsSoccerSchedule(function(usSoccerScheduleData) {
    var usSoccerScheduleResults = usSoccerScheduleData;
    $scope.results = usSoccerScheduleResults;
  });
});
