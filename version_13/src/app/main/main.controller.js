'use strict';

angular.module('FiFiDeskMobile')
  .controller('MainCtrl', function ($scope,$resource,$timeout,$location,$stateParams,$rootScope,rfc4122,$fancyModal,$state) {
	  
	  $scope.host =$location.host();
	  var uuid = rfc4122.v4();
	  $scope.empty = true;
	  $scope.mselected = false;
	  $scope.mchat = false;
	  $scope.returnBack =false;
	  var device = 'ld'
	  	  
	  
	  if (angular.isDefined($state.current.data)) {
			 device = $state.current.data.device;
			  
	  }
	  	  
	  $scope.myLoadingScope = true;
	  $scope.showModal = false;
			
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

			if (angular.isDefined($stateParams.id)) {
				
				
				Character.get({id: $stateParams.id}).$promise.then(function(data) {

					$scope.selectedCharacter = data
					$scope.title =$scope.selectedCharacter.Moto;
					
					if (device ==='ld') {
						$scope.myLoadingScope = false;
					} else {
						
						$scope.mselected = true;
						$scope.returnBack =true;
						
					}
					
					
				});
								
				
			} else {

				$scope.selectedCharacter = $scope.characters[$scope.characters.length-1]
				$scope.title =$scope.selectedCharacter.Moto;
				$scope.myLoadingScope = false;
				
			}

		},function(error){
			
			
			console.log(error);
			
			$scope.err = error.data;
			
			
		});

		
		$scope.startChat = function() {
			
			if (device ==='ld') {
			
			$fancyModal.open({
				templateUrl: 'components/modal/modal.html',
				scope: $scope,
				controller: 'ModalCtrl',
				openingClass: 'animated zoomIn',
				closingClass: 'animated hinge',
				openingOverlayClass: 'animated fadeIn',
				closingOverlayClass: 'animated fadeOut',
				themeClass: 'fancymodal-theme-chat',
			});
			} else {
								
				$scope.mchat =true;
				
				var uuid = rfc4122.v4();
				$scope.empty = true;
				$scope.returnBack =true;
				  								
				$scope.mAsk ="Hei "+$scope.selectedCharacter.Name+"!";
				timer();
				askChat();
				 		 		 				   					
			} 
			 			
		}
		
		
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
		
		
		$scope.returnBackButton = function() {

								
			clearInterval($scope.timer);
			
			if ($scope.mchat===true){
				
				$scope.mchat=false;
				
			} else {
				
				 $scope.mselected = false;
				 $scope.returnBack =false;
				
			}						
			
		}
		  
		  
		$scope.showFullImage = function() {
				
				$fancyModal.open({
					templateUrl: 'components/modalfullimage/modalfullimage.html',					
					scope: $scope,
					openingClass: 'animated rollIn',
			        closingClass: 'animated rollOut',
			        openingOverlayClass: 'animated fadeIn',
			        closingOverlayClass: 'animated fadeOut',
					themeClass: 'fancymodal-theme-classic',
				});
			
		}
				
		
  });
