import Path from "./Path.js";
import Container from "./Container.js";

const spriteSize = 64;
class Whisker extends Container {
	constructor(points, oSprite, eSprite) {
		super(points);
		this.points = points;
		this.position = {x: points[0][0], y: points[0][1]};
		this.oSprite = oSprite;
		this.oSprite.anchor = {x: -32, y: -32};
		this.oSprite.position = this.position;
		this.eSprite = eSprite;
		this.eSprite.anchor = {x: -32, y: -32};
		this.eSprite.position = {x: points[1][0], y: points[1][1]};
		this.path = new Path(points);
		this.add(this.path);
		this.add(this.oSprite);
		this.add(this.eSprite);
	}
	lengthSquared () {
		return (this.points[1][0] - this.points[0][0]) * (this.points[1][0] - this.points[0][0]) +
			(this.points[1][1] - this.points[0][1]) * (this.points[1][1] - this.points[0][1]);
	}
	updateTip(point) {
		this.points[1][0] = point[0];
		this.points[1][1] = point[1];
		this.path.points[1][0] = point[0];
		this.path.points[1][1] = point[1];
		this.eSprite.position = {x: this.points[1][0], y: this.points[1][1]};
	}
	
}
export default Whisker;