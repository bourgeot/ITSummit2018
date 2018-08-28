
class Path {
	constructor (points = [], style = {fill: "#333"}) {
		this.style = style;
		this.position = {x: 0, y: 0};
		//the points array has an initial moveto, a set of lineto directives, and a close path.
		this.points = points;
	}
}
export default Path;