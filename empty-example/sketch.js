var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;

function setup() {
  createCanvas(displayWidth, displayHeight,'webgl');
}

function draw() {
 ellipse(mouseX,mouseY,Math.random()*100,Math.random()*100);

    push();
    translate(0,0);
    fll()
    text(Math.floor(getFrameRate()), width/2, height/2);
    pop();
}