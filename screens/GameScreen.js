import Container from "../library/Container.js";

class GameScreen extends Container {
	constructor(game, controls) {
		super();
		//initialization
		this.level = level;
		this.camera = camera;
		this.racers = racers;
	}
	update(dt, t) {
		super.update(dt, t);
	}
}

export default GameScreen;