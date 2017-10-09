function Population(mutationAgent) {
  this.rockets = [];
  this.popSize = 200;
  this.matingPool = []

  for(var i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket(new DNA(mutationAgent));
  }

  this.evaluate = function() {

    var maxFit = 0;

    for (var i = 0; i < this.popSize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    }

    for (var i = 0; i < this.popSize; i++) {
      this.rockets[i].fitness /= maxFit;
    }
    
    this.matingPool = [];

    // the fitter the rocket, the greater the chance of it being selected from the mating pool
    for (var i = 0; i < this.popSize; i++) {
      var n = this.rockets[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function() {
    var babies = [];
    for (var i = 0; i < this.rockets.length; i++) {
      var fatherDNA = random(this.matingPool).dna;
      var motherDNA = random(this.matingPool).dna;
      var childDNA = fatherDNA.crossover(motherDNA);
      childDNA.mutate();
      babies[i] = new Rocket(childDNA);
    }
    this.rockets = babies;
  }

  this.run = function(horizontal, vertical) {
    for(var i = 0; i < this.popSize; i++) {
      this.rockets[i].update(horizontal, vertical);
      this.rockets[i].show();
    }
  }
}

