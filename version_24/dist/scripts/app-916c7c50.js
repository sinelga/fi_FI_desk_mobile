"use strict";angular.module("FiFiDeskMobile",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","uuid","sticky","ngPageHeadMeta","ngLoadingScreen","vesparny.fancyModal","angular-responsive"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","responsiveHelperProvider",function(e,a,t,i){var s="ld",i=i.$get();i.isXs()?s="xs":i.isSm()?s="sm":i.isMd()&&(s="md"),e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl",data:{device:s}}).state("details",{url:"/:id/*path",templateUrl:"app/main/main.html",controller:"MainCtrl",data:{device:s}}),a.otherwise("/"),t.html5Mode(!0)}]).run(["$location","$rootScope","$state",function(e,a){a.$on("$stateChangeStart",function(e,t,i){if(angular.isUndefined(i.path))a.title="Seksi pillu";else{var s=i.path;a.title=s.replace(".html","").replace("-"," ")}})}]),angular.module("FiFiDeskMobile").controller("ModalCtrl",["$scope","$rootScope","$timeout","$resource","$location","rfc4122","$fancyModal",function(e,a,t,i,s,n){var r=n.v4();e.empty=!0;var c=i("http://"+s.host()+"\\:8000/chat/:uuid/:phone/:say",{uuid:"@uuid",phone:"@phone",say:"@say"},{});e.mAsk="Hei "+e.selectedCharacter.Name+"!",a.$on("$fancyModal.opened",function(){d(),o()}),a.$on("$fancyModal.closed",function(){clearInterval(e.timer)}),e.chatContinue=function(){""===this.widget2?(e.placeholderstr=this.placeholderstr+"?",e.empty=!1,t(function(){e.empty=!0},500)):(e.widget={title:this.widget2},e.showAnswer=!1,e.mAsk=this.widget2,o(),d())};var d=function(){c.get({uuid:r,phone:e.selectedCharacter.Phone,say:e.mAsk}).$promise.then(function(a){e.mAnswer=a.answer})},o=function(){e.clock="";var a=0,t=Math.floor(16*Math.random())+5;e.timer=setInterval(function(){e.$apply(function(){a+=1,e.clock=5===a||9===a||15===a?e.selectedCharacter.Name+" Typing":"",a>t&&(clearInterval(e.timer),e.showAnswer=!0,e.widget2="",e.placeholderstr="Kysyä jotain!")})},1e3)}}]),function(){function e(e,a){return function(t,i,s){return function(t,i,n){var r,c,d=t.$eval(n[e]),o=t.$watch(d,function(){r&&(r.remove(),c.$destroy(),r=void 0,c=void 0),a(d)&&(c=t.$new(),r=s(c,function(e){i.after(e)}))});t.$on("$destroy",o)}}}function a(e){return function(a){return a.xs&&e.isXs()||a.sm&&e.isSm()||a.md&&e.isMd()||a.lg&&e.isLg()||!1}}angular.module("angular-responsive",[]).provider("responsiveHelper",[function(){var e=angular.injector(["ng"]),a=e.get("$window"),t=a.innerWidth||a.outerWidth,i=a.navigator.userAgent,s={isXs:function(){return 768>t&&!/Googlebot|Google Webmaster Tools|Google Search Console/.test(i)},isSm:function(){return t>=768&&992>t&&!/Googlebot|Google Webmaster Tools|Google Search Console/.test(i)},isMd:function(){return t>=992&&1200>t&&!/Googlebot|Google Webmaster Tools|Google Search Console/.test(i)},isLg:function(){return t>=1200||/Googlebot|Google Webmaster Tools|Google Search Console/.test(i)},isSmartDevice:function(){var e=a.navigator.userAgent||a.navigator.vendor||a.opera;return/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/.test(e)},isMobile:function(){var e=a.outerWidth,t=s.isSmartDevice();return t&&767>=e},isTablet:function(){{var e=a.outerWidth;s.isSmartDevice()}return startDevice&&e>=768},isDesktop:function(){return!s.isSmartDevice()}};this.$get=function(){return s}}]).directive("arXs",["responsiveHelper",function(a){return{restrict:"EAC",transclude:"element",template:"<div></div>",compile:e("arXs",a.isXs)}}]).directive("arSm",["responsiveHelper",function(a){return{restrict:"EAC",transclude:"element",template:"<div></div>",compile:e("arSm",a.isSm)}}]).directive("arMd",["responsiveHelper",function(a){return{restrict:"EAC",transclude:"element",template:"<div></div>",compile:e("arMd",a.isMd)}}]).directive("arLg",["responsiveHelper",function(a){return{restrict:"EAC",transclude:"element",template:"<div></div>",compile:e("arLg",a.isLg)}}]).directive("arResponsive",["responsiveHelper",function(t){return{restrict:"EAC",transclude:"element",template:"<div></div>",compile:e("arResponsive",a(t))}}])}(window.angular),angular.module("FiFiDeskMobile").controller("MainCtrl",["$scope","$resource","$timeout","$location","$stateParams","$rootScope","rfc4122","$fancyModal","$state",function(e,a,t,i,s,n,r,c,d){e.host=i.host();var o=r.v4();e.empty=!0,e.mselected=!1,e.mchat=!1,e.returnBack=!1;var l="ld";angular.isDefined(d.current.data)&&(l=d.current.data.device),e.myLoadingScope=!0,e.showModal=!1;var m=a("http://"+i.host()+"\\:8000/api/:id",{id:"@id"},{}),h=a("http://"+i.host()+"\\:8000/chat/:uuid/:phone/:say",{uuid:"@uuid",phone:"@phone",say:"@say"},{});m.query().$promise.then(function(a){e.characters=a,angular.isDefined(s.id)?m.get({id:s.id}).$promise.then(function(a){e.selectedCharacter=a,e.title=e.selectedCharacter.Moto,"ld"===l?e.myLoadingScope=!1:(e.mselected=!0,e.returnBack=!0)}):(e.selectedCharacter=e.characters[e.characters.length-1],e.title=e.selectedCharacter.Moto,e.myLoadingScope=!1)},function(a){console.log(a),e.err=a.data}),e.startChat=function(){if("ld"===l)c.open({templateUrl:"components/modal/modal.html",scope:e,controller:"ModalCtrl",openingClass:"animated zoomIn",closingClass:"animated hinge",openingOverlayClass:"animated fadeIn",closingOverlayClass:"animated fadeOut",themeClass:"fancymodal-theme-chat"});else{e.mchat=!0;{r.v4()}e.empty=!0,e.returnBack=!0,e.mAsk="Hei "+e.selectedCharacter.Name+"!",v(),g()}},e.chatContinue=function(){""===this.widget2?(e.placeholderstr=this.placeholderstr+"?",e.empty=!1,t(function(){e.empty=!0},500)):(e.widget={title:this.widget2},e.showAnswer=!1,e.mAsk=this.widget2,v(),g())};var g=function(){h.get({uuid:o,phone:e.selectedCharacter.Phone,say:e.mAsk}).$promise.then(function(a){e.mAnswer=a.answer})},v=function(){e.clock="";var a=0,t=Math.floor(16*Math.random())+5;e.timer=setInterval(function(){e.$apply(function(){a+=1,e.clock=5===a||9===a||15===a?e.selectedCharacter.Name+" Typing":"",a>t&&(clearInterval(e.timer),e.showAnswer=!0,e.widget2="",e.placeholderstr="Kysyä jotain!")})},1e3)};e.returnBackButton=function(){clearInterval(e.timer),e.mchat===!0?e.mchat=!1:(e.mselected=!1,e.returnBack=!1)},e.showFullImage=function(){c.open({templateUrl:"components/modalfullimage/modalfullimage.html",scope:e,openingClass:"animated rollIn",closingClass:"animated rollOut",openingOverlayClass:"animated fadeIn",closingOverlayClass:"animated fadeOut",themeClass:"fancymodal-theme-classic"})}}]),angular.module("FiFiDeskMobile").filter("img_link",function(){return function(){return"/img/"}}).filter("perm_link",function(){return function(e){return e.replace(" ","-")+".html"}}),angular.module("FiFiDeskMobile").controller("DetailsCtrl",["$scope","$resource","$stateParams","$timeout","$location","rfc4122",function(e,a,t,i,s,n){e.host=s.host();var r=n.v4();e.empty=!0;var c=a("http://"+s.host()+"\\:8000/api/:id",{id:"@id"},{}),d=a("http://"+s.host()+"\\:8000/chat/:uuid/:phone/:say",{uuid:"@uuid",phone:"@phone",say:"@say"},{});c.query().$promise.then(function(a){e.characters=a,c.get({id:t.id}).$promise.then(function(a){e.selectedCharacter=a})}),e.showModal=!1,e.toggleModal=function(){e.showModal=!e.showModal,e.mAsk="Hei "+e.selectedCharacter.Name+"!",clearInterval(e.timer),this.chatTimer(),o()},e.chatContinue=function(){""===this.widget2?(e.placeholderstr=this.placeholderstr+"?",e.empty=!1,i(function(){e.empty=!0},500)):(e.widget={title:this.widget2},e.showAnswer=!1,e.mAsk=this.widget2,this.chatTimer(),o())};var o=function(){d.get({uuid:r,phone:e.selectedCharacter.Phone,say:e.mAsk}).$promise.then(function(a){e.mAnswer=a.answer})},l=function(){e.clock=0;var a=Math.floor(16*Math.random())+5;e.timer=setInterval(function(){e.$apply(function(){e.clock+=1,e.clock>a&&(clearInterval(e.timer),e.showAnswer=!0,e.widget2="",e.placeholderstr="Kysyä jotain!")})},1e3)};e.chatTimer=l,e.$watch("showModal",function(a){0==a&&clearInterval(e.timer)})}]),angular.module("FiFiDeskMobile").run(["$templateCache",function(e){e.put("app/details/details.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><div class="container"><div class="row"><div class="col-md-5"><div class="media" ng-repeat="character in characters"><div class="media-left"><a href="/{{character.Id}}/{{character.Moto}}"><img class="img-rounded" alt="" ng-src="http://{{host}}:8000{{character.Id | img_link}}{{character.Img_file_name}}/{{character.Img_content_type}}/150/200"></a></div><div class="media-body"><h2 class="media-heading bigphone">{{character.Phone}}</h2><h3 class="media-heading">{{character.Name}} {{character.Age}}v</h3><h4 class="media-heading">{{character.City}}</h4></div></div></div><div class="col-md-7"><div class="row"><div class="col-md-7"><h2 class="media-heading bigphone">{{selectedCharacter.Phone}}</h2><h3 class="media-heading">{{selectedCharacter.Name}} {{selectedCharacter.Age}}v</h3><h4 class="media-heading">{{selectedCharacter.City}}: {{selectedCharacter.Moto}}</h4></div><div class="col-md-5"><button type="button" ng-click="toggleModal()" class="btn btn-lg btn-danger marginetop20">Nopea CHATTI!</button></div></div><div class="media"><div class="media-left"><a href="#"><img class="img-rounded" alt="" ng-src="http://{{host}}:8000{{selectedCharacter.Id | img_link}}{{selectedCharacter.Img_file_name}}/{{selectedCharacter.Img_content_type}}/350/400"></a></div><div class="media-body">{{selectedCharacter.Description}}</div></div></div></div></div><hr><modal title="Chatti" visible="showModal"><div class="modal-body"><div class="media"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading">{{mAsk}}</div></div></div><div ng-if="!showAnswer"><div class="media showAnswer"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading">Odotta... {{clock}}</div></div></div></div><div ng-if="showAnswer"><div class="media showAnswer"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading">{{selectedCharacter.Name}}: {{mAnswer}}</div></div></div><input type="text" name="widget2" ng-show="empty" class="form-control marginetop20 sample-show-hide" ng-model="widget2" placeholder="{{placeholderstr}}"> <button ng-click="chatContinue()" class="btn btn-warning btn-lg marginetop10 pull-right" type="button">Jatkaa!</button></div></div></modal></div>'),e.put("app/main/main.html",'{{err}}<div data-ar-lg=""><loading-screen is-loading="myLoadingScope" src="/assets/images/sex_chat.jpg" width="200" height="200" timer="2000"></loading-screen><div ng-if="!myLoadingScope" class="container"><div class="row"><div class="col-md-5"><div class="media" ng-repeat="character in characters"><div class="media-left"><a ng-href="/{{character.Id}}/{{character.Moto | perm_link}}"><img class="img-rounded boxImageSmall" alt="" ng-src="http://{{host}}:8000/img/{{character.ImgId}}/{{character.Img_file_name}}/150/200"></a></div><div class="media-body"><h2 class="media-heading bigphone">{{character.Phone}}</h2><h3 class="media-heading">{{character.Name}} {{character.Age}}v</h3><h4 class="media-heading">{{character.City}}</h4></div></div></div><div class="col-md-7"><div class="row"><div class="col-md-7"><h2 class="media-heading bigphone">{{selectedCharacter.Phone}}</h2><h3 class="media-heading">{{selectedCharacter.Name}} {{selectedCharacter.Age}}v</h3><h4 class="media-heading">{{selectedCharacter.City}}: {{selectedCharacter.Moto}}</h4></div><div class="col-md-5"></div></div><div class="media"><div class="media-left"><a href="#"><img ng-click="showFullImage()" class="img-rounded boxImage" alt="" ng-src="http://{{host}}:8000/img/{{selectedCharacter.ImgId}}/{{selectedCharacter.Img_file_name}}/350/400"></a></div><div class="media-body"><button type="button" ng-click="startChat()" class="btn btn-lg btn-warning marginetop20">Nopea CHATTI!</button></div></div></div><div class="transparent media-body">{{selectedCharacter.Description}}</div></div></div></div><div data-ar-responsive="{\'xs\': true, \'sm\': true, \'md\': true,\'ld\': false}"><div ng-if="returnBack"><button ng-click="returnBackButton()" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div ng-show="!mchat"><div ng-show="!mselected" class="row"><div class="col-md-5"><div class="media" ng-repeat="character in characters"><div class="media-left"><a ng-href="/{{character.Id}}/{{character.Moto | perm_link}}"><img class="img-rounded boxImageSmall" alt="" ng-src="http://{{host}}:8000/img/{{character.ImgId}}/{{character.Img_file_name}}/100/150"></a></div><div class="media-body"><a class="media-heading mbigphone" href="tel:{{character.Phone}}}">{{character.Phone}}</a><h3 class="media-heading">{{character.Name}} {{character.Age}}v</h3><h4 class="media-heading">{{character.City}}</h4></div></div></div></div></div><div ng-show="!mchat"><div ng-show="mselected"><a class="media-heading mbigphone" href="tel:{{selectedCharacter.Phone}}}">{{selectedCharacter.Phone}}</a> <a href="#"><img class="img-rounded boxImage" alt="" ng-src="http://{{host}}:8000/img/{{selectedCharacter.ImgId}}/{{selectedCharacter.Img_file_name}}/200/250"></a> <button type="button" ng-click="startChat()" class="btn btn-lg btn-danger marginetop20">Nopea CHATTI!</button></div></div><div ng-show="mchat"><img class="img-rounded" alt="" ng-src="assets/images/sex_chat.png"><div class="col-md-6"><div ng-if="!showAnswer"><div class="countermob">{{clock}}</div></div></div><div class="mmodaltext">{{mAsk}}</div><div ng-if="!showAnswer"><div class="showAnswer"><div><div class="counter">Odotta...</div></div></div></div><div ng-if="showAnswer"><div class="showAnswer"><div class="mmodaltext"><div class="red modaltext">{{selectedCharacter.Name}}:&nbsp;</div>{{mAnswer}}</div></div><div class="chatInput"><input type="text" name="widget2" ng-show="empty" class="sample-show-hide chatInput" ng-model="widget2" placeholder="{{placeholderstr}}">&nbsp;&nbsp;</div><button ng-click="chatContinue()" class="btn btn-warning btn-lg marginetop10 pull-right" type="button">Jatkaa!</button></div></div></div>'),e.put("components/modal/modal.html",'<div class="row"><div class="col-md-6"><img class="img-rounded" alt="" ng-src="assets/images/sex_chat.png"></div><div class="col-md-6"><div ng-if="!showAnswer"><div class="counter">{{clock}}</div></div></div></div><div class="media"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading modaltext">{{mAsk}}</div></div></div><div ng-if="!showAnswer"><div class="media showAnswer"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading counter">Odotta...</div></div></div></div><div ng-if="showAnswer"><div class="media showAnswer"><i class="fa fa-weixin media-object pull-left"></i><div class="media-body"><div class="media-heading modaltext"><div class="red modaltext">{{selectedCharacter.Name}}:&nbsp;</div>{{mAnswer}}</div></div></div><input type="text" name="widget2" ng-show="empty" class="form-control marginetop20 sample-show-hide" ng-model="widget2" placeholder="{{placeholderstr}}"> <button ng-click="chatContinue()" class="btn btn-warning btn-lg marginetop10 pull-right" type="button">Jatkaa!</button></div>'),e.put("components/modalfullimage/modalfullimage.html",'<div class="modaltitle">Soita&nbsp<dev class="modalbigphone">{{selectedCharacter.Phone}}</dev>&nbsp {{selectedCharacter.Name}}</div><img class="img-rounded imgcenter" alt="" ng-src="http://{{host}}:8000/fullimage/{{selectedCharacter.ImgId}}/original/{{selectedCharacter.Img_file_name}}">')}]);