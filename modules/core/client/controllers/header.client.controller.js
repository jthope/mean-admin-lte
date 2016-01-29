'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'Static',
  function ($scope, $state, Authentication, Menus, Static) {

    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    $scope.tasks = Static.tasks;
    $scope.notifications = Static.notifications;
    $scope.messages = Static.messages;

  }
]);
