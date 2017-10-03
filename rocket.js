function Rocket(dna) {
  this.position = createVector(width/2, height);
  this.velocity = createVector();
  this.acceleration = createVector();
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA;
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.calcFitness = function() {
    var distance = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(distance, 0, width, width, 0);
  }

  this.update = function() {
    this.applyForce(this.dna.genes[count]);

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


