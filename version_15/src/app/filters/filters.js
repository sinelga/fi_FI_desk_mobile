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

        return "/img/";     
                 
    };
  }).filter('perm_link', function () {
	    return function (input) {
	    	
	    	return input.replace(' ','-')+'.html';	        
	    }
	                 
  }).fiter('imgid', function () {
	  return function (input) {
//		  var imgarr = input.split("\");
		  return input.split("\\")[0];
		  
	  }	   
	  
	  
  }).fiter('imgfile', function () {
	  return function (input) {
		  var imgarr = input.split("\\");
		  return input.imgarr[1];
	  }
			  
			  
  });

  