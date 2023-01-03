"use strict";
(() => {
var exports = {};
exports.id = "pages/api/users/[id]";
exports.ids = ["pages/api/users/[id]"];
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

/***/ "./pages/api/users/[id].js":
/*!*********************************!*\
  !*** ./pages/api/users/[id].js ***!
  \*********************************/
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
  get: getById,
  put: update,
  delete: _delete
}));

function getById(req, res) {
  const user = helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.getById(req.query.id);
  if (!user) throw 'User Not Found';
  return res.status(200).json((0,helpers_api__WEBPACK_IMPORTED_MODULE_0__.omit)(user, 'hash'));
}

function update(req, res) {
  const user = helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.getById(req.query.id);
  if (!user) throw 'User Not Found'; // split out password from user details 

  const _req$body = req.body,
        {
    password
  } = _req$body,
        params = _objectWithoutProperties(_req$body, ["password"]); // validate


  if (user.username !== params.username && helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.find(x => x.username === params.username)) throw `User with the username "${params.username}" already exists`; // only update hashed password if entered

  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }

  helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.update(req.query.id, params);
  return res.status(200).json({});
}

function _delete(req, res) {
  helpers_api__WEBPACK_IMPORTED_MODULE_0__.usersRepo.delete(req.query.id);
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
var __webpack_exports__ = (__webpack_exec__("./pages/api/users/[id].js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWhCLEVBQTBCLEVBQTFCLENBQVo7QUFDSDs7QUFFRGxDLEVBQUFBLHlEQUFBLENBQWlCakMsR0FBRyxDQUFDaUUsS0FBSixDQUFVN0IsRUFBM0IsRUFBK0JtQixNQUEvQjtBQUNBLFNBQU90RCxHQUFHLENBQUNHLE1BQUosQ0FBVyxHQUFYLEVBQWdCTSxJQUFoQixDQUFxQixFQUFyQixDQUFQO0FBQ0g7O0FBRUQsU0FBU2lDLE9BQVQsQ0FBaUIzQyxHQUFqQixFQUFzQkMsR0FBdEIsRUFBMkI7QUFDdkJnQyxFQUFBQSx5REFBQSxDQUFpQmpDLEdBQUcsQ0FBQ2lFLEtBQUosQ0FBVTdCLEVBQTNCO0FBQ0EsU0FBT25DLEdBQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JNLElBQWhCLENBQXFCLEVBQXJCLENBQVA7QUFDSDs7Ozs7Ozs7OztBQzNDRDs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL2FwaS1oYW5kbGVyLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9lcnJvci1oYW5kbGVyLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvLi9oZWxwZXJzL2FwaS9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZXh0LWpzLXJlZ2lzdHJhdGlvbi1sb2dpbi1leGFtcGxlLy4vaGVscGVycy9hcGkvand0LW1pZGRsZXdhcmUuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL29taXQuanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL2hlbHBlcnMvYXBpL3VzZXJzLXJlcG8uanMiLCJ3ZWJwYWNrOi8vbmV4dC1qcy1yZWdpc3RyYXRpb24tbG9naW4tZXhhbXBsZS8uL3BhZ2VzL2FwaS91c2Vycy9baWRdLmpzIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJiY3J5cHRqc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJleHByZXNzLWp3dFwiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJuZXh0L2NvbmZpZ1wiIiwid2VicGFjazovL25leHQtanMtcmVnaXN0cmF0aW9uLWxvZ2luLWV4YW1wbGUvZXh0ZXJuYWwgXCJ1dGlsXCIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXJyb3JIYW5kbGVyLCBqd3RNaWRkbGV3YXJlIH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IHsgYXBpSGFuZGxlciB9O1xyXG5cclxuZnVuY3Rpb24gYXBpSGFuZGxlcihoYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBoYW5kbGVyIHN1cHBvcnRzIEhUVFAgbWV0aG9kXHJcbiAgICAgICAgaWYgKCFoYW5kbGVyW21ldGhvZF0pXHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuZW5kKGBNZXRob2QgJHtyZXEubWV0aG9kfSBOb3QgQWxsb3dlZGApO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBnbG9iYWwgbWlkZGxld2FyZVxyXG4gICAgICAgICAgICBhd2FpdCBqd3RNaWRkbGV3YXJlKHJlcSwgcmVzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJvdXRlIGhhbmRsZXJcclxuICAgICAgICAgICAgYXdhaXQgaGFuZGxlclttZXRob2RdKHJlcSwgcmVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgLy8gZ2xvYmFsIGVycm9yIGhhbmRsZXJcclxuICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGVyciwgcmVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgeyBlcnJvckhhbmRsZXIgfTtcclxuXHJcbmZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnIsIHJlcykge1xyXG4gICAgaWYgKHR5cGVvZiAoZXJyKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBjdXN0b20gYXBwbGljYXRpb24gZXJyb3JcclxuICAgICAgICBjb25zdCBpczQwNCA9IGVyci50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKCdub3QgZm91bmQnKTtcclxuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gaXM0MDQgPyA0MDQgOiA0MDA7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoc3RhdHVzQ29kZSkuanNvbih7IG1lc3NhZ2U6IGVyciB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyLm5hbWUgPT09ICdVbmF1dGhvcml6ZWRFcnJvcicpIHtcclxuICAgICAgICAvLyBqd3QgYXV0aGVudGljYXRpb24gZXJyb3JcclxuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAnSW52YWxpZCBUb2tlbicgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVmYXVsdCB0byA1MDAgc2VydmVyIGVycm9yXHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9KTtcclxufSIsImV4cG9ydCAqIGZyb20gJy4vYXBpLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yLWhhbmRsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2p3dC1taWRkbGV3YXJlJztcclxuZXhwb3J0ICogZnJvbSAnLi9vbWl0JztcclxuZXhwb3J0ICogZnJvbSAnLi91c2Vycy1yZXBvJztcclxuIiwiY29uc3QgZXhwcmVzc0p3dCA9IHJlcXVpcmUoJ2V4cHJlc3Mtand0Jyk7XHJcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XHJcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnbmV4dC9jb25maWcnO1xyXG5cclxuY29uc3QgeyBzZXJ2ZXJSdW50aW1lQ29uZmlnIH0gPSBnZXRDb25maWcoKTtcclxuXHJcbmV4cG9ydCB7IGp3dE1pZGRsZXdhcmUgfTtcclxuXHJcbmZ1bmN0aW9uIGp3dE1pZGRsZXdhcmUocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IG1pZGRsZXdhcmUgPSBleHByZXNzSnd0KHsgc2VjcmV0OiBzZXJ2ZXJSdW50aW1lQ29uZmlnLnNlY3JldCwgYWxnb3JpdGhtczogWydIUzI1NiddIH0pLnVubGVzcyh7XHJcbiAgICAgICAgcGF0aDogW1xyXG4gICAgICAgICAgICAvLyBwdWJsaWMgcm91dGVzIHRoYXQgZG9uJ3QgcmVxdWlyZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgICAgICAnL2FwaS91c2Vycy9yZWdpc3RlcicsXHJcbiAgICAgICAgICAgICcvYXBpL3VzZXJzL2F1dGhlbnRpY2F0ZSdcclxuICAgICAgICBdXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdXRpbC5wcm9taXNpZnkobWlkZGxld2FyZSkocmVxLCByZXMpO1xyXG59IiwiZXhwb3J0IHsgb21pdCB9O1xyXG5cclxuZnVuY3Rpb24gb21pdChvYmosIGtleSkge1xyXG4gICAgY29uc3QgeyBba2V5XTogb21pdHRlZCwgLi4ucmVzdCB9ID0gb2JqO1xyXG4gICAgcmV0dXJuIHJlc3Q7XHJcbn0iLCJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG4vLyB1c2VycyBpbiBKU09OIGZpbGUgZm9yIHNpbXBsaWNpdHksIHN0b3JlIGluIGEgZGIgZm9yIHByb2R1Y3Rpb24gYXBwbGljYXRpb25zXHJcbmxldCB1c2VycyA9IHJlcXVpcmUoJ2RhdGEvdXNlcnMuanNvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJzUmVwbyA9IHtcclxuICAgIGdldEFsbDogKCkgPT4gdXNlcnMsXHJcbiAgICBnZXRCeUlkOiBpZCA9PiB1c2Vycy5maW5kKHggPT4geC5pZC50b1N0cmluZygpID09PSBpZC50b1N0cmluZygpKSxcclxuICAgIGZpbmQ6IHggPT4gdXNlcnMuZmluZCh4KSxcclxuICAgIGNyZWF0ZSxcclxuICAgIHVwZGF0ZSxcclxuICAgIGRlbGV0ZTogX2RlbGV0ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKHVzZXIpIHtcclxuICAgIC8vIGdlbmVyYXRlIG5ldyB1c2VyIGlkXHJcbiAgICB1c2VyLmlkID0gdXNlcnMubGVuZ3RoID8gTWF0aC5tYXgoLi4udXNlcnMubWFwKHggPT4geC5pZCkpICsgMSA6IDE7XHJcblxyXG4gICAgLy8gc2V0IGRhdGUgY3JlYXRlZCBhbmQgdXBkYXRlZFxyXG4gICAgdXNlci5kYXRlQ3JlYXRlZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcclxuICAgIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gYWRkIGFuZCBzYXZlIHVzZXJcclxuICAgIHVzZXJzLnB1c2godXNlcik7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoaWQsIHBhcmFtcykge1xyXG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoeCA9PiB4LmlkLnRvU3RyaW5nKCkgPT09IGlkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIC8vIHNldCBkYXRlIHVwZGF0ZWRcclxuICAgIHVzZXIuZGF0ZVVwZGF0ZWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGFuZCBzYXZlXHJcbiAgICBPYmplY3QuYXNzaWduKHVzZXIsIHBhcmFtcyk7XHJcbiAgICBzYXZlRGF0YSgpO1xyXG59XHJcblxyXG4vLyBwcmVmaXhlZCB3aXRoIHVuZGVyc2NvcmUgJ18nIGJlY2F1c2UgJ2RlbGV0ZScgaXMgYSByZXNlcnZlZCB3b3JkIGluIGphdmFzY3JpcHRcclxuZnVuY3Rpb24gX2RlbGV0ZShpZCkge1xyXG4gICAgLy8gZmlsdGVyIG91dCBkZWxldGVkIHVzZXIgYW5kIHNhdmVcclxuICAgIHVzZXJzID0gdXNlcnMuZmlsdGVyKHggPT4geC5pZC50b1N0cmluZygpICE9PSBpZC50b1N0cmluZygpKTtcclxuICAgIHNhdmVEYXRhKCk7XHJcbiAgICBcclxufVxyXG5cclxuLy8gcHJpdmF0ZSBoZWxwZXIgZnVuY3Rpb25zXHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0YSgpIHtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoJ2RhdGEvdXNlcnMuanNvbicsIEpTT04uc3RyaW5naWZ5KHVzZXJzLCBudWxsLCA0KSk7XHJcbn0iLCJjb25zdCBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHRqcycpO1xyXG5cclxuaW1wb3J0IHsgYXBpSGFuZGxlciB9IGZyb20gJ2hlbHBlcnMvYXBpJztcclxuaW1wb3J0IHsgdXNlcnNSZXBvLCBvbWl0IH0gZnJvbSAnaGVscGVycy9hcGknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlcih7XHJcbiAgICBnZXQ6IGdldEJ5SWQsXHJcbiAgICBwdXQ6IHVwZGF0ZSxcclxuICAgIGRlbGV0ZTogX2RlbGV0ZVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldEJ5SWQocmVxLCByZXMpIHtcclxuICAgIGNvbnN0IHVzZXIgPSB1c2Vyc1JlcG8uZ2V0QnlJZChyZXEucXVlcnkuaWQpO1xyXG5cclxuICAgIGlmICghdXNlcikgdGhyb3cgJ1VzZXIgTm90IEZvdW5kJztcclxuXHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24ob21pdCh1c2VyLCAnaGFzaCcpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB1c2VyID0gdXNlcnNSZXBvLmdldEJ5SWQocmVxLnF1ZXJ5LmlkKTtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHRocm93ICdVc2VyIE5vdCBGb3VuZCc7XHJcblxyXG4gICAgLy8gc3BsaXQgb3V0IHBhc3N3b3JkIGZyb20gdXNlciBkZXRhaWxzIFxyXG4gICAgY29uc3QgeyBwYXNzd29yZCwgLi4ucGFyYW1zIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAvLyB2YWxpZGF0ZVxyXG4gICAgaWYgKHVzZXIudXNlcm5hbWUgIT09IHBhcmFtcy51c2VybmFtZSAmJiB1c2Vyc1JlcG8uZmluZCh4ID0+IHgudXNlcm5hbWUgPT09IHBhcmFtcy51c2VybmFtZSkpXHJcbiAgICAgICAgdGhyb3cgYFVzZXIgd2l0aCB0aGUgdXNlcm5hbWUgXCIke3BhcmFtcy51c2VybmFtZX1cIiBhbHJlYWR5IGV4aXN0c2A7XHJcblxyXG4gICAgLy8gb25seSB1cGRhdGUgaGFzaGVkIHBhc3N3b3JkIGlmIGVudGVyZWRcclxuICAgIGlmIChwYXNzd29yZCkge1xyXG4gICAgICAgIHVzZXIuaGFzaCA9IGJjcnlwdC5oYXNoU3luYyhwYXNzd29yZCwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZXJzUmVwby51cGRhdGUocmVxLnF1ZXJ5LmlkLCBwYXJhbXMpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX2RlbGV0ZShyZXEsIHJlcykge1xyXG4gICAgdXNlcnNSZXBvLmRlbGV0ZShyZXEucXVlcnkuaWQpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHt9KTtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWp3dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyJdLCJuYW1lcyI6WyJlcnJvckhhbmRsZXIiLCJqd3RNaWRkbGV3YXJlIiwiYXBpSGFuZGxlciIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInN0YXR1cyIsImVuZCIsImVyciIsImlzNDA0IiwiZW5kc1dpdGgiLCJzdGF0dXNDb2RlIiwianNvbiIsIm1lc3NhZ2UiLCJuYW1lIiwiY29uc29sZSIsImVycm9yIiwiZXhwcmVzc0p3dCIsInJlcXVpcmUiLCJ1dGlsIiwiZ2V0Q29uZmlnIiwic2VydmVyUnVudGltZUNvbmZpZyIsIm1pZGRsZXdhcmUiLCJzZWNyZXQiLCJhbGdvcml0aG1zIiwidW5sZXNzIiwicGF0aCIsInByb21pc2lmeSIsIm9taXQiLCJvYmoiLCJrZXkiLCJvbWl0dGVkIiwicmVzdCIsImZzIiwidXNlcnMiLCJ1c2Vyc1JlcG8iLCJnZXRBbGwiLCJnZXRCeUlkIiwiaWQiLCJmaW5kIiwieCIsInRvU3RyaW5nIiwiY3JlYXRlIiwidXBkYXRlIiwiZGVsZXRlIiwiX2RlbGV0ZSIsInVzZXIiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwibWFwIiwiZGF0ZUNyZWF0ZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJkYXRlVXBkYXRlZCIsInB1c2giLCJzYXZlRGF0YSIsInBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImZpbHRlciIsIndyaXRlRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwiYmNyeXB0IiwiZ2V0IiwicHV0IiwicXVlcnkiLCJib2R5IiwicGFzc3dvcmQiLCJ1c2VybmFtZSIsImhhc2giLCJoYXNoU3luYyJdLCJzb3VyY2VSb290IjoiIn0=