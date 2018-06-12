"use strict";
// Enemies our player must avoid
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
let noBtn = document.querySelector(".noBtn");
let yesBtn = document.querySelector(".yesBtn");
let modal = document.querySelector(".modal");

class Entity {
    constructor(x, y) {

        this.x = x;
        this.y = y;
    }
}

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Enemy extends Entity {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x,y,speed) {
        super(x,y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    set(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //check if bug has gone out of the screen
    if (this.x > ctx.canvas.width){
        this.x = 0;
        this.speed += 0.1
    }

    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    
    let pwidth = 65;//69;
    let pheight = 80;//76;
    let ewidth = 75;//97;
    let eheight = 60;//67;
    
    if (this.x <= player.x + pwidth && this.x + ewidth >= player.x && this.y <= player.y + pheight && eheight + this.y >= player.y) {
            player.reset();
        }
};

Enemy.prototype.reset = function(ey) {

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//using princess character
class Player extends Entity {
    constructor (x,y){
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }
};

//Player prototype update function
Player.prototype.update = function() {
    if (this.y <= 50) {
        modal.style.display = "block";
    }
};

Player.prototype.reset = function() {
    player.x = 200;
    player.y = 425;
};

//The function to make the player character move according to the keyboard input. There are checks to ensure the character doesn't leave the canvas
Player.prototype.handleInput = function(e) {
    let steps = 100;//50;
    if  ((e == 'left') && (this.x - steps > 0)) {
        this.x -= steps;
    }
    else if ((e == 'right') && (this.x + steps < 450)) {
        this.x += steps;
    }
    else if ((e == 'up') && (this.y - steps > 20)) {
        this.y -= steps;
    }
    else if  ((e == 'down') && (this.y + steps < 450)) {
        this.y += steps;
    }
};

//Draw player on screen using render function

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const enemy1 = new Enemy(0,60,125);
const enemy2 = new Enemy(0,140,80);
const enemy3 = new Enemy(0,225,200);
let allEnemies = [enemy1, enemy2, enemy3]


const player = new Player(200,425);

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

//If the user doesnot want to play the game, close the popup dialog box//
noBtn.addEventListener("click",function()
{
    modal.style.display = "none";
})

//If the user wants to play the game, close the dialog box and restart game//
yesBtn.addEventListener("click",function()
{   
    modal.style.display = "none";
    player.reset();
})
