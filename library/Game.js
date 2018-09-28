
import Container from "./Container.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game {
	constructor (width, height, parent = 'body') {
		this.w = width;
		this.h = height;
		//a future version should create the internal divs so that index.html doesn't have to define them
		//document.createElement();  <-- I don't know what arguments this requires
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
			this.hud.render(this.scoreboard);
			this.leaderBoard.render(this.frontrunner);
		};
		requestAnimationFrame(gameLoop);
	}
}
	
	

export default Game;