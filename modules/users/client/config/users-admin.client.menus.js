'use strict';

// Configuring the Users module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('sidebar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
]);
