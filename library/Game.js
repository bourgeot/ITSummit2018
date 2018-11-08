
import Container from "./Container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";
const STEP = 1 / 60;
const MULTIPLIER = 2;
const SPEED = STEP * MULTIPLIER;
const MAX_FRAME = SPEED * 5;


class Game {
	constructor (width, height, parent = 'body') {
		this.w = width;
		this.h = height;
		this.renderer = new CanvasRenderer(width, height);
		document.querySelector('#gameBoard').appendChild(this.renderer.view);
		this.hud = new CanvasRenderer(200,300);  // the hud will have quantitative information about the racers
		document.querySelector('#hud').appendChild(this.hud.view);
		this.leaderBoard = new CanvasRenderer(200,300); //the leaderBoard will have a visual representation of the lead driver NN
		document.querySelector('#leaderBoard').appendChild(this.leaderBoard.view);
		
		this.scene = new Container(); //<--this.scene will be assigned in main to new GameScreen
										//gamescreen will 'own' the players, racers, scores, etc. 
		this.scoreboard = new Container();
		this.frontrunner = new Container();
		this.frontrunner.size = {width: 200, height: 200};
		this.cid = 0;
	}
	//Methods

	run(gameUpdate = () => {}) {
		
		let dt = 0;
		let last = 0;
		const gameLoop = ms => {
			this.cid = requestAnimationFrame(gameLoop);
			const t = ms / 1000; // Let's work in seconds
			dt += Math.min(t - last, MAX_FRAME);
			last = t;
			while (dt >= SPEED) {
				this.scene.update(STEP, t / MULTIPLIER);
				gameUpdate(STEP, t / MULTIPLIER);
				dt -= SPEED;
			}
			this.renderer.render(this.scene);
			this.hud.render(this.scoreboard);
			this.leaderBoard.render(this.frontrunner);
		};
		this.cid = requestAnimationFrame(gameLoop);
	}

}
	
	

export default Game;