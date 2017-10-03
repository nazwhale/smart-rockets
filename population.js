function Population() {
  this.rockets = [];
  this.popSize = 100;
  this.matingPool = []

  for(var i = 0; i < this.popSize; i++) {
    this.rockets[i] = new Rocket();
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
      babies[i] = new Rocket(childDNA);
    }
    this.rockets = babies;
  }

  this.run = function() {
    for(var i = 0; i < this.popSize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

