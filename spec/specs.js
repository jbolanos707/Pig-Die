describe("Player", function() {
  it("has a name and a score which is initially 0", function() {
    var testPlayer = new Player("Ben");
    expect(testPlayer.name).to.equal("Ben");
    expect(testPlayer.score).to.equal(0);
  });
});

describe("Die", function() {
  it("contains a die and allows user to roll it", function() {
    var testDie = new Die(),
        rollValue = testDie.roll();
    expect(rollValue).to.be.at.least(1);
    expect(rollValue).to.be.at.most(6);
  });
});

describe("Game", function() {
  it("has two players, a current player", function() {
    var testGame = new Game("Ben", "Andrew");
    expect(testGame.players.length).to.equal(2);
    expect(testGame.players[0].name).to.equal("Ben");
    expect(testGame.players[1].name).to.equal("Andrew");
    expect(testGame.currentPlayerIndex).to.equal(0);
  });

  describe("switchTurn", function() {
    it("changes the current player", function() {
      var testGame = new Game("Ben", "Andrew");
      var oldIndex = testGame.currentPlayerIndex;
      testGame.switchTurn();
      var newIndex = testGame.currentPlayerIndex;
      expect(oldIndex === newIndex).to.equal(false);
    });
  });

  describe("Game", function() {
    it("will add a roll value to a players' score", function() {
      var testGame = new Game("Ben", "Andrew");
      var testDie = new Die();
      var roll1 = testDie.roll();
      testGame.players[testGame.currentPlayerIndex].addToScore(roll1);
      expect(testGame.players[testGame.currentPlayerIndex].score).to.equal(roll1);
    });
  });

  describe("Game", function() {
    it("will return both players' scores", function() {
      var testGame = new Game("Ben", "Andrew");
      var testDie = new Die();
      var roll1 = testDie.roll();
      var roll2 = testDie.roll();
      var roll3 = testDie.roll();
      var roll4 = testDie.roll();
      testGame.players[testGame.currentPlayerIndex].addToScore(roll1);
      testGame.players[testGame.currentPlayerIndex].addToScore(roll2);
      testGame.switchTurn();
      testGame.players[testGame.currentPlayerIndex].addToScore(roll3);
      testGame.players[testGame.currentPlayerIndex].addToScore(roll4);
      expect(testGame.players[0].score).to.equal(roll1+roll2);
      expect(testGame.players[1].score).to.equal(roll3+roll4);
    });
  });

});
