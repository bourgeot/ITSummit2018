class Container {
	constructor () {
		this.position = {x: 0, y: 0};
		this.children = [];
	}
	//Methods
	add(child) {
		this.children.push(child);
		return child;
	}
	remove(child) {
		this.children = this.children.filter( c => c !== child);
		return child;
	}
	update(deltaT, t) {
		this.children.forEach(child => {
			if(child.update) {
				child.update(deltaT, t);
			}
		});
	}
	length() {
		return this.children.length;
	}
	element(e) {
		if(this.children[e] !== null) {
			return this.children[e];
		}
		else {
			return null;
		}
	}
	map(f) {
		return this.children.map(f);
	}
}
export default Container;