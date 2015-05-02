(function () {
    'use strict';

    angular
        .module('angular-responsive', [])
        .provider('responsiveHelper',[function() {
        		
        		var injector = angular.injector(['ng']);
        		var $window = injector.get('$window');
        		var winWidth = $window.innerWidth || $window.outerWidth;

        		var str = $window['navigator']['userAgent'];   
         	        		        		     
        		var helper   = {
        				
                      isXs: function () { return (winWidth < 768) && !(/Googlebot|Google Webmaster Tools/).test(str); },
                      isSm: function () { return (winWidth >= 768 && winWidth < 992) && !(/Googlebot|Google Webmaster Tools/).test(str); },
                      isMd: function () { return (winWidth >= 992 && winWidth < 1200) && !(/Googlebot|Google Webmaster Tools/).test(str); },
                      isLg: function () {

                    	  return winWidth >= 1200 || (/Googlebot|Google Webmaster Tools/).test(str);
                    	                      	                        
                      },
                      
//                        isBt: function() {
//                        	
//                        	console.log("isB Chect");
//                        	var bt = $window['navigator']['userAgent'];
//                        	return  (/Googlebot/).test(bt);
//                        	
//                        	
//                        },
        				        				
        				isSmartDevice: function() {
        					var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        					
        					return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/).test(ua);
        					
        					
        				},
        				isMobile : function() {
        					
        					var width =$window['outerWidth'];
        					
        					var smartDevice = helper.isSmartDevice();
        						
        					return smartDevice && width <=767;
        				},
        				isTablet: function() {
        					
        					var width =$window['outerWidth'];
        					
        					var smartDevice = helper.isSmartDevice();
        						
        						return startDevice && width >=768;	
        					
        				},
        				isDesktop: function() {
        					
        					return !helper.isSmartDevice();
        					
        				}
        				
        	   
                  };
        		
                this.$get = function() {
                    return helper;
                    
                };
        				
        		} ])
//        /**
//         * Bt
//         */
//        .directive('arBt', ['responsiveHelper', function (responsiveHelper)
//        {
//            return {
//                restrict    : "EAC",
//                transclude  : 'element',
//                template    : '<div></div>',
//                compile     : buildCompileFn( 'arBt', responsiveHelper.isBt)
//            };
//        }])        

        /**
         * Extra small devices Phones (<768px)
         */
        .directive('arXs', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arXs', responsiveHelper.isXs )
            };
        }])

        /**
         * Small devices Tablets (≥768px)
         */
        .directive('arSm', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arSm', responsiveHelper.isSm )
            };
        }])

        /**
         * Medium devices Desktops (≥992px)
         */
        .directive('arMd', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arMd', responsiveHelper.isMd )
            };
        }])

        /**
         * Large devices Desktops (≥1200px)
         */
        .directive('arLg', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arLg', responsiveHelper.isLg )
            };
        }])
        /**
         * Does the with a match user-specified combination (0..4)
         */
        .directive('arResponsive', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arResponsive', checkAllTypes(responsiveHelper) )
            };
        }]);
    
    /**
     * Partial application for DRY construction of a directive compile function
     */
    function buildCompileFn(responsiveType, verifyFn )
    {
        return function compile(element, attr, transclude)
        {
            return function postLink(scope, element, attr)
            {
                var childElement, childScope,
                    config  = scope.$eval( attr[responsiveType] ),
                    unwatch = scope.$watch( config, function ()
                    {
                        // attribute changed, delete existing element & $scope

                        if (childElement) {
                            childElement.remove();
                            childScope.$destroy();
                            childElement = undefined;
                            childScope = undefined;
                        }

                        if ( verifyFn(config) )
                        {
                            // Create a new element and $scope...

                            childScope = scope.$new();
                            childElement = transclude(childScope, function (clone) {
                                element.after(clone);
                            });
                        }
                    });

                // Fix memory leak an remove watcher when element/directive is released

                scope.$on( "$destroy", unwatch );
            };
        };
    }

    /**
     * Partial application for DRY construction of function to scan of any valid responsive types
     */
    function checkAllTypes(responsiveHelper)
    {
        return function( deviceTypes )
        {
            return  ( deviceTypes['xs']  && responsiveHelper.isXs()  ) ||
                ( deviceTypes['sm']  && responsiveHelper.isSm()  ) ||
                ( deviceTypes['md']  && responsiveHelper.isMd()  ) ||
                ( deviceTypes['lg'] && responsiveHelper.isLg() ) || false;
        };
    }

    /**
     * Scan to determine if current window is hosted within a `smart` device
     * @param $window
     * @returns {boolean}
     */
    /*
    function isSmartDevice( $window )
    {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];

        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }
    */

})( window.angular );
