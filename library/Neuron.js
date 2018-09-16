
import Container from "./Container.js";
import Rectangle from "./Rectangle.js";
import Arc from "./Arc.js";

class Neuron extends Container {
	constructor(ID, type, activationResponse) {
		super();
		//links coming in
		this.inputNeurons = [];
		this.outputNeurons = [];
		this.weights = [];
		this.output = 0.0;
		this.type = type;
		this.ID = ID;
		this.activationResponse = activationResponse;
	}
}
export default Neuron;