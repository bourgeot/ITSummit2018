import Path from "./Path.js";
import Container from "./Container.js";
import Vector from "./utils/Vector.js";

const spriteSize = 64;
class Whisker extends Container {
	constructor(origin, r, theta, oSprite, eSprite) {
		super();
		//const points = points;
		//make the position the same as the end point
		this.theta = theta;
		this.position = new Vector(origin[0], origin[1]);
		this.end = this.position.plus(r * Math.cos(this.theta), r * Math.sin(this.theta));
		const originSprite = oSprite;
		originSprite.anchor = {x: -32, y: -32};
		originSprite.position = this.position;
		this.endSprite = eSprite;
		this.endSprite.anchor = {x: -32, y: -32};
		this.endSprite.position = this.end;
		this.path = new Path([[this.position.x, this.position.y],[this.end.x, this.end.y]]);
		//this.path.position = this.origin;
		this.add(this.path);
		this.add(originSprite);
		this.add(this.endSprite);
		//console.log(this.lengthSquared());
		
	}
	lengthSquared () {
		return (this.position.x - this.end.x) * (this.position.x - this.end.x) +
			(this.position.y - this.end.y) * (this.position.y - this.end.y);
	}
	update(deltaR) {
		//console.log('here');
		this.end.x += deltaR * Math.cos(this.theta);
		this.end.y += deltaR * Math.sin(this.theta);
		this.path.points[1][0] = this.end.x;
		this.path.points[1][1] = this.end.y;
		this.endSprite.position = this.end;
	}
	
}
export default Whisker;