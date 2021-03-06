// Round 2

/*
  Respond to player input
  Move everything a tiny bit
  Check for collisions
  Draw everything
*/
/*
	Main conntrol flow will be: 
	start ga from main and generate initial set of nns
	write the current configuration to the browser storage
	then run the game. 
	when the game ends (bc all the racers have expired or the fitness function is maxed or time has expired)
	write the current configuration to the local browser storage (update, if all goes well)
	start another evolution cycle. 

		note: write some storage retrieval functions for writing out or replaying levels.
*/


import GameScreen from "../screens/GameScreen.js";
import library from "../library/index.js";
//import Racer from "./entities/Racer.js";
import KeyControls from "../library/controls/KeyControls.js";
import Game from "../library/Game.js";
import GeneticAlgorithm from "../library/GeneticAlgorithm.js";



//const { Container, Text, CanvasRenderer, Rectangle, TileSprite, Sprite, Texture, Game, Level, Camera, math, entity, Vector, Path } = library;
/*
const CONDITION_CLEAR = 0;
const CONDITION_WARNING = 1;
const CONDITION_FATAL = 2;
const FATAL_DISTANCE = 25;
*/
const game = new Game(640, 480, '#gameBoard' );
const ga = new GeneticAlgorithm();
//const controls = new KeyControls();

const ready = newGA();
if (ready) startGame();
game.run();
//if (ready) console.log(ready);

//this will need call backs so that the game, doesn't start until the GA has had a chance to evaluate and evolve a population.

//let's call the current population the set of contestants

function startGame() {
	//when the ga object has things in it..then enter the game
	var contestants = [];
	for (let i=0; i < ga.genomes.length; i++) {
		contestants.push(ga.genomes[i].network);
	}
  //game.scene = new GameScreen(game, controls, contestants, newEpoch);
  game.scene = new GameScreen(game, contestants, newEpoch);
}
function newEpoch() {
	console.log('game over!');
}
function newGA() {
	//spawn a new world and create neural networks!
	return ga.initialize();
	//console.log(ga);
}

