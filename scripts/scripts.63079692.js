!function(){"use strict";angular.module("siteApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","viewhead","angulartics","angulartics.google.analytics","hljs","ngDisqus","relativeDate"]).constant("siteConfig",{apiURL:9e3===parseInt(location.port)?"http://localhost:8080":"http://api.platformio.ikravets.com"})}(),function(){"use strict";function a(a,b){return{responseError:function(c){return 404===c.status&&(b.location.href="#!/404"),a.reject(c)}}}function b(a,b,c,d){a.hashPrefix("!"),c.setShortname("platformio"),d.interceptors.push("httpErrorInterceptor"),b.when("/",{templateUrl:"views/home.html"}).when("/get-started",{templateUrl:"views/get_started.html"}).when("/platforms/:platformType?",{templateUrl:"views/platforms.html",controller:"PlatformsController",controllerAs:"vm"}).when("/boards/:vendorType?",{templateUrl:"views/boards.html",controller:"BoardsController",controllerAs:"vm"}).when("/lib",{templateUrl:"views/lib_main.html",controller:"LibMainController",controllerAs:"vm",resolve:{libStats:["dataService",function(a){return a.getLibStats().$promise}]}}).when("/lib/search",{templateUrl:"views/lib_search.html",controller:"LibSearchController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibSearchResult({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/examples",{templateUrl:"views/lib_examples.html",controller:"LibExamplesController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibExamples({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/show/:libId/:libName",{templateUrl:"views/lib_show.html",controller:"LibShowController",controllerAs:"vm",resolve:{libInfo:["$route","dataService",function(a,b){return b.getLibInfo(a.current.params.libId).$promise}]}}).when("/404",{templateUrl:"404.html"}).otherwise({redirectTo:"/404"})}angular.module("siteApp").factory("httpErrorInterceptor",a).config(b),a.$inject=["$q","$window"],b.$inject=["$locationProvider","$routeProvider","$disqusProvider","$httpProvider"]}(),function(){"use strict";function a(a,b){function c(c){return a(b.apiURL+"/lib/search",c).get()}function d(c){return a(b.apiURL+"/lib/examples",c).get()}function e(c){return a(b.apiURL+"/lib/info/"+c).get()}function f(c){return a(b.apiURL+"/lib/download/"+c).get()}function g(){return a(b.apiURL+"/lib/stats").get()}function h(){return[{name:"arduino",title:"Arduino"},{name:"energia",title:"Energia"}]}function i(){return[{name:"atmelavr",title:"Atmel AVR"},{name:"atmelsam",title:"Atmel SAM"},{name:"timsp430",title:"TI MSP430"},{name:"titiva",title:"TI TIVA"},{name:"teensy",title:"Teensy"}]}return{getLibSearchResult:c,getLibExamples:d,getLibInfo:e,getLibDlUrl:f,getLibStats:g,getFrameworks:h,getPlatforms:i}}angular.module("siteApp").factory("dataService",a),a.$inject=["$resource","siteConfig"]}(),function(){"use strict";function a(){return function(a,b){var c=a;return angular.forEach(b,function(b){"name"in b&&"title"in b&&b.name===a&&(c=b.title)}),c}}angular.module("siteApp").filter("nameToTitle",a)}(),function(){"use strict";function a(a,b){function c(b){return new RegExp(b).test(a.path())}var d=this;d.isRouteActive=c,d.isPhJSCrawler=-1!==b.navigator.userAgent.indexOf("PhantomJS")}angular.module("siteApp").controller("MainController",a),a.$inject=["$location","$window"]}(),function(){"use strict";function a(a,b){function c(a){b.location.href="#!/platforms/"+a}function d(){var b={atmelavr:{title:"Atmel AVR",active:!1},timsp430:{title:"TI MSP430",active:!1},titiva:{title:"TI TIVA",active:!1}},c="atmelavr";return a.hasOwnProperty("platformType")&&(c=a.platformType),angular.forEach(b,function(a,d){b[d].active=d===c}),b}var e=this;e.changePlatform=c,e.platforms=d(),e.activePlatform="",angular.forEach(e.platforms,function(a,b){a.active&&(e.activePlatform=b)})}angular.module("siteApp").controller("PlatformsController",a),a.$inject=["$routeParams","$window"]}(),function(){"use strict";function a(a,b){function c(a){b.location.href="#!/boards/"+a}function d(){var b={arduino:{title:"Arduino",active:!1},microduino:{title:"Microduino",active:!1},raspduino:{title:"Raspduino",active:!1},timsp430:{title:"TI MSP430 LaunchPads",active:!1},titiva:{title:"TI Tiva C LaunchPads",active:!1}},c="arduino";return a.hasOwnProperty("vendorType")&&(c=a.vendorType),angular.forEach(b,function(a,d){b[d].active=d===c}),b}var e=this;e.changeVendor=c,e.vendors=d(),e.activeVendor="",angular.forEach(e.vendors,function(a,b){a.active&&(e.activeVendor=b)})}angular.module("siteApp").controller("BoardsController",a),a.$inject=["$routeParams","$window"]}(),function(){"use strict";function a(a,b){function c(){a.url("/lib/search?query="+encodeURIComponent(d.searchQuery))}var d=this;d.submitSearchForm=c,d.searchQuery="",d.stats=b,d.searchPath="#!/lib/search",d.searchInputPlaceholder="Search for library ..."}angular.module("siteApp").controller("LibMainController",a),a.$inject=["$location","libStats"]}(),function(){"use strict";function a(a,b,c,d){function e(){var a={description:[],keywords:[]};return angular.forEach(g.searchResult.items,function(c){a.description.push(c.name),a.keywords=a.keywords.concat(c.name.split("-")),angular.forEach(["frameworks","platforms"],function(d){angular.forEach(c[d],function(c){var e=b("nameToTitle")(c,g[d]);a.description.push(e),a.keywords=a.keywords.concat([c,e])})})}),angular.forEach(["description","keywords"],function(b){a[b]=a[b].filter(function(a,b,c){return c.indexOf(a)===b})}),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function f(){a.search({query:encodeURIComponent(g.searchQuery),page:g.searchResult.page})}var g=this,h=a.search();g.frameworks=c.getFrameworks(),g.platforms=c.getPlatforms(),g.searchQuery="",g.searchResult=d,g.meta=e(),g.submitSearchForm=f,g.pageChanged=f,g.searchPath="#!/lib/search",g.searchInputPlaceholder="Search for library ...",h.query&&h.query.length&&(g.searchQuery=decodeURIComponent(h.query))}angular.module("siteApp").controller("LibSearchController",a),a.$inject=["$location","$filter","dataService","searchResult"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){var a={title:i.lib.name,keywords:i.lib.keywords.slice(0),description:i.lib.description},b=[];angular.forEach(i.lib.authors,function(a){b.push(a.name)}),b.length&&(a.title+=" by "+b.join(", "));var d=[];return angular.forEach(["frameworks","platforms"],function(b){angular.forEach(i.lib[b],function(e){var f=c("nameToTitle")(e,i[b]);a.keywords.push(e),d.push(f)})}),d.length&&(a.keywords=a.keywords.concat(d),a.description+=" for "+d.join(", ")),a.keywords=a.keywords.join(", "),a}function g(){var a=[];return i.lib.examples.length?(angular.forEach(i.lib.examples,function(b){var c=b.split("/");a.push({url:b,name:c[c.length-1]})}),a):a}function h(){var b=d.getLibDlUrl(i.lib.id).$promise;b.then(function(b){a.location.href=b.url+"?filename="+[i.lib.name,i.lib.version.name,i.lib.id].join("_")})}var i=this;i.frameworks=d.getFrameworks(),i.platforms=d.getPlatforms(),i.lib=e,i.meta=f(),i.examples=g(),i.currentExample={},i.downloadLib=h,i.examples.length&&(i.currentExample=i.examples[0]);var j=b.search();j.example&&angular.forEach(i.examples,function(a){return a.name===j.example?void(i.currentExample=a):void 0})}angular.module("siteApp").controller("LibShowController",a),a.$inject=["$window","$location","$filter","dataService","libInfo"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){var a={description:[],keywords:[]};return angular.forEach(k.searchResult.items,function(b){a.description=a.description.concat([b.lib.name,b.name]),a.keywords=a.keywords.concat(b.name.split(/[\-\_\.]/))}),a.description=a.description.filter(j),a.keywords=a.keywords.filter(j),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function h(){a.search({query:encodeURIComponent(k.searchQuery),page:k.searchResult.page})}function i(a){var e,f,g=20;a.showFullCode=!1,a.shortCode="Loading...",e=c.get(a.url),e||(f=d.defer(),b.get(a.url,{cache:c,transformResponse:function(a){return a}}).success(function(a){f.resolve(a)}).error(function(a){console.log(a),f.resolve("Can't load an example code")}),e=f.promise),d.when(e).then(function(b){angular.isArray(b)?b=b[1]:angular.isObject(b)&&(b=b.data),b=b.replace(/(?:\s*\/\*[\s\S]+?\*\/\s*|\s*\/\/[\s\S]+?$\s)/m,""),a.shortCode=b.split("\n",g).splice(0,g).join("\n")})}function j(a,b,c){return c.indexOf(a)===b}var k=this,l=a.search();k.frameworks=e.getFrameworks(),k.platforms=e.getPlatforms(),k.searchQuery="",k.searchResult=f,k.meta=g(),k.submitSearchForm=h,k.pageChanged=h,k.searchPath="#!/lib/examples",k.searchInputPlaceholder="Search for example ...",l.query&&l.query.length&&(k.searchQuery=decodeURIComponent(l.query)),angular.forEach(k.searchResult.items,function(a){i(a)})}angular.module("siteApp").controller("LibExamplesController",a),a.$inject=["$location","$http","$templateCache","$q","dataService","searchResult"]}();