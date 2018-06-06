// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//using princess character
var Player = function(){
     this.pSprite = 'images/char-boy.png';
};

//Player prototype update function
Player.prototype.update = function(dt) {

};

//Draw player on screen using render function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.pSprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function main(){

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
enemy1.x = 0;
enemy1.y = 60;
enemy2.x = 0;
enemy2.y = 140;
enemy3.x = 0;
enemy3.y = 225;
allEnemies = [enemy1,enemy2,enemy3];
/* trying to assign coordinates automatically
for (let i = 1; i <= allEnemies.length; i++) {
    console.log(allEnemies[i])
    //allEnemies[i].x = allEnemies[i-1].x;
    //allEnemies[i].y = allEnemies[i-1].y + 100 ;
}
*/

const playerGirl = new Player();
playerGirl.x = enemy1.x + 200;
playerGirl.y = enemy1.y + 425;
player = playerGirl;

}

main();
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


