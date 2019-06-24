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
    changeGroup:[
        '/css/common_new.css',
        '/css/basic_new.css',
        '/css/common.css',
        '/css/index.css',
        '/css/_header_footer.css'],

    createGroup:[
        '/css/common_new.css',
        '/css/basic_new.css',
        '/css/common.css',
        '/css/index.css',
        '/css/_header_footer.css'],


    group:[
        '/css/dialog.css',
        '/css/common_new.css',
        '/css/basic_new.css',
        '/css/index.css',
        '/css/_header_footer.css',
        '/css/group.css'],


    postsList:[
        '/css/common_new.css',
        '/css/basic_new.css',
        '/css/style.css',
        '/css/style_new.css',
        '/css/_header_footer.css',
        '/css/iconfont.css'],
    thisPost:['../../css/common_new.css','../../css/basic_new.css','../../css/style.css','' +
    '../../css/style_new.css',
        '../../css/wenda.css','../../css/_header_footer.css',
        '../../css/iconfont.css'],

    changeMyInfo:[
        '/css/rest.css',
        '/css/iconfont.css',
        '/css/common1.css',
        '/css/index1.css',
        '/css/style1.css',
        '/css/box.css',
        '/css/layer.css',
        '/css/setinfo.css'],
    myAttentions:[
        "/css/common_new.css",
        "/css/basic_new.css",
        "/css/index.css",
        "/css/style_add.css",
        "/css/style_new.css",
        "/css/_header_footer.css",
        "/css/iconfont.css",
        '/css/wenda.css'],
    myMsg:["/css/common_new.css",
        "/css/rest.css",
        "/css/iconfont.css",
        "/css/common.css",
        "/css/index.css",
        "/css/style.css",
        "/css/box.css",
        "/css/layer.css" ,
        "/css/index(2).css",
        "/css/indexxx.css"],

    addquestion:["/css/common_new.css",
        "/css/basic_new.css",
        "/css/wenda.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],
    createQuestion:["/css/common_new.css",
        "/css/basic_new.css",
        "/css/wenda.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],
    getanswer:[
        "/css/rest.css",
        "/css/iconfont.css",
        "/css/common1.css",
        "/css/index1.css",
        "/css/style1.css",
        "/css/box.css",
        "/css/detail.css"],

    createTopic1:[
        "/css/common_new.css",
        "/css/basic_new.css",
        "/css/style_add.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],

    questionsList:["../../css/rest.css",
        "/css/iconfont.css",
        "/css/common.css",
        "/css/index.css",
        "/css/style.css",
        "/css/box.css","../../css/wenda1.css"],

    userAnswers:["../css/common_new.css",
        "/css/basic_new.css",
        "/css/index1.css",
        "/css/style_add.css",
        "/css/style_new.css",
        "/css/_header_footer.css",
        "/css/wenda.css",
        "/css/iconfont.css"],
    login:[
        "/css/common_new.css",
        "/css/basic_new.css",
        "/css/logincss.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],
    register:["/css/common_new.css",
        "/css/basic_new.css",
        "/css/common.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],
    postList:["../../css/common_new.css",
        "/css/basic_new.css",
        "/css/style.css",
        "/css/style_new.css",
        "/css/_header_footer.css",
        "/css/iconfont.css"],
};
let name = document.querySelector('#webname');
let zhiling = name.getAttribute('title');
let baseUrl = "http://vue.projectsedu.com:8009/static";
let linkurls = webUrls[zhiling];
let scripturls = webUrls[zhiling][1];

for(let i = 0; i < linkurls.length; i++){
    let header = document.querySelector('head');
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =baseUrl + linkurls[i]+'?uid='+ __WEBPACK_IMPORTED_MODULE_0__global__["a" /* default */]['global'];
    header.appendChild(link)
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let global = '6094538';
// let global = '136791';
/* harmony default export */ __webpack_exports__["a"] = ({global});

/***/ })
/******/ ]);