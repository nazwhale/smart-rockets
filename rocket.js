function Rocket(dna) {
  this.position = createVector(width/2, height);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.completed = false;
  this.crashed = false;
  this.dna = dna;
  this.fitness = 0;
  this.finishTime = 0;
  this.crashTime = 0;
  //this.speedBonus; getting to the end faster is rewarded
  //this.lifeBonus; staying alive longer is rewarded

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.calcFitness = function() {
    var distance = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(distance, 0, width, width, 0);

    if (this.completed) {
      this.fitness += this.finishTime * 5;          //speed bonus
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
      this.fitness += (lifespan - this.crashTime);  //value age
      if (this.crashTime < 25) {                    //immediate crashers die out
        this.fitness = 1;
      }
    }
  }

  this.update = function(horizontal, vertical) {
    var targetDistance = dist(this.position.x, this.position.y, target.x, target.y);
    if (targetDistance < 30) {
      this.completed = true;
      this.position = target.copy();
      this.finishTime += 1;
    }

    if (this.position.x > horizontal && this.position.x < horizontal + rw && this.position.y > vertical && this.position.y < vertical + rh) {
      this.crashed = true;
      this.crashTime += 1;
    }
    if (this.position.x > width || this.position.x < 0) {
      this.crashed = true;
      this.crashTime += 1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.crashed = true;
      this.crashTime += 1;
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(4);
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


