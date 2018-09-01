import Sprite from "../../library/Sprite.js";
import TileSprite from "../../library/TileSprite.js";
import Texture from "../../library/Texture.js";
import Container from "../../library/Container.js";
import KeyControls from "../../library/controls/KeyControls.js";
import Vector from "../../library/utils/Vector.js"
import math from "../../library/utils/math.js";
import Rectangle from "../../library/Rectangle.js";
import Whisker from "../../library/Whisker.js";

const maxSpeed = 1000;
const maxAcc = 300;
const maxBrake = 600;
const maxTheta = Math.PI/4;
const maxTurnSpeed = Math.PI/2;
const spriteRotation = Math.PI/2;
//make a segment data structure defined by two sets of points. Alternately an origin, an angle, and a length
//a whisker will be a segment with a sprite at the origin and a sprite length away at angle, with an optional style

///179


class Racer extends Container {
	constructor(startPosition) {
		super();

		this.position = new Vector(startPosition.x, startPosition.y);
		this.velocity = new Vector(0,0);
		this.speed = 0;
		this.theta = 0;
		this.rotation = 0;
		this.controls = new KeyControls();
		this.pivot = new Vector(0, 0);
		this.pLength = this.pivot.magnitude();

		//auto is 40 x 70 pixels
		const auto = new Sprite(new Texture("./res/Images/PNG/Cars/car_blue_small_1.png"));
		auto.anchor = new Vector(-20,-35); //puts the center on the position
		auto.pivot = {x:20,y:35};		//moves the rotation point to the center
		auto.rotation = spriteRotation;  //rotates the sprite.

		this.add(auto);
		this.hitBox = new Rectangle(60,34);
		//this.hitBox.anchor = ;
		//this.add(this.hitBox);
//			const w2 = new Whisker(
//				[[12,-4], [100*Math.cos(Math.PI/8) + 12, -100*Math.sin(Math.PI/8) - 4]],
		this.whiskers = new Container();
		for (let k = -2; k < 3; k++) {
			const origin = [0, k * 3];
			const w = new Whisker (
				origin,
				70,
				k * Math.PI/8,
				new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair001.png")),
				new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair001.png")));
			this.whiskers.add(w);
		}
		this.add(this.whiskers);
		//console.log(w2, w2.lengthSquared());
	}
	whiskerLocation(whisker) {
		//returns the position of the end of the whisker in racer local coordinates based on 
		//the car position, pivot, and theta
		var v = this.pivot.clone();
		v.add(this.whiskers.children[whisker].end).rotate(this.theta);
		return {x: Math.round(v.x), y: Math.round(v.y), theta: this.theta};
	}
	update(dt, t) {
		var dTheta = 0;
		//if up arrow is pressed
		if (this.controls.y == -1 ) {
			this.speed += maxAcc * dt;
		}
		//if space is pressed
		if (this.controls.action) {
			this.speed -= maxBrake * dt;
		}
		this.speed = math.clamp(this.speed, 0, maxSpeed);
		//if right arrow is pressed
		if (this.controls.x == 1) {
			//there is a clockwise rotation
			dTheta = maxTurnSpeed * dt;
		}
		if (this.controls.x == -1) {
			//there is a counter clockwise rotation
			 dTheta = - maxTurnSpeed * dt;
		}
		this.theta = this.theta + dTheta;
		this.theta = this.theta % (Math.PI * 2);
		this.rotation = this.theta;
		//check for contact between the whiskers and tile boundaries
		//x ′ = x cos ⁡ θ − y sin ⁡ θ
		//y ′ = x sin ⁡ θ + y cos ⁡ θ 
		//update he angle and position of the car
		//const deltaP = {x: (this.pLength + this.speed * dt) * Math.cos(this.theta), y:(this.pLength + this.speed * dt) * Math.sin(this.theta)};
		if (this.speed * dt > .00001) {
			const deltaP = {x: (this.speed * dt) * Math.cos(this.theta),
				y:(this.speed * dt) * Math.sin(this.theta)};
			this.position.x += deltaP.x;
			this.position.y += deltaP.y;
		}
		//else if (dTheta > .00001 || dTheta < -.00001) {
		//	this.position.x +=  Math.cos(dTheta) -  Math.sin(dTheta);
		//	this.position.y +=  Math.sin(dTheta) +  Math.cos(dTheta);
		//}
		const deltaR = 0;
		//now update the position of the whiskers
		//for(let i=0; i < this.whiskers.children.length -1; i++) {
		//	this.whiskers.children[i].update(deltaR);
		//}
		//this.whiskers.children[2].update(math.rand(-1,2));
		
		
		//this.position.y += this.controls.y;

	}

}

export default Racer;