# ngLoadingScreen
Angular Directive which puts a overlay loading screen if is-loading attribute is True and removes it when False.

Install
-
* bower install ng-loading-screen
* Add 'ngLoadingScreen' to your angular module, e.g. angular.module('myApp', ['ngLoadingScreen']);

Attributes
-
* isLoading (Takes $scope.variable, true or false)
* src (path to svg/img)
* width (Default is 150px)
* height (Default is 150px)
* timer (Milliseconds - Default is 500ms)

Usage
-
```
<loading-screen is-loading="myLoadingScope" src="/icons/heart.svg"></loading-screen>
```
