import Path from "./Path.js";
import Container from "./Container.js";
import math from "./utils/math.js";
import Vector from "./utils/Vector.js";

const spriteSize = 64;
class Whisker extends Container {
	constructor(id, fatalDistance, origin, r, theta, oSprite, eSprite) {
		super();
		//const points = points;
		//make the position the same as the end point
		this.id = id;
		this.fatalDistance = fatalDistance;
		this.theta = theta;
		this.maxLength = r;
		this.length = r;
		this.position = new Vector(origin[0], origin[1]);
		this.end = this.position.clone().add({x:Math.round(r * Math.cos(this.theta)), y:Math.round(r * Math.sin(this.theta))});
		const originSprite = oSprite;
		originSprite.anchor = {x: -32, y: -32};
		originSprite.position = this.position;
		this.endSprite = eSprite;
		this.endSprite.anchor = {x: -32, y: -32};
		this.endSprite.position = this.end;
		this.path = new Path([{x:this.position.x, y:this.position.y},{x:this.end.x, y:this.end.y}]);
		//this.path.position = origin;
		//this.add(this.path);
		this.add(originSprite);
		this.add(this.endSprite);
		
	}
	setEnd(point) {
		this.end.set(point);
		this.endSprite.position = this.end;
	}
	setLength(r = this.maxLength) {
		this.length = math.clamp(r, 20, this.maxLength);
		const rx = r * Math.cos(this.theta);
		const ry = r * Math.sin(this.theta) 
		this.end.set(rx, ry);
		this.endSprite.position = this.end;
		return this;
	}
	lengthSquared () {
		return (this.position.x - this.end.x) * (this.position.x - this.end.x) +
			(this.position.y - this.end.y) * (this.position.y - this.end.y);
	}
	update(deltaR) {
		//console.log('here');
		this.end.x += deltaR * Math.cos(this.theta);
		this.end.y += deltaR * Math.sin(this.theta);
		this.path.points[1] = this.end;
		//this.path.points[1][1] = this.end.y;
		this.endSprite.position = this.end;
	}
	
}
export default Whisker;