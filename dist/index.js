"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var io = new _socket.Server(server);
var notes = [];
app.use(_express["default"]["static"](__dirname + '/public'));
io.on('connection', function (socket) {
  console.log('new conncetion id:', socket.id);
  socket.emit('server:loadnotes', notes);
  socket.on('client:new-note', function (newNote) {
    newNote.id = (0, _uuid.v4)();
    notes.push(newNote);
    io.emit('server:new-note', newNote);
  });
  socket.on('client:delete-note', function (idNote) {
    notes = notes.filter(function (note) {
      return note.id !== idNote;
    });
    io.emit('server:loadnotes', notes);
  });
  socket.on('client:get-note', function (idNote) {
    var note = notes.find(function (n) {
      return n.id === idNote;
    });
    socket.emit('server:get-note', note);
  });
  socket.on('client:update-note', function (updatedNote) {
    notes = notes.map(function (note) {
      if (note.id === updatedNote.id) {
        note.title = updatedNote.title;
        note.description = updatedNote.description;
      }

      return note;
    });
    io.emit('server:loadnotes', notes);
  });
});
server.listen(3000, function () {
  console.log('Server running on port 3000');
});