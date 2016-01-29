(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('sidebar', {
      title: 'Chat',
      state: 'chat'
    });
  }
})();
