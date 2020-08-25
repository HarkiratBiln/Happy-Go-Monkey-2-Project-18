//Creating the Variables
var backImage,backgroundJungle;
var monkey, monkey_running;
var ground,ground_image;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle_image;

var gameOver;
var score = 0;


function preload(){
  
  //Loading the Images and Animations
  backImage = loadImage("jungle2.jpg");
   
  monkey_running = loadAnimation("Monkey_01.png, Monkey_02.png, Monkey_03.png,                              Monkey_04.png, Monkey_05.png, Monkey_06.png, Monkey_07.png,                              Monkey_08.png, Monkey_09.png, Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_image = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  //Creating the Background Sprite
  backgroundJungle = createSprite(0,0,800,400);
  backgroundJungle.addImage(backImage);
  backgroundJungle.scale = 1.5;
  backgroundJungle.x = backgroundJungle.width/2;
  backgroundJungle.velocityX = -4;
  
  //Creating the Monkey Sprite
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  //Creating the Ground Sprite
  ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  //Making a Group of Bananas and Obstacles
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  //Making the Score to 0
  score = 0;
}

function draw() {
  
  background(255);
  
  
  //Making the Ground Move 
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  
  //Making the Background Move
  if(backgroundJungle.x < 100){
    backgroundJungle.x = backgroundJungle.width/2;
  }
  
    //Destroying the Banana if the Monkey is Touching it
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
  
    //Switching the Score for the Monkey
    switch(score){
        
           case 10: monkey.scale = 0.12;
                break;
                
           case 20: monkey.scale = 0.14;
                break;
                
           case 30: monkey.scale = 0.16;
                break;
                
           case 40: monkey.scale = 0.18;
                break;
                
        default: break;
    }
  
    //Making the Monkey Jump by Pressing Space
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //Making the Monkey Collide to the Ground
    monkey.collide(ground);
  
    //Creating the Banana Function
    spawnBanana();
  
    //Creating the Obstacles Function
    spawnObstacles();
 
     //Changing the Scale of the Monkey when it is Touching the Obstacle
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
        score = score-2;
    }
  
  drawSprites();
  
  //Creating the Text and Details
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: "+ score, 500,50);
}

//Function spawnBananas
function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    bananaGroup.add(banana);
  }
}

//Function spawnObstacles
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_image);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  