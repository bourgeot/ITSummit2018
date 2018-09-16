
class Arc {
	constructor(radius, style = {fill: "#333"}, beginTheta = 0, endTheta = Math.PI * 2, ccw = false) {
		this.radius = radius;
		this.style = style;
		this.beginTheta = beginTheta;
		this.endTheta = endTheta;
		this.ccw = ccw;
		this.position = {x:0, y:0};
	}
}
export default Arc;