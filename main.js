use2D = true; 

var $score = 0;
var numFood = 12;
var foodArray = [];
var foodBaby = [];

var snake = new Sprite();
	snake.width = 10;
	snake.height = 10;
	snake.y = 300;
	snake.x = 600;
	snake.image = Textures.load("Image/pixel.png");
	
function food(x,y,vel){
	Sprite.call(this);
	this.image = Textures.load("Image/food.png");
	this.y=y;
	this.x=x;
	this.vel = vel;
	this.width = 20;
	this.height = 20;
	this.foodbaby = [];
}
food.prototype = new Sprite();

/*var food = new Sprite();
	food.width = 20;
	food.height = 20;
	food.y = Math.random()*(450-230)+230;
	food.x = Math.random()*(900-200)+200;
	food.image = Textures.load("Image/food.png");*/

var pellet = new Sprite();
	pellet.width = 10;
	pellet.height = 10;
	pellet.y = randomGenerator(550,500);
	pellet.x = randomGenerator(900,200);
	pellet.image = Textures.load("Image/pellet.png");
	
world.addChild(snake);
world.addChild(pellet);

gInput.addBool(65,"left");
gInput.addBool(68,"right");
gInput.addBool(83,"down");
gInput.addBool(87,"up");

function resetPellet(){
 	pellet.y = randomGenerator(0,canvas.height);
	pellet.x = randomGenerator(0,canvas.width);
	console.log(pellet.x);
}
function randomGenerator(first,second){
	return Math.random()*(second-first)+first; 
}
function resetGame(){
	$("#score").text($score=0);
	pellet.y = randomGenerator(450,230);
	pellet.x = randomGenerator(900,200);
	food.y = randomGenerator(450,230);
	food.x = randomGenerator(900,200);
	snake.x = randomGenerator(900,200);
	snake.y = randomGenerator(450,230);
}

function checkEatten(sprite,sprite2){
	var SminX = sprite.x;
	var SmaxX = sprite.x + sprite.width;
	var SminY = sprite.y;
	var SmaxY = sprite.y + sprite.height;
	
	var PminX = sprite2.x;
	var PmaxX = sprite2.x + sprite2.width;
	var PminY = sprite2.y;
	var PmaxY = sprite2.y + sprite2.height;
	
	if( ((SminX <= PmaxX && SminX >= PminX) || (SmaxX >= PminX && SmaxX <= PmaxX)) && ((SminY<=PmaxY && SminY >= PminY) || (SmaxY >= PminY && SmaxY <= PmaxY))){
		return true;
	}
	return false;
}

world.update = function(d){
	if(foodArray.length < numFood){
		var newFood = new food(randomGenerator(900,200),randomGenerator(450,230),randomGenerator(5.0,2.0));
		foodArray.push(newFood);
		this.addChild(newFood);
	}
	this.updateChildren(newFood);
	if(checkEatten(food.prototype, snake)){
		resetGame();
	}
}

snake.update = function(d){
	var move = 3;
	console.log(snake.x);
	console.log(snake.y);
	if(gInput.left){
		this.x -= move;
	}
	if(gInput.right){
		this.x += move;
	}
	if(gInput.down){
		this.y += move;
	}
	if(gInput.up){
		this.y -= move;
	}
	
	if(checkEatten(this,pellet)){
		world.removeChild(pellet);
		resetPellet();
		world.addChild(pellet);
		$("#score").text(++$score);
	}
	
};
//updates the food particle
food.prototype.update = function(d){
	
	if(snake.x > this.x){
		this.x += this.vel;
	}
	if(snake.y > this.y){
		this.y += this.vel;
	}
	if(snake.y < this.y){
		this.y -= this.vel;
	}
	if(snake.x < this.x){
		this.x -= this.vel;
		
	if(checkEatten(this,pellet)){
		world.removeChild(pellet);
		resetPellet();
		world.addChild(pellet);
		$("#score").text(--$score);
	}
};

	

