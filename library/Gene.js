
class Gene {
	constructor() {
		this.into = 0;
		this.out = 0;
		this.weight = 0.0;
		this.enabled = true;
		this.innovation = 0;
	}
	static from (g) {
		return new Gene().copy(g);
	}
	
	copy({into, out, weight, enabled, innovation}) {
		this.into = into;
		this.out = out;
		this.weight = weight;
		this.enabled = enabled;
		this.innovation = innovation;
		return this;
	}
}
export default Gene;