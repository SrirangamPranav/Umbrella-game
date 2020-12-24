var backgroundimg,background1;
var playerimg,player,bird,birdimg;
var birdsGroup,cloudsGroup;
var cloud,cloudimg;
var score=0;
var gameState = "play";
var gameoverimg,restartimg,gameover,restart;
var gameoverSound;
function preload()
{
  backgroundimg=loadImage("background new.jpeg");
  playerimg=loadImage("player_image-1.png");
  birdimg=loadImage("bird_image.png");
  cloudimg=loadImage("cloud_image.png");
  gameoverimg = loadImage("gameover-removebg-preview.png");
  restartimg = loadImage("red_button-removebg-preview.png");
  gameoverSound = loadSound("mixkit-arcade-fast-game-over-233.wav")
}
function setup()
{
  createCanvas(500,400);
  background1 = createSprite(200,200,10,10);
  background1.addImage(backgroundimg);
  background1.scale=3.2;
  
  player=createSprite(50,200,20,50);
  player.addImage(playerimg);
  player.scale=0.6;
  //player.debug = true;
  
  gameover = createSprite(250,200,10,10)
  gameover.addImage(gameoverimg);
  
  restart = createSprite(250,250,10,10)
  restart.addImage(restartimg)
  restart.scale = 0.2;
    
  
  birdsGroup=createGroup();
  cloudsGroup=createGroup();
 
}
function draw()
{
  if(background1.x<0)
   {
     background1.x=background1.width/2;
   }
   background(180);
  if(gameState === "play"){
    score = score + Math.round(getFrameRate()/60)
    gameover.visible = false;
    restart.visible = false;
    background1.velocityX=-2;
   if(keyDown("up")&&player.y>40){
       player.y = player.y-5
    }
   if(keyDown("down")&&player.y<360){
      player.y = player.y+5
    }
   spawnbirds();
   spawnclouds();
  }
   if(player.isTouching(birdsGroup)){
      birdsGroup.destroyEach();
      cloudsGroup.destroyEach();
      gameState = "end"
      gameover.visible = true;
      restart.visible = true;
      background1.velocityX = 0;
      gameoverSound.play();
      //score=score+1;   
    } 
  if(player.isTouching(cloudsGroup)){
      cloudsGroup.destroyEach();
      birdsGroup.destroyEach();
      gameState = "end"
      background1.velocityX =0
      gameover.visible = true;
      restart.visible = true;
      gameoverSound.play();
      //score=score+1;
    }
  console.log(score)
  if(gameState === "end" && mousePressedOver(restart)){
    gameState = "play"
    score = 0
  }
  drawSprites();
  fill("red")
  textSize(20)
  text("score:"+score,400,20)
}
function spawnbirds(){
  if(frameCount%80===0){
    bird = createSprite(500,Math.round(random(40,380))) 
     bird.addImage(birdimg);
     bird.scale=0.5;
     bird.velocityX=-(2+(score/10))
     bird.lifetime=250;
     birdsGroup.add(bird);
  }
}
function spawnclouds(){
  if(frameCount%120===0){
  cloud = createSprite(500,Math.round(random(40,380))) 
     cloud.addImage(cloudimg);
     cloud.scale=0.5;
     cloud.velocityX=-(2+(score/10))
     cloud.lifetime=250;
     cloudsGroup.add(cloud);
  }
}