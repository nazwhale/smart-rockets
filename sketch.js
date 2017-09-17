var rocket;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
}

function draw() {
  background(0);
  rocket.update();
  rocket.show();
}

function Rocket() {
  this.position = createVector(width/2, height);
  this.velocity = createVector(0, -1);
  this.acceleration = createVector();

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.show = function() {
    rectMode(CENTER);
    rect(this.position.x, this.position.y, 10, 50);

  }
}



