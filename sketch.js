var rocket;
var population;
var lifespan = 400;
var lifeP;
var mutationP;
var count = 0;
var target;
var maxForce = 0.2;
var mutationRate = 0.01;
var mutationAgent = new MutationAgent(mutationRate);

var ry = 150;
var rw = 200;
var rh = 10;

function setup() {
  createCanvas(400, 300);
  population = new Population(mutationAgent);
  lifeP = createP();
  mutationP = createP().html(mutationRate);
  target = createVector(width/2, 50)
}

function draw() {
  // Grab the current rate from the slider
  // update the MutationAgent with new rate
  var horizontal = parseInt(document.getElementById("horizontal").value);
  var vertical = parseInt(document.getElementById("vertical").value);
  background(0);
  population.run(horizontal, vertical);
  lifeP.html(count);

  count++;

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    mutationRate = parseInt(document.getElementById("mutationRate").value) / 100;
    mutationP.html(mutationRate);
    mutationAgent.rate = mutationRate;
  }

  fill(255);
  rect(horizontal, vertical, 200, 10);
  ellipse(target.x, target.y, 30, 30);
}

function MutationAgent(initialRate) {
  return {
    rate: initialRate,
    trigger: function() {
      return random(1) < this.rate;
    }
  }
}
