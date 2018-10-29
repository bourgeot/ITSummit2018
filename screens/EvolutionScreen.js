import Container from "../library/Container.js";



class EvolutionScreen extends Container {
	constructor(game, ga, population, onCompletion) {
		super();
		//initialization
		this.w = game.w;
		this.h = game.h;
		this.life = 3;

		//this.controls = contestants[0];
		this.onCompletion = onCompletion;
		this.evolved = ga.epoch(population);
		
	}
	update(dt, t) {
		super.update(dt, t);
		//wait for the evolution to finish before restarting the simulation

		if (this.evolved) {
			this.onCompletion();
		}
	}
}

export default EvolutionScreen;