use2D = true; 
var $enemy = 1;
var $score = 0;
var numFood = 60;
var numE = 1;
var foodArray = [];
var $highscore = 0;

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

function checkEatten(sprite,x,y,width,height){
	var SminX = sprite.x;
	var SmaxX = sprite.x + sprite.width;
	var SminY = sprite.y;
	var SmaxY = sprite.y + sprite.height;
	
	var PminX = x;
	var PmaxX = x + width;
	var PminY = y;
	var PmaxY = y + height;
	
	if( ((SminX <= PmaxX && SminX >= PminX) || (SmaxX >= PminX && SmaxX <= PmaxX)) && ((SminY<=PmaxY && SminY >= PminY) || (SmaxY >= PminY && SmaxY <= PmaxY))){
		return true;
	}
	return false;
}

world.update = function(d){
	if(foodArray.length < numE){
		var newFood = new food(randomGenerator(900,200),randomGenerator(450,230), randomGenerator(4.0, 0.5));
			foodArray.push(newFood);
			this.addChild(newFood);	
	}
	this.updateChildren(newFood);
}

snake.update = function(d){
	var move = 7;
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
	if(this.x < 0){
		this.x = canvas.width;
	}
	if(this.y < 0){
		this.y = canvas.height;
	}
	if(this.x > canvas.width){
		this.x = 0;
	}
	if(this.y > canvas.height){
		this.y = 0;
	}
	if(checkEatten(this,pellet.x,pellet.y,10,10)){
		world.removeChild(pellet);
		resetPellet();
		world.addChild(pellet);
		$("#score").text(++$score);
		if($score >= $highscore){
			$highscore = $score;
			$("#highscore").text($highscore);
		}
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
	}	
	
	if(checkEatten(snake,this.x,this.y,20,20)){
		if(numE < numFood){
			$("#enemy").text(++$enemy)
			numE += 1;
		}
		resetGame();
		
	}
	if(checkEatten(pellet,this.x,this.y,20,20)){
		world.removeChild(pellet);
		resetPellet();
		world.addChild(pellet);
		$("#score").text(--$score)
		
		if(numE < numFood){
			numE += 1;
			 $("#enemy").text(++$enemy)
		}
		
	}
};

	

