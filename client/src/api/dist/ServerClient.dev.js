"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revoke = exports.introspect = exports.authorize = void 0;

var _RestClient = require("./RestClient");

var client = new _RestClient.NotelyRestClient();

var authorize = function authorize(data) {
  return regeneratorRuntime.async(function authorize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/auth/authenticate', data).then(function (response) {
              localStorage.setItem("token", response.data);
              window.location = "/";
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.authorize = authorize;

var introspect = function introspect(data) {
  return regeneratorRuntime.async(function introspect$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/auth/introspect', data).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.introspect = introspect;

var revoke = function revoke() {
  return regeneratorRuntime.async(function revoke$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            try {
              localStorage.removeItem("token");
              window.location.reload();
              window.location.replace("/");
              resolve();
            } catch (error) {
              reject(error);
            }
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.revoke = revoke;