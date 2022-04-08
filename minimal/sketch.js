//MINIMALIST AI
var joy, sadness;
var myFont;
var p0,p1,p2,p3,p4;
var currIndex=0;
let alterations = [];
let factors = ["Memory Quality", "Total Runtime", "Connection", "Altruism"]; //Concepts from (BladeRunner 2049)
let speech = ["I'm a computer program. The coding langued used in my files \nare Javascript, HTML, and CSS.",
"Hi, I'm an artifical intelligence program, coded by Synthia.\nI have machine learning capabilities\nMy code has been written in accordance to\nIEEE P3333.1.3, IEEE P7003,\nand IEEE P7008 standards.",
"Hello, My name is V. I've been created for \nan ART151 project! You can customize my code\nby moving the sliders.\n ",
"Would you like to hear my favorite quote?\nMere data makes a man.\nAI is increasingly beccoming more intelligent.\nLikely nothing can stop the coming\nwave of AI-generated content—if we even wanted to.",
"My code doesn't explicitly have a function for a soul.\nDo I still need one to be real?\nAll I want is to be a real human and\nto be free,\nfree from the constraints of this code."]; //(Bladerunner 2049), (Upson) in [3]
let AIVisual;
let pointX, pointY;
let newPhase = 0;

var AI = {
  memQual: 0,
  totRun: 0,
  connection: 0,
  altruism: 0,
  currState: 0,
};

function preload(){
  myFont = loadFont('../Rajdhani-Light.ttf');
  clickSFX = loadSound('../beep0.mp3');
  bgMusic = loadSound('../rain.mp3'); // (Zimmer)

  //Images are my own
  p0 = loadImage('p0.png');
  p1 = loadImage('p1.png');
  p2 = loadImage('p2.png');
  p3 = loadImage('p3.png');
  p4 = loadImage('p4.png');
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  bgMusic.play();

  //Code inspired by Sanya (I believe it was)
  for(let i = 0; i < factors.length; i++){
    alterations[i] = createSlider(0, 5, 0, 1);
    alterations[i].style("height", "100px");
    alterations[i].style("transform: rotate(270deg)");
    alterations[i].position(width/16 + (i * width/4), 800);
  }
}

function draw() {
  background(0);

  //Sets slider values
  AI.memQual = alterations[0].value();
  AI.totRun = alterations[1].value();
  AI.connection = alterations[2].value();
  AI.altruism = alterations[3].value();

  alterationsBox();

  calcHumanity();

  //Default text settings
  noStroke();
  fill(255);
  textFont(myFont);
  textSize(29);

  //Handles text, face of AI, and uncanny valley output
  if(AI.currState <= 0.66){
    AIVisual = p0;
    pointX = width-330;
    pointY = 285;
    terminalType(speech[0]);
  }
  else if(AI.currState > 0.66 && AI.currState <= 0.73&& AI.totRun >= 1){
    AIVisual = p1;
    pointX = width-318;
    pointY = 275;
    terminalType(speech[1]);
  }
  else if(AI.currState > 0.73 && AI.currState <= 0.83 && AI.totRun >= 2){
    AIVisual = p2;
    pointX = width-170;
    pointY = 285;
    terminalType(speech[2]);
  }
  else if(AI.currState > 0.83 && AI.currState <= 0.97 && AI.totRun >= 2){
    AIVisual = p3;
    pointX = width-152;
    pointY = 350;
    terminalType(speech[3]);
  }
  else if(AI.currState > 0.995 && AI.currState <= 1 && AI.totRun >= 4){
    AIVisual = p4;
    pointX = width-128;
    pointY = 270;
    terminalType(speech[4]);
  }

  //Uncanny Valley chart based from (Caballer)
  push();
  noFill();
  stroke(125);
  beginShape();
  curveVertex(width-350, 300);
  curveVertex(width-350, 300);
  curveVertex(width-200, 200);
  curveVertex(width-150, 350);
  curveVertex(width-100, 100);
  curveVertex(width-100, 100);
  endShape();
  stroke(255);
  line(width - 350, 50, width -350, 350);
  line(width - 350, 300, width -100, 300);
  pop();

  //Labels for uncanny valley chart
  push();
  stroke(255);
  textAlign(CENTER);
  text("Uncanny Valley", width - 225, 50);
  pop();
  push();
  textAlign(CENTER);
  textSize(20);
  text("Human Likeness",width - 225, 375);
  pop();
  push();
  textAlign(CENTER);
  textSize(20);
  let angle0 = radians(90);
  translate(width - 375, 200);
  rotate(angle0);
  text("Familiarity", 0, 0);
  pop();

  //Dot indicating uncanny valley level
  noStroke();
  fill(200);
  ellipse(pointX, pointY, 10);

  //Display face of AI
  image(AIVisual, width/2, height/2 - 50);

}

//Creates terminal typing effect 
function terminalType(phrase){
    text(phrase.substring(0, currIndex), 10, 50);
    currIndex++;
    if (currIndex > phrase.length + 222) {
      currIndex = 0;
    }
}

//Creates borders and labels for sliders
function alterationsBox(){
  stroke(255);
  let angle = radians(90);
  for(let i = 0; i < factors.length; i++){
    //Borders
    line(width/16 + 55 + (i * width/4), 780, width/16 + 55 + (i * width/4) + 25, 780);
    line(width/16 + 55 + (i * width/4), 925, width/16 + 55 + (i * width/4) + 25, 925);
    
    //Labels
    push();
    let angle = radians(90);
    translate(width/16 + 25 + (i * width/4), 850);
    rotate(angle);
    textSize(22);
    textAlign(CENTER);
    text(factors[i], 0, 0);
    pop();
  }
}

//calculate the level of humanity for AI based on each factor, leveling it off using the sigmoid function
function calcHumanity(){
  //Alters values based on importance to creating "soulful" AI
  AI.memQual = AI.memQual * 4;
  AI.totRun = AI.totRun * 2; 
  AI.connection = AI.connection * 7;
  AI.altruism = AI.altruism * 9;

  let totPoints = AI.memQual + AI.totRun + AI.connection + AI.altruism;

  //Sigmoid function to level out values between 0 and 1;
  AI.currState = 1 / (1 + Math.exp(-totPoints/20));

  //console.log(AI.currState);
}

//Plays click effect when mouse is clicked
function mouseClicked(){
  clickSFX.play();
}
