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
  switch (key) {
    case 'left':
      this.x = this.x - 10;
      break;
    case 'up':
      this.y = this.y - 10;
      break;
    case 'right':
      this.x = this.x + 10;
      break;
    case 'down':
      this.y = this.y + 10;
      break;
  }
}

let allEnemies = [new Enemy()];
let player = new Player();

document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
