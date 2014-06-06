'use strict';


// Declare app level module which depends on filters, and services
angular.module('helpTheX', ['helpTheX.filters', 'helpTheX.services', 'helpTheX.directives','ngRoute','lvl.directives.dragdrop']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {templateUrl: 'view/home', controller: HomeController})
        .when('/view2', {templateUrl: 'view/2', controller: MyCtrl2})
        .when('/users/:userId/vLabs/:vLabId/userLevel', {templateUrl: 'view/user_level', controller: LevelController})
        .when('/users/:userId/vLabs/:vLabId/userLevel/:userLevel/story', {templateUrl: 'view/story', controller: StoryController})
        .when('/users/:userId/vLabs/:vLabId/level/:vLablevelId/storyLevel', {templateUrl: 'view/story_level', controller: StoryLevelController})
        .when('/users/:userId/vLabs/:vLabId/level/:vLablevelId/lab', {templateUrl: 'view/lab', controller: LabController})
        .when('/users/:userId/vLabs/:vLabId/level/:vLablevelId/labMsg/:id', {templateUrl: 'view/msg', controller: MsgController})
        .otherwise({redirectTo: '/home'});
    $locationProvider.html5Mode(true);
  }]);