'use strict';

//todo - data bind
angular.module('core').service('Static', [
  function () {

    this.tasks = [
      { name: 'Design some buttons', progress: '20', class: 'progress-bar progress-bar-aqua' },
      { name: 'Create a nice theme', progress: '40', class: 'progress-bar progress-bar-green' },
      { name: 'Some task I need to do', progress: '60', class: 'progress-bar progress-bar-red' },
      { name: 'Make beautiful transitions', progress: '80', class: 'progress-bar progress-bar-yellow' },
    ];

    this.notifications = [
      { name: '5 new members joined today', class: 'fa fa-users text-aqua' },
      { name: 'Very long description here that may not fit into the page and may cause design problems', class: 'fa fa-warning text-yellow' },
      { name: '5 new members joined', class: 'fa fa-users text-red' },
      { name: '25 sales made', class: 'fa fa-shopping-cart text-green' },
      { name: 'You changed your username', class: 'fa fa-user text-red' }
    ];

    this.messages = [
      { name: 'Support Team', message: 'Why not buy a new awesome theme?', class: 'img-circle', image: '/lib/adminlte/dist/img/user2-160x160.jpg', time: '' },
      { name: 'AdminLTE Design Team', message: 'Why not buy a new awesome theme?', class: 'img-circle', image: '/lib/adminlte/dist/img/user3-128x128.jpg', time: '' },
      { name: 'Developers', message: 'Why not buy a new awesome theme?', class: 'img-circle', image: '/lib/adminlte/dist/img/user4-128x128.jpg', time: '' },
      { name: 'Sales Department', message: 'Why not buy a new awesome theme?', class: 'img-circle', image: '/lib/adminlte/dist/img/user3-128x128.jpg', time: '' },
      { name: 'Reviewers', message: 'Why not buy a new awesome theme?', class: 'img-circle', image: '/lib/adminlte/dist/img/user2-160x160.jpg', time: '' }
    ];

  }
]);
