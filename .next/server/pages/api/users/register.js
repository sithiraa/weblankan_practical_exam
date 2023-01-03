"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users/register";
exports.ids = ["pages/api/users/register"];
exports.modules = {

/***/ "./helpers/api/api-handler.js":
/*!************************************!*\
  !*** ./helpers/api/api-handler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiHandler": () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");



function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase(); // check handler supports HTTP method

    if (!handler[method]) return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // global middleware
      await (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.jwtMiddleware)(req, res); // route handler

      await handler[method](req, res);
    } catch (err) {
      // global error handler
      (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(err, res);
    }
  };
}

/***/ }),

/***/ "./helpers/api/error-handler.js":
/*!**************************************!*\
  !*** ./helpers/api/error-handler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errorHandler": () => (/* binding */ errorHandler)
/* harmony export */ });


function errorHandler(err, res) {
  if (typeof err === 'string') {
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({
      message: err
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Invalid Token'
    });
  } // default to 500 server error


  console.error(err);
  return res.status(500).json({
    message: err.message
  });
}

/***/ }),

/***/ "./helpers/api/index.js":
/*!******************************!*\
  !*** ./helpers/api/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-handler */ "./helpers/api/api-handler.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _api_handler__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _api_handler__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error-handler */ "./helpers/api/error-handler.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _error_handler__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _error_handler__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jwt-middleware */ "./helpers/api/jwt-middleware.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _jwt_middleware__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _omit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./omit */ "./helpers/api/omit.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _omit__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _omit__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _users_repo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users-repo */ "./helpers/api/users-repo.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _users_repo__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _users_repo__WEBPACK_IMPORTED_MODULE_4__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);






/***/ }),

/***/ "./helpers/api/jwt-middleware.js":
/*!***************************************!*\
  !*** ./helpers/api/jwt-middleware.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jwtMiddleware": () => (/* binding */ jwtMiddleware)
/* harmony export */ });
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_0__);
const expressJwt = __webpack_require__(/*! express-jwt */ "express-jwt");

const util = __webpack_require__(/*! util */ "util");


const {
  serverRuntimeConfig
} = next_config__WEBPACK_IMPORTED_MODULE_0___default()();


function jwtMiddleware(req, res) {
  const middleware = expressJwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ['HS256']
  }).unless({
    path: [// public routes that don't require authentication
    '/api/users/register', '/api/users/authenticate']
  });
  return util.promisify(middleware)(req, res);
}

/***/ }),

/***/ "./helpers/api/omit.js":
/*!*****************************!*\
  !*** ./helpers/api/omit.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "omit": () => (/* binding */ omit)
/* harmony export */ });
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



function omit(obj, key) {
  const {
    [key]: omitted
  } = obj,
        rest = _objectWithoutProperties(obj, [key].map(_toPropertyKey));

  return rest;
}

/***/ }),

/***/ "./helpers/api/users-repo.js":
/*!***********************************!*\
  !*** ./helpers/api/users-repo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "usersRepo": () => (/* binding */ usersRepo)
/* harmony export */ });
const fs = __webpack_require__(/*! fs */ "fs"); // users in JSON file for simplicity, store in a db for production applications


let users = __webpack_require__(/*! data/users.json */ "./data/users.json");

const usersRepo = {
  getAll: () => users,
  getById: id => users.find(x => x.id.toString() === id.toString()),
  find: x => users.find(x),
  create,
  update,
  delete: _delete
};

function create(user) {
  // generate new user id
  user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1; // set date created and updated

  user.dateCreated = new Date().toISOString();
  user.dateUpdated = new Date().toISOString(); // add and save user

  users.push(user);
  saveData();
}

function update(id, params) {
  const user = users.find(x => x.id.toString() === id.toString()); // set date updated

  user.dateUpdated = new Date().toISOString(); // update and save

  Object.assign(user, params);
  saveData();
} // prefixed with underscore '_' because 'delete' is a reserved word in javascript


function _delete(id) {
  // filter out deleted user and save
  users = users.filter(x => x.id.toString() !== id.toString());
  saveData();
} // private helper functions


function saveData() {
  fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}

/***/ }),

