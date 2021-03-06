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
//make a segment data structure defined by two sets of points. Alternately an origin, an angle, and a length
//a whisker will be a segment with a sprite at the origin and a sprite length away at angle, with an optional style

///so each update the racer will  process output actions from the controls and then, after, it will send its updated whisker data to the controls


class Racer extends Container {
	constructor(startPosition, controller, maxWhiskerLength) {
		super();
		this.alive = true;
		this.position = new Vector(startPosition.x, startPosition.y);
		this.velocity = new Vector(0,0);
		this.speed = 0;
		this.theta = 0;
		this.heading = 0;
		//this.controls = new KeyControls();
		this.controller = controller;
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
		//console.log(this.whiskers.children);
	}
	setCondition(condition = CONDITION_CLEAR) {
		if (condition == CONDITION_CLEAR) this.auto.texture = CLEAR_CAR;
		if (condition == CONDITION_WARNING) this.auto.texture = WARNING_CAR;
		if (condition == CONDITION_FATAL) {
			this.auto.texture = FATAL_CAR;
			this.alive = false;
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
	/*
	update(dt, t) {
		if(this.alive) {
			var dTheta = 0;
			//if up arrow is pressed
			if (this.controller.y == -1 ) {
				this.speed += maxAcc * dt;
			}
			//if space is pressed
			if (this.controller.action) {
				this.speed -= maxBrake * dt;
			}
			this.speed = math.clamp(this.speed, 0, maxSpeed);
			//if right arrow is pressed
			if (this.controller.x == 1) {
				//there is a clockwise rotation
				dTheta = maxTurnSpeed * dt;
			}
			if (this.controller.x == -1) {
				//there is a counter clockwise rotation
				 dTheta = - maxTurnSpeed * dt;
			}
			this.theta = this.theta + dTheta;
			this.theta = this.theta % (Math.PI * 2);
			this.rotation = this.theta;
			if (this.speed * dt > .00001) {
				const deltaP = {x: (this.speed * dt) * Math.cos(this.theta),
					y:(this.speed * dt) * Math.sin(this.theta)};
				this.position.x += deltaP.x;
				this.position.y += deltaP.y;
			}
			//const deltaR = 0;
		}
	}
	*/
	update(dt, t) {
		//NN controls will be from two neurons. one for the angle, and one for the speed, each from zero to 1
		//where the measure of the angle of the wheel is Theta = (neuronOut * Math.PI /2) - Math.PI/4, and 
		//the speed is neuronOut * maxSpeed
		//this.controller.outputActions[0] will contain the speed, and this.controller.outputActions[1] will contain the angle
		
		//following the update of the position and direction of the car, update the fitness function. Then,
		//each of the new whisker values will be loaded into the inputSensors
		//array of the controller.
		//x = vt
		if (this.alive) {
			this.speed = this.controller.outputActions[0] * MAX_SPEED;
			this.heading += this.controller.outputActions[1] * MAX_ROTATION - Math.PI/4;
			this.heading = this.heading % Math.PI * 2;
			if (this.speed * dt > .00001) {
				const deltaP = {
					x: Math.floor(this.speed * dt * Math.cos(this.heading)),
					y: Math.floor(this.speed * dt * Math.sin(this.heading))
				};
				this.position.x += deltaP.x;
				this.position.y += deltaP.y;
			
				this.controller.fitness += deltaP.x * deltaP.x + deltaP.y * deltaP.y;
			}
			//now update the sensor values of the controller's input array
			for (let i=0; i < this.whiskers.length; i++) {
				this.controller.inputSensors[i] = this.whiskers.element(i);
			}
		}
		
	}
	
}

export default Racer;