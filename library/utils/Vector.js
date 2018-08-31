
class Vector {
	constructor (x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
static from (v) {
	return new Vector().copy(v);
}
	magnitude() {
		const {x, y} = this;
		return Math.sqrt(x * x + y * y);
	}
	set (x, y) {
		this.x = x; 
		this.y = y;
		return this;
	}
	copy ({x, y}) {
		this.x = x;
		this.y = y;
		return this;
	}
	add ({x, y}) {
		this.x += x;
		this.y += y;
		return this;
	}
	subtract({x,y}) {
		this.x -= x;
		this.y -= y;
		return this;
	}
	multiply(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}
	clone () {
		return Vector.from(this);
	}
	normalize () {
		const m = this.magnitude();
		if (m > 0.0001) {
			this.x /= m;
			this.y /= m;
		}
		return this;
	}
	dot ({x, y}) {
		return this.x * x + this.y * y;
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
	unit () {
		const m = this.length();
		return new Vector(this.x * m, this.y * m);
	}

	angleTo (a) {
		return Math.acos(this.dot((a) / (this.length() * a.length())));
	}
	toAngle () {
		return Math.acos(this.x/this.length());
	}
}
export default Vector;