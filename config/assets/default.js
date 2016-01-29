'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/adminlte/bootstrap/css/bootstrap.min.css',
        'public/lib/adminlte/dist/css/AdminLTE.min.css',
        'public/lib/adminlte/dist/css/skins/_all-skins.min.css',
        'public/lib/adminlte/plugins/iCheck/flat/blue.css',
        'public/lib/adminlte/plugins/morris/morris.css',
        'public/lib/adminlte/plugins/jvectormap/jquery-jvectormap-1.2.2.css',
        'public/lib/adminlte/plugins/datepicker/datepicker3.css',
        'public/lib/adminlte/plugins/daterangepicker/daterangepicker-bs3.css',
        'public/lib/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',

        'public/lib/adminlte/plugins/jQuery/jQuery-2.1.4.min.js',
        'public/lib/adminlte/bootstrap/js/bootstrap.min.js',
        'public/lib/adminlte/plugins/morris/morris.min.js',
        'public/lib/adminlte/plugins/sparkline/jquery.sparkline.min.js',
        'public/lib/adminlte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js',
        'public/lib/adminlte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js',
        'public/lib/adminlte/plugins/knob/jquery.knob.js',
        'public/lib/adminlte/plugins/daterangepicker/daterangepicker.js',
        'public/lib/adminlte/plugins/datepicker/bootstrap-datepicker.js',
        'public/lib/adminlte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js',
        'public/lib/adminlte/plugins/slimScroll/jquery.slimscroll.min.js',
        'public/lib/adminlte/plugins/fastclick/fastclick.js',
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: ['gruntfile.js'],
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
