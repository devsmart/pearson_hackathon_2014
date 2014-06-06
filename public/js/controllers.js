'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  
    $http({method: 'GET', url: '/api/vlabs'}).
        success(function(data, status, headers, config) {
            $scope.vLabs = data.vLabs;
        }).
            error(function(data, status, headers, config) { 
        }); 
        //     $scope.userName = 'Bob';
        //$scope.userId = 1; 
    //$http({method: 'GET', url: '/api/config'}).
    //  success(function(data, status, headers, config) {
    //    $scope.userName = data.name;
    //    $scope.userId = data.id; 
    //  }).
    //  error(function(data, status, headers, config) {
    //     $scope.name = 'Error!'
    //  });
}

function HomeController($scope, $http) {
    $scope.userName = 'Bob';
    $scope.userId = 1; 
    $http({method: 'GET', url: '/api/vlabs'}).
        success(function(data, status, headers, config) {
            $scope.vLabs = data.vLabs;
        }).
            error(function(data, status, headers, config) { 
        }); 
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];


function LevelController($scope, $http, $routeParams) { 
  $scope.vLabId =$routeParams.vLabId;
  $scope.userId = $routeParams.userId;

  $http({method: 'GET', url: '/api/levels'}).
  success(function(data, status, headers, config) {
    $scope.levels = data.levels; 
  }).
  error(function(data, status, headers, config) {
    $scope.levels = 'Error!'
  }); 
}
//LevelController.$inject = [];
//LevelController.levels =  ['Beginner','Intermediate','Expert'];

function StoryController($scope, $http, $routeParams) {
  $scope.selectedLevel = $routeParams.userLevel; 
  $scope.userId = $routeParams.userId;
  $scope.vLabId = $routeParams.vLabId; 
  $http({method: 'GET', url: '/api/users/' + $scope.userId + '/vlabs/' + $scope.vLabId + '/info'}).
    success(function(data, status, headers, config) {
        $scope.nextLevelName = data.userLevel.nextLevelName;
        $scope.vLabLevelId = data.userLevel.nextLevelNameId;
    }).
    error(function(data, status, headers, config) {
        $scope.lastCompleteLevel = 0;
    });
}
//StoryController.$inject = [];

function StoryLevelController($scope, $http, $routeParams) {
  $scope.vLabId = $routeParams.vLabId;
  $scope.vLablevel = $routeParams.vLablevelId;
  $scope.userId = $routeParams.userId;

  $http({method: 'GET', url: '/api/vlabs/' + $scope.vLabId + '/level/' + $scope.vLablevel}).
    success(function(data, status, headers, config) {
        $scope.labLevel = data.labLevel;
    }).
    error(function(data, status, headers, config) {
        $scope.labLevel = undefined;
    });
}

