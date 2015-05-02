'use strict';

angular.module('FiFiDeskMobile')
  .controller('ModalCtrl', function ($scope,$rootScope,$timeout,$resource,$location,rfc4122,$fancyModal) {
	  var uuid = rfc4122.v4();
	  $scope.empty = true;
	  
		var Chat= $resource("http://"+$location.host()+"\\:8000/chat/:uuid/:phone/:say", {
		uuid : '@uuid',
		phone : '@phone',
		say : '@say'
	}, {});
	  
		 $scope.mAsk ="Hei "+$scope.selectedCharacter.Name+"!";
		 
		 $rootScope.$on('$fancyModal.opened', function (e, $modal) {
			  
				 askChat();
				 timer();
			    
			});
		 
		 $rootScope.$on('$fancyModal.closed', function (e, id) {
			    console.log('$fancyModal closed: ' + id);
			    clearInterval($scope.timer);
			});
	 		 		 
	   
		  $scope.chatContinue = function() {
			  
			  if (this.widget2 === '') {

				  $scope.placeholderstr=this.placeholderstr +'?';
				  $scope.empty=false;
				  
				  $timeout( function(){ $scope.empty=true; }, 500);
				  
				  
			  } else {
				  
				  $scope.widget = {title: this.widget2};
				  $scope.showAnswer = false;
				  $scope.mAsk =  this.widget2;
				  timer();
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
	  	  
	  
  });