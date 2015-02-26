'use strict';

app.controller('TaskController', function($scope, $location, toaster, Task, Auth){

  $scope.createTask = function() {
    $scope.task.status = 'open';
    $scope.task.gravatar = Auth.user.profile.gravatar;
    $scope.task.name = Auth.user.profile.name;
    $scope.task.poster = Auth.user.uid;

    Task.createTask($scope.task).then(function(ref) {
      toaster.pop('success', 'Task created successfully.');
      $scope.task = {
        title: '',
        description: '',
        total: '',
        status: 'open',
        gravatar: '',
        name: '',
        poster: ''
      };
      $location.path('/browse/' + ref.key());
    });
  };

  $scope.editTask = function(task) {
    Task.editTask(task).then(function() {
      toaster.pop('success', 'Task is updated.');
    });
  };

  // var ref = new Firebase(FURL);
  // var fbTasks = $firebase(ref.child('tasks')).$asArray();
  // var taskId = $routeParams.taskId;

  // if(taskId) {
  //   $scope.selectedTask = getTask(taskId);
  // }

  // function getTask(taskId) {
  //   return $firebase(ref.child('tasks').child(taskId)).$asObject();
  // }

  // $scope.updateTask = function(task) {
  //   $scope.selectedTask.$save(task);
  //   toaster.pop('success', "Task is updated.");
  //   $location.path('/browse');
  // }

  // $scope.tasks = fbTasks;

  // $scope.postTask = function(task) {
  //   fbTasks.$add(task);
  //   toaster.pop('success', "Task is created.");
  //   $location.path('/browse');
  // }
});