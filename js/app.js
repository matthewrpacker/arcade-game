let previousYs = []
let Enemy = function() {
  if(previousYs.length === 3) { previousYs.splice(0,1) }
  this.sprite = 'images/turtle-12.png';
  this.x = makeRandomX()
  this.startX = this.x
  this.y = makeRandomY()
  verifyUniqueY.call(this);
  previousYs.push(this.y)
};

let makeRandomX = () => Math.random() * (-125 + 500) - 500

let [row1, row2, row3] = [133, 216, 300]
let makeRandomY = () => [row1, row2, row3][randomIndex()]
let randomIndex = () => Math.trunc(3 * Math.random())

function verifyUniqueY() {
  if(previousYs.includes(this.y)) {
    this.y = makeRandomY()
    verifyUniqueY.call(this);
  }
}

Enemy.prototype.update = function(dt) { this.x += (dt * 140); };

Enemy.prototype.shouldResetPosition = () => {
  allEnemies.forEach((enemy) => {
    if(enemy.x > 650 - enemy.startX) {
      allEnemies.splice(enemy, 1)
      allEnemies.push(new Enemy())
    }
  });
}

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

Player.prototype.reset = function() {
  this.x = 202
  this.y = 400
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let [leftMax, upMax, rightMax, downMax] = [-15.5, -12.5, 419.5, 445]
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if(player.x === leftMax) { break; }
      this.x = this.x - 7.5;
      break;
    case 'up':
      if(player.y === upMax) { break; }
      this.y = this.y - 7.5;
      break;
    case 'right':
      if(player.x === rightMax) { break; }
      this.x = this.x + 7.5;
      break;
    case 'down':
      if(player.y === downMax) { break; }
      this.y = this.y + 7.5;
      break;
    case 'apple':
      break;
  }
}

let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
let player = new Player();

document.addEventListener('keydown', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
