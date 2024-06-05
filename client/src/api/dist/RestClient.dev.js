"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotelyRestClient = exports.RestClient = void 0;

var _NotificationUtils = _interopRequireDefault(require("../utils/NotificationUtils"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RestClient =
/*#__PURE__*/
function () {
  function RestClient(baseURL, headers) {
    _classCallCheck(this, RestClient);

    this.client = _axios["default"].create({
      baseURL: baseURL,
      headers: headers
    });
  }

  _createClass(RestClient, [{
    key: "get",
    value: function get(url) {
      var _this = this;

      return regeneratorRuntime.async(function get$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _this.client.get(url).then(function (response) {
                  resolve(response.data);
                })["catch"](function (error) {
                  if (error.response.data.result.status === 404) {
                    resolve({
                      data: []
                    });
                  } else if (error.response.data.result) {
                    new _NotificationUtils["default"](error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                  } else {
                    new _NotificationUtils["default"](error.message, 'error').send();
                    reject(error);
                  }
                });
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var _this2 = this;

      return regeneratorRuntime.async(function post$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                _this2.client.post(url, {
                  data: data
                }).then(function (response) {
                  console.log(response);
                  new _NotificationUtils["default"](response.data.result.message, response.data.result.type).send();
                  resolve(response.data);
                })["catch"](function (error) {
                  console.log(error);

                  if (error.response.data.result) {
                    new _NotificationUtils["default"](error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                  } else {
                    new _NotificationUtils["default"](error.message, 'error').send();
                    reject(error);
                  }
                });
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var _this3 = this;

      return regeneratorRuntime.async(function put$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _this3.client.put(url, {
                  data: data
                }).then(function (response) {
                  new _NotificationUtils["default"](response.data.result.message, response.data.result.type).send();
                  resolve(response.data);
                })["catch"](function (error) {
                  if (error.response.data.result) {
                    new _NotificationUtils["default"](error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                  } else {
                    new _NotificationUtils["default"](error.message, 'error').send();
                    reject(error);
                  }
                });
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var _this4 = this;

      return regeneratorRuntime.async(function _delete$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                _this4.client["delete"](url).then(function (response) {
                  resolve(response.data);
                })["catch"](function (error) {
                  if (error.response.data.result) {
                    new _NotificationUtils["default"](error.response.data.result.message, error.response.data.result.type).send();
                    reject(error.response.data.result);
                  } else {
                    new _NotificationUtils["default"](error.message, 'error').send();
                    reject(error);
                  }
                });
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }]);

  return RestClient;
}();

exports.RestClient = RestClient;

var NotelyRestClient =
/*#__PURE__*/
function (_RestClient) {
  _inherits(NotelyRestClient, _RestClient);

  function NotelyRestClient(headers) {
    _classCallCheck(this, NotelyRestClient);

    var BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
    var token = null;

    try {
      token = localStorage.getItem('token');
    } catch (e) {
      console.log(e);
    }

    var HEADERS = _objectSpread({
      'Content-Type': 'application/json',
      // 'User-Agent': window.navigator.userAgent
      'Authorization': 'Bearer' + ' ' + token
    }, headers);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotelyRestClient).call(this, BASE_URL, HEADERS));
  }

  return NotelyRestClient;
}(RestClient);

exports.NotelyRestClient = NotelyRestClient;