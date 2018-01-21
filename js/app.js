// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var randomX = Math.floor(Math.random() * Math.floor(200));
    var randomY = Math.floor(Math.random() * Math.floor(3));
    this.x = -300 + randomX;
    this.y = 58 + randomY*83;
    var randomSpeed = Math.floor(Math.random() * Math.floor(100));;
    this.speed = 150 + randomSpeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x += (this.speed * dt);
    } else {
      this.x = -200
    }
    var handle = this.handleCollision.bind(this);
    handle();
};

// Check collision, if true, return char and restart score
Enemy.prototype.handleCollision = function() {
    if (this.x < player.x + 38 && this.x + 55 > player.x &&
        this.y === player.y) {
  		score = 0;
  		document.getElementById('score').textContent = score;
  		player.reset();
    }
};

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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyNumber = 6;
for (var i = 0; i<enemyNumber; i++) {
  allEnemies.push(new Enemy);
}

// Place the player object in a variable called player
var player = new Player ();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
