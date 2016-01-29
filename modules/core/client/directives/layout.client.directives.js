'use strict';

angular.module('core')
  .directive('layout', ['$window', 'Layout', function ($window, Layout) {
    return {
      link: function ($scope, element, attrs) {

        $window.$.widget.bridge('uibutton', $window.$.ui.button);

        $scope.AdminLTE = {
          options: {
            //Add slimscroll to navbar menus
            //This requires you to load the slimscroll plugin
            //in every page before app.js
            navbarMenuSlimscroll: true,
            navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
            navbarMenuHeight: "200px", //The height of the inner menu
            //General animation speed for JS animated elements such as box collapse/expand and
            //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
            //'fast', 'normal', or 'slow'
            animationSpeed: 500,
            //Sidebar push menu toggle button selector
            sidebarToggleSelector: "[data-toggle='offcanvas']",
            //Activate sidebar push menu
            sidebarPushMenu: true,
            //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
            sidebarSlimScroll: true,
            //Enable sidebar expand on hover effect for sidebar mini
            //This option is forced to true if both the fixed layout and sidebar mini
            //are used together
            sidebarExpandOnHover: false,
            //BoxRefresh Plugin
            enableBoxRefresh: true,
            //Bootstrap.js tooltip
            enableBSToppltip: true,
            BSTooltipSelector: "[data-toggle='tooltip']",
            //Enable Fast Click. Fastclick.js creates a more
            //native touch experience with touch devices. If you
            //choose to enable the plugin, make sure you load the script
            //before AdminLTE's app.js
            enableFastclick: true,
            //Control Sidebar Options
            enableControlSidebar: true,
            controlSidebarOptions: {
              //Which button should trigger the open/close event
              toggleBtnSelector: "[data-toggle='control-sidebar']",
              //The sidebar selector
              selector: ".control-sidebar",
              //Enable slide over content
              slide: true
            },
            //Box Widget Plugin. Enable this plugin
            //to allow boxes to be collapsed and/or removed
            enableBoxWidget: true,
            //Box Widget plugin options
            boxWidgetOptions: {
              boxWidgetIcons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
              },
              boxWidgetSelectors: {
                //Remove button selector
                remove: '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]'
              }
            },
            //Direct Chat plugin options
            directChat: {
              //Enable direct chat by default
              enable: true,
              //The button to open and close the chat contacts pane
              contactToggleSelector: '[data-widget="chat-pane-toggle"]'
            },
            //Define the set of colors to use globally around the website
            colors: {
              lightBlue: "#3c8dbc",
              red: "#f56954",
              green: "#00a65a",
              aqua: "#00c0ef",
              yellow: "#f39c12",
              blue: "#0073b7",
              navy: "#001F3F",
              teal: "#39CCCC",
              olive: "#3D9970",
              lime: "#01FF70",
              orange: "#FF851B",
              fuchsia: "#F012BE",
              purple: "#8E24AA",
              maroon: "#D81B60",
              black: "#222222",
              gray: "#d2d6de"
            },
            //The standard screen sizes that bootstrap uses.
            //If you change these in the variables.less file, change
            //them here too.
            screenSizes: {
              xs: 480,
              sm: 768,
              md: 992,
              lg: 1200
            }
          },

          /* Layout
           * ======
           * Fixes the layout height in case min-height fails.
           *
           * @type Object
           * @usage $scope.AdminLTE.layout.activate()
           *        $scope.AdminLTE.layout.fix()
           *        $scope.AdminLTE.layout.fixSidebar()
           */
          layout: {
            activate: function () {
              var _this = this;
              _this.fix();
              _this.fixSidebar();
              $($window, ".wrapper").resize(function () {
                _this.fix();
                _this.fixSidebar();
              });
            },
            fix: function () {
              //Get $window height and the wrapper height
              var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
              var window_height = $($window).height();
              var sidebar_height = $(".sidebar").height();
              //Set the min-height of the content and sidebar based on the
              //the height of the document.
              if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
              } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                  $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                  postSetWidth = window_height - neg;
                } else {
                  $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                  postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $($scope.AdminLTE.options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                  if (controlSidebar.height() > postSetWidth)
                    $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

              }
            },
            fixSidebar: function () {
              //Make sure the body tag has the .fixed class
              if (!$("body").hasClass("fixed")) {
                if (typeof $window.$.fn.slimScroll != 'undefined') {
                  $(".sidebar").slimScroll({ destroy: true }).height("auto");
                }
                return;
              } else if (typeof $window.$.fn.slimScroll == 'undefined' && $window.console) {
                $window.console.error("Error: the fixed layout requires the slimscroll plugin!");
              }
              //Enable slimscroll for fixed layout
              if ($scope.AdminLTE.options.sidebarSlimScroll) {
                if (typeof $window.$.fn.slimScroll != 'undefined') {
                  //Destroy if it exists
                  $(".sidebar").slimScroll({ destroy: true }).height("auto");
                  //Add slimscroll
                  $(".sidebar").slimscroll({
                    height: ($($window).height() - $(".main-header").height()) + "px",
                    color: "rgba(0,0,0,0.2)",
                    size: "3px"
                  });
                }
              }
            }
          },

          /* PushMenu()
           * ==========
           * Adds the push menu functionality to the sidebar.
           *
           * @type Function
           * @usage: $scope.AdminLTE.pushMenu("[data-toggle='offcanvas']")
           */
          pushMenu: {
            activate: function (toggleBtn) {
              //Get the screen sizes
              var screenSizes = $scope.AdminLTE.options.screenSizes;

              //Enable sidebar toggle
              $(document).on('click', toggleBtn, function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($($window).width() > (screenSizes.sm - 1)) {
                  if ($("body").hasClass('sidebar-collapse')) {
                    $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                  } else {
                    $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                  }
                }
                  //Handle sidebar push menu for small screens
                else {
                  if ($("body").hasClass('sidebar-open')) {
                    $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                  } else {
                    $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                  }
                }
              });

              $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($($window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                  $("body").removeClass('sidebar-open');
                }
              });

              //Enable expand on hover for sidebar mini
              if ($scope.AdminLTE.options.sidebarExpandOnHover
                  || ($('body').hasClass('fixed')
                  && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover();
              }
            },
            expandOnHover: function () {
              var _this = this;
              var screenWidth = $scope.AdminLTE.options.screenSizes.sm - 1;
              //Expand sidebar on hover
              $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                    && $("body").hasClass('sidebar-collapse')
                    && $($window).width() > screenWidth) {
                  _this.expand();
                }
              }, function () {
                if ($('body').hasClass('sidebar-mini')
                    && $('body').hasClass('sidebar-expanded-on-hover')
                    && $($window).width() > screenWidth) {
                  _this.collapse();
                }
              });
            },
            expand: function () {
              $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
            },
            collapse: function () {
              if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
              }
            }
          },

          /* ControlSidebar
           * ==============
           * Adds functionality to the right sidebar
           *
           * @type Object
           * @usage $scope.AdminLTE.controlSidebar.activate(options)
           */
          controlSidebar: {
            //Open the control sidebar
            open: function (sidebar, slide) {
              //Slide over content
              if (slide) {
                sidebar.addClass('control-sidebar-open');
              } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
              }
            },
            //Close the control sidebar
            close: function (sidebar, slide) {
              if (slide) {
                sidebar.removeClass('control-sidebar-open');
              } else {
                $('body').removeClass('control-sidebar-open');
              }
            },
            _fix: function (sidebar) {
              var _this = this;
              if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(".wrapper").height());
                $($window).resize(function () {
                  _this._fix(sidebar);
                });
              } else {
                sidebar.css({
                  'position': 'fixed',
                  'height': 'auto'
                });
              }
            },
            _fixForFixed: function (sidebar) {
              sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
              });
            },
            _fixForContent: function (sidebar) {
              $(".content-wrapper, .right-side").css('min-height', sidebar.height());
            }
          }

        };

        /* BoxWidget
         * =========
         * BoxWidget is a plugin to handle collapsing and
         * removing boxes from the screen.
         *
         * @type Object
         * @usage $scope.AdminLTE.boxWidget.activate()
         *        Set all your options in the main $scope.AdminLTE.options object
         */
        $scope.AdminLTE.boxWidget = {
          selectors: $scope.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
          icons: $scope.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
          animationSpeed: $scope.AdminLTE.options.animationSpeed,
          activate: function (_box) {
            var _this = this;
            if (!_box) {
              _box = document; // activate all boxes per default
            }
            //Listen for collapse event triggers
            $(_box).on('click', _this.selectors.collapse, function (e) {
              e.preventDefault();
              _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_box).on('click', _this.selectors.remove, function (e) {
              e.preventDefault();
              _this.remove($(this));
            });
          },
          collapse: function (element) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            if (!box.hasClass("collapsed-box")) {
              //Convert minus into plus
              element.children(":first")
                  .removeClass(_this.icons.collapse)
                  .addClass(_this.icons.open);
              //Hide the content
              box_content.slideUp(_this.animationSpeed, function () {
                box.addClass("collapsed-box");
              });
            } else {
              //Convert plus into minus
              element.children(":first")
                  .removeClass(_this.icons.open)
                  .addClass(_this.icons.collapse);
              //Show the content
              box_content.slideDown(_this.animationSpeed, function () {
                box.removeClass("collapsed-box");
              });
            }
          },
          remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp(this.animationSpeed);
          }
        };

        //Fix for IE page transitions
        $("body").removeClass("hold-transition");

        //Extend options if external options exist
        if (typeof AdminLTEOptions !== "undefined") {
          $window.$.extend(true,
              $scope.AdminLTE.options,
              AdminLTEOptions);
        }

        //Easy access to options
        var o = $scope.AdminLTE.options;

        //Activate the layout maker
        $scope.AdminLTE.layout.activate();

        //Add slimscroll to navbar dropdown
        if (o.navbarMenuSlimscroll && typeof $window.$.fn.slimscroll != 'undefined') {
          $(".navbar .menu").slimscroll({
            height: o.navbarMenuHeight,
            alwaysVisible: false,
            size: o.navbarMenuSlimscrollWidth
          }).css("width", "100%");
        }

        //Activate sidebar push menu
        if (o.sidebarPushMenu) {
          $scope.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
        }

        //Activate Bootstrap tooltip
        if (o.enableBSToppltip) {
          $('body').tooltip({
            selector: o.BSTooltipSelector
          });
        }

        //Activate box widget
        if (o.enableBoxWidget) {
          $scope.AdminLTE.boxWidget.activate();
        }

        //Activate fast click
        if (o.enableFastclick && typeof FastClick != 'undefined') {
          FastClick.attach(document.body);
        }

        //Activate direct chat widget
        if (o.directChat.enable) {
          $(document).on('click', o.directChat.contactToggleSelector, function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
          });
        }

        /*
         * INITIALIZE BUTTON TOGGLE
         * ------------------------
         */
        $('.btn-group[data-toggle="btn-toggle"]').each(function () {
          var group = $(this);
          $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
          });

        });

      }
    };
  }])


  .directive('treeView', ['$window', 'Layout', function ($window, Layout) {
    return {
      link: function ($scope, element, attrs) {

        /* Tree()
         * ======
         * Converts the sidebar into a multilevel
         * tree view menu.
         *
         * @type Function
         * @Usage: $scope.AdminLTE.tree('.sidebar')
         */

        var menu = element;
        var animationSpeed = $scope.AdminLTE.options.animationSpeed;

        $(menu).on('click', 'li a', function (e) {

          //Get the clicked link and the next element
          var $this = $(this);
          var checkElement = $this.next();

          //Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
            //Close the menu
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
            });
            checkElement.parent("li").removeClass("active");
          }
            //If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
              //Fix the layout in case the sidebar stretches over the height of the $window
              $scope.AdminLTE.layout.fix();
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });

      }
    };
  }])

  .directive('controlSidebar', ['$window', 'Layout', function ($window, Layout) {
    return {
      link: function ($scope, element, attrs) {

        /* ControlSidebar
         * ==============
         * Adds functionality to the right sidebar
         *
         * @type Object
         * @usage $scope.AdminLTE.controlSidebar.activate(options)
         */


        //Get the object
        var _this = this;
        //Update options
        var o = $scope.AdminLTE.options.controlSidebarOptions;
        //Get the sidebar
        var sidebar = $(o.selector);
        //The toggle button
        var btn = $(o.toggleBtnSelector);
        
        if ($scope.AdminLTE.options.enableControlSidebar) {
          //Listen to the click event
          btn.on('click', function (e) {
            e.preventDefault();
            //If the sidebar is not open
            if (!sidebar.hasClass('control-sidebar-open')
                && !$('body').hasClass('control-sidebar-open')) {
              //Open the sidebar
              $scope.AdminLTE.controlSidebar.open(sidebar, o.slide);
            } else {
              $scope.AdminLTE.controlSidebar.close(sidebar, o.slide);
            }
          });

          //If the body has a boxed layout, fix the sidebar bg position
          var bg = $(".control-sidebar-bg");
          $scope.AdminLTE.controlSidebar._fix(bg);

          //If the body has a fixed layout, make the control sidebar fixed
          if ($('body').hasClass('fixed')) {
            $scope.AdminLTE.controlSidebar._fixForFixed(sidebar);
          } else {
            //If the content height is less than the sidebar's height, force max height
            if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
              $scope.AdminLTE.controlSidebar._fixForContent(sidebar);
            }
          }
        }
        

        /**
        * List of all the available skins
        *
        * @type Array
        */
        var my_skins = [
          "skin-blue",
          "skin-black",
          "skin-red",
          "skin-yellow",
          "skin-purple",
          "skin-green",
          "skin-blue-light",
          "skin-black-light",
          "skin-red-light",
          "skin-yellow-light",
          "skin-purple-light",
          "skin-green-light"
        ];

        //Create the new tab
        var tab_pane = $("<div />", {
          "id": "control-sidebar-theme-demo-options-tab",
          "class": "tab-pane active"
        });

        //Create the tab button
        var tab_button = $("<li />", { "class": "active" })
            .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
            + "<i class='fa fa-wrench'></i>"
            + "</a>");

        //Add the tab button to the right sidebar tabs
        $("[href='#control-sidebar-home-tab']")
            .parent()
            .before(tab_button);

        //Create the menu
        var demo_settings = $("<div />");

        //Layout options
        demo_settings.append(
            "<h4 class='control-sidebar-heading'>"
            + "Layout Options"
            + "</h4>"
              //Fixed layout
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
            + "Fixed layout"
            + "</label>"
            + "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
            + "</div>"
              //Boxed layout
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
            + "Boxed Layout"
            + "</label>"
            + "<p>Activate the boxed layout</p>"
            + "</div>"
              //Sidebar Toggle
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
            + "Toggle Sidebar"
            + "</label>"
            + "<p>Toggle the left sidebar's state (open or collapse)</p>"
            + "</div>"
              //Sidebar mini expand on hover toggle
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
            + "Sidebar Expand on Hover"
            + "</label>"
            + "<p>Let the sidebar mini expand on hover</p>"
            + "</div>"
              //Control Sidebar Toggle
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
            + "Toggle Right Sidebar Slide"
            + "</label>"
            + "<p>Toggle between slide over content and push content effects</p>"
            + "</div>"
              //Control Sidebar Skin Toggle
            + "<div class='form-group'>"
            + "<label class='control-sidebar-subheading'>"
            + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
            + "Toggle Right Sidebar Skin"
            + "</label>"
            + "<p>Toggle between dark and light skins for the right sidebar</p>"
            + "</div>"
        );
        var skins_list = $("<ul />", { "class": 'list-unstyled clearfix' });

        //Dark sidebar skins
        var skin_blue =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Blue</p>");
        skins_list.append(skin_blue);
        var skin_black =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Black</p>");
        skins_list.append(skin_black);
        var skin_purple =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Purple</p>");
        skins_list.append(skin_purple);
        var skin_green =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Green</p>");
        skins_list.append(skin_green);
        var skin_red =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Red</p>");
        skins_list.append(skin_red);
        var skin_yellow =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin'>Yellow</p>");
        skins_list.append(skin_yellow);

        //Light sidebar skins
        var skin_blue_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px'>Blue Light</p>");
        skins_list.append(skin_blue_light);
        var skin_black_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px'>Black Light</p>");
        skins_list.append(skin_black_light);
        var skin_purple_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px'>Purple Light</p>");
        skins_list.append(skin_purple_light);
        var skin_green_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px'>Green Light</p>");
        skins_list.append(skin_green_light);
        var skin_red_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px'>Red Light</p>");
        skins_list.append(skin_red_light);
        var skin_yellow_light =
            $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
                .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px;'>Yellow Light</p>");
        skins_list.append(skin_yellow_light);

        demo_settings.append("<h4 class='control-sidebar-heading'>Skins</h4>");
        demo_settings.append(skins_list);

        tab_pane.append(demo_settings);
        $("#control-sidebar-home-tab").after(tab_pane);

        setup();

        /**
         * Toggles layout classes
         *
         * @param String cls the layout class to toggle
         * @returns void
         */
        function change_layout(cls) {
          $("body").toggleClass(cls);
          $scope.AdminLTE.layout.fixSidebar();
          //Fix the problem with right sidebar and layout boxed
          if (cls == "layout-boxed")
            $scope.AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
          if ($('body').hasClass('fixed') && cls == 'fixed') {
            $scope.AdminLTE.pushMenu.expandOnHover();
            $scope.AdminLTE.layout.activate();
          }
          $scope.AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
          $scope.AdminLTE.controlSidebar._fix($(".control-sidebar"));
        }

        /**
         * Replaces the old skin with the new skin
         * @param String cls the new skin class
         * @returns Boolean false to prevent link's default action
         */
        function change_skin(cls) {
          $.each(my_skins, function (i) {
            $("body").removeClass(my_skins[i]);
          });

          $("body").addClass(cls);
          store('skin', cls);
          return false;
        }

        /**
         * Store a new settings in the browser
         *
         * @param String name Name of the setting
         * @param String val Value of the setting
         * @returns void
         */
        function store(name, val) {
          if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
          } else {
            window.alert('Please use a modern browser to properly view this template!');
          }
        }

        /**
         * Get a prestored setting
         *
         * @param String name Name of of the setting
         * @returns String The value of the setting | null
         */
        function get(name) {
          if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
          } else {
            window.alert('Please use a modern browser to properly view this template!');
          }
        }

        /**
         * Retrieve default settings and apply them to the template
         *
         * @returns void
         */
        function setup() {
          var tmp = get('skin');
          if (tmp && $.inArray(tmp, my_skins))
            change_skin(tmp);

          //Add the change skin listener
          $("[data-skin]").on('click', function (e) {
            e.preventDefault();
            change_skin($(this).data('skin'));
          });

          //Add the layout manager
          $("[data-layout]").on('click', function () {
            change_layout($(this).data('layout'));
          });

          $("[data-controlsidebar]").on('click', function () {
            change_layout($(this).data('controlsidebar'));
            var slide = !$scope.AdminLTE.options.controlSidebarOptions.slide;
            $scope.AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
              $('.control-sidebar').removeClass('control-sidebar-open');
          });

          $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
              sidebar.removeClass("control-sidebar-dark")
              sidebar.addClass("control-sidebar-light")
            } else {
              sidebar.removeClass("control-sidebar-light")
              sidebar.addClass("control-sidebar-dark")
            }
          });

          $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            $scope.AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
              $("[data-layout='sidebar-collapse']").click();
          });

          // Reset options
          if ($('body').hasClass('fixed')) {
            $("[data-layout='fixed']").attr('checked', 'checked');
          }
          if ($('body').hasClass('layout-boxed')) {
            $("[data-layout='layout-boxed']").attr('checked', 'checked');
          }
          if ($('body').hasClass('sidebar-collapse')) {
            $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
          }

        }
        
      }
    };
  }]);