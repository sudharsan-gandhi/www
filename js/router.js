angular.module('app.controller',[])
	.controller('userController',function($scope,$resource,authenticate,actionSheet){
		// body...
		$scope.title="survey";
		var Rest = $resource('http://localhost:3000/auth');
		authenticate.setRootScope();
		$scope.logout=function(){
			actionSheet.showConfirm();
		};
      

	})
	.controller('createController',function($scope,$ionicHistory,$resource,$state,authenticate,api){
		// body...
		$scope.title="create";
		authenticate.setRootScope();
		$scope.activateButton=false;
		//form submit ajax and redirection
		$scope.createSurvey=function(form){
			var Rest=$resource(api.getApi()+'/createSurvey');
			console.log('api'+api.getApi());
			var list=new Rest();
			angular.copy(form,list);
			console.log(JSON.stringify(list));
			// list.$save(function(error){
			// 	// if (result=="success") {}
			// 	window.alert('success');
			// 	$state.go('initiate');
			// },function(success){
			// 	window.alert('error');
			// });
			 	$state.go('initiate');
		};

		// ionic history going back
		$scope.ionicHistory=function(){
			console.log("clicked");
			$ionicHistory.goBack();
		};
		// form validation and set error msgs
		$scope.disableButton=function(form){
			// console.log("form"+JSON.stringify(form));
			if(form.category==='')
			{
				$scope.activateButton=true;
			}else{
				$scope.activateButton=false;
			};
			
		};


	})
	.controller('initiateController',function($scope,authenticate,$ionicHistory,$resource,api){
		// body...
		$scope.title="initiate";
		authenticate.setRootScope();
		// initializing dynamic form
		$scope.choices = [{
							'answer':[{'id':'answer1'}]
							}];
		// removing last item from form
		 $scope.addNewChoice = function() {
		 	if($scope.choices[0].answerType==="radio"){
   				var newItemNo = $scope.choices[0].answer.length+1;
    			$scope.choices[0].answer.push({'id':'answer'+newItemNo});
    		};
 		 };
    
		 $scope.removeChoice = function() {
		    var lastItem = $scope.choices[0].answer.length-1;
		    $scope.choices[0].answer.splice(lastItem);
		 };
		 // ionic history going back
		$scope.ionicHistory=function(){
			// console.log("clicked");
			$ionicHistory.goBack();
		};
		$scope.addQuestion=function(){
			// console.log(JSON.stringify($scope.choices));
			var Rest=$resource(api.getApi()+'/addQuestion');
			// console.log('api'+api.getApi());
			var list=new Rest();
			list.question=$scope.choices[0].question;
			list.answer=$scope.choices[0].answer;
			list.answerType=$scope.choices[0].answerType;
			console.log(JSON.stringify(list));
			list.$save(function(success){
				window.alert('successfully added');
				$scope.choices = [{
							'answer':[{'id':'answer1'}]
							}];
			},
			function(error){
				window.alert('error try again');
			});
		};
	})
	.controller('statusController',function($scope,authenticate){
		// body...
		$scope.title="status";
		authenticate.setRootScope();


	})
	.controller('aftermathController',function($scope,authenticate){
		// body...
		$scope.title="aftermath";
		authenticate.setRootScope();


	})
	.service('authenticate',function($rootScope,$resource){
		var Rest = $resource('http://localhost:3000/auth');
		$rootScope.auth=[];
		this.setRootScope=function(){
			if($rootScope.auth.length<1){
				Rest.query(function(result){
					console.log(JSON.stringify(result));
       			$rootScope.auth = result;
     		  });
			}
			return $rootScope.auth;
		}
	})
	.service('actionSheet',function($ionicPopup,$timeout,$rootScope){
		this.showConfirm = function() {
		   var confirmPopup = $ionicPopup.confirm({
		     title: 'Log out',
		     template: 'Are you sure you want to logout',
		     okText: 'Logout'
		   });

		   confirmPopup.then(function(res) {
		     if(res) {
		       logout();
		     }
		   });
 		};
 		var logout=function(){
 			console.log('You are not sure');
 			$rootScope.auth=[];
 		}
	})
	.service('api',function($rootScope){
		this.getApi=function(){
			return "http://localhost:3000";
		};
	});