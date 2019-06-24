/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global__ = __webpack_require__(1);


//加载group的css
let webUrls = {
    changeGroup:[['../css/common_new.css',
        '../css/basic_new.css','../css/common.css',
        '../css/index.css','../css/_header_footer.css'],
        ['../js/jquery-1.7.1.min.js','../js/jquery.cookie.js',
            '../js/jquery.form.js','../js/changeGroup.js']],

    createGroup:[['../../css/common_new.css','../../css/basic_new.css','../../css/common.css',
            '../../css/index.css','../../css/_header_footer.css'],
            ['../../js/axios.js','../../js/creategroup.js']],

     group:[['../../css/dialog.css','../../css/common_new.css','../../css/basic_new.css','../../css/index.css','../../css/_header_footer.css','../../css/group.css'],
         []],

    postsList:[['../css/common_new.css','../css/basic_new.css','../css/style.css','../css/style_new.css',
    '../css/_header_footer.css','../css/iconfont.css'],
        ['../js/jquery-1.7.1.min.js','../js/jquery.cookie.js','../js/groupPosts.js']],
    thisPost:[['../../css/common_new.css','../../css/basic_new.css','../../css/style.css','' +
    '../../css/style_new.css',
    '../../css/wenda.css','../../css/_header_footer.css','/css/font-awesome.css','../../css/iconfont.css'],
        ['../../js/topic.js']],
    changeMyInfo:[['../css/rest.css','../css/iconfont.css','../css/common1.css','../css/index1.css',
    '../css/style1.css','../css/box.css','../css/layer.css','../css/setinfo.css'],
        ['../js/jquery-1.7.1.min.js','../js/jquery.form.js','../js/changeMyInfo.js']],
    myAttentions:[["../../css/common_new.css",
        "../../css/basic_new.css",
        "../../css/index.css",
        "../../css/style_add.css",
        "../../css/style_new.css",
        "../../css/_header_footer.css",
        "../../css/iconfont.css",'../../css/wenda.css'],
        []],
    myMsg:[["../../css/common_new.css",
        "../../css/rest.css",
        "../../css/iconfont.css",
        "../../css/common.css",
        "../../css/index.css",
        "../../css/style.css",
        "../../css/box.css",
           "../../css/layer.css" ,
        "../../css/inde(2).css",
        "../../css/indexxx.css"],
        []],
    addquestion:[["../../css/common_new.css",
        "../../css/basic_new.css",
        "../../css/wenda.css",
        "../../css/_header_footer.css",
        "../../css/iconfont.css"],[]],
    createQuestion:[["../../css/common_new.css",
        "../../css/basic_new.css",
        "../../css/wenda.css",
        "../../css/_header_footer.css",
        "../../css/iconfont.css"],["../js/jquery-1.7.1.min.js",
        "../js/jquery.form.js"]],
    getanswer:[[
        "../../css/rest.css",
        "../../css/iconfont.css",
        "../../css/common1.css",
        "../../css/index1.css",
        "../../css/style1.css",
        "../../css/box.css","../../css/detail.css"],
        []],
    questionsList:[["../../css/rest.css",
        "../../css/iconfont.css",
        "../../css/common.css",
        "../../css/index.css",
        "../../css/style.css",
        "../../css/box.css","../../css/wenda1.css"],
        []],
    userAnswers:[["../css/common_new.css",
        "../css/basic_new.css",
        "../css/index1.css",
        "../css/style_add.css",
        "../css/style_new.css",
        "../css/_header_footer.css",
        "../css/wenda.css",
        "../css/iconfont.css"],[
        "../js/jquery-1.7.1.min.js",
        "../js/axios.js",
        "../js/vue.js","../js/jquery.cookie.js",
        "../js/user.js","../js/changeMyInfo.js",]],
    login:[[
        "http://vue.projectsedu.com:8009/static/css/common_new.css",
        "http://vue.projectsedu.com:8009/static/css/basic_new.css",
        "http://vue.projectsedu.com:8009/static/css/logincss.css",
        "http://vue.projectsedu.com:8009/static/css/_header_footer.css",
        "http://vue.projectsedu.com:8009/static/css/iconfont.css"],
        ["js/login.js"]],
    register:[["./css/common_new.css",
        "./css/basic_new.css",
        "./css/common.css",
        "./css/_header_footer.css",
        "./css/iconfont.css"],[
        "./js/register.js"]],
    postList:[["../../css/common_new.css",
        "../../css/basic_new.css",
        "../../css/style.css",
        "../../css/style_new.css",
        "../../css/_header_footer.css",
        "../../css/iconfont.css"],[]]
};
let name = document.querySelector('#webname');
let zhiling = name.getAttribute('title');

let linkurls = webUrls[zhiling][0];
let scripturls = webUrls[zhiling][1];
for(let i = 0; i < linkurls.length; i++){
    let header = document.querySelector('head');
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = linkurls[i]+'?uid='+ __WEBPACK_IMPORTED_MODULE_0__global__["default"];

  for(let i in __WEBPACK_IMPORTED_MODULE_0__global__){
      console.log(i)
  }
    header.appendChild(link)
}
//加载group的js
for(let i = 0; i < scripturls.length; i++){
    let body = document.querySelector('body');
    let script = document.createElement('script');
    script.src = scripturls[i] +'?uid='+ __WEBPACK_IMPORTED_MODULE_0__global__["default"];
    script.async = false;
    body.appendChild(script)
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export global */
let global = 'thisismycode';


/***/ })
/******/ ]);