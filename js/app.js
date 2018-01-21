// Enemies our player must avoid
var Enemy = function() {
    // Define a starting point for enemy
    var randomX = Math.floor(Math.random() * 500);
    var randomY = Math.floor(Math.random() * 3);
    this.x = -500 + randomX;
    this.y = 58 + randomY*83;
    // Define its speed
    var randomSpeed = Math.floor(Math.random() * 200);;
    this.speed = 150 + randomSpeed;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // dt parameter will ensure the game runs at the same speed for all computers.
    if (this.x < 505) {
      // Move to the right according to enemy's speed
      this.x += (this.speed * dt);
    } else {
      // Remove the enemy that leaves the canvas and create a new one
      var index = allEnemies.indexOf(this);
      allEnemies.splice(index, 1);
      allEnemies.push(new Enemy);
    }
    // Check whether the enemy collide with the player
    this.handleCollision();
};

// Check collision, if true, return char and restart score
Enemy.prototype.handleCollision = function() {
    if (this.x < player.x + 38 && this.x + 55 > player.x && this.y === player.y) {
      this.decreaseHeart();
  		player.reset();
    }
};

// Decrease heart number if collision happened
Enemy.prototype.decreaseHeart = function() {
  var hearts = document.getElementsByClassName("heart");
  hearts[0].remove();
  if (hearts.length === 0) {
    displayResult();
  }
}

// Function to display result-modal
function displayResult() {
  var el = document.querySelector(".result-modal");
  el.style.display = "block";

  var result = document.querySelector("#result");
  result.textContent = score;

  var button = document.querySelector(".button");
  button.addEventListener("click", function() {
    el.style.display = "none";
    restartGame();
  });
}

// Create enemies and hearts again
function restartGame() {
  // Create Enemies
  this.allEnemies = [];
  createEnemies();
  // Create hearts
  var heartDiv = document.querySelector("#heart-div");
  var img = document.createElement("img");
  img.src = "images/Heart.png";
  img.classList.add("heart");
  heartDiv.innerHTML = "";
  for (var i=0; i<3; i++) {
    heartDiv.appendChild(img.cloneNode(true));
  }
  // Return char to starting point
  player.reset();
  // Make score zero and display it
  score = 0;
  document.getElementById('score').textContent = score;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
  this.startingX = 202;
  this.startingY = 390;
  this.x = this.startingX;
  this.y = this.startingY;
  this.sprite = 'images/char-boy.png';
}

// Check whether player reached to water
Player.prototype.update = function() {
  if (this.y === -25) {
    this.success();
    this.reset();
  }
};

// Return char to starting point
var score = 0;
Player.prototype.success = function() {
  score += 1;
  document.getElementById("score").textContent = score;
};

// Return char to starting point
Player.prototype.reset = function() {
  this.x = this.startingX;
  this.y = this.startingY;
};

// Render char on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the char if it did not reach to the border
Player.prototype.handleInput = function(allowedKeys) {
  switch (allowedKeys) {
    case "left":
    if (this.x>0) {
      this.x-=101;
    }
    break;
    case "right":
    if (this.x<404) {
      this.x+=101;
    }
    break;
    case "up":
    if (this.y>-25) {
      this.y-=83;
      break;
    }
    case "down":
    if (this.y<390) {
      this.y+=83;
    }
    break;
  }
};


// Create enemies and place them in allEnemies array
var allEnemies = [];
var enemyNumber = 6;
function createEnemies() {
  for (var i = 0; i<enemyNumber; i++) {
    allEnemies.push(new Enemy);
  }
}
createEnemies();


// Place the player object in player variable
var player = new Player ();


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
