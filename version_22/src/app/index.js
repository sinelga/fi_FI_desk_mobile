'use strict';

angular.module('FiFiDeskMobile', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router','uuid','sticky','ngPageHeadMeta','ngLoadingScreen','vesparny.fancyModal','angular-responsive'])
  .config(function ($stateProvider, $urlRouterProvider,$locationProvider,responsiveHelperProvider) {
	  var device = 'ld';
	  var responsiveHelperProvider = responsiveHelperProvider.$get();
	  if (responsiveHelperProvider.isXs()) {
		  device = "xs";
		  
	  } else if (responsiveHelperProvider.isSm()){
		  
		  device = "sm";
	  } else if (responsiveHelperProvider.isMd()){
		  
		  device = "md";
	  }
	  
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
            data: {
            	  device: device 
              }	
      }).state('details', {
         url: '/:id/*path',
         templateUrl: 'app/main/main.html',
         controller: 'MainCtrl',
         data: {
         	  device: device 
         }
                	
      });              

    $urlRouterProvider.otherwise('/');    
    $locationProvider.html5Mode(true);
//    $httpProvider.interceptors.push('myInterceptor');
    
        
  }).run(['$location','$rootScope','$state', function($location,$rootScope,$state) {
	  	  
	  $rootScope.$on('$stateChangeStart', 
			  function(event, toState, toParams, fromState, fromParams){ 

		  		if (angular.isUndefined(toParams.path)) {
		  			$rootScope.title ='Seksi pillu';
		  			
		  		}  else {
		  			
		  			var title = toParams.path
		  			
		  			$rootScope.title =title.replace('.html','').replace('-',' ');
		  		}
		  				  
			  })
	  
  }]);
