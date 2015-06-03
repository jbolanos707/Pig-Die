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
