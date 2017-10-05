var app = angular.module('todoApp', ['ngMaterial']);
app.controller('todoCtrl', function todoCtrl($scope, $timeout, $mdDialog) {
	$scope.addYourTask ='';
	$scope.todoObj = {};
	$scope.todos = [{task: 'task 1', done: false},{task: 'htask 2', done: false}];
	
	$scope.showAdd = true;

	$scope.completedTasks = [];
	$scope.completeObj ={};

	$scope.activeTasks = [{task: 'task 1', done: false},{task: 'htask 2', done: false}];
	// add task
	$scope.addTask = function(){
		if ($scope.addYourTask !='') {
			$scope.todoObj={
				task: $scope.addYourTask,
				done: false
			}
			$scope.todos.push($scope.todoObj);
			$scope.activeTasks.push($scope.todoObj);
			$scope.addYourTask ='';
		}else{
			$scope.addAlert = "Please enter your task first";
			$timeout(function () {
	        	$scope.addAlert = '';
	    	}, 3000);
		}		
	}
	// delete task
	$scope.deleteTask = function(index){
		// console.log(index)
		$scope.todos.splice(index,1);
		$scope.deleteAlert = 'Removed successfully';		
		$timeout(function () {
	        $scope.deleteAlert = '';
	    }, 3000);
	}
	// delete complete task 
	$scope.deleteCompleteTask = function(index){
		$scope.completedTasks.splice(index,1);
		$scope.deleteAlert = 'Removed successfully';
		$timeout(function () {
	        $scope.deleteAlert = '';
	    }, 3000);
	}
	// edit active
	// $scope.editActive =function(index,active ){
	// 	$scope.addYourTask = active.task;
	// 	$scope.index = index;
	// 	$scope.showAdd = false;
	// }
	// edit Update
	$scope.editActive =function(index,active ){
		$scope.addYourTask = active.task;
	}

	// edit task
	$scope.editTask =function(index,todo ){
		$scope.addYourTask = todo.task;
		// console.log($scope.addYourTask)
		$scope.index = index;
		$scope.showAdd = false;

	}
	// update task
	$scope.updateTask = function(){
		$scope.todos[$scope.index].task = $scope.addYourTask;
		$scope.activeTasks[$scope.index].task = $scope.addYourTask;
		$scope.addYourTask ='';
		$scope.showAdd = true;
		$scope.updateAlert = 'Updated successfully';
		$timeout(function () {
	        $scope.updateAlert = '';
	    }, 3000);
	}
	// complete task
	$scope.checkBox = function(todo, index){
		// create active task array
		for (var i = 0; i < $scope.activeTasks.length; i++) {
			if ($scope.activeTasks[i].task == todo.task) {
				$scope.activeTasks.splice(i, 1)
			}
		}		
		// create completed task array
		if (todo.done == false) {
			$scope.completedTasks.push(todo)

		}				
	}
	// dialoug box
	$scope.showAlert = function(ev) {
	    $mdDialog.show({
	        template: '<div id="successMsg">' + 'Task has been added to completed list' + '</div>',
	        parent: angular.element(document.body),
	        targetEvent: ev,
	        

	        clickOutsideToClose: true,
	        fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
	        controller: DialogController
	        
	      });
	   function DialogController($scope, $mdDialog, $timeout) {

        $timeout(function () {
          $mdDialog.hide();
        }, 2000);
      }
	  };

})