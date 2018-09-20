class Species {
	constructor() {
		this.ID;
		this.topFitness = 0;
		this.staleness = 0;
		this.genomes = {};
		this.averageFitness = 0;
		this.fittestGenome = {};
		this.age = 0;
		this.generationsStagnant = 0;
		this.spawnQuantity = 0;
		this.extinct = false;
		
	}
	addMember(genome) {
		
	}
}
export default Species;