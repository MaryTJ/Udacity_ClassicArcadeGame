//Expression for code to execute in strict mode
"use strict";
//Query selector for modal and buttons
let noBtn = document.querySelector(".noBtn");
let yesBtn = document.querySelector(".yesBtn");
let modal = document.querySelector(".modal");
let gameStop = 0;

//Entity super class from which enemy and player class will be inherited
class Entity {
    //constructor for assigning x and y coordinates
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//render function
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enemy class that inherits from Entity class
class Enemy extends Entity {
    //constructor for assigning x, y and speed values to Enemy 
    constructor(x,y,speed) {
        super(x,y);
        //setting sprite to the eney bug character
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
    }

    //function to reset x, y coordinates and speed of enemy
    reset(x,y,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (gameStop == 1) {
        this.speed = 0
    }
    this.x += this.speed * dt;
    //check if bug has gone out of the screen
    if (this.x > ctx.canvas.width){
        this.x = 0;
        this.speed += 0.1
    }

    //Collission detection function taken from the following website
    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    
    let pwidth = 65;//setting player width
    let pheight = 80;//setting player height
    let ewidth = 70;//setting enemy width
    let eheight = 80;//setting enemy height
    
    //console.log(this.x,this.y,player.x,player.y);
    if (this.x <= player.x + pwidth && this.x + ewidth >= player.x && this.y <= player.y + pheight && eheight + this.y >= player.y) {
            player.reset();
        }
        
};


//Ploayer class inherited from entity class
class Player extends Entity {
    //setting x,y coordinates and also the sprite
    constructor (x,y){
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }
};

//Player prototype update function
Player.prototype.update = function() {
    if (this.y <= 50 && gameStop == 0) {
        //show the modal if player reaches water and stop the game
        modal.style.display = "block";
        gameStop = 1;    
    }
};

Player.prototype.reset = function() {
    //player reset function to bring it to initial coordinates
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




//Instance of enemies
const enemy1 = new Enemy(0,60,125);
const enemy2 = new Enemy(0,140,80);
const enemy3 = new Enemy(0,225,200);
//Placing all enemies in the allEnemies array
let allEnemies = [enemy1, enemy2, enemy3]

// Placing the player object in a variable called player
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
    enemy1.reset(0,60,125);
    enemy2.reset(0,140,80);
    enemy3.reset(0,225,200);
    gameStop = 0;
})
