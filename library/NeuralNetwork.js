
import Container from "./Container.js";
import Arc from "./Arc.js";
import Path from "./Path.js";
import Neuron from "./Neuron.js";

class NeuralNetwork extends Container {
	constructor(neurons = [], connections = []) {
		//by extending Container there is a renderable children array, a position, and an update method.
		//nodes: ID, type, recurrent, activationResponse, position
		//connections: ID, inNode, outNode, connectionWeight, enabled, recurrent
		super();
		this.neurons = neurons;
		this.connections = connections;
		this.inputSensors = [];
		this.outputActions = [];
		this.fitness = 0;
		
		
	}
	
	update(deltaT, t) {
		for (let j=0; j < this.neurons.length; j++) {
			this.neurons[j].calculateOutput();
			if (this.neurons[j].type == "output") {
				this.outputActions.push(this.neurons[j].output);
			}
		}
	}
}
export default NeuralNetwork;