angular.module('notes.controllers',['notes.services'])

.controller('NoteListController',function ($scope,NoteService) {
   $scope.notes = NoteService.getAllNotes();
       $scope.$watch(function () {
      return NoteService.getAllNotes();
      
    },
    function (newVal,oldVal) {
      $scope.notes =newVal;
    },true);

    $scope.deleteNote= function (id) {
      NoteService.deleteNote(id); 
    };
    
})
.controller('NoteController',function ($scope,$ionicHistory,$ionicPopup,NoteService,$stateParams) {
var passedNoteId=$stateParams.noteid; 
$scope.note=NoteService.getNote(passedNoteId);
    $scope.$watch(function () {
      return $scope.note;
      
    },
    function (newVal,oldVal) {
      $scope.saveNote();
    },true);
    
$scope.saveNote = function () {
  if ($scope.note.id===''){
    $scope.note.id=Math.random().toString(36).substring(90);
  }
  NoteService.updateNote($scope.note);
};
    $scope.back= function () {
      if($scope.note.name !== ''){
        $scope.saveNote();
       $ionicHistory.goBack();
      }else {
      $ionicPopup.show({
        title: 'Missing name',
        content: 'You note has no name and will be deleted!',
        buttons: [{
          text: 'Delete note',
          type: 'button-assertive',
          onTap: function(e) {
            NoteService.deleteNote($scope.note.id);
            $ionicHistory.goBack();
            NoteService.deleteNote($scope.note.id);
          }
        },{
          text: 'Add name',
          type: 'button-positive'
        }]
      });
    }
  };
});
