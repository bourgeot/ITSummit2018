import Container from "../library/Container.js";
import Camera from "../library/Camera.js";
import Level from "../library/Level.js";
import Racer from "../src/entities/Racer.js";
import math from "../library/utils/math.js";
import Text from "../library/Text.js";
import entity from "../library/utils/entity.js";
import NetworkMap from "../library/NetworkMap.js";


class InitializeScreen extends Container {
	constructor(game, ga, onCompletion) {
		super();
		//initialization
		//console.log(contestants);
		this.w = game.w;
		this.h = game.h;
		this.life = 3;

		this.onCompletion = onCompletion;
		this.ready = ga.initialize();
		
	}
	update(dt, t) {
		super.update(dt, t);
		//wait for the evolution to finish before restarting the simulation
		//this.life -= dt;
		
		if (this.ready) {
			this.onCompletion();
		}
		//if (this.life < 0) {
		//	console.log(ga);
		//	this.onCompletion();
		//}

	}
}

export default InitializeScreen;