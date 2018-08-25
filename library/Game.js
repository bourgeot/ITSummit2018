
import Container from "./Container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game {
	constructor (width, height, parent = 'body') {
		this.w = width;
		this.h = height;
		this.renderer = new CanvasRenderer(width, height);
		document.querySelector(parent).appendChild(this.renderer.view);
		
		this.scene = new Container();

	}
	//Methods
	run (gameUpdate = () => {}) {
		let deltaT = 0;
		let lastT = 0;
		const gameLoop = ms => {
			requestAnimationFrame(gameLoop);
			const t = ms / 1000;
			deltaT = Math.min(t - lastT, MAX_FRAME);
			lastT = t;

			this.scene.update(deltaT, t);
			gameUpdate(deltaT, t);
			this.renderer.render(this.scene);
		};
		requestAnimationFrame(gameLoop);
	}
}
	
	

export default Game;