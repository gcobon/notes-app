"use strict";

var socket = io();

var saveNote = function saveNote(title, description) {
  socket.emit('client:new-note', {
    title: title,
    description: description
  });
};

var updateNote = function updateNote(title, description, id) {
  socket.emit('client:update-note', {
    title: title,
    description: description,
    id: id
  });
};

socket.on('server:new-note', function (note) {
  appendNote(note);
});
socket.on('server:loadnotes', function (notes) {
  renderNotes(notes);
});
socket.on('server:get-note', function (note) {
  var title = document.getElementById('title');
  var description = document.getElementById('description');
  title.value = note.title;
  description.value = note.description;
  noteID = note.id;
});

var deleteNote = function deleteNote(idNote) {
  socket.emit('client:delete-note', idNote);
};

var getNote = function getNote(idNote) {
  socket.emit('client:get-note', idNote);
};