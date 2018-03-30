
// @description Enemy class saved as function assigned to the Enemy variable.
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    if (speed >= 100 && speed <= 240) {
      this.sprite = 'images/asteroid01.png';
    }
    else if (speed > 240 && speed <= 400) {
      this.sprite = 'images/asteroid02.png';
    }
};

// @description The Enemy class prototype function responsible for updating enemies every
// game tick (dt).
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    for (enemy of allEnemies) {
      if (enemy.x >=500) {
        let enemyIndex = allEnemies.indexOf(enemy);
        allEnemies.splice(enemyIndex, 1);
      }
    }
};

// @description Enemy sprite render function.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// @description Player class, also saved as function assigned to the variable.
var Player = function() {
    this.sprite = 'images/jedi-ship.png';
    this.x = 200;
    this.y = 400;
};

// @description Rendering function for player class.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// @description The function handles user input and moves a player on the canvas
// according to pressed arrow keyes.
Player.prototype.handleInput = function(keyPressed) {
   (keyPressed === 'left') ?  this.x = this.x - 50 :
   (keyPressed === 'up') ?  this.y = this.y - 50 :
   (keyPressed === 'right') ?  this.x = this.x + 50 :
   this.y = this.y + 50;
};

// @description Player update function. Doesn't allow player to go beyond the canvas
// and triggers endGame function in case the game has been won.
Player.prototype.update = function(dt) {
  if (this.x >=450 || this.x <= -5 || this.y >=500) {
     player.positionReset();
  }
  else if (this.y <= 0) {
     endGame();
     player.positionReset();
  }
};

// @description The function resets player's position on canvas.
Player.prototype.positionReset = function() {
  player.x = 200;
  player.y = 400;
};

// @description Global variables for all enemies and new player.
let allEnemies = [];
let player = new Player();

// @description The function creates three enemies with random speeds.
function createEnemies() {
    allEnemies.push(new Enemy(0, 50, Math.floor(Math.random() * (400 - 100)) + 100));
    allEnemies.push(new Enemy(0, 135, Math.floor(Math.random() * (400 - 100)) + 100));
    allEnemies.push(new Enemy(0, 220, Math.floor(Math.random() * (400 - 100)) + 100));
};

// @description The function tracks collisions of a player with enemies.
// Creates collision sprite in case of collision and resets player's location
function checkCollisions(enemy) {
  function inRange(x, min, max) {
    return x >= min && x <= max;
  }
  if (inRange(player.x, enemy.x-50, enemy.x+50) && inRange(player.y, enemy.y-40, enemy.y+80)) {
    let collision = new Collision(player.x, player.y);
    allCollisions.push(collision);
    player.positionReset();
  }
};

// @description Global variable to store collisions.
let allCollisions = [];

// @description Collision class written in ES6 for a change. With constructor, update and render
// functions, logically similar to those of other classes.
class Collision {
  constructor(x, y) {
    this.sprite = 'images/spark.png';
    this.x = x;
    this.y = y;
  }
  update(dt) {
    if (allCollisions.length > 0) {
      setTimeout(function(){ allCollisions.pop(); }, dt);
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// @description Difficulty variables and HTML element control script responsible for assigning
// the chosen difficulty.
let difficulty = 5;
let difficultyElements = [
  { option: document.getElementsByTagName("input")[0], difficultyLevel: '5' },
  { option: document.getElementsByTagName("input")[1], difficultyLevel: '6' },
  { option: document.getElementsByTagName("input")[2], difficultyLevel: '7' },
  { option: document.getElementsByTagName("input")[3], difficultyLevel: '8' },
  { option: document.getElementsByTagName("input")[4], difficultyLevel: '9' },
  { option: document.getElementsByTagName("input")[5], difficultyLevel: '10' }
];
difficultyElements.forEach(function(eachDiffElem, numOfDiffElem) {
  difficultyElements[numOfDiffElem].option.addEventListener("change", function() {
    difficulty = difficultyElements[numOfDiffElem].difficultyLevel;
  });
});

// @description Variable and functions responsible for functionality of arrow buttons on screen.
let arrows = [
  { arrow: document.getElementsByClassName("arrowUp")[0], codeR: 'up' },
  { arrow: document.getElementsByClassName("arrowDown")[0], codeR: 'down' },
  { arrow: document.getElementsByClassName("arrowLeft")[0], codeR: 'left' },
  { arrow: document.getElementsByClassName("arrowRight")[0], codeR: 'right' }
];
arrows.forEach(function(each, numOfEach) {
  arrows[numOfEach].arrow.addEventListener('click', function() {
    player.handleInput(arrows[numOfEach].codeR);
  });
});

// @description Functionality for keyboard arrow keys.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// @description Endgame function with assigned variables responsible for endgame screen viewing
// and functionality.
function endGame() {
  const winJediPopup = document.getElementsByClassName("winPopupJedi")[0];
  const winSithPopup = document.getElementsByClassName("winPopupSith")[0];
  const restartJedi =  document.getElementsByClassName("choiceRestartJedi")[0];
  const backJedi = document.getElementsByClassName("choiceBackJedi")[0];
  const restartSith = document.getElementsByClassName("choiceRestartSith")[0];
  const backSith = document.getElementsByClassName("choiceBackSith")[0];
  if (player.sprite === 'images/jedi-ship.png') {
     winJediPopup.style.display = 'block';
     restartJedi.addEventListener('click', function() {
       location.reload();
     });
     backJedi.addEventListener('click', function() {
       winJediPopup.style.display = 'none';
     });
  }
  else if (player.sprite === 'images/sith-ship.png') {
     winSithPopup.style.display = 'block';
     restartSith.addEventListener('click', function() {
       location.reload();
     });
     backSith.addEventListener('click', function() {
       winSithPopup.style.display = 'none';
     });
  }
}
