import Sprite from "../../library/Sprite.js";
import TileSprite from "../../library/TileSprite.js";
import Texture from "../../library/Texture.js";
import Container from "../../library/Container.js";
import KeyControls from "../../library/controls/KeyControls.js";
import Vector from "../../library/utils/Vector.js"
import math from "../../library/utils/math.js";
import Rectangle from "../../library/Rectangle.js";

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
		this.speed = 0;
		this.theta = 0;
		this.controls = new KeyControls();
		this.pivot = new Vector(-20, 0);
		//auto is 40 x 70 pixels
		const auto = new Sprite(new Texture("./res/Images/PNG/Cars/car_blue_small_1.png"));	
		auto.rotation = spriteRotation;
		auto.anchor = new Vector(35,-20);
		this.add(auto);
		this.hitBox = new Rectangle(60,34);
		this.hitBox.anchor = auto.anchor.plus(-65,2);
		this.add(this.hitBox);
		const whisker1 = new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair006.png"));
		const w1O = new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair001.png"));
		whisker1.anchor = new Vector(-32, -32);
		w1O.anchor = new Vector(-32,-32);
		whisker1.position = new Vector (100, 0);
		w1O.position = new Vector (22, 0);
		this.add(whisker1);
		this.add(w1O);
		//const whisker2 = new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair046.png"));
		//whisker2.anchor = new Vector(-32, -32);
		//whisker2.position = new Vector (100* cos(Math.PI/8), 100 * sin(Math.PI/8));
		//this.add(whisker2);
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