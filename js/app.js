'use strict';

const previousYs = [];
const Enemy = function() {
  if(previousYs.length === 3) previousYs.splice(0,1);
  this.sprite = 'images/turtle.png';
  this.x = makeRandomX();
  this.startX = this.x;
  this.y = makeRandomY();
  this.verifyUniqueY();
  previousYs.push(this.y);
  this.speed = 200;
};

const makeRandomX = () => Math.random() * (-125 + 500) - 500;

const [ROW_1, ROW_2, ROW_3] = [133, 216, 300];
const makeRandomY = () => [ROW_1, ROW_2, ROW_3][randomIndex()];

const randomIndex = () => Math.trunc(3 * Math.random());

Enemy.prototype.verifyUniqueY = function() {
  if(previousYs.includes(this.y)) {
    this.y = makeRandomY();
    this.verifyUniqueY();
  }
};

Enemy.prototype.update = function(dt) { this.x += (dt * this.speed); };

Enemy.prototype.shouldResetPosition = () => {
  allEnemies.forEach((enemy) => {
    if(enemy.x > 650 - enemy.startX) {
      allEnemies.splice(enemy, 1);
      allEnemies.push(new Enemy());
    }
  });
};

Enemy.prototype.reset = () => {
  allEnemies.length = 0;
  while (allEnemies.length < 3) allEnemies.push(new Enemy());
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 400;
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 400;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const [LEFT_MAX, UP_MAX, RIGHT_MAX, DOWN_MAX] = [-15.5, -12.5, 419.5, 445];
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if(this.x === LEFT_MAX) break;
      this.x = this.x - 7.5;
      break;
    case 'up':
      if(this.y === UP_MAX) break;
      this.y = this.y - 7.5;
      break;
    case 'right':
      if(this.x === RIGHT_MAX) break;
      this.x = this.x + 7.5;
      break;
    case 'down':
      if(this.y === DOWN_MAX) break;
      this.y = this.y + 7.5;
      break;
  }
};

let allEnemies = [new Enemy(), new Enemy(), new Enemy()];
let player = new Player();

document.addEventListener('keydown', function(e) {
  const allowedKeys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
  player.handleInput(allowedKeys[e.keyCode]);
});
