var gameState,PLAY,END;

var player,player_running,bananaImg,obstacleImg,backImg,Jungle,ground;

var gameOver,restart,gameOverImg,restartImg;

var obstaclesGroup,foodGroup;

var score;

function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("Banana.png");
  
  obstacleImg = loadImage("stone.png");
  
  backImg = loadImage("jungle.jpg");
  
  restartImg = loadImage("restart.png");
  
  gameOverImg = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600,300);

  PLAY = 1;
  END = 0;
  gameState=PLAY;
  
  score=0;
  
  jungle = createSprite(300,150,600,300);
  jungle.addImage("backImg",backImg);
  jungle.velocityX = -6;
  jungle.x = jungle.width/2;
  jungle.scale =1.2
  
  player = createSprite(50,315,20,20);
  player.addAnimation("monkey",player_running);
  player.scale = 0.12;
  
  ground = createSprite(300,315,600,30);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  ground.visible = false;
  
  restart = createSprite(300,180,20,20);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible = false;
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible = false;
  
  obstaclesGroup = new Group();
  foodGroup = new Group();
}


function draw(){
 background(255);

  if(gameState === PLAY){
    
    ground.velocityX = -(3 + 3*score/100);
    
    score= score+Math.round(getFrameRate()/80);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    
    if(keyDown("space") && player.y >=200){
      player.velocityY = -12 ;
    }
    
    player.velocityY = player.velocityY + 0.8;
    
    food();
    obstacles();
    
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score+2;
      }
    
    switch(score){
        case 10:player.scale=0.14;
          break;
        case 20:player.scale = 0.16;
          break
        case 30:player.scale = 0.18;
          break;
        case 40:player.scale = 0.20;
          break;
    }
    
    if(obstaclesGroup.isTouching(player)){
      obstaclesGroup.destroyEach();
      gameState=END;
    }
    
  }
  else if(gameState === END) {
  
    restart.visible=true;
    gameOver.visible = true;
    
    jungle.velocityX = 0;
    ground.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
  
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      gameState=PLAY;
      restart.visible = false;
      gameOver.visible = false;
      
      score =0;
      
      player.scale= 0.12;
      
      jungle.velocityX = -6;
      ground.veloctyX = -6;
    }
  }
   player.collide(ground);
   drawSprites();
   stroke("white");
   textSize(20);
   fill("white");
   text("Score: "+ score,500,50);
  
}


function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,220,40,10);
    banana.y = random(100,160);
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -(6 + 2*score/250);
    
    banana.lifetime = 134;
    
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount %300 === 0) {
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = - (6 + 3*score/500);
    obstacle.y = 290;
    
    obstacle.addImage(obstacleImg);
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;

    obstaclesGroup.add(obstacle);
  }
}