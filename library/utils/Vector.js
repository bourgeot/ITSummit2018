class Vector {
	constructor (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	plus ( x, y ) {
		return new Vector(this.x + x, this.y + y);
	}
	minus (x, y) {
		return new Vector(this.x - x, this.y - y);
	}
	scale (f) {
		return new Vector( this.x * f, this.y * f);
	}
	length () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	unit () {
		const m = this.length();
		return new Vector(this.x * m, this.y * m);
	}
	dot (a) {
		return this.x * a.x + this.y * a.y;
	}
	angleTo (a) {
		return Math.acos(this.dot((a) / (this.length() * a.length())));
	}
	toAngle () {
		return Math.acos(this.x/this.length());
	}
}
export default Vector;