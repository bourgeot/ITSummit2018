
import Container from "./Container.js";
import Rectangle from "./Rectangle.js";
import Arc from "./Arc.js";
import math from "./utils/math.js";

class Neuron extends Container {
	constructor(ID, type, activationResponse) {
		super();
		//links coming in
		this.inputNeurons = [];
		this.outputNeurons = [];
		this.weights = [];
		this.output = 0.0;
		this.type = type;
		this.bias = math.randf(-1, 1);
		this.ID = ID;
		this.activationResponse = activationResponse;
		this.icon = {};
		//set its representation based on its type and append it to children.
		if (this.type == "input") {
			//purple if it is max, green if it is in contact with a boundary
			this.icon = new Rectangle(13, 13, {fill: "purple"});
		}
		else if (this.type == "hidden") {
			//green if positive, red if negative, grey if not activated
			this.icon = new Arc(9, {fill: "green"});
		}
		else if (this.type == "output") {
			//blue if activated, grey otherwise
			this.icon = new Arc(12, {fill: "blue"});
		}
		this.add(this.icon);
	}
	calculateOutput(sensorInput = 0) {
		//calculate the output given the inputs
		var activation = 0.0;
		if (this.type == "input") {
			activation = sensorInput * this.bias;
		}
		else {
			for (let j = 0; j < this.inputNeurons.length; j++) {
				activation += this.inputNeurons[j].output * this.weights[j];
			}
			//add the bias
			//if this is an input type neuron it doesn't have any other inputs, so 
			activation += -1 * this.bias;
			//now calculate the output
		}
		this.output = math.sigmoid(activation, this.activationResponse);
	}
	update(deltaT, t) {
		//this.calculateOutput();
		//updating styles
	}
}
export default Neuron;