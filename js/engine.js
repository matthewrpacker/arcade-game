'use strict';

const Engine = ((global) => {
  const doc = global.document;
  const win = global.window;
  const canvas = doc.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  const main = () => {
    const now = Date.now();
    const dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    win.requestAnimationFrame(main);
  };

  const init = () => {
    reset();
    lastTime = Date.now();
    main();
  };

  const update = (dt) => {
    updateEntities(dt);
    checkCollisions();
    player.checkForWin();
  };

  const updateEntities = (dt) => {
    allEnemies.forEach((enemy) => {
      enemy.shouldResetPosition();
      enemy.update(dt);
    });
  };

  const checkCollisions = () => {
    allEnemies.forEach((enemy) => {
      if(enemy.hasCollided()) { reset(); }
    });
  };

  Enemy.prototype.hasCollided = function() {
    if(
      this.playerTopCollision() ||
      this.playerRightCollision() ||
      this.playerBottomCollision() ||
      this.playerLeftCollision()
    ) { return true; }
  };

  Enemy.prototype.playerTopCollision = function() {
    if(
      player.x + 75 > this.x &&
      player.x < this.x + 9 &&
      player.y < this.y + 12 &&
      player.y > this.y
    ) { return true; }
  };

  Enemy.prototype.playerRightCollision = function() {
    if(
      player.x + 85 > this.x &&
      player.x + 73 < this.x + 134 &&
      player.y < this.y - 25 &&
      player.y >= this.y - 64
    ) { return true; }
  };

  Enemy.prototype.playerBottomCollision = function() {
    if(
      player.x + 40 > this.x &&
      player.x + 105 < this.x + 134 &&
      player.y < this.y &&
      player.y + 134 > this.y
    ) { return true; }
  };

  Enemy.prototype.playerLeftCollision = function() {
    if(
      player.y > this.y - 85 &&
      player.y < this.y - 47 &&
      player.x < this.x + 55 &&
      player.x + 5 > this.x
    ) { return true; }
  };

  Player.prototype.checkForWin = function() {
    if(this.y < 0) {
      reset();
      this.showWin();
    }
  };

  Player.prototype.showWin = function() {
    hideCanvas();
    const body = document.getElementsByTagName('body')[0];
    const playButton = document.createElement('div');
    const party = document.createElement('h1');
    addPulseAnimation(body);
    addReplayButton(playButton, body);
    addPartyIcon(party, body);
    playAgain(playButton, party, body);
  };

  const hideCanvas = () => canvas.style.visibility = "hidden";

  const showCanvas = () => canvas.style.visibility = "visible";

  const addPulseAnimation = (body) => body.setAttribute("id", "pulse");

  const removePulseAnimation = (body) => body.removeAttribute("id");

  const addReplayButton = (playButton, body) => {
    playButton.innerHTML = '<button id="play">Play Again</button>';
    body.insertBefore(playButton, body.firstChild);
  };

  const removeReplayButton = (playButton) => playButton.style.display = 'none';

  const addPartyIcon = (party, body) => {
    party.innerHTML = '🎉';
    body.insertBefore(party, body.firstChild);
  };

  const removeParyIcon = (party) => party.style.display = 'none';

  const playAgain = (playButton, party, body) => {
    playButton.onclick = () => {
      reset();
      removeReplayButton(playButton);
      removeParyIcon(party);
      removePulseAnimation(body);
      showCanvas();
    };
  };

  const getImage = (image) => {
    if(characterOrEnemyImage(image)) { return `images/${image}.png`; }
    return `images/${image}-block.png`;
  };

  const characterOrEnemyImage = (image) => {
    if(image[0] == 't' || image[0] == 'c') { return true; } // check for turtle or char-boy
  };

  const render = () => {
    const rowImages = [
      getImage('water'), // Top row is water
      getImage('stone'), // Row 1 of 3 of stone
      getImage('stone'), // Row 2 of 3 of stone
      getImage('stone'), // Row 3 of 3 of stone
      getImage('grass'), // Row 1 of 2 of grass
      getImage('grass')  // Row 2 of 2 of grass
    ];
    const numRows = 6;
    const numCols = 5;

    clearCanvas();
    drawCanvas(rowImages, numRows, numCols);
    renderEntities();
  };

  const clearCanvas = () => ctx.clearRect(0,0,canvas.width,canvas.height);

  const drawCanvas = (rowImages, numRows, numCols) => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
  };

  const renderEntities = () => {
    allEnemies.forEach((enemy) => { enemy.render(); });
    player.render();
  };

  const reset = () => {
    player.reset();
    allEnemies.forEach((enemy) => { enemy.reset(); });
  };

  Resources.load([
    getImage('stone'),
    getImage('water'),
    getImage('grass'),
    getImage('turtle'),
    getImage('char-boy')
  ]);
  Resources.onReady(init);
  global.ctx = ctx;
})(this);
