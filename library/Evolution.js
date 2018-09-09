
class Evolution {
	constructor() {

	}
	sigmoid(x) {
		return 1 / (1 + Math.exp(- x));
	}

}
export default Evolution;