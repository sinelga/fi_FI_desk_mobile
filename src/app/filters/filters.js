'use strict';

/**
 * @ngdoc filter
 * @name oyblogApp.filter:filters
 * @function
 * @description
 * # filters
 * Filter in the oyblogApp.
 */
angular.module('FiFiDeskMobile')
  .filter('img_link', function () {
    return function (input) {

        return "/img/"+input+"/";     
                 
    };
  }).filter('perm_link', function () {
	    return function (input) {
	    	
	    	return input.replace(' ','-')+'.html';	        
	    }
	                 
  });