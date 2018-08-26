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
	constructor(startPosition, startSpeed, heading) {
		super();
		//this maxSpeed = 200;
		//const maxAcc = 20;
		//const maxBrake = 30;
		//const maxTurnSpeed = Math.PI/2; 
		this.position = new Vector(startPosition.x, startPosition.y);
		this.speed = startSpeed;
		this.theta = 0;
		this.heading = new Vector(heading.x, heading.y).unit();
		//steering goes from +- 45 degrees off center.
		
		this.controls = new KeyControls();
		this.carSprite = new Sprite(new Texture("./res/Images/PNG/Cars/car_blue_small_1.png")); //car sprite points {0, -1} ... up.
		this.carSprite.pivot.x = 20;
		this.carSprite.pivot.y = 60;
		this.carSprite.rotation = spriteRotation;
		this.add(this.carSprite);
		this.c2 = new Sprite(new Texture("./res/crosshairs/PNG/White/crosshair046.png")); //car sprite points {0, -1} ... up.
		this.c2.pivot.x = 20;
		this.c2.pivot.y = 60;
		this.c2.position = new Vector(85,0);
		this.c2.rotation = 0;
		this.add(this.c2);
		

		this.whisker = new TileSprite(new Texture("./res/TileSheet/crosshairs_tilesheet_white2.png"),128, 128 );
		this.whisker.frame = {x:0, y:4};
		//this.whisker.position = this.position.plus(80, 20);
		//this.add(this.whisker);
		console.log(this);

		//this.add(this.car);
		//console.log(this.car);
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
		//this.carSprite.rotation = this.theta + spriteRotation;
		this.carSprite.rotation = this.theta + spriteRotation;
		this.heading = this.heading.plus(Math.cos(this.theta), Math.sin(this.theta)).unit();
		this.position.x += this.speed * dt * Math.cos(this.theta);
		this.position.y += this.speed * dt * Math.sin(this.theta);

		
		
		//this.position.y += this.controls.y;

	}

}

export default Racer;