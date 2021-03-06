var balloon, ball, bally , database;
var scene;

function preload(){
  balloon = loadImage("bal4.png");
  
  bally = loadAnimation("bal1.png", "bal2.png", "bal4.png")

  scene = loadImage("city.png");
}

function setup() {
  database=firebase.database()

  createCanvas(1200,700);
ball = createSprite(100, 590, 50, 50);
ball.addImage(balloon);
ball.scale = 0.4;

var balloonPosition=database.ref('balloon/height');
    balloonPosition.on("value" , readHeight , showError);
}

function draw() {
  background(scene); 

  textSize(25);
  fill("blue");
  stroke("red");
  strokeWeight(2)
  text("Use the arrow keys to move the hot air balloon in the sky! 😊 😁 😉", 30, 40);
  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-1,0);
  ball.changeAnimation(bally);
  
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(1,0);
    ball.changeAnimation(bally);
}
else if(keyDown(UP_ARROW)){
    updateHeight(0,-1);
    ball.addAnimation(bally);
  
  }
else if(keyDown(DOWN_ARROW)){ 
  updateHeight(0,+1);
    ball.changeAnimation(bally);
}



  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x,
    'y': height.y+y
  })
}

function readHeight(data){
  height = data.val();
  ball.x = height.x;
  ball.y = height.y;
}



function showError(){
  console.log("Error");
}