var rocket;
var population;
var lifespan = 100;
var lifeP;
var count = 0;
var target;
var maxForce = 0.2;
var mutationRate = 0.01;
var mutationAgent = new MutationAgent(mutationRate);

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
  population = new Population(mutationAgent);
  lifeP = createP();
  target = createVector(width/2, 50)
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);

  count++;

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }

  fill(255);
  rect(100, 150, 200, 10);
  ellipse(target.x, target.y, 16, 16);
}

function MutationAgent(rate) {
  return {
    trigger: function() {
      return random(1) < rate;
    }
  }
}
