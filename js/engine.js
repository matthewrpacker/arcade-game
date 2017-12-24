let Engine = (function(global) {
  let doc = global.document
  let win = global.window
  let canvas = doc.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main() {
    let now = Date.now()
    let dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    win.requestAnimationFrame(main);
  }

  function init() {
    reset();
    lastTime = Date.now();
    main();
  }

  function update(dt) {
    updateEntities(dt);
    checkCollisions();
    checkForWin();
  }

  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.shouldResetPosition();
      enemy.update(dt);
    });
    player.update();
  }

  let playerTopCollision = function(enemy) {
    if(player.x + 75 > enemy.x &&
      player.x < enemy.x + 9 &&
      player.y < enemy.y + 12 &&
      player.y > enemy.y) {
      return true
    }
  }

  let playerRightCollision = function(enemy) {
    if(player.x + 85 > enemy.x &&
      player.x + 73 < enemy.x + 134 &&
      player.y < enemy.y - 25 &&
      player.y >= enemy.y - 64) {
      return true
    }
  }

  let playerBottomCollision = function(enemy) {
    if(player.x + 40 > enemy.x &&
      player.x + 105 < enemy.x + 134 &&
      player.y < enemy.y &&
      player.y + 134 > enemy.y ) {
      return true
    }
  }

  let playerLeftCollision = function(enemy) {
    if(player.y > enemy.y - 85 &&
      player.y < enemy.y - 47 &&
      player.x < enemy.x + 55 &&
      player.x + 5 > enemy.x) {
      return true
    }
  }

  function checkCollisions() {
    allEnemies.forEach(function(enemy) {
      if(
        playerTopCollision(enemy) ||
        playerRightCollision(enemy) ||
        playerBottomCollision(enemy) ||
        playerLeftCollision(enemy)
      ) {
        reset()
      }
    })
  }

  function checkForWin() {
    if(player.y < 0) {
      reset();
      showWin();
    }
  }

  function showWin() {
    canvas.style.visibility = "hidden";
    let body = document.getElementsByTagName('body')[0]
    body.setAttribute("id", "pulse");
    let playButton = document.createElement('div');
    playButton.innerHTML = '<button id="play">Play Again</button>';
    let party = document.createElement('h1');
    party.innerHTML = '🎉';
    body.insertBefore(playButton, body.firstChild);
    body.insertBefore(party, body.firstChild);
    playAgain(playButton, party, body);
  }

  function playAgain(playButton, party, body) {
    playButton.onclick = function() {
      reset();
      body.removeAttribute("id"); // remove pulse background colors
      party.style.display = 'none'; // remove emoji
      playButton.style.display = 'none'; // remove button
      canvas.style.visibility = "visible"; // show canvas
    }
  }

  function render() {
    let rowImages = [
      'images/water-block.png',   // Top row is water
      'images/stone-block.png',   // Row 1 of 3 of stone
      'images/stone-block.png',   // Row 2 of 3 of stone
      'images/stone-block.png',   // Row 3 of 3 of stone
      'images/grass-block.png',   // Row 1 of 2 of grass
      'images/grass-block.png'    // Row 2 of 2 of grass
    ],
    numRows = 6,
    numCols = 5,
    row, col;

    ctx.clearRect(0,0,canvas.width,canvas.height)

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }
    renderEntities();
  }

  function renderEntities() {
    allEnemies.forEach(function(enemy) {
      enemy.render();
    });
    player.render();
  }

  function reset() {
    player.reset();
    allEnemies.forEach((enemy) => { enemy.reset(); })
  }

  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/turtle-12.png',
    'images/char-boy.png'
  ]);
  Resources.onReady(init);
  global.ctx = ctx;
})(this);
