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
const CONDITION_LEADER = 3;	
const FATAL_DISTANCE = 25;
const MAX_WHISKER_LENGTH = 100;
const START_POSITION = {x: 303, y: 280};

//level player racer
class GameScreen extends Container {
	constructor(game, contestants, onGameOver) {
		super();
		//initialization
		this.contestants = contestants;
		//console.log(contestants);
		this.w = game.w;
		this.h = game.h;
		this.racers = [];
		this.dead = [];
		//this.controls = contestants[0];
		this.onGameOver = onGameOver;
		const { scoreboard, scene, frontrunner, w, h } = game;
			
			//console.log(contestants[0].neurons);

		this.map = new Level(128*10, 128*10);	
		
		this.camera = new Camera(
			 this.leadRacer,  //the camera will focus on the lead racer
			 { w, h },
			 { w: this.map.w, h: this.map.h }
		);
		this.add(this.camera);
		this.camera.add(this.map);
		
	//scoreboard info
		const location = new Text("Location: ", {
		  font: "12px sans-serif",
		  fill: "black",
		  align: "left"
		});
		location.position.x = 5;
		location.position.y = 0;
		
		for (let i=0; i < 20; i++) {
			const racer = new Racer({x: START_POSITION.x, y: START_POSITION.y + i*2}, this.contestants[i], MAX_WHISKER_LENGTH);
			racer.avatar = new NetworkMap(racer.controller, frontrunner.size.width, frontrunner.size.height);
			this.racers.push(racer);
			this.camera.add(racer);
		}
		//const racer = new Racer({x:333, y:302}, this.controls, MAX_WHISKER_LENGTH);
		this.leadRacer = this.racers[0];
		//calculate the layout of the neural network. 
		frontrunner.add(this.leadRacer.avatar);	

		//this.camera.add(this.leadRacer);
		this.location = scoreboard.add(location);
		

		//var position = {x:0, y:0};
	
	}
	update(dt, t) {
		super.update(dt, t);
		
		//if all the racers are dead then evolve!
		//track collision and resolution here
		  // collision detection
		this.location.text = "";  // might move this	  
		//set this up for multiple racers
		var hit = null, bHit = false, whiskerHits = 0;
		for (let i = 0; i < this.racers.length; i ++) {
			let racer = this.racers[i];  // convenience variable
			const racerPos = racer.position;
			if (racer.alive) {

				for(let i=0; i< racer.whiskers.children.length; i++) {
					let aWhisker = racer.whiskers.children[i];
					let whiskerPos = {x: Math.round(racerPos.x + racer.whiskerLocation(i).x),
					  y:Math.round(racerPos.y + racer.whiskerLocation(i).y)};
					let currentTile = this.map.tileAtPixelPos(whiskerPos);
					
					//get the current length;
					let r = aWhisker.length;
					let bounds =[];
					for (let j = 0; j < 2; j++) {
						if (j > 0) {
							//I may want to add 'front of car' in addition to the middle of the car
							const currentTile = this.map.tileAtPixelPos(racerPos);
						}
						if (currentTile.frame.bType) {
							for (let a = 0; a < currentTile.frame.boundary.length - 1; a++ ) {
								bounds.push(
									[
										{x:currentTile.position.x + currentTile.frame.boundary[a][0],
											y:currentTile.position.y + currentTile.frame.boundary[a][1]},
										{x:currentTile.position.x + currentTile.frame.boundary[a+1][0],
											y:currentTile.position.y + currentTile.frame.boundary[a+1][1]}
									]);
							}
							for (let b = 0; b < bounds.length; b++) {
								hit = entity.intersection([racerPos, whiskerPos], bounds[b]);
								//location.text = hit;
								if (hit !== null) {
									//console.log(i);
									//location.text = "Whisker " + i + "hit.";
									bHit = true;
									whiskerHits++;
									r = Math.sqrt((hit.x - racerPos.x) * (hit.x - racerPos.x) +
										(hit.y - racerPos.y) * (hit.y - racerPos.y));
									aWhisker.setLength(r);
									racer.setCondition(CONDITION_WARNING);
									if(r <= FATAL_DISTANCE) {
										racer.setCondition(CONDITION_FATAL);
										//this.racers.splice(i,1);
										this.dead.push(racer);
										break;
									}
								}
							}
							if(!bHit) {
								//return to previous value
								//console.log(r);
								aWhisker.setLength();
								
							}
						}
					}
					bHit = false;
					if (racer.alive == false) break;
				}
				if(whiskerHits <= 0) {
						racer.setCondition(CONDITION_CLEAR);
				}
			}
			else {
				if(this.racers.filter(e => e.alive == true).length < 1) {
					this.onGameOver(this.racers.map(a => a.controller));
				}
			}
		}
		//if () this.onGameOver;
		this.racers.sort((a, b) => b.controller.fitness > a.controller.fitness);
		this.leadRacer = this.racers[0];
		this.leadRacer.setCondition(CONDITION_LEADER);
		this.camera.setSubject(this.leadRacer);
		this.location.text += this.leadRacer.controller.fitness;

		/*
		var n,p, q = null;
		var currentTile = 0,  position = {};
		var r = 0;
		var i, j, k, a, b, c;
		var bounds = [];
		var hit = null, bHit = false, whiskerHits = 0;
		var currentTiles = [];
		var positions = [];

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
									console.log 
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
		*/
  //find out where the player is and add the tiles to the screen
  
	}
}

export default GameScreen;