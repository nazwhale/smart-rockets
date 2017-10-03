var rocket;
var population;
var lifespan = 200;
var lifeP;
var count = 0;
var target;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
  population = new Population();
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

  ellipse(target.x, target.y, 16, 16);
}
