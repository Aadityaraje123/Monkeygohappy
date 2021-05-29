var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var SurvivalTime = 0;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,350);
   
  monkey= createSprite(50,250,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(300,305,600,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  //ground.VelocityX = -2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
  background("white");
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  
  
  if(gameState ===PLAY){
    if(keyDown("space")&& monkey.y>225){
      
      monkey.velocityY= -11.5;
    }
    
    monkey.velocityY=monkey.velocityY+0.5;
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Score :" + score,350,15);
    
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score+1;
    }
    if(monkey.isTouching(obstacleGroup)){
       gameState = END;
       }
    
     spawnObstacles();
  spawnBanana();
    
  }
  if(gameState === END){
    monkey.visible = false;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    SurvivalTime = (0);
    
    
    if(keyWentDown("space")){
      gameState = PLAY;
      score = 0;
      monkey.visible  = true;
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      SurvivalTime =(0);
    }
  }
  
  

  monkey.collide(ground);
 
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : "+ SurvivalTime, 100,15);
  
  
  drawSprites();
  
}

function spawnObstacles(){
  if(frameCount % 70 === 0){
    obstacle = createSprite(625,260,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7.5;
    obstacle.lifetime = 300;
    obstacle.scale = 0.12;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount % 70 === 0){
    var x = Math.round(random(100,180));
    banana = createSprite(625,x,10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -8;
    banana.lifetime = 300;
    banana.scale = 0.12;
    
    FoodGroup.add(banana);
  }
}




