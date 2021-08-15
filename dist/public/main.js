"use strict";

var form = document.getElementById('noteForm');
var title = document.getElementById('title');
var description = document.getElementById('description');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (noteID) {
    updateNote(title.value, description.value, noteID);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = '';
  description.value = '';
  title.focus();
});