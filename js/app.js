"use strict";
// Enemies our player must avoid
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
class Entity {
    constructor(x, y) {

        this.x = x;
        this.y = y;
    }
}

Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//var Enemy = function(x, y, speed) {
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
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;

    //check if bug has gone out of the screen
    if (this.x > ctx.canvas.width){
        this.x = 0;
        this.speed += 0.1
    }
};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//using princess character
//var Player = function(x,y){
class Player extends Entity {
    constructor (x,y){
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }
};

//Player prototype update function
Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(e) {
    if  (e == 'left'){
        this.x -= 50;
    }
    else if  (e == 'right'){
        this.x += 50;
    }
    else if  (e == 'up'){
        this.y -= 50;
    }
    else if  (e == 'down'){
        this.y += 50;
    }
};

//Draw player on screen using render function
//Player.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.pSprite), this.x, this.y);
//};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const enemy1 = new Enemy(0,60,2);
const enemy2 = new Enemy(0,140,3);
const enemy3 = new Enemy(0,225,4);
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


