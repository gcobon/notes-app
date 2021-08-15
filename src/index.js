import express from 'express';
import { Server as wsServer } from 'socket.io';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config();

const app = express();
const server = http.createServer(app);
const io = new wsServer(server);
let notes = [];
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('new conncetion id:', socket.id);

  socket.emit('server:loadnotes', notes);

  socket.on('client:new-note', (newNote) => {
    newNote.id = uuidv4();
    notes.push(newNote);

    io.emit('server:new-note', newNote);
  });

  socket.on('client:delete-note', (idNote) => {
    notes = notes.filter((note) => note.id !== idNote);

    io.emit('server:loadnotes', notes);
  });

  socket.on('client:get-note', (idNote) => {
    const note = notes.find((n) => n.id === idNote);

    socket.emit('server:get-note', note);
  });

  socket.on('client:update-note', (updatedNote) => {
    notes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        note.title = updatedNote.title;
        note.description = updatedNote.description;
      }
      return note;
    });

    io.emit('server:loadnotes', notes);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
