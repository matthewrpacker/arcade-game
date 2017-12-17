var Enemy = function() {
  this.sprite = 'images/turtle-12.png';
  this.x = generateRandomX()
  this.y = generateRandomY()
};

let generateRandomX = () => Math.random() * (-125 + 500) - 500 // generate random x between -500 and -125
let randomIndex = Math.trunc(3*Math.random())
let generateRandomY = () => [133, 216, 300][randomIndex]

Enemy.prototype.update = function(dt) {
  this.x = this.x + (dt * 140);
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

let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
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
