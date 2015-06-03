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

Game.prototype.currentPlayer = function() {
  return this.players[this.currentPlayerIndex];
}

var updateGame = function(game) {
  game.switchTurn();
  $("#turn").text("Player turn: " + game.currentPlayer().name);
  $("#roll-value").hide();
  $("#score-value").hide();
}


$(function() {

  var newGame;

  $("form#new-players").submit(function(event) {
    event.preventDefault();

    var inputPlayer1 = $("input#player1").val(),
        inputPlayer2 = $("input#player2").val();
    newGame = new Game(inputPlayer1, inputPlayer2);
    $("#pregame").hide();
    $("#game #player1-info #player1-name").text(newGame.players[0].name);
    $("#game #player2-info #player2-name").text(newGame.players[1].name);
    $("#score0").text(newGame.players[0].score);
    $("#score1").text(newGame.players[1].score);
    $("#roll-value").hide();
    $("#score-value").hide();
    $("#game #rolled-1").hide();
    $("#game-over").hide();
    $("#turn").text("Player turn: " + newGame.currentPlayer().name);
    $("#game").show();

    //remove click listener from roll button
    $("#roll").off();
    $("#rolling-die").hide();
    var newDie = new Die();
    $("#roll").click(function(){

      $("#static-die").hide();
      $("#rolling-die").show();
      setTimeout(function(){
        $("#rolling-die").hide();
        $("#static-die").show();
        var newRoll = newDie.roll();
        if (newRoll != 1) {
          newGame.addToTurnScore(newRoll);
          $("#roll-value").show();
          $("#score-value").show();

          $("#roll-value").text(newRoll);
          $("#score-value").text(newGame.turnScore);
        } else {
          $("#roll").hide();
          $("#hold").hide();
          $("#roll-value").text(newRoll);
          $("#game #rolled-1").show();
          $("#game #rolled-1").click(function(){
            updateGame(newGame);
            $("#game #rolled-1").hide();
            $("#roll").show();
            $("#hold").show();
          });
        }
      }, 2000);
    });

    $("#hold").click(function() {
      newGame.currentPlayer().addToScore(newGame.turnScore);
      $("#score" + newGame.currentPlayerIndex).text(newGame.currentPlayer().score);
      if (newGame.currentPlayer().score >= 10) {
        $("#game-over").text(newGame.currentPlayer().name + " is the winner.");
        $("#new-game").show();
        $("#new-game").click(function(){
          $("#game").hide();
          $("#new-game").hide();
          $("#pregame").show();
        })
      } else {
        updateGame(newGame);
      }
    })

  });





});
