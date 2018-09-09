
class Pool {
	constructor (outputs) {
		this.species = {};
		this.generation = 0;
		this.innovation = outputs;
		this.currentSpecies = 1;
		this.currentGenome = 1;
		this.currentFrame = 0;
		this.maxFitness = 0;
	}
	innovate () {
		this.innovation++;
		return this.innovation;
	}
}
export default Pool;