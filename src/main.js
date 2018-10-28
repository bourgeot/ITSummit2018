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
import EvolutionScreen from "../screens/EvolutionScreen.js";
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
var gameOver=false;
//const controls = new KeyControls();

const ready = newGA();


if (ready) {
	//compatibilityScore(ready.genomes[0], ready.genomes[1]);
	startGame();
}
game.run(gameOver);
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
function newEpoch(population) {
	//alert(population.map(a => a.fitness).toString());
	//alert(scores.toString());
	ga.epoch(population);
	gameOver = true;
}
function newGA() {
	//spawn a new world and create neural networks!
	return ga.initialize();
	//console.log(ga);
}
function	compatibilityScore(genome1, genome2) {
		//this measures the genetic distance between two genomes, and is used to determine
		//whether or not they are part of the same species.
		let g1IDs = genome1.connectionGenes.map(obj=>obj.ID).sort();
		let g2IDs = genome2.connectionGenes.map(obj=> obj.ID).sort();
		console.log(g1IDs);
		console.log(g2IDs);
		let weightDifference = 0;
		
		let matched = 0;
		//excess is the length difference.
		let excess = Math.abs(g1IDs.length - g2IDs.length);
		let longest = Math.max(g1IDs.length, g2IDs.length);
		let disjoint = 0;
		for(let i=0; i<g1IDs.length; i++) {
			let noMatch = true;
			for (let j=0; j<g2IDs.length; j++) {
				if (g1IDs[i] == g2IDs[j]) {
					matched++;
					noMatch = false;
					weightDifference += Math.abs(genome1.connectionGenes[i].connectionWeight - genome2.connectionGenes[j].connectionWeight);
					//splice the array to remove the matched element
					g2IDs.splice(j, 1);
					break;
				}
			}
			if(noMatch) {
				disjoint++;
			}
		}
		//because we spliced the array we know the remaining elements are disjoint.
		disjoint += g2IDs.length;
		console.log(matched, excess, longest, disjoint, weightDifference);
	}
