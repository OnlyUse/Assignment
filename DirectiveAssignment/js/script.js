var myApp = angular.module('myApp', []);

myApp.controller('alertController', function($scope){
	$scope.notification = {
		status: "",
		message: "",
		type: ""
	};
	$scope.checkInput = function() {
		if($scope.inputCtrl == '' || angular.isUndefined($scope.inputCtrl)){
			$scope.notification.message = "Input field can not be left blank";
			$scope.notification.status  = true;
			$scope.notification.type    = "danger";
		}
		else if (isNaN($scope.inputCtrl)) {
			$scope.notification.message = "Input field accepts only number";
			$scope.notification.status  = true;
			$scope.notification.type    = "warning";
		}
		else{
			$scope.notification.message = "Input field value("+$scope.inputCtrl+") accepted";
			$scope.notification.status  = true;
			$scope.notification.type    = "success";
		}
	}
});

myApp.directive('notification', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		template:"<div class='alert alert-{{alertData.type}} fade in' ng-show='alertData.status' role='alert' data-notification='{{alertData.status}}'><a href='javascript: void(0)' ng-click='closeMe()' class='close'>&times;</a>{{alertData.message}}</div>",
		scope:{
		  alertData:"="
		},
		replace:true,
		link: function(scope, element, attrs) {
			scope.closeMe = function(){
				scope.alertData.status = false;
			};
			setInterval(function(){
				if(scope.alertData.status){
					scope.closeMe();
					scope.$apply();
				}
			}, 5000);
			
		}
	};
}]);	