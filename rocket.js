function Rocket(dna) {
  this.position = createVector(width/2, height);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.completed = false;
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
    if (this.completed) {
      this.fitness *= 10;
    }
  }

  this.update = function() {
    var distance = dist(this.position.x, this.position.y, target.x, target.y);
    if (distance < 10) {
      this.completed = true;
      this.position = target.copy();
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
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


