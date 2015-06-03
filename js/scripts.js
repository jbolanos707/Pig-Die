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
}

Game.prototype.switchTurn = function() {
  this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
}


$(function() {

  var newGame;

  $("form#new-players").submit(function(event) {
    event.preventDefault();

    var inputPlayer1 = $("input#player1").val(),
        inputPlayer2 = $("input#player2").val();
    newGame = new Game(inputPlayer1, inputPlayer2);
    $("#pregame").hide();
    $("#game #player1-info").append(newGame.players[0].name + "<br>" +
                                    "Score: <span id='0'>0</span>");
    $("#game #player2-info").append(newGame.players[1].name + "<br>" +
                                    "Score: <span id='1'>0</span>");

    $("#game").show();
  });





});
