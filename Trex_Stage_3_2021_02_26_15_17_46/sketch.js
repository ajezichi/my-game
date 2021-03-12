var PLAY = 1;
var END = 0;
var gameState = PLAY;
var scene,robot;
var sceneImg,playerImg,obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img,obstacle6Img,ufoImg,groundImg;
var score=0
var jumpSound , checkPointSound, dieSound;

function preload(){
  sceneImg=loadImage("sprite_2.png")
  playerImg=loadImage("sprite_1.png");
  obstacle1Img=loadImage("obstacle1.png")
  obstacle2Img=loadImage("obstacle2.png")
  obstacle3Img=loadImage("obstacle3.png")
  obstacle4Img=loadImage("obstacle4.png")
  obstacle5Img=loadImage("obstacle5.png")
  obstacle6Img=loadImage("obstacle6.png")
  ufoImg=loadImage("sprite_0.png")
  groundImg=loadImage("ground2.png")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(2000,900);
  scene=createSprite (400,0,2000,200)
  scene.addImage("scene",sceneImg)
  scene.scale=9
scene.velocityX=-4;

  robot=createSprite(100,800);
  robot.addImage("robot",playerImg);
  robot.scale=0.2

  ground=createSprite(800,880,4000,40);
  ground.addImage("ground",groundImg)
  ground.velocityX=-4
  obstacleGroup=new Group()
  ufoGroup=new Group()
  gameOver = createSprite(800,500);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(800,550);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.7;
  restart.scale = 0.7;

  gameOver.visible = false;
  restart.visible = false;
}

function draw(){
  background(255);
  text("Score: "+ score, 400,50);
  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  if(scene.x<0){
    scene.x=scene.width/2
  }
  if(ground.x<600){
    ground.x=ground.width/2
  }
  if(score>0 && score%100 === 0){
    checkPointSound.play() 
 }
  console.log(robot.y)
  if(keyDown("space") && robot.y>=787.4){
    robot.velocityY=-15
    jumpSound.play();
  }
robot.velocityY=robot.velocityY+0.5
robot.collide(ground)
spawnObstacles()
spawnufoI()

if(obstacleGroup.isTouching(robot)){
  gameState = END;
  dieSound.play()
}
  }

  else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
    
   //set velcity of each game object to 0
    ground.velocityX = 0;
    robot.velocityY = 0;
    scene.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    ufoGroup.setVelocityXEach(0);
    
   
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    ufoGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
     reset();
   }
  }
  drawSprites()
}
function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(2000,840,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      case 4: obstacle.addImage(obstacle4Img);
              break;
      case 5: obstacle.addImage(obstacle5Img);
              break;
      case 6: obstacle.addImage(obstacle6Img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
function spawnufoI() {
  if(frameCount % 250 === 0) {
    var ufo = createSprite(2000,240,10,40);
    ufo.addImage("ufo",ufoImg)
    ufo.velocityX = -4
    ufo.y = Math.round(random(80,400));
    ufo.scale=0.6
    ufoGroup.add(ufo)
 } }
 function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  ufoGroup.destroyEach();
  
 
  
 
  
 // score = 0;
  
}