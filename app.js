var app = angular.module('Hangman',[]);

app.controller('game',['$scope','$timeout',function($scope,$timeout){

    var words = ["rat","cat","bat","mat","tyfone"];
    $scope.incorrectLetter = [];
    $scope.correctLetter = [];
    $scope.guesses = 6;
    $scope.displayWords = '';
    $scope.input ={
        letter : ''
    }

    var selectRandomWord = function(){
        var index = Math.round(Math.random()*words.length);
        return words[index];
    }

    var newGame = function(){
        $scope.incorrectLetter = [];
        $scope.correctLetter = [];
        $scope.guesses = 6;
        $scope.displayWords = '';

        selectedWord = selectRandomWord();
         var tempDisplayWords = '';
         for(var i = 0;i <selectedWord.length;i++){
            tempDisplayWords +='*';
         }
         $scope.displayWords = tempDisplayWords;

    }
    $scope.letterChosen = function(){
        for(var i = 0; i< $scope.correctLetter.length;i++){
            if($scope.correctLetter[i].toLowerCase == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                return;
            }

        }

        for(var i = 0; i< $scope.incorrectLetter.length;i++){
            if($scope.incorrectLetter[i].toLowerCase == $scope.input.letter.toLowerCase()){
                $scope.input.letter = "";
                return;
            }
            
        }

        var correct = false;
        for(var i =0; i < selectedWord.length; i++){
            if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
                $scope.displayWords = $scope.displayWords.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWords.slice(i+1)
                correct = true;
            
            }
        }
        if(correct){
            $scope.correctLetter.push($scope.input.letter.toLowerCase());
        }
        else{
            $scope.guesses --;
            $scope.incorrectLetter.push($scope.input.letter.toLowerCase());

        }
        $scope.input.letter = "";
        if($scope.guesses == 0){
            alert("You lost !!");
            $timeout(function(){
                newGame();
            },500);
        }
        if($scope.displayWords.indexOf("*") ==-1){
            alert("you Won");
        }
    }
    
    newGame();

}])