function LabController($scope, $http, $routeParams,$window) {
  $scope.vLabId = $routeParams.vLabId;
  $scope.vLablevelId = $routeParams.vLablevelId;
  $scope.userId = $routeParams.userId;
  $scope.selectedItemsApparatus = [];
  $scope.selectedItemsChemicals = [];
  $scope.ApparatusList = [1,2,3];
  $scope.ChemicalsList = [1,2,3];

  $scope.methodDropText = 'dropped(dragEl, dropEl)';
  $http({method: 'GET', url: '/api/users/' + $scope.userId + '/vlabs/' + $scope.vLabId + '/level/' + $scope.vLablevelId + '/lab'}).
    success(function(data, status, headers, config) {
        $scope.vLabLevel = data.vLab.vLabLevels[0];
        $scope.vLabItems = data.vLab.vLabItems;
        $scope.chemicalItems= data.vLab.chemicalItems;
        //  $scope.selectedItems = [data.vLab.vLabItems[0]];
    }).
    error(function(data, status, headers, config) {
        $scope.labLevel = undefined;
    });
    
    $scope.dropped = function(dragEl, dropEl) { // function referenced by the drop target
		//this is application logic, for the demo we just want to color the grid squares
		//the directive provides a native dom object, wrap with jqlite
		var drag = angular.element(dragEl);
		// $scope.$apply(function () {
            //$scope.selectedItems.push($scope.vLabItems[0]);
            if(drag.attr('item-type')=='apparatus')
            {
                var itemSelected = undefined;
                var selId = drag.attr('item-id')
                for (var i=0;i<$scope.vLabItems.length;i++)
                {
                    if($scope.vLabItems[i].id == selId){
                        itemSelected = $scope.vLabItems[i];
                        break;
                    }
                }
                var imageObj = new Image();
                imageObj.onload = function() {
                  var image = new Kinetic.Image({
                    x: 200,
                    y: 50,
                    image: imageObj,
                    width: 100,
                    height: 100,
                    draggable: true
                  });
                   $scope.layer.add(image);
               
                  $scope.stage.add($scope.layer);
                };
                imageObj.src = itemSelected.imgUrl;
                $scope.selectedItemsApparatus.push(itemSelected);
            }
            else
            {
                var itemSelected = undefined;
                var selId = drag.attr('item-id')
                for (var i=0;i<$scope.chemicalItems.length;i++)
                {
                    if($scope.chemicalItems[i].id == selId){
                        itemSelected = $scope.chemicalItems[i];
                        break;
                    }
                }
                var isError = false;
                $scope.selectedItemsChemicals.push(itemSelected);
                //validate
                for (var i=0;i<$scope.selectedItemsChemicals.length;i++)
                {
                    if($scope.selectedItemsChemicals.length > i)
                        if($scope.selectedItemsChemicals[i].id != $scope.ChemicalsList[i]){
                            //show error invalid
                            var imageObjErr = new Image();
                            imageObjErr.onload = function() {
                              var imgErr = new Kinetic.Image({
                                x: 200,
                                y: 50,
                                image: imageObj,
                                width: 100,
                                height: 100,
                                draggable: true
                              });
                               $scope.layer.add(imgErr);
               
                              $scope.stage.add($scope.layer);
                            };
                            imageObjErr.src = 'http://localhost:3000/img/error.jpg';
                            isError = true;
                            $window.location.href = '/users/' + $scope.userId + '/vLabs/'+  $scope.vLabId + '/level/' + $scope.vLablevelId + '/labMsg/1';
                            break;
                        }
                }
                if($scope.selectedItemsChemicals.length == $scope.ChemicalsList.length)
                {
                    //show success message
                       $window.location.href = '/users/' + $scope.userId + '/vLabs/'+  $scope.vLabId + '/level/' + $scope.vLablevelId + '/labMsg/2';
                         
                }
                if(!isError){
                    var imageObj = new Image();
                    imageObj.onload = function() {
                      var image = new Kinetic.Image({
                        x: 200,
                        y: 50,
                        image: imageObj,
                        width: 100,
                        height: 100,
                        draggable: true
                      });
                       $scope.layer.add(image);
               
                      $scope.stage.add($scope.layer);
                    };
                    imageObj.src = itemSelected.imgUrl;
                }
            }
        //$scope.refresh()	
		////clear the previously applied color, if it exists
		//var bgClass = drop.attr('data-color');
		//if (bgClass) {
		//	drop.removeClass(bgClass);
		//}

		////add the dragged color
		//bgClass = drag.attr("data-color");
		//drop.addClass(bgClass);
		//drop.attr('data-color', bgClass);

		////if element has been dragged from the grid, clear dragged color
		//if (drag.attr("x-lvl-drop-target")) {
		//	drag.removeClass(bgClass);
		//}
	}
    $scope.layer = new Kinetic.Layer();
    $scope.stage = new Kinetic.Stage({
        container: 'dragnDropContainerLab',
        width: 1124,
        height: 300
      }); 
   
}



function MsgController($scope, $http, $routeParams) {
  $scope.vLabId = $routeParams.vLabId;
  $scope.vLablevelId = $routeParams.vLablevelId;
  $scope.userId = $routeParams.userId; 
   $scope.msgId = $routeParams.id; 
  if($scope.msgId==1){
    $scope.imgUrl = 'http://localhost:3000/img/sad.gif';
    $scope.heading = 'Booom !';
    $scope.buttonText='Click to Start it Again';
    }
  else{
      $scope.imgUrl = 'http://localhost:3000/img/happy.gif';
      $scope.heading = 'Completed !';
      $scope.buttonText='Click to Start Next Level';
    }
}