var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = 100
  this.y = 100
};

Enemy.prototype.update = function(dt) {
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202
  this.y = 400
};

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
}

let allEnemies = [new Enemy()];
let player = new Player();

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
