const socket = io();

const saveNote = (title, description) => {
  socket.emit('client:new-note', { title, description });
};

const updateNote = (title, description, id) => {
  socket.emit('client:update-note', { title, description, id });
};

socket.on('server:new-note', (note) => {
  appendNote(note);
});

socket.on('server:loadnotes', (notes) => {
  renderNotes(notes);
});

socket.on('server:get-note', (note) => {
  const title = document.getElementById('title');
  const description = document.getElementById('description');

  title.value = note.title;
  description.value = note.description;

  noteID = note.id;
});

const deleteNote = (idNote) => {
  socket.emit('client:delete-note', idNote);
};

const getNote = (idNote) => {
  socket.emit('client:get-note', idNote);
};
