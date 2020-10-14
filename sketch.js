
var monkey , monkey_running
var bg, bgImage;
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var sTime = 0;
var gameState = 0;
function preload() {
  bgImage = loadImage("jungle.jpg")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  foodGroup = new Group();
  obstacleGroup = new Group();
}



function setup() {
  createCanvas(400, 400)
  bg = createSprite(200, 200, 600, 600);
  bg.velocityX = -4;
  bg.addImage("bgg", bgImage)
  ground = createSprite(400, 370, 900, 20)
  ground.velocityX = 4/-1
  ground.x=ground.width/2
  ground.visible = false;
  monkey = createSprite(80, 315, 99, 42)
  monkey.addAnimation("monkey_moving", monkey_running)
  monkey.scale = 1/10
  

  
}


function draw() {
  if (frameCount % 20 == 0) {
    sTime += 1
  }
  monkey.velocityY += 1
  monkey.collide(ground)
  if (ground.x < 0) {
    ground.x = ground.width/2
  }
  if (bg.x < -bg.width/10) {
    bg.x = bg.width/2
  }
  if (keyDown("space") && monkey.y == 329.3 && gameState == 0) {
    monkey.velocityY = -13
  }
  if (gameState == 0) {rocks()}
  if (foodGroup.isTouching(monkey)) {
    score += 2
    foodGroup.destroyEach();
  }
  if (obstacleGroup.isTouching(monkey)) {
    gameState = 1;
    background("black")
    monkey.visible = false;
    bg.visible = false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(22.1)
    text("Game Over!", 140, 200)
  }
  if (gameState == 0) {bananaFunc();
  drawSprites();
  fill("white")
  text("Score: "+score, 330, 30);
  text("Survival Time: "+sTime, 0, 30);}
}

function rocks() {
  if (frameCount % 110 == 0) {
    obstacle = createSprite(400, 350, 24, 242)
    obstacle.addImage("obimage", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle)
  }
}

function bananaFunc() {
  if (frameCount % 85 == 0) {
    banana = createSprite(400, Math.round(random(280,200)), 24, 1241)
    banana.addImage("bananaanannana", bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 84;
    foodGroup.add(banana)
  }
}




