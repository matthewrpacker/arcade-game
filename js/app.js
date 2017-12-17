var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Write player class with update(), render() and handleInput() methods
// Instantiate objects
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Sends the keys to your Player.handleInput() method. Don't modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
