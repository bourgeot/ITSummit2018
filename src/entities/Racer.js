import Sprite from "../../library/Sprite.js";
import TileSprite from "../../library/TileSprite.js";
import Texture from "../../library/Texture.js";
import Container from "../../library/Container.js";
import KeyControls from "../../library/controls/KeyControls.js";
import Vector from "../../library/utils/Vector.js"
import math from "../../library/utils/math.js";

const maxSpeed = 1000;
const maxAcc = 300;
const maxBrake = 600;
const maxTheta = Math.PI/4;
const maxTurnSpeed = Math.PI/2;
const spriteRotation = Math.PI/2;

class Racer extends Container {
	constructor(startPosition) {
		super();
		this.position = new Vector(startPosition.x, startPosition.y);
		this.speed = 0;
		this.theta = 0;
		this.controls = new KeyControls();
		this.pivot = new Vector(-20, 0);
		//auto is 40 x 70 pixels
		const auto = new Sprite(new Texture("./res/Images/PNG/Cars/car_blue_small_1.png"));	
		auto.rotation = spriteRotation;
		auto.anchor = new Vector(35,-20);
		this.add(auto);
		const whisker = new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair046.png"));
		whisker.anchor = new Vector(-32, -32);
		whisker.position = new Vector (100, 0);
		this.add(whisker);
	}
	update(dt, t) {
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
			this.theta += maxTurnSpeed * dt;
		}
		if (this.controls.x == -1) {
			//there is a counter clockwise rotation
			this.theta -= maxTurnSpeed * dt;
		}
		this.theta = this.theta % (Math.PI * 2);
		this.rotation = this.theta;
		this.position.x += this.speed * dt * Math.cos(this.theta);
		this.position.y += this.speed * dt * Math.sin(this.theta);

		
		
		//this.position.y += this.controls.y;

	}

}

export default Racer;