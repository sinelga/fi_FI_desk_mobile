'use strict';

angular.module('FiFiDeskMobile')
  .controller('DetailsCtrl', function ($scope,$resource,$stateParams,$timeout,$location,rfc4122) {
	  		
	  $scope.host =$location.host();

	  var uuid = rfc4122.v4();
	  $scope.empty = true;
			
		var Character = $resource("http://"+$location.host()+"\\:8000/api/:id", {
			id : '@id'
		}, {});
		
		var Chat= $resource("http://"+$location.host()+"\\:8000/chat/:uuid/:phone/:say", {
			uuid : '@uuid',
			phone : '@phone',
			say : '@say'
		}, {});
		
		Character.query().$promise.then(function(data) {
			
			$scope.characters =data;
						
			Character.get({id: $stateParams.id}).$promise.then(function(data) {
			
			$scope.selectedCharacter = data
			
		});
			
			
		});
		
		   $scope.showModal = false;
		   $scope.toggleModal = function(){
		      $scope.showModal = !$scope.showModal;
		      
		      $scope.mAsk ="Hei "+$scope.selectedCharacter.Name+"!";
		      clearInterval($scope.timer);
		      this.chatTimer();
		      
		      askChat();		      
		      		      
		   };
		   
			  $scope.chatContinue = function() {
				  
				  if (this.widget2 === '') {

					  $scope.placeholderstr=this.placeholderstr +'?';
					  $scope.empty=false;
					  
					  $timeout( function(){ $scope.empty=true; }, 500);
					  
					  
				  } else {
					  
					  $scope.widget = {title: this.widget2};
					  $scope.showAnswer = false;
					  $scope.mAsk =  this.widget2;
					  this.chatTimer();
					  askChat();
					  
					  
				  }
				  
			  };
		   
		   
			  var askChat= function() {
				  
				  
			      Chat.get({uuid: uuid,phone: $scope.selectedCharacter.Phone,say:$scope.mAsk}).$promise.then(function(data) {
			    	  
			    	  $scope.mAnswer = data.answer;
			    	  
			      }); 				  
				  
			  }
		   		  
			 var  timer= function() {
				  
				  $scope.clock = 0;
				  
				  var rand =Math.floor(Math.random() * (1 + 20 - 5)) + 5;
				  
				  $scope.timer = setInterval(function(){
				        $scope.$apply(function() {
				        	
				            $scope.clock += 1;
				            
				            if ($scope.clock > rand) {
				            	clearInterval($scope.timer);
				            	$scope.showAnswer = true;
				            	$scope.widget2 ='';
				            	$scope.placeholderstr='Kysyä jotain!';
				            		            	
				            }	            
				            
				        });
				    }, 1000);
				  	  
			  }; 
			  
			  $scope.chatTimer = timer;
			  			  
			  $scope.$watch("showModal",  function(newValue, oldValue){
				  if(newValue == false){

					  clearInterval($scope.timer);
					  					  
				  }				  
				  
			  });
			  	  	  

  });
