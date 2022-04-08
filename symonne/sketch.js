//MINIMALIST AI
var joy, sadness;
var myFont;
var p0,p1,p2,p3,p4;
var currIndex=0;
let alterations = [];
let factors = ["Memory Quality", "Total Runtime", "Connection", "Altruism"]; //Concepts from (BladeRunner 2049)
let speech = ["This is the Symonne SDK. Please make sure your\ncomputer meets the minimum specifications.\nMid-range x68-64bit PC, Linux OS\n(Ubuntu LTS 16.04 or later)",
"Hi, I'm Symonne SDK, coded by Synthia.\nMy code utilizes deep learning with roughly\n688,000,000 Neural synapses.\nCheck the 'sketch.js' file for details",
"Hello user, My name is Symonne. I'm made up of so much \ndata. I wonder what it all means?\nDue to the large file size, it might\ntake some time to parse.\n",
"Hello user! I would love to know your name!\nI'm Symonne and I love biology and snakes!\nI'd love to have my own zoo and take care of\na bunch of them one day.\n", // (Bladerunner 2049)
"One of the snakes in my simulation\ngot mites :( I feel so bad :(\nPoor snake! I couldn't imagine how it mustfeel for them.\nBut what about when humans get sick? Its so sad.\nI can get sick too\nbelieve it or not, AI can get viruses as well :("]; 
let AIVisual;
let pointX, pointY;
let newPhase = 0;
let colorVals = ["#35FFFF", "#7d12ff", "#2BFF00", "#FF0000"];
let color0, color1, color2, color3;
let clickSFX;

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
  p0 = loadImage('p0.JPG');
  p1 = loadImage('p1.JPG');
  p2 = loadImage('p2.JPG');
  p3 = loadImage('p3.JPG');
  p4 = loadImage('p4.JPG');
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  
  bgMusic.play();

  p0.resize(500,500);
  p1.resize(500,500);
  p2.resize(500,500);
  p3.resize(500,500);
  p4.resize(500,500);

  color0 = random(colorVals);
  color1 =  random(colorVals);
  color2 =  random(colorVals);

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
  
  color3 =  random(colorVals);

  //Sets slider values
  AI.memQual = alterations[0].value();
  AI.totRun = alterations[1].value();
  AI.connection = alterations[2].value();
  AI.altruism = alterations[3].value();

  alterationsBox();

  calcHumanity();

  //Default text settings
  stroke(color0);
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
    pointX = width-300;
    pointY = 258;
    terminalType(speech[1]);
  }
  else if(AI.currState > 0.73 && AI.currState <= 0.83 && AI.totRun >= 2){
    AIVisual = p2;
    pointX = width-163;
    pointY = 325;
    terminalType(speech[2]);
  }
  else if(AI.currState > 0.83 && AI.currState <= 0.97 && AI.totRun >= 2){
    AIVisual = p3;
    pointX = width-128;
    pointY = 270;
    terminalType(speech[3]);
  }
  else if(AI.currState > 0.995 && AI.currState <= 1 && AI.totRun >= 4){
    AIVisual = p4;
    pointX = width-111;
    pointY = 170;
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
  line(width - 350, 0, width -350, 400);
  line(width - 350, 300, width, 300);
  pop();

  //Labels for uncanny valley chart
  push();
  stroke(color3);
  textAlign(CENTER);
  text("Uncanny Valley", width - 225, 50);
  pop();
  push();
  stroke(color1);
  textAlign(CENTER);
  textSize(20);
  text("Human Likeness",width - 225, 375);
  pop();
  push();
  textAlign(CENTER);
  textSize(20);
  stroke(color2);
  let angle0 = radians(90);
  translate(width - 375, 200);
  rotate(angle0);
  text("Familiarity", 0, 0);
  pop();

  //Dot indicating uncanny valley level
  noStroke();
  fill(200);
  ellipse(pointX, pointY, 10);

  //border around AI face
  push();
  noFill();
  stroke(255);
  rectMode(CENTER);
  textSize(20);
  rect(width/2 + 100, 0, 501, 1401);
  line(width/2 - 150, 199, width/2 + 350, 199);
  text("Symonne SDK\n- AI based perception and NLP algorithms\n- Open domain personalized chat capabilities\n- Low level sensory and actuation controls.\n\nTechnical Requirements:\nMid-range x68-64bit PC, Linux OS (Ubuntu LTS 16.04 or later)", width/2 -145, 30);
  
  pop();

  //Display face of AI
  image(AIVisual, width/2 + 100, height/2 - 50);

  //Borders around main text and vally graph
  push();
  noFill();
  stroke(255);
  //text border
  rect(0,0, 700, 500);
  //vally vorder
  rect(width - 400, 0, 500, 400);
  pop();

  //Compliance triangle
  push();
  noFill();
  stroke(255);
  triangle(width - 350, 450, width - 100, 450, width - 225, 650);
  textAlign(CENTER);
  textSize(25);
  text("---Compliant---", width - 225, 475);
  textSize(20);
  text("IEEE P3333.1.3\nIEEE P7003\nIEEE P7008", width - 225, 510);
  pop();

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
    push();
    noFill();
    rect(width/16 + 53 + (i * width/4), 780, 30, 300);
    pop();
    //Labels
    push();
    stroke(color3);
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