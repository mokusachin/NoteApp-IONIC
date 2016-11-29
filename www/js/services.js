angular.module('notes.services', [])

.service('NoteService', function() {
  function getAllNotes() {
    var notes = window.localStorage.getItem('notes');
    var array = angular.fromJson(notes);
    return array || [];
  }
  return {
    getAllNotes: getAllNotes,
    getNote: function(id) {
      var array = getAllNotes();
      if (array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].id === id) {
            return array[i];
          }
        }
      }
      return {
        id: '',
        name: '',
        text: ''
      };
    },
    updateNote: function(newNote) {
      var array = getAllNotes();
      var isNew = true;
      if (array) {
        for (var i = 0; i < array.length; i++) {
          var note = array[i];
          if (note.id === newNote.id) {
            array[i] = newNote;
            isNew = false;
          }
        }
      }
      if (isNew) {
        array.push(newNote);
      }
      window.localStorage.setItem('notes', JSON.stringify(array));
    },
    deleteNote: function(id) {
      var array = getAllNotes();
      if (array) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].id === id) {
            array.splice(i, 1);
          }
        }
        window.localStorage.setItem('notes', JSON.stringify(array));
      }
    }
  };
});
