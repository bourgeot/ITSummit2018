import Container from "../library/Container.js";
//level player racer
class GameScreen extends Container {
	constructor(game, controls, onGameOver) {
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