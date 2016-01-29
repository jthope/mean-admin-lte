(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('sidebar', {
      title: 'Articles',
      state: 'articles',
      class: 'fa fa-file-text-o',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('sidebar', 'articles', {
      title: 'List Articles',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('sidebar', 'articles', {
      title: 'Create Article',
      state: 'articles.create',
      roles: ['user']
    });
  }
})();
