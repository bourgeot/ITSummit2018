import Container from "../library/Container.js";
import Camera from "../library/Camera.js";
import Level from "../library/Level.js";
import Racer from "../src/entities/Racer.js";
import math from "../library/utils/math.js";
import Text from "../library/Text.js";
import entity from "../library/utils/entity.js";
import NetworkMap from "../library/NetworkMap.js";

const CONDITION_CLEAR = 0;
const CONDITION_WARNING = 1;
const CONDITION_FATAL = 2;
const FATAL_DISTANCE = 25;


//level player racer
class GameScreen extends Container {
	constructor(game, contestants, onGameOver) {
		super();
		//initialization
		this.contestants = contestants;
		this.w = game.w;
		this.h = game.h;
		this.controls = contestants[0];
		this.onGameOver = onGameOver;
		const { scoreboard, scene, frontrunner, w, h } = game;
			
			//console.log(contestants[0].neurons);

		const map = new Level(128*10, 128*10);
		const racer = new Racer({x:333, y:302}, contestants[0]);
		const leadRacer = racer;

		this.map = map;
		//const player = new Player(controls, map);  //<-- i have to make this.
		this.camera = new Camera(
			 racer,  //this object is a collection of racers. maybe I set the lead racer here? in the update function? Not sure yet.
			 { w, h },
			 { w: map.w, h: map.h }
		);
		this.racer = racer;
		
		
	//scoreboard info
		const location = new Text("Location: ", {
		  font: "12px sans-serif",
		  fill: "black",
		  align: "left"
		});
		location.position.x = 5;
		location.position.y = 0;
		
		/*
		const tiles = new Text("Tiles: ", {
		  font: "20px sans-serif",
		  fill: "#8B8994",
		  align: "center"
		});
		tiles.position.x = w / 2;
		tiles.position.y = 60;
		*/	
		for(let i=0; i < contestants.length; i++) {
			
		}
		this.add(this.camera);
		this.camera.add(this.map);
		this.camera.add(this.racer);
		this.add(this.contestants[0]);
		//scene.add(location);
		//this.add(tiles);
		this.location = scoreboard.add(location);
		//calculate the layout of the neural network. 
		const nm = new NetworkMap(contestants[0], frontrunner.size.width, frontrunner.size.height);
		frontrunner.add(nm);
		

		var position = {x:0, y:0};
	
	}
	update(dt, t) {
		super.update(dt, t);
		
		//if all the racers are dead then evolve!
		//track collision and resolution here
		  // collision detection
		var n,p, q = null;
		var currentTile = 0,  position = {};
		var r = 0;
		var i, j, k, a, b, c;
		var bounds = [];
		var hit = null, bHit = false, whiskerHits = 0;
		var currentTiles = [];
		var positions = [];
		const racerPos = this.racer.position;

		//console.log(racer.whiskerLocation(0));
		if(this.racer.alive) {
			this.location.text = "";
			for (i=0; i < this.racer.whiskers.children.length; i++) {
				position = {x: Math.round(racerPos.x + this.racer.whiskerLocation(i).x),
					y:Math.round(racerPos.y + this.racer.whiskerLocation(i).y)};
				currentTile = this.map.tileAtPixelPos(position);
				//get the current length;
				r = this.racer.whiskers.children[i].length;
				this.location.text += "Whisker " + i + ": " + Math.floor(r) + "\n";
				//console.log(r);
				for (j = 0; j < 2; j++) {
					if (j > 0) {
						//I may want to add 'front of car' in addition to the middle of the car
						currentTile = this.map.tileAtPixelPos(racerPos);
					}
					if (currentTile.frame.bType) {
						for (a = 0; a < currentTile.frame.boundary.length -1; a++ ) {
							bounds.push(
								[
									{x:currentTile.position.x + currentTile.frame.boundary[a][0],
										y:currentTile.position.y + currentTile.frame.boundary[a][1]},
									{x:currentTile.position.x + currentTile.frame.boundary[a+1][0],
										y:currentTile.position.y + currentTile.frame.boundary[a+1][1]}
								]);
						}
						for ( b = 0; b < bounds.length; b++) {
							hit = entity.intersection([racerPos, position], bounds[b]);
							//location.text = hit;
							if (hit !== null) {
								//console.log(i);
								//location.text = "Whisker " + i + "hit.";
								bHit = true;
								whiskerHits++;
								r = Math.sqrt((hit.x - racerPos.x) * (hit.x - racerPos.x) +
									(hit.y - racerPos.y) * (hit.y - racerPos.y));
								this.racer.whiskers.children[i].setLength(r);
								this.racer.setCondition(CONDITION_WARNING);
								if(r <= FATAL_DISTANCE) {
									this.racer.setCondition(CONDITION_FATAL);
									break;
								}
							}
									//else	location.text = "Whisker " + i + " no hit.";
						}
						if(!bHit) {
							//return to previous value
							//console.log(r);
							this.racer.whiskers.children[i].setLength();
							//racer.setCondition(CONDITION_CLEAR);
						}
					}
				}
				bHit = false;
				if (this.racer.alive == false) break;
			}
			if(whiskerHits <= 0) {
					this.racer.setCondition(CONDITION_CLEAR);
			}
			this.location.text += "Speed: " + this.racer.controller.outputActions[0].toFixed(4) + "/" + 
				this.racer.speed.toFixed(0) + "\n";
			this.location.text += "Heading: " + this.racer.controller.outputActions[1].toFixed(4) + "/" +
				this.racer.heading.toFixed(4) + "\n";
			this.location.text += "Fitness: " + this.racer.controller.fitness;
		}
  //find out where the player is and add the tiles to the screen
  
	}
}

export default GameScreen;