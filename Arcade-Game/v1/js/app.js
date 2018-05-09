// Enemies our player must avoid
class Enemy {
  constructor(x, y, h, w, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.h = 60;
    this.w = 80;
    this.speed = ~~(Math.random() * 210) + 90;
    this.sprite = 'images/missile.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=  dt * this.speed;
    if (this.x >= 520) {
      this.x = -200;
      this.speed = ~~(Math.random() * 210) + 90;
    }

    if (this.x < player.x + player.w &&
        this.x + this.w > player.x &&
        this.y < player.y + player.h &&
        this.h + this.y > player.y) {
      setTimeout(() => {
        if (!player.dead) {
          player.dead = true;
          player.y = 375;
          player.x = 220;
          console.log(++player.hits);
        }
      }, 100);
      player.dead = false;
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y, h, w, sprite, dead, hits) {
    this.dead = false;
    this.hits = 0;
    this.x = x;
    this.y = y;
    this.h = 80;
    this.w = 60;
    this.sprite = 'images/char-boy.png';
  }

  update() {
    if (this.x > 420) this.x = 420;
    if (this.x < 20) this.x = 20;
    if (this.y > 455) this.y = 455;
    if (this.y <= 55) this.y = 375;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  move(dir) {
    console.log(dir);
    switch (dir) {
      case 'left':
        this.x -= 101;
        break;
      case 'up':
        this.y -= 83;
        break;
      case 'right':
        this.x += 101;
        break;
      case 'down':
        this.y += 83;
        break;
    }
    player.update();
  }
}

/*class Lore {
  constructor
}*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(-200, 140), new Enemy(-200, 225), new Enemy(-200, 310), new Enemy(-200, 140), new Enemy(-200, 225), new Enemy(-200, 310)];
const player = new Player(220, 375);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let dirs = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.move(dirs[e.keyCode]);
});