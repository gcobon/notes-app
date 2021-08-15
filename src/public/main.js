const form = document.getElementById('noteForm');
const title = document.getElementById('title');
const description = document.getElementById('description');

form.addEventListener('submit', (e) => {
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
