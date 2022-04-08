let myFont;
let y = 500;
let yTop = 200;
let yMove = .2;
let xText = -60;
let xTextMove = 0;
let xText2 = -60;
let xTextMove2 = 0;

//Load custom font
function preload(){
  myFont = loadFont('../Rajdhani-Light.ttf');
  clickSFX = loadSound('../beep0.mp3');
  bgMusic = loadSound('../rain.mp3'); // (Zimmer)
}
function setup() {
  createCanvas(windowWidth, windowHeight - 350);
  bgMusic.play();
}

function draw() {
  background(0);

  //Default values for text
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = 'purple';
  fill(255);
  textFont(myFont);
  textSize(33);
  textAlign(CENTER);
  text("Please choose your version of AI", windowWidth/2 , windowHeight/2 + 75);
  
  //Description circles for the AI
  textSize(17);
  drawingContext.shadowColor = 'teal';
  text("M", 30, windowHeight - 444);
  text("S", 70, windowHeight - 444);


  //Moves the triangle vertically
  y += yMove;
  yTop += yMove;

  //Handles borders for hovering
  if(y >= 510 || yTop >= 210){
    yMove = -yMove;
  }
  else if(y <= 490 || yTop <= 190){
    yMove = yMove * -1;
  }
  
  // //Hovering Triangle
  hoveringTri(yTop, y);

  textAlign(LEFT);
  //More info on versions
  //Minimal
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = 'teal'
  ellipse(30, windowHeight - 450, 30);
  
  xText += xTextMove;

  //Mouse hovers over M circle
  if(mouseOver(30, windowHeight - 450, 30)){
    textSize(20);
    xTextMove = 2;
    
    drawingContext.shadowBlur = 0;
    text("This AI presents with\na minimalistic aesthetic.\n\nPassed Mechanisms:\n - Emotional Recognition/Expression\n - Self-Related Modulation\n - Theory of Mind\n\nConfirmatory Factor Analysis (Pelau's Model):\n anthropomorphic characteristics: M = 2.54\n empaty: 3.63\n interaction quality: M=5.04\n trust: 4.04", xText, 30); // (Ozge) (Pelau)
    if(xText == 10){
        xTextMove = 0;
    }

  }
  else{
    xText = -60;
  }

  //Symmone
  drawingContext.shadowBlur = 5;
  ellipse(70, windowHeight - 450, 30);

  xText2 += xTextMove2;

  //Mouse hovers over S circle
  if(mouseOver(70, windowHeight - 450, 30)){
    textSize(20);
    xTextMove2 = 2;
    
    drawingContext.shadowBlur = 0;
    text("This AI presents as Symonne.\nThis AI is far more advanced in social relations\nand empathetic responses.\n\nPassed Mechanisms:\n - Emotional Recognition/Expression\n - Emotional Representation\n - Self-Related Modulation\n - Relationship-Related Modulation\n - Theory of Mind\n - (Re) Appraisal\n\nConfirmatory Factor Analysis (Pelau's Model):\n anthropomorphic characteristics: M = 5.55\n empaty: 9.99\n interaction quality: M=7.77\n trust: 8.88", xText2, 30); // (Ozge) (Pelau)
    if(xText2 == 10){
        xTextMove2 = 0;
    }
  }
  else{
    xText2 = -60;
  }
}

//Code adapted from ursula.wolz@gmail.com (found on web: https://editor.p5js.org/ursula.wolz@gmail.com/sketches/uS1GQ-2w2)
function mouseOver(mX, mY, radius){

  let xDiff = mouseX - mX;
  let yDiff = mouseY - mY;
  let distance = sqrt(xDiff * xDiff + yDiff * yDiff);

  return(distance <= radius)
}

//Makes the triange hover
function hoveringTri(yTop, y){
   //Hovering Triangle
   drawingContext.shadowBlur = 10;
   drawingContext.shadowColor = 'white';
   stroke(255);
   noFill();
   triangle(windowWidth/2, yTop, windowWidth/2 - 150, y, windowWidth/2 + 150, y);
}

//Beep sound when mouse is clicked
function mouseClicked(){
  clickSFX.play();
}