/***/ "./pages/api/users/register.js":
/*!*************************************!*\
  !*** ./pages/api/users/register.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.apiHandler)({
  post: register
}));

function register(req, res) {
  // split out password from user details 
  const _req$body = req.body,
        {
    password
  } = _req$body,
        user = _objectWithoutProperties(_req$body, ["password"]); // validate


  if (helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.find(x => x.username === user.username)) throw `User with the username "${user.username}" already exists`; // hash password

  user.hash = bcrypt.hashSync(password, 10);
  helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.create(user);
  return res.status(200).json({});
}

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "next/config":
/*!******************************!*\
  !*** external "next/config" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "./data/users.json":
/*!*************************!*\
  !*** ./data/users.json ***!
  \*************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"firstName":"Sithira","lastName":"Lokuge","username":"sithiraa","hash":"$2a$10$CBnxXTJmYD/0Zo./5cf7IOK4GQrLUZKWOwDAxn2rKMUOxI7CUnYm6","id":1,"dateCreated":"2023-01-03T10:57:55.084Z","dateUpdated":"2023-01-03T10:57:55.084Z"}]');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/register.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3RCaUUsRUFBQUEsSUFBSSxFQUFFQztBQURnQixDQUFELENBQXpCOztBQUlBLFNBQVNBLFFBQVQsQ0FBa0JoRSxHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEI7QUFDeEI7QUFDQSxvQkFBOEJELEdBQUcsQ0FBQ2lFLElBQWxDO0FBQUEsUUFBTTtBQUFFQyxJQUFBQTtBQUFGLEdBQU47QUFBQSxRQUFxQnRCLElBQXJCLHFEQUZ3QixDQUl4Qjs7O0FBQ0EsTUFBSVgsdURBQUEsQ0FBZUssQ0FBQyxJQUFJQSxDQUFDLENBQUM2QixRQUFGLEtBQWV2QixJQUFJLENBQUN1QixRQUF4QyxDQUFKLEVBQ0ksTUFBTywyQkFBMEJ2QixJQUFJLENBQUN1QixRQUFTLGtCQUEvQyxDQU5vQixDQVF4Qjs7QUFDQXZCLEVBQUFBLElBQUksQ0FBQ3dCLElBQUwsR0FBWU4sTUFBTSxDQUFDTyxRQUFQLENBQWdCSCxRQUFoQixFQUEwQixFQUExQixDQUFaO0FBRUFqQyxFQUFBQSx5REFBQSxDQUFpQlcsSUFBakI7QUFDQSxTQUFPM0MsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxFQUFnQk0sSUFBaEIsQ0FBcUIsRUFBckIsQ0FBUDtBQUNIOzs7Ozs7Ozs7O0FDckJEOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvYXBpLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2Vycm9yLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2luZGV4LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9qd3QtbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvb21pdC5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvdXNlcnMtcmVwby5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vcGFnZXMvYXBpL3VzZXJzL3JlZ2lzdGVyLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJiY3J5cHRqc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJleHByZXNzLWp3dFwiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJuZXh0L2NvbmZpZ1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJ1dGlsXCIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JIYW5kbGVyLCBqd3RNaWRkbGV3YXJlIH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IHsgYXBpSGFuZGxlciB9O1xyXG5cclxuZnVuY3Rpb24gYXBpSGFuZGxlcihoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBoYW5kbGVyIHN1cHBvcnRzIEhUVFAgbWV0aG9kXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyW21ldGhvZF0pXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuZW5kKGBNZXRob2QgJHtyZXEubWV0aG9kfSBOb3QgQWxsb3dlZGApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBnbG9iYWwgbWlkZGxld2FyZVxyXG4gICAgICAgICAgICBhd2FpdCBqd3RNaWRkbGV3YXJlKHJlcSwgcmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJvdXRlIGhhbmRsZXJcclxuICAgICAgICAgICAgYXdhaXQgaGFuZGxlclttZXRob2RdKHJlcSwgcmVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgLy8gZ2xvYmFsIGVycm9yIGhhbmRsZXJcclxuICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGVyciwgcmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgeyBlcnJvckhhbmRsZXIgfTtcclxuXHJcbmZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnIsIHJlcykge1xyXG4gICAgaWYgKHR5cGVvZiAoZXJyKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBjdXN0b20gYXBwbGljYXRpb24gZXJyb3JcclxuICAgICAgICBjb25zdCBpczQwNCA9IGVyci50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKCdub3QgZm91bmQnKTtcclxuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gaXM0MDQgPyA0MDQgOiA0MDA7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoc3RhdHVzQ29kZSkuanNvbih7IG1lc3NhZ2U6IGVyciB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyLm5hbWUgPT09ICdVbmF1dGhvcml6ZWRFcnJvcicpIHtcclxuICAgICAgICAvLyBqd3QgYXV0aGVudGljYXRpb24gZXJyb3JcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAnSW52YWxpZCBUb2tlbicgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmYXVsdCB0byA1MDAgc2VydmVyIGVycm9yXHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcclxufSIsImV4cG9ydCAqIGZyb20gJy4vYXBpLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2p3dC1taWRkbGV3YXJlJztcclxuZXhwb3J0ICogZnJvbSAnLi9vbWl0JztcclxuZXhwb3J0ICogZnJvbSAnLi91c2Vycy1yZXBvJztcclxuIiwiY29uc3QgZXhwcmVzc0p3dCA9IHJlcXVpcmUoJ2V4cHJlc3Mtand0Jyk7XHJcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XHJcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnbmV4dC9jb25maWcnO1xyXG5cclxuY29uc3QgeyBzZXJ2ZXJSdW50aW1lQ29uZmlnIH0gPSBnZXRDb25maWcoKTtcclxuXHJcbmV4cG9ydCB7IGp3dE1pZGRsZXdhcmUgfTtcclxuXHJcbmZ1bmN0aW9uIGp3dE1pZGRsZXdhcmUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IG1pZGRsZXdhcmUgPSBleHByZXNzSnd0KHsgc2VjcmV0OiBzZXJ2ZXJSdW50aW1lQ29uZmlnLnNlY3JldCwgYWxnb3JpdGhtczogWydIUzI1NiddIH0pLnVubGVzcyh7XHJcbiAgICAgICAgcGF0aDogW1xyXG4gICAgICAgICAgICAvLyBwdWJsaWMgcm91dGVzIHRoYXQgZG9uJ3QgcmVxdWlyZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgICAgICAnL2FwaS91c2Vycy9yZWdpc3RlcicsXHJcbiAgICAgICAgICAgICcvYXBpL3VzZXJzL2F1dGhlbnRpY2F0ZSdcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdXRpbC5wcm9taXNpZnkobWlkZGxld2FyZSkocmVxLCByZXMpO1xyXG59IiwiZXhwb3J0IHsgb21pdCB9O1xyXG5cclxuZnVuY3Rpb24gb21pdChvYmosIGtleSkge1xyXG4gICAgY29uc3QgeyBba2V5XTogb21pdHRlZCwgLi4ucmVzdCB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIHJlc3Q7XHJcbn0iLCJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG4vLyB1c2VycyBpbiBKU09OIGZpbGUgZm9yIHNpbXBsaWNpdHksIHN0b3JlIGluIGEgZGIgZm9yIHByb2R1Y3Rpb24gYXBwbGljYXRpb25zXHJcbmxldCB1c2VycyA9IHJlcXVpcmUoJ2RhdGEvdXNlcnMuanNvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJzUmVwbyA9IHtcclxuICAgIGdldEFsbDogKCkgPT4gdXNlcnMsXHJcbiAgICBnZXRCeUlkOiBpZCA9PiB1c2Vycy5maW5kKHggPT4geC5pZC50b1N0cmluZygpID09PSBpZC50b1N0cmluZygpKSxcclxuICAgIGZpbmQ6IHggPT4gdXNlcnMuZmluZCh4KSxcclxuICAgIGNyZWF0ZSxcclxuICAgIHVwZGF0ZSxcclxuICAgIGRlbGV0ZTogX2RlbGV0ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHVzZXIpIHtcclxuICAgIC8vIGdlbmVyYXRlIG5ldyB1c2VyIGlkXHJcbiAgICB1c2VyLmlkID0gdXNlcnMubGVuZ3RoID8gTWF0aC5tYXgoLi4udXNlcnMubWFwKHggPT4geC5pZCkpICsgMSA6IDE7XHJcblxyXG4gICAgLy8gc2V0IGRhdGUgY3JlYXRlZCBhbmQgdXBkYXRlZFxyXG4gICAgdXNlci5kYXRlQ3JlYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gYWRkIGFuZCBzYXZlIHVzZXJcclxuICAgIHVzZXJzLnB1c2godXNlcik7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoaWQsIHBhcmFtcykge1xyXG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoeCA9PiB4LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIHNldCBkYXRlIHVwZGF0ZWRcclxuICAgIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGFuZCBzYXZlXHJcbiAgICBPYmplY3QuYXNzaWduKHVzZXIsIHBhcmFtcyk7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBwcmVmaXhlZCB3aXRoIHVuZGVyc2NvcmUgJ18nIGJlY2F1c2UgJ2RlbGV0ZScgaXMgYSByZXNlcnZlZCB3b3JkIGluIGphdmFzY3JpcHRcclxuZnVuY3Rpb24gX2RlbGV0ZShpZCkge1xyXG4gICAgLy8gZmlsdGVyIG91dCBkZWxldGVkIHVzZXIgYW5kIHNhdmVcclxuICAgIHVzZXJzID0gdXNlcnMuZmlsdGVyKHggPT4geC5pZC50b1N0cmluZygpICE9PSBpZC50b1N0cmluZygpKTtcclxuICAgIHNhdmVEYXRhKCk7XHJcbiAgICBcclxufVxyXG5cclxuLy8gcHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0YSgpIHtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoJ2RhdGEvdXNlcnMuanNvbicsIEpTT04uc3RyaW5naWZ5KHVzZXJzLCBudWxsLCA0KSk7XHJcbn0iLCJjb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHRqcycpO1xyXG5cclxuaW1wb3J0IHsgYXBpSGFuZGxlciwgdXNlcnNSZXBvIH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlcih7XHJcbiAgICBwb3N0OiByZWdpc3RlclxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyKHJlcSwgcmVzKSB7XHJcbiAgICAvLyBzcGxpdCBvdXQgcGFzc3dvcmQgZnJvbSB1c2VyIGRldGFpbHMgXHJcbiAgICBjb25zdCB7IHBhc3N3b3JkLCAuLi51c2VyIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAvLyB2YWxpZGF0ZVxyXG4gICAgaWYgKHVzZXJzUmVwby5maW5kKHggPT4geC51c2VybmFtZSA9PT0gdXNlci51c2VybmFtZSkpXHJcbiAgICAgICAgdGhyb3cgYFVzZXIgd2l0aCB0aGUgdXNlcm5hbWUgXCIke3VzZXIudXNlcm5hbWV9XCIgYWxyZWFkeSBleGlzdHNgO1xyXG5cclxuICAgIC8vIGhhc2ggcGFzc3dvcmRcclxuICAgIHVzZXIuaGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCwgMTApOyAgICBcclxuXHJcbiAgICB1c2Vyc1JlcG8uY3JlYXRlKHVzZXIpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyJdLCJuYW1lcyI6WyJlcnJvckhhbmRsZXIiLCJqd3RNaWRkbGV3YXJlIiwiYXBpSGFuZGxlciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInN0YXR1cyIsImVuZCIsImVyciIsImlzNDA0IiwiZW5kc1dpdGgiLCJzdGF0dXNDb2RlIiwianNvbiIsIm1lc3NhZ2UiLCJuYW1lIiwiY29uc29sZSIsImVycm9yIiwiZXhwcmVzc0p3dCIsInJlcXVpcmUiLCJ1dGlsIiwiZ2V0Q29uZmlnIiwic2VydmVyUnVudGltZUNvbmZpZyIsIm1pZGRsZXdhcmUiLCJzZWNyZXQiLCJhbGdvcml0aG1zIiwidW5sZXNzIiwicGF0aCIsInByb21pc2lmeSIsIm9taXQiLCJvYmoiLCJrZXkiLCJvbWl0dGVkIiwicmVzdCIsImZzIiwidXNlcnMiLCJ1c2Vyc1JlcG8iLCJnZXRBbGwiLCJnZXRCeUlkIiwiaWQiLCJmaW5kIiwieCIsInRvU3RyaW5nIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIiwiX2RlbGV0ZSIsInVzZXIiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwibWFwIiwiZGF0ZUNyZWF0ZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJkYXRlVXBkYXRlZCIsInB1c2giLCJzYXZlRGF0YSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImZpbHRlciIsIndyaXRlRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwiYmNyeXB0IiwicG9zdCIsInJlZ2lzdGVyIiwiYm9keSIsInBhc3N3b3JkIiwidXNlcm5hbWUiLCJoYXNoIiwiaGFzaFN5bmMiXSwic291cmNlUm9vdCI6IiJ9