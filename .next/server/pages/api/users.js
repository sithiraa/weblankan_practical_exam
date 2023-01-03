"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users";
exports.ids = ["pages/api/users"];
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

/***/ "./pages/api/users/index.js":
/*!**********************************!*\
  !*** ./pages/api/users/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var helpers_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! helpers/api */ "./helpers/api/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.apiHandler)({
  get: getUsers
}));

function getUsers(req, res) {
  // return users without hashed passwords in the response
  const response = helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.getAll().map(x => (0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.omit)(x, 'hash'));
  return res.status(200).json(response);
}

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qi9ELEdBQWxCLEVBQXVCQyxHQUF2QixFQUE0QjtBQUN4QjtBQUNBLFFBQU0rRCxRQUFRLEdBQUcvQix5REFBQSxHQUFtQmUsR0FBbkIsQ0FBdUJWLENBQUMsSUFBSVosaURBQUksQ0FBQ1ksQ0FBRCxFQUFJLE1BQUosQ0FBaEMsQ0FBakI7QUFDQSxTQUFPckMsR0FBRyxDQUFDRyxNQUFKLENBQVcsR0FBWCxFQUFnQk0sSUFBaEIsQ0FBcUJzRCxRQUFyQixDQUFQO0FBQ0g7Ozs7Ozs7Ozs7QUNWRDs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9hcGktaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvZXJyb3ItaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2p3dC1taWRkbGV3YXJlLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9vbWl0LmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS91c2Vycy1yZXBvLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9wYWdlcy9hcGkvdXNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcImV4cHJlc3Mtand0XCIiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcIm5leHQvY29uZmlnXCIiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS9leHRlcm5hbCBcInV0aWxcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcnJvckhhbmRsZXIsIGp3dE1pZGRsZXdhcmUgfSBmcm9tICdoZWxwZXJzL2FwaSc7XHJcblxyXG5leHBvcnQgeyBhcGlIYW5kbGVyIH07XHJcblxyXG5mdW5jdGlvbiBhcGlIYW5kbGVyKGhhbmRsZXIpIHtcclxuICAgIHJldHVybiBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGhhbmRsZXIgc3VwcG9ydHMgSFRUUCBtZXRob2RcclxuICAgICAgICBpZiAoIWhhbmRsZXJbbWV0aG9kXSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoYE1ldGhvZCAke3JlcS5tZXRob2R9IE5vdCBBbGxvd2VkYCk7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGdsb2JhbCBtaWRkbGV3YXJlXHJcbiAgICAgICAgICAgIGF3YWl0IGp3dE1pZGRsZXdhcmUocmVxLCByZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gcm91dGUgaGFuZGxlclxyXG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVyW21ldGhvZF0ocmVxLCByZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAvLyBnbG9iYWwgZXJyb3IgaGFuZGxlclxyXG4gICAgICAgICAgICBlcnJvckhhbmRsZXIoZXJyLCByZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCB7IGVycm9ySGFuZGxlciB9O1xyXG5cclxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGVyciwgcmVzKSB7XHJcbiAgICBpZiAodHlwZW9mIChlcnIpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIC8vIGN1c3RvbSBhcHBsaWNhdGlvbiBlcnJvclxyXG4gICAgICAgIGNvbnN0IGlzNDA0ID0gZXJyLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoJ25vdCBmb3VuZCcpO1xyXG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBpczQwNCA/IDQwNCA6IDQwMDtcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyhzdGF0dXNDb2RlKS5qc29uKHsgbWVzc2FnZTogZXJyIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlcnIubmFtZSA9PT0gJ1VuYXV0aG9yaXplZEVycm9yJykge1xyXG4gICAgICAgIC8vIGp3dCBhdXRoZW50aWNhdGlvbiBlcnJvclxyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICdJbnZhbGlkIFRva2VuJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWZhdWx0IHRvIDUwMCBzZXJ2ZXIgZXJyb3JcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVyci5tZXNzYWdlIH0pO1xyXG59IiwiZXhwb3J0ICogZnJvbSAnLi9hcGktaGFuZGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZXJyb3ItaGFuZGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vand0LW1pZGRsZXdhcmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL29taXQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3VzZXJzLXJlcG8nO1xyXG4iLCJjb25zdCBleHByZXNzSnd0ID0gcmVxdWlyZSgnZXhwcmVzcy1qd3QnKTtcclxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcclxuaW1wb3J0IGdldENvbmZpZyBmcm9tICduZXh0L2NvbmZpZyc7XHJcblxyXG5jb25zdCB7IHNlcnZlclJ1bnRpbWVDb25maWcgfSA9IGdldENvbmZpZygpO1xyXG5cclxuZXhwb3J0IHsgand0TWlkZGxld2FyZSB9O1xyXG5cclxuZnVuY3Rpb24gand0TWlkZGxld2FyZShyZXEsIHJlcykge1xyXG4gICAgY29uc3QgbWlkZGxld2FyZSA9IGV4cHJlc3NKd3QoeyBzZWNyZXQ6IHNlcnZlclJ1bnRpbWVDb25maWcuc2VjcmV0LCBhbGdvcml0aG1zOiBbJ0hTMjU2J10gfSkudW5sZXNzKHtcclxuICAgICAgICBwYXRoOiBbXHJcbiAgICAgICAgICAgIC8vIHB1YmxpYyByb3V0ZXMgdGhhdCBkb24ndCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgICAgICAgICcvYXBpL3VzZXJzL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgJy9hcGkvdXNlcnMvYXV0aGVudGljYXRlJ1xyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB1dGlsLnByb21pc2lmeShtaWRkbGV3YXJlKShyZXEsIHJlcyk7XHJcbn0iLCJleHBvcnQgeyBvbWl0IH07XHJcblxyXG5mdW5jdGlvbiBvbWl0KG9iaiwga2V5KSB7XHJcbiAgICBjb25zdCB7IFtrZXldOiBvbWl0dGVkLCAuLi5yZXN0IH0gPSBvYmo7XHJcbiAgICByZXR1cm4gcmVzdDtcclxufSIsImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbi8vIHVzZXJzIGluIEpTT04gZmlsZSBmb3Igc2ltcGxpY2l0eSwgc3RvcmUgaW4gYSBkYiBmb3IgcHJvZHVjdGlvbiBhcHBsaWNhdGlvbnNcclxubGV0IHVzZXJzID0gcmVxdWlyZSgnZGF0YS91c2Vycy5qc29uJyk7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlcnNSZXBvID0ge1xyXG4gICAgZ2V0QWxsOiAoKSA9PiB1c2VycyxcclxuICAgIGdldEJ5SWQ6IGlkID0+IHVzZXJzLmZpbmQoeCA9PiB4LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCkpLFxyXG4gICAgZmluZDogeCA9PiB1c2Vycy5maW5kKHgpLFxyXG4gICAgY3JlYXRlLFxyXG4gICAgdXBkYXRlLFxyXG4gICAgZGVsZXRlOiBfZGVsZXRlXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGUodXNlcikge1xyXG4gICAgLy8gZ2VuZXJhdGUgbmV3IHVzZXIgaWRcclxuICAgIHVzZXIuaWQgPSB1c2Vycy5sZW5ndGggPyBNYXRoLm1heCguLi51c2Vycy5tYXAoeCA9PiB4LmlkKSkgKyAxIDogMTtcclxuXHJcbiAgICAvLyBzZXQgZGF0ZSBjcmVhdGVkIGFuZCB1cGRhdGVkXHJcbiAgICB1c2VyLmRhdGVDcmVhdGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgdXNlci5kYXRlVXBkYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgICAvLyBhZGQgYW5kIHNhdmUgdXNlclxyXG4gICAgdXNlcnMucHVzaCh1c2VyKTtcclxuICAgIHNhdmVEYXRhKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZShpZCwgcGFyYW1zKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdXNlcnMuZmluZCh4ID0+IHguaWQudG9TdHJpbmcoKSA9PT0gaWQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgLy8gc2V0IGRhdGUgdXBkYXRlZFxyXG4gICAgdXNlci5kYXRlVXBkYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgYW5kIHNhdmVcclxuICAgIE9iamVjdC5hc3NpZ24odXNlciwgcGFyYW1zKTtcclxuICAgIHNhdmVEYXRhKCk7XHJcbn1cclxuXHJcbi8vIHByZWZpeGVkIHdpdGggdW5kZXJzY29yZSAnXycgYmVjYXVzZSAnZGVsZXRlJyBpcyBhIHJlc2VydmVkIHdvcmQgaW4gamF2YXNjcmlwdFxyXG5mdW5jdGlvbiBfZGVsZXRlKGlkKSB7XHJcbiAgICAvLyBmaWx0ZXIgb3V0IGRlbGV0ZWQgdXNlciBhbmQgc2F2ZVxyXG4gICAgdXNlcnMgPSB1c2Vycy5maWx0ZXIoeCA9PiB4LmlkLnRvU3RyaW5nKCkgIT09IGlkLnRvU3RyaW5nKCkpO1xyXG4gICAgc2F2ZURhdGEoKTtcclxuICAgIFxyXG59XHJcblxyXG4vLyBwcml2YXRlIGhlbHBlciBmdW5jdGlvbnNcclxuXHJcbmZ1bmN0aW9uIHNhdmVEYXRhKCkge1xyXG4gICAgZnMud3JpdGVGaWxlU3luYygnZGF0YS91c2Vycy5qc29uJywgSlNPTi5zdHJpbmdpZnkodXNlcnMsIG51bGwsIDQpKTtcclxufSIsImltcG9ydCB7IGFwaUhhbmRsZXIsIHVzZXJzUmVwbywgb21pdCB9IGZyb20gJ2hlbHBlcnMvYXBpJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaUhhbmRsZXIoe1xyXG4gICAgZ2V0OiBnZXRVc2Vyc1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldFVzZXJzKHJlcSwgcmVzKSB7XHJcbiAgICAvLyByZXR1cm4gdXNlcnMgd2l0aG91dCBoYXNoZWQgcGFzc3dvcmRzIGluIHRoZSByZXNwb25zZVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB1c2Vyc1JlcG8uZ2V0QWxsKCkubWFwKHggPT4gb21pdCh4LCAnaGFzaCcpKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwb25zZSk7XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9jb25maWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwibmFtZXMiOlsiZXJyb3JIYW5kbGVyIiwiand0TWlkZGxld2FyZSIsImFwaUhhbmRsZXIiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwidG9Mb3dlckNhc2UiLCJzdGF0dXMiLCJlbmQiLCJlcnIiLCJpczQwNCIsImVuZHNXaXRoIiwic3RhdHVzQ29kZSIsImpzb24iLCJtZXNzYWdlIiwibmFtZSIsImNvbnNvbGUiLCJlcnJvciIsImV4cHJlc3NKd3QiLCJyZXF1aXJlIiwidXRpbCIsImdldENvbmZpZyIsInNlcnZlclJ1bnRpbWVDb25maWciLCJtaWRkbGV3YXJlIiwic2VjcmV0IiwiYWxnb3JpdGhtcyIsInVubGVzcyIsInBhdGgiLCJwcm9taXNpZnkiLCJvbWl0Iiwib2JqIiwia2V5Iiwib21pdHRlZCIsInJlc3QiLCJmcyIsInVzZXJzIiwidXNlcnNSZXBvIiwiZ2V0QWxsIiwiZ2V0QnlJZCIsImlkIiwiZmluZCIsIngiLCJ0b1N0cmluZyIsImNyZWF0ZSIsInVwZGF0ZSIsImRlbGV0ZSIsIl9kZWxldGUiLCJ1c2VyIiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsIm1hcCIsImRhdGVDcmVhdGVkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiZGF0ZVVwZGF0ZWQiLCJwdXNoIiwic2F2ZURhdGEiLCJwYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJmaWx0ZXIiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImdldCIsImdldFVzZXJzIiwicmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9