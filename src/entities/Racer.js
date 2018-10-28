import Sprite from "../../library/Sprite.js";
//import TileSprite from "../../library/TileSprite.js";
import Texture from "../../library/Texture.js";
import Container from "../../library/Container.js";
//import KeyControls from "../../library/controls/KeyControls.js";
import Vector from "../../library/utils/Vector.js"
import math from "../../library/utils/math.js";
import Rectangle from "../../library/Rectangle.js";
import Whisker from "../../library/Whisker.js";
const CONDITION_CLEAR = 0;
const CONDITION_WARNING = 1;
const CONDITION_FATAL = 2;
const CONDITION_LEADER = 3;
const maxSpeed = 1000;
const MAX_SPEED = 1000;
const MAX_ROTATION = Math.PI/2;
const maxAcc = 300;
const maxBrake = 600;
const maxTheta = Math.PI/4;
const maxTurnSpeed = Math.PI/2;
const spriteRotation = Math.PI/2;
const CLEAR_CAR = new Texture("./res/Images/PNG/Cars/car_blue_small_1.png")
const WARNING_CAR = new Texture("./res/Images/PNG/Cars/car_yellow_small_1.png");
const FATAL_CAR = new Texture("./res/Images/PNG/Cars/car_red_small_1.png");
const LEADER_CAR = new Texture("./res/Images/PNG/Cars/car_green_small_1.png");
const SPEED_NEURON  = 0;
const HEADING_NEURON = 1;
//make a segment data structure defined by two sets of points. Alternately an origin, an angle, and a length
//a whisker will be a segment with a sprite at the origin and a sprite length away at angle, with an optional style

///so each update the racer will  process output actions from the controls and then, after, it will send its updated whisker data to the controls


class Racer extends Container {
	constructor(startPosition, controller, maxWhiskerLength) {
		super();
		this.alive = true;
		this.startPosition = startPosition;
		this.age = 0;
		this.position = new Vector(startPosition.x, startPosition.y);
		this.velocity = new Vector(0,0);
		this.speed = 0;
		this.theta = 0;
		this.heading = 0;
		this.lastPath = 0;
		this.fitness = 0;
		//this.controls = new KeyControls();
		this.controller = controller;
		this.avatar = {}; //<--this will hold the layout of the network
		this.pivot = new Vector(0, 0);
		this.pLength = this.pivot.magnitude();

		//auto is 40 x 70 pixels
		this.auto = new Sprite(CLEAR_CAR);
		this.auto.anchor = new Vector(-20,-35); //puts the center on the position
		this.auto.pivot = {x:20,y:35};		//moves the rotation point to the center
		this.auto.rotation = spriteRotation;  //rotates the sprite.

		this.add(this.auto);
		this.hitBox = new Rectangle(60,34);
		//this.hitBox.anchor = ;
		//this.add(this.hitBox);
//			const w2 = new Whisker(
//				[[12,-4], [100*Math.cos(Math.PI/8) + 12, -100*Math.sin(Math.PI/8) - 4]],
		this.whiskers = new Container();
		let fatalDistance = [25,30,30,30,25];
		for (let k = -2; k < 3; k++) {
			//const origin = [0, k * 3];
			const origin = [0,0];
			const w = new Whisker (
				k+2,
				fatalDistance[k+2],
				origin,
				maxWhiskerLength,
				k * Math.PI/8,
				new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair001.png")),
				new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair001.png")));
			this.whiskers.add(w);
		}
		this.add(this.whiskers);
		this.add(this.controller);
		//console.log(this.whiskers.children);
	}
	setCondition(condition = CONDITION_CLEAR) {
		if (condition == CONDITION_CLEAR) this.auto.texture = CLEAR_CAR;
		if (condition == CONDITION_WARNING) this.auto.texture = WARNING_CAR;
		if (condition == CONDITION_FATAL) {
			this.auto.texture = FATAL_CAR;
			this.alive = false;
		}
		if (condition == CONDITION_LEADER) {
			this.auto.texture = LEADER_CAR;
		}
	}
	whiskerLocation(whisker) {
		//returns the position of the end of the whisker in racer local coordinates based on 
		//the car position, pivot, and theta
		const w = this.whiskers.children[whisker];
		//var v = {x:0,y:0};
		var h = new Vector(w.position.x,w.position.y);
		//var h = new Vector(0,0);
		//v.x = this.whiskers.children[whisker].end.x;
		//v.y = this.whiskers.children[whisker].end.y;
		h.add(w.end).rotate(w.theta + this.theta);
		//v.rotate(this.theta);
		return {x: Math.round(h.x), y: Math.round(h.y), theta: this.theta};
	}

	update(dt, t) {
		super.update(dt, t);
		//NN controls will be from two neurons. one for the angle, and one for the speed, each from zero to 1
		//where the measure of the angle of the wheel is Theta = (neuronOut * Math.PI /2) - Math.PI/4, and 
		//the speed is neuronOut * maxSpeed
		//this.controller.outputActions[0] will contain the speed, and this.controller.outputActions[1] will contain the angle
		
		//following the update of the position and direction of the car, update the fitness function. Then,
		//each of the new whisker values will be loaded into the inputSensors
		//array of the controller.
		//x = vt
		if (this.alive) {
			this.speed = this.controller.outputActions[SPEED_NEURON] * MAX_SPEED;
			this.heading += this.controller.outputActions[HEADING_NEURON] * MAX_ROTATION - Math.PI/4;
			//this.heading = this.heading + math.randf(-.001, .001) % Math.PI * 2;
			this.auto.rotation = this.heading + spriteRotation;
			if (this.speed * dt > .00001) {
				const deltaP = {
					x: Math.floor(this.speed * dt * Math.cos(this.heading)),
					y: Math.floor(this.speed * dt * Math.sin(this.heading))
				};
				this.position.x += deltaP.x;
				this.position.y += deltaP.y;
				//this.controller.fitness += deltaP.x * deltaP.x + deltaP.y * deltaP.y;
			}
			//now update the sensor values of the controller's input array
			for (let i=0; i < this.whiskers.children.length; i++) {
				this.controller.inputSensors[i] = Math.floor(this.whiskers.children[i].length);
			}
		this.age += dt;
		}
		else {
			this.controller.fitness -= Math.floor(this.age/100);
		}
		
	}
	
}

export default Racer;