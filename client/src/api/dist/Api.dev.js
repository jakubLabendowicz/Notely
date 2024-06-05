"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.askOneNote = exports.summarizeOneNote = exports.unarchiveOneNote = exports.archiveOneNote = exports.deleteOneNote = exports.updateOneNote = exports.selectManyNotes = exports.selectOneNote = exports.createOneNote = exports.selectManyUserNotes = exports.deleteOneUser = exports.updateOneUser = exports.selectManyUsers = exports.selectOneUser = exports.createOneUser = exports.revoke = exports.introspect = exports.authenticate = void 0;

var _RestClient = require("./RestClient");

var client = new _RestClient.NotelyRestClient(); //auth

var authenticate = function authenticate(data) {
  return regeneratorRuntime.async(function authenticate$(_context) {
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

exports.authenticate = authenticate;

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
}; //users


exports.revoke = revoke;

var createOneUser = function createOneUser(data) {
  return regeneratorRuntime.async(function createOneUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/users', data).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.createOneUser = createOneUser;

var selectOneUser = function selectOneUser(userId) {
  return regeneratorRuntime.async(function selectOneUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/users/' + userId).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.selectOneUser = selectOneUser;

var selectManyUsers = function selectManyUsers() {
  return regeneratorRuntime.async(function selectManyUsers$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/users').then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.selectManyUsers = selectManyUsers;

var updateOneUser = function updateOneUser(userId, data) {
  return regeneratorRuntime.async(function updateOneUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", new Promise(function (resolve, reject) {
            client.put('/users/' + userId, data).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.updateOneUser = updateOneUser;

var deleteOneUser = function deleteOneUser(userId) {
  return regeneratorRuntime.async(function deleteOneUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Promise(function (resolve, reject) {
            client["delete"]('/users/' + userId).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}; //user notes


exports.deleteOneUser = deleteOneUser;

var selectManyUserNotes = function selectManyUserNotes(userId) {
  return regeneratorRuntime.async(function selectManyUserNotes$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/users/' + userId + '/notes').then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
}; //notes


exports.selectManyUserNotes = selectManyUserNotes;

var createOneNote = function createOneNote(data) {
  return regeneratorRuntime.async(function createOneNote$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/notes', data).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.createOneNote = createOneNote;

var selectOneNote = function selectOneNote(noteId) {
  return regeneratorRuntime.async(function selectOneNote$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/notes/' + noteId).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.selectOneNote = selectOneNote;

var selectManyNotes = function selectManyNotes() {
  var filters,
      _args12 = arguments;
  return regeneratorRuntime.async(function selectManyNotes$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          filters = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : '';
          return _context12.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/notes' + filters).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  });
};

exports.selectManyNotes = selectManyNotes;

var updateOneNote = function updateOneNote(noteId, data) {
  return regeneratorRuntime.async(function updateOneNote$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", new Promise(function (resolve, reject) {
            client.put('/notes/' + noteId, data).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

exports.updateOneNote = updateOneNote;

var deleteOneNote = function deleteOneNote(noteId) {
  return regeneratorRuntime.async(function deleteOneNote$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", new Promise(function (resolve, reject) {
            client["delete"]('/notes/' + noteId).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.deleteOneNote = deleteOneNote;

var archiveOneNote = function archiveOneNote(noteId) {
  return regeneratorRuntime.async(function archiveOneNote$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/notes/' + noteId + '/archive', undefined).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

exports.archiveOneNote = archiveOneNote;

var unarchiveOneNote = function unarchiveOneNote(noteId) {
  return regeneratorRuntime.async(function unarchiveOneNote$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", new Promise(function (resolve, reject) {
            client.post('/notes/' + noteId + '/unarchive', undefined).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

exports.unarchiveOneNote = unarchiveOneNote;

var summarizeOneNote = function summarizeOneNote(noteId) {
  return regeneratorRuntime.async(function summarizeOneNote$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/notes/' + noteId + '/summarize').then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
};

exports.summarizeOneNote = summarizeOneNote;

var askOneNote = function askOneNote(noteId, question) {
  return regeneratorRuntime.async(function askOneNote$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          return _context18.abrupt("return", new Promise(function (resolve, reject) {
            client.get('/notes/' + noteId + '/ask?question=' + question).then(function (response) {
              resolve(response);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context18.stop();
      }
    }
  });
};

exports.askOneNote = askOneNote;