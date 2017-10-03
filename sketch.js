var rocket;
var population;
var lifespan = 200;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
  population = new Population();
}

function draw() {
  background(0);
  population.run();
}

function Population() {
  this.rockets = [];
  this.popSize = 100;

  for(var i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.run = function() {
    for(var i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA() {
  this.genes = [];
  for (var i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D();
    this.genes[i].setMag(0.1);
  }
}

function Rocket() {
  this.position = createVector(width/2, height);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.dna = new DNA();
  this.count = 0;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.applyForce(this.dna.genes[this.count]);
    this.count++;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.show = function() {
    push();
    noStroke();
    fill(204, 102, 0, 150);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}


