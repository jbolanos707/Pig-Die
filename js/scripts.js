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
    $("#game #player1-info").append(newGame.players[0].name + "<br>" +
                                    "Score: <span id='score0'>0</span>");
    $("#game #player2-info").append(newGame.players[1].name + "<br>" +
                                    "Score: <span id='score1'>0</span>");

    $("#game").show();

    var newDie = new Die();
    $("#roll").click(function(){
      var newRoll = newDie.roll();
      if (newRoll != 1) {
        newGame.addToTurnScore(newRoll);
        $("#game #player1-info").append("Your new roll is: " + newRoll + "<br>");
        $("#game #player1-info").append("Your score this turn is: " + newGame.turnScore + "<br>");
      } else {
        newGame.switchTurn();
        $("#game #player1-info").append("You rolled a 1, other player turn." + "<br>");
      }
    });

    $("#hold").click(function() {
      newGame.players[newGame.currentPlayerIndex].addToScore(newGame.turnScore);
      $("#score" + newGame.currentPlayerIndex).text(newGame.players[newGame.currentPlayerIndex].score);
      if (newGame.players[newGame.currentPlayerIndex].score >= 10) {
        $("game #player1-info").append("You have rocked the game.");
        $("#newgame").show();
        $("#newgame").click(function(){
          $("#game").hide();

          $("#pregame").show();
        })
      } else {
        newGame.switchTurn();
      }
    })

  });





});
