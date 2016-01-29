'use strict';

angular.module('core').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('sidebar', {
      title: 'Home',
      state: 'home',
      class: 'fa fa-home',
      roles: ['*'],
      position: -1
    });
  }
]);
