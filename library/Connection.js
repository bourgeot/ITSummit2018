import Path from "./Path.js";
import Container from "./Container.js";
class Connection extends Container {
	constructor(inNeuron, outNeuron, weight) {
		super();
		this.in = inNeuron;
		this.outNeuron = outNeuron;
		this.weight = weight;
	}
}
export default Connection;