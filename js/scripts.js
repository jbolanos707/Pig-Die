function Player(name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.addToScore = function(newRoll) {
  return this.score += newRoll;
}

function Die() {
}

Die.prototype.roll = function() {
  return Math.floor(Math.random()*6 + 1);
}

function Game(player1, player2) {
  this.players = [new Player(player1), new Player(player2)];
  this.currentPlayerIndex = 0;
  this.turnScore = 0;
}

Game.prototype.switchTurn = function() {
  this.turnScore = 0;
  this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
}

Game.prototype.addToTurnScore = function(newRoll) {
  this.turnScore += newRoll;
}


$(function() {

  var newGame;
  var hold = true;

  $("form#new-players").submit(function(event) {
    event.preventDefault();

    var inputPlayer1 = $("input#player1").val(),
        inputPlayer2 = $("input#player2").val();
    newGame = new Game(inputPlayer1, inputPlayer2);
    $("#pregame").hide();
    $("#game #player1-info #player1-name").text(newGame.players[0].name);
    $("#game #player2-info #player2-name").text(newGame.players[1].name);

    $("#turn").text("Player turn: " + newGame.players[newGame.currentPlayerIndex].name);
    $("#game").show();

    var newDie = new Die();
    $("#roll").click(function(){
      var newRoll = newDie.roll();
      if (newRoll != 1) {
        newGame.addToTurnScore(newRoll);
        $("#roll-value").show();
        $("#score-value").show();

        $("#roll-value").text(newRoll);
        $("#score-value").text(newGame.turnScore);
      } else {
        newGame.switchTurn();
        $("#turn").text("Player turn: " + newGame.players[newGame.currentPlayerIndex].name);
        $("#roll-value").hide();
        $("#score-value").hide();

        $("#game #rolled-1").html("You rolled a 1. Your turn is over.");
      }
    });

    $("#hold").click(function() {
      newGame.players[newGame.currentPlayerIndex].addToScore(newGame.turnScore);
      $("#score" + newGame.currentPlayerIndex).text(newGame.players[newGame.currentPlayerIndex].score);
      if (newGame.players[newGame.currentPlayerIndex].score >= 10) {
        $("#game-over").text(newGame.players[newGame.currentPlayerIndex].name + " is the winner.");
        $("#new-game").show();
        $("#new-game").click(function(){
          $("#game").hide();

          $("#pregame").show();
        })
      } else {
        newGame.switchTurn();
        $("#roll-value").hide();
        $("#score-value").hide();
        $("#turn").text("Player turn: " + newGame.players[newGame.currentPlayerIndex].name);
      }
    })

  });





});
