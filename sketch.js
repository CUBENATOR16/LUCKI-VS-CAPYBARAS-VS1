var PLAY=1;
var END=0;
var gameState=PLAY;
var edges;
var jumpSound,dieSound,checkpointSound;
var cactusGroup,cloudsGroup,cloverGroup;
var cactus,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var cloud,cloudImg;
var clover,cloverImg;
var ground,groundImg;
var trex ,trex_running;
var invisibleGround;
var score;
var trexCollided;
var gameOver,gameOverImg,restart,restartImg;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundImg= loadImage("ground2.png");
cloudImg= loadImage("cloud.png");
cloverImg= loadImage("clover.png");
cactus1= loadImage("obstacle1.png");
cactus2= loadImage("obstacle2.png");
cactus3= loadImage("obstacle3.png");
cactus4= loadImage("obstacle4.png");
cactus5= loadImage("obstacle5.png");
cactus6= loadImage("obstacle6.png");
trexCollided=loadAnimation("trex_collided.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
dieSound=loadSound("die.mp3");
jumpSound=loadSound("jump.mp3");
checkpointSound=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided);
  trex.x=50;
trex.scale=0.5;
  ground = createSprite(width/2,height,width,20);
  ground.addImage(groundImg);
  gameOver=createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.7;
  restart=createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale=0.5;
invisibleGround = createSprite(width/2,height-10,width,10);
invisibleGround.visible=false;
score=0;
cactusGroup=new Group();
cloudsGroup=new Group();
cloverGroup=new Group();
trex.debug=false;
trex.setCollider("rectangle",0,0,100,100);
}

function draw(){
  background("lightBlue");
  if(gameState===PLAY){
    if(touches.length>0 || keyDown("space")&&trex.y>485){
    trex.velocityY = -10;
    jumpSound.play();
    touches=[]    
  }

    if(score>0&& score%1000===0){
checkpointSound.play();
    }
    restart.visible=false;
    gameOver.visible=false;
    if(ground.x<0){
    ground.x=ground.width/2;
    }
    trex.velocityY = trex.velocityY+0.5;
    text("Score: "+score,10,50);
    score=score+Math.round(getFrameRate()/60);
    spawnClouds();
    ground.velocityX=-(2+3*score/50);
    spawnObstacles();
    if(cactusGroup.isTouching(trex)){
      dieSound.play();
gameState=END;
    }
  }else if(gameState===END){
ground.velocityX=0;
trex.velocityY=0;
cactusGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
textSize(30);
gameOver.visible=true;
restart.visible=true;
trex.changeAnimation("collided",trexCollided);
cloudsGroup.setLifetimeEach(-1);
cactusGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)){
reset();
}}
edges=createEdgeSprites();

trex.collide(invisibleGround);



  drawSprites();

}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  cloudsGroup.destroyEach();
  cactusGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
  
}





function spawnClouds(){
  if(frameCount%60===0){
cloud=createSprite(width+20,height-300,40,10);
cloud.addImage(cloudImg);
cloud.scale=0.7;
cloud.velocityX=-5;
cloud.y=Math.round(random(100,220));
cloud.depth = trex.depth;
trex.depth = trex.depth+1;
cloud.lifetime=405;
cloudsGroup.add(cloud);
  }





}


function spawnObstacles(){
  if(frameCount%20===0){
cactus=createSprite(1600,height-35,20,30);
cactus.velocityX=-(6+score/100);
var rand=Math.round(random(1,6));
switch(rand){
  case 1: cactus.addImage(cactus1);
  break;
  case 2: cactus.addImage(cactus2);
  break;
  case 3: cactus.addImage(cactus3);
  break;
  case 4: cactus.addImage(cactus4);
  break;
  case 5: cactus.addImage(cactus5);
  break;
  case 6: cactus.addImage(cactus6);
  break;
  default: break;
}
cactus.scale=0.1;
cactus.y=Math.round(random(500,720));
cactus.lifetime=295;
trex.depth=cactus.depth;
cactusGroup.add(cactus);
cactus.debug=false;
cactus.setCollider("rectangle",0,0,480,480);
  }
}