use2D = true; 

var snake = new Sprite();
	snake.width = 10;
	snake.height = 10;
	snake.y = 300;
	snake.x = 600;
	snake.image = Textures.load("Image/pixel.png");
	
var food = new Sprite();
	food.width = 20;
	food.height = 20;
	food.y = Math.random()*(450-230)+230;
	food.x = Math.random()*(900-200)+200;
	food.image = Textures.load("Image/food.png");

var pellet = new Sprite();
	pellet.width = 10;
	pellet.height = 10;
	pellet.y = Math.random()*(450-230)+230;
	pellet.x = Math.random()*(900-200)+200;
	pellet.image = Textures.load("Image/pellet.png");
	
world.addChild(snake);
world.addChild(food);
world.addChild(pellet);

gInput.addBool(65,"left");
gInput.addBool(68,"right");
gInput.addBool(83,"down");
gInput.addBool(87,"up");

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
		console.log("I dont git this");
		world.removeChild(pellet);
		pellet.y = Math.random()*(450-230)+230;
		pellet.x = Math.random()*(900-200)+200;
		world.addChild(pellet);
	}
	
};

food.update = function(d){
	var move = 2;
	if(snake.x > food.x){
		this.x += move;
	}
	if(snake.y > food.y){
		this.y += move;
	}
	if(snake.y < food.y){
		this.y -= move;
	}
	if(snake.x < food.x){
		this.x -= move;
	}
	if(checkEatten(this,pellet)){
		world.removeChild(pellet);
		pellet.y = Math.random()*(450-230)+230;
		pellet.x = Math.random()*(900-200)+200;
		world.addChild(pellet);
	}
};


	

