"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users/authenticate";
exports.ids = ["pages/api/users/authenticate"];
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

/***/ "./pages/api/users/authenticate.js":
/*!*****************************************!*\
  !*** ./pages/api/users/authenticate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");



const {
  serverRuntimeConfig
} = next_config__WEBPACK_IMPORTED_MODULE_0___default()();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_1__.apiHandler)({
  post: authenticate
}));

function authenticate(req, res) {
  const {
    username,
    password
  } = req.body;
  const user = helpers_api__WEBPACK_IMPORTED_MODULE_1__.usersRepo.find(u => u.username === username); // validate

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw 'Username or password is incorrect';
  } // create a jwt token that is valid for 7 days


  const token = jwt.sign({
    sub: user.id
  }, serverRuntimeConfig.secret, {
    expiresIn: '7d'
  }); // return basic user details and token

  return res.status(200).json({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    token
  });
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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

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

module.exports = JSON.parse('[{"firstName":"Sithira","lastName":"Lokuge","username":"interviewer@tsg.com","hash":"$2a$10$viE6a2xhangtgKXdyMnPQeTKfkaePnM.KOSQLwtSI7wYkGQha8I5y","id":1,"dateCreated":"2023-01-03T06:59:49.486Z","dateUpdated":"2023-01-03T06:59:49.487Z"}]');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/authenticate.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7QUFMd0IsR0FBckIsQ0FBUDtBQU9IOzs7Ozs7Ozs7O0FDaENEOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9hcGktaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvZXJyb3ItaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2p3dC1taWRkbGV3YXJlLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9vbWl0LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS91c2Vycy1yZXBvLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9wYWdlcy9hcGkvdXNlcnMvYXV0aGVudGljYXRlLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJiY3J5cHRqc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJleHByZXNzLWp3dFwiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwibmV4dC9jb25maWdcIiIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlL2V4dGVybmFsIFwidXRpbFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVycm9ySGFuZGxlciwgand0TWlkZGxld2FyZSB9IGZyb20gJ2hlbHBlcnMvYXBpJztcclxuXHJcbmV4cG9ydCB7IGFwaUhhbmRsZXIgfTtcclxuXHJcbmZ1bmN0aW9uIGFwaUhhbmRsZXIoaGFuZGxlcikge1xyXG4gICAgcmV0dXJuIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaGFuZGxlciBzdXBwb3J0cyBIVFRQIG1ldGhvZFxyXG4gICAgICAgIGlmICghaGFuZGxlclttZXRob2RdKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmVuZChgTWV0aG9kICR7cmVxLm1ldGhvZH0gTm90IEFsbG93ZWRgKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gZ2xvYmFsIG1pZGRsZXdhcmVcclxuICAgICAgICAgICAgYXdhaXQgand0TWlkZGxld2FyZShyZXEsIHJlcyk7XHJcblxyXG4gICAgICAgICAgICAvLyByb3V0ZSBoYW5kbGVyXHJcbiAgICAgICAgICAgIGF3YWl0IGhhbmRsZXJbbWV0aG9kXShyZXEsIHJlcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIC8vIGdsb2JhbCBlcnJvciBoYW5kbGVyXHJcbiAgICAgICAgICAgIGVycm9ySGFuZGxlcihlcnIsIHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IHsgZXJyb3JIYW5kbGVyIH07XHJcblxyXG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZXJyLCByZXMpIHtcclxuICAgIGlmICh0eXBlb2YgKGVycikgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgLy8gY3VzdG9tIGFwcGxpY2F0aW9uIGVycm9yXHJcbiAgICAgICAgY29uc3QgaXM0MDQgPSBlcnIudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnbm90IGZvdW5kJyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IGlzNDA0ID8gNDA0IDogNDAwO1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKHN0YXR1c0NvZGUpLmpzb24oeyBtZXNzYWdlOiBlcnIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVyci5uYW1lID09PSAnVW5hdXRob3JpemVkRXJyb3InKSB7XHJcbiAgICAgICAgLy8gand0IGF1dGhlbnRpY2F0aW9uIGVycm9yXHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogJ0ludmFsaWQgVG9rZW4nIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlZmF1bHQgdG8gNTAwIHNlcnZlciBlcnJvclxyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfSk7XHJcbn0iLCJleHBvcnQgKiBmcm9tICcuL2FwaS1oYW5kbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9lcnJvci1oYW5kbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9qd3QtbWlkZGxld2FyZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb21pdCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXNlcnMtcmVwbyc7XHJcbiIsImNvbnN0IGV4cHJlc3NKd3QgPSByZXF1aXJlKCdleHByZXNzLWp3dCcpO1xyXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xyXG5pbXBvcnQgZ2V0Q29uZmlnIGZyb20gJ25leHQvY29uZmlnJztcclxuXHJcbmNvbnN0IHsgc2VydmVyUnVudGltZUNvbmZpZyB9ID0gZ2V0Q29uZmlnKCk7XHJcblxyXG5leHBvcnQgeyBqd3RNaWRkbGV3YXJlIH07XHJcblxyXG5mdW5jdGlvbiBqd3RNaWRkbGV3YXJlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCBtaWRkbGV3YXJlID0gZXhwcmVzc0p3dCh7IHNlY3JldDogc2VydmVyUnVudGltZUNvbmZpZy5zZWNyZXQsIGFsZ29yaXRobXM6IFsnSFMyNTYnXSB9KS51bmxlc3Moe1xyXG4gICAgICAgIHBhdGg6IFtcclxuICAgICAgICAgICAgLy8gcHVibGljIHJvdXRlcyB0aGF0IGRvbid0IHJlcXVpcmUgYXV0aGVudGljYXRpb25cclxuICAgICAgICAgICAgJy9hcGkvdXNlcnMvcmVnaXN0ZXInLFxyXG4gICAgICAgICAgICAnL2FwaS91c2Vycy9hdXRoZW50aWNhdGUnXHJcbiAgICAgICAgXVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHV0aWwucHJvbWlzaWZ5KG1pZGRsZXdhcmUpKHJlcSwgcmVzKTtcclxufSIsImV4cG9ydCB7IG9taXQgfTtcclxuXHJcbmZ1bmN0aW9uIG9taXQob2JqLCBrZXkpIHtcclxuICAgIGNvbnN0IHsgW2tleV06IG9taXR0ZWQsIC4uLnJlc3QgfSA9IG9iajtcclxuICAgIHJldHVybiByZXN0O1xyXG59IiwiY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxuLy8gdXNlcnMgaW4gSlNPTiBmaWxlIGZvciBzaW1wbGljaXR5LCBzdG9yZSBpbiBhIGRiIGZvciBwcm9kdWN0aW9uIGFwcGxpY2F0aW9uc1xyXG5sZXQgdXNlcnMgPSByZXF1aXJlKCdkYXRhL3VzZXJzLmpzb24nKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2Vyc1JlcG8gPSB7XHJcbiAgICBnZXRBbGw6ICgpID0+IHVzZXJzLFxyXG4gICAgZ2V0QnlJZDogaWQgPT4gdXNlcnMuZmluZCh4ID0+IHguaWQudG9TdHJpbmcoKSA9PT0gaWQudG9TdHJpbmcoKSksXHJcbiAgICBmaW5kOiB4ID0+IHVzZXJzLmZpbmQoeCksXHJcbiAgICBjcmVhdGUsXHJcbiAgICB1cGRhdGUsXHJcbiAgICBkZWxldGU6IF9kZWxldGVcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZSh1c2VyKSB7XHJcbiAgICAvLyBnZW5lcmF0ZSBuZXcgdXNlciBpZFxyXG4gICAgdXNlci5pZCA9IHVzZXJzLmxlbmd0aCA/IE1hdGgubWF4KC4uLnVzZXJzLm1hcCh4ID0+IHguaWQpKSArIDEgOiAxO1xyXG5cclxuICAgIC8vIHNldCBkYXRlIGNyZWF0ZWQgYW5kIHVwZGF0ZWRcclxuICAgIHVzZXIuZGF0ZUNyZWF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICB1c2VyLmRhdGVVcGRhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgIC8vIGFkZCBhbmQgc2F2ZSB1c2VyXHJcbiAgICB1c2Vycy5wdXNoKHVzZXIpO1xyXG4gICAgc2F2ZURhdGEoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKGlkLCBwYXJhbXMpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKHggPT4geC5pZC50b1N0cmluZygpID09PSBpZC50b1N0cmluZygpKTtcclxuXHJcbiAgICAvLyBzZXQgZGF0ZSB1cGRhdGVkXHJcbiAgICB1c2VyLmRhdGVVcGRhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBhbmQgc2F2ZVxyXG4gICAgT2JqZWN0LmFzc2lnbih1c2VyLCBwYXJhbXMpO1xyXG4gICAgc2F2ZURhdGEoKTtcclxufVxyXG5cclxuLy8gcHJlZml4ZWQgd2l0aCB1bmRlcnNjb3JlICdfJyBiZWNhdXNlICdkZWxldGUnIGlzIGEgcmVzZXJ2ZWQgd29yZCBpbiBqYXZhc2NyaXB0XHJcbmZ1bmN0aW9uIF9kZWxldGUoaWQpIHtcclxuICAgIC8vIGZpbHRlciBvdXQgZGVsZXRlZCB1c2VyIGFuZCBzYXZlXHJcbiAgICB1c2VycyA9IHVzZXJzLmZpbHRlcih4ID0+IHguaWQudG9TdHJpbmcoKSAhPT0gaWQudG9TdHJpbmcoKSk7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG4gICAgXHJcbn1cclxuXHJcbi8vIHByaXZhdGUgaGVscGVyIGZ1bmN0aW9uc1xyXG5cclxuZnVuY3Rpb24gc2F2ZURhdGEoKSB7XHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKCdkYXRhL3VzZXJzLmpzb24nLCBKU09OLnN0cmluZ2lmeSh1c2VycywgbnVsbCwgNCkpO1xyXG59IiwiY29uc3Qgand0ID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XHJcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoJ2JjcnlwdGpzJyk7XHJcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnbmV4dC9jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgYXBpSGFuZGxlciwgdXNlcnNSZXBvIH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuY29uc3QgeyBzZXJ2ZXJSdW50aW1lQ29uZmlnIH0gPSBnZXRDb25maWcoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaUhhbmRsZXIoe1xyXG4gICAgcG9zdDogYXV0aGVudGljYXRlXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYXV0aGVudGljYXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCB1c2VyID0gdXNlcnNSZXBvLmZpbmQodSA9PiB1LnVzZXJuYW1lID09PSB1c2VybmFtZSk7XHJcblxyXG4gICAgLy8gdmFsaWRhdGVcclxuICAgIGlmICghKHVzZXIgJiYgYmNyeXB0LmNvbXBhcmVTeW5jKHBhc3N3b3JkLCB1c2VyLmhhc2gpKSkge1xyXG4gICAgICAgIHRocm93ICdVc2VybmFtZSBvciBwYXNzd29yZCBpcyBpbmNvcnJlY3QnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBhIGp3dCB0b2tlbiB0aGF0IGlzIHZhbGlkIGZvciA3IGRheXNcclxuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oeyBzdWI6IHVzZXIuaWQgfSwgc2VydmVyUnVudGltZUNvbmZpZy5zZWNyZXQsIHsgZXhwaXJlc0luOiAnN2QnIH0pO1xyXG5cclxuICAgIC8vIHJldHVybiBiYXNpYyB1c2VyIGRldGFpbHMgYW5kIHRva2VuXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxyXG4gICAgICAgIGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXHJcbiAgICAgICAgbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXHJcbiAgICAgICAgdG9rZW5cclxuICAgIH0pO1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3Mtand0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyJdLCJuYW1lcyI6WyJlcnJvckhhbmRsZXIiLCJqd3RNaWRkbGV3YXJlIiwiYXBpSGFuZGxlciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInN0YXR1cyIsImVuZCIsImVyciIsImlzNDA0IiwiZW5kc1dpdGgiLCJzdGF0dXNDb2RlIiwianNvbiIsIm1lc3NhZ2UiLCJuYW1lIiwiY29uc29sZSIsImVycm9yIiwiZXhwcmVzc0p3dCIsInJlcXVpcmUiLCJ1dGlsIiwiZ2V0Q29uZmlnIiwic2VydmVyUnVudGltZUNvbmZpZyIsIm1pZGRsZXdhcmUiLCJzZWNyZXQiLCJhbGdvcml0aG1zIiwidW5sZXNzIiwicGF0aCIsInByb21pc2lmeSIsIm9taXQiLCJvYmoiLCJrZXkiLCJvbWl0dGVkIiwicmVzdCIsImZzIiwidXNlcnMiLCJ1c2Vyc1JlcG8iLCJnZXRBbGwiLCJnZXRCeUlkIiwiaWQiLCJmaW5kIiwieCIsInRvU3RyaW5nIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIiwiX2RlbGV0ZSIsInVzZXIiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwibWFwIiwiZGF0ZUNyZWF0ZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJkYXRlVXBkYXRlZCIsInB1c2giLCJzYXZlRGF0YSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImZpbHRlciIsIndyaXRlRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5Iiwiand0IiwiYmNyeXB0IiwicG9zdCIsImF1dGhlbnRpY2F0ZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJib2R5IiwidSIsImNvbXBhcmVTeW5jIiwiaGFzaCIsInRva2VuIiwic2lnbiIsInN1YiIsImV4cGlyZXNJbiIsImZpcnN0TmFtZSIsImxhc3ROYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==