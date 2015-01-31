use2D = true; 

var snake = new Sprite();
	snake.width = 10;
	snake.height = 10;
	snake.y = 300;
	snake.x = 600;
	snake.image = Textures.load("Image/pixel.png");
	
var food1 = new Sprite();
	food1.width = 20;
	food1.height = 20;
	food1.y = Math.random()*(450-230)+230;
	food1.x = Math.random()*(900-200)+200;
	food1.image = Textures.load("Image/food.png");
	
var food2 = new Sprite();
	food2.width = 20;
	food2.height = 20;
	food2.y = Math.random()*(450-230)+230;
	food2.x = Math.random()*(900-200)+200;
	food2.image = Textures.load("Image/food.png");

var food3 = new Sprite();
	food3.width = 20;
	food3.height = 20;
	food3.y = Math.random()*(450-230)+230;
	food3.x = Math.random()*(900-200)+200;
	food3.image = Textures.load("Image/food.png");
	
var food4 = new Sprite();
	food4.width = 20;
	food4.height = 20;
	food4.y = Math.random()*(450-230)+230;
	food4.x = Math.random()*(900-200)+200;
	food4.image = Textures.load("Image/food.png");

var pellet = new Sprite();
	pellet.width = 10;
	pellet.height = 10;
	pellet.y = Math.random()*(450-230)+230;
	pellet.x = Math.random()*(900-200)+200;
	pellet.image = Textures.load("Image/pellet.png");
	
world.addChild(snake);
world.addChild(food1);
world.addChild(pellet);

var foodBabies = [];
var $score = 0;
var foodArray = [];

foodArray.push(food1);
foodArray.push(food2);
foodArray.push(food3);
foodArray.push(food4);

gInput.addBool(65,"left");
gInput.addBool(68,"right");
gInput.addBool(83,"down");
gInput.addBool(87,"up");

function resetGame(){
	$("#score").text($score=0);
	pellet.y = Math.random()*(450-230)+230;
	pellet.x = Math.random()*(900-200)+200;
	food1.y = Math.random()*(450-230)+230;
	food1.x = Math.random()*(900-200)+200;
	snake.x = Math.random()*(900-200)+200;
	snake.y = Math.random()*(450-230)+230;
	//alert("GAME OVER");
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

snake.update = function(d){
	var move = 5;
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
		pellet.y = Math.random()*(450-230)+230;
		pellet.x = Math.random()*(900-200)+200;
		world.addChild(pellet);
		$("#score").text(++$score);
	}
	if(checkEatten(this,food1)){
		resetGame();
	}
	
};

food1.update = function(d){
	var move = 2;
	//if(this.x + width-20  >= snake.x || this.x +40 >= snake.x || this.y -20 >= snake.y || this.y +40 >= snake.y){
	if(snake.x > food1.x){
		this.x += move;
	}
	if(snake.y > food1.y){
		this.y += move;
	}
	if(snake.y < food1.y){
		this.y -= move;
	}
	if(snake.x < food1.x){
		this.x -= move;
	}
	//}
	//this.x += move;
	//this.y -= move;
		
	if(checkEatten(this,pellet)){
		world.removeChild(pellet);
		pellet.y = Math.random()*(450-230)+230;
		pellet.x = Math.random()*(900-200)+200;
		world.addChild(pellet);
		$("#score").text(--$score);
	}
};


	

