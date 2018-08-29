import Path from "./Path.js";
import Container from "./Container.js";
import Vector from "./utils/Vector.js";

const spriteSize = 64;
class Whisker extends Container {
	constructor(points, oSprite, eSprite) {
		super();
		//const points = points;
		//make the position the same as the end point
		this.position = new Vector( points[0][0], points[0][1]);
		this.origin = new Vector(points[1][0], points[1][1]);
		const originSprite = oSprite;
		originSprite.anchor = {x: -32, y: -32};
		originSprite.position = this.position;
		this.endSprite = eSprite;
		this.endSprite.anchor = {x: -32, y: -32};
		this.endSprite.position = this.origin;
		this.path = new Path(points);
		//this.path.position = this.origin;
		this.add(this.path);
		this.add(originSprite);
		this.add(this.endSprite);
		//console.log(this.lengthSquared());
		
	}
	lengthSquared () {
		return (this.position.x - this.origin.x) * (this.position.x - this.origin.x) +
			(this.position.y - this.origin.y) * (this.position.y - this.origin.y);
	}
	update(position) {
		//console.log('here');
		this.origin.x += position.x;
		this.origin.y += position.y;
		this.path.points[1][0] = position.x;
		this.path.points[1][1] = position.y;
		this.endSprite.position = this.origin;
	}
	
}
export default Whisker;