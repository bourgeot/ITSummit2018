import Vector from "./utils/Vector.js";
class Rectangle {
	constructor (w, h, style = {fill: "#333"}) {
		this.w = w;
		this.h = h;
		this.position = new Vector(0,0);
		this.style = style;
	
	}
}
export default Rectangle;