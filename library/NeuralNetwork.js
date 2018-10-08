
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
		this.inputSensors = [0, 0, 0, 0, 0];
		this.outputActions = [0, .5];
		this.fitness = 0;
		
		
	}
	
	update(deltaT, t) {
		for (let i=0; i < this.outputActions.length-1; i++) {
			if(this.outputActions[i]  >.5) {
				this.outputActions[i] -= .001;
			}
			else if (this.outputActions[i] < .44 ) {
		
				this.outputActions[i] += 0.001;
			}
		}
		/*
		for (let j=0; j < this.neurons.length; j++) {
			this.neurons[j].calculateOutput();
			if (this.neurons[j].type == "output") {
				//this won't work. need to assign which neuron controls which thing
				this.outputActions[j] = this.neurons[j].output;
			}
		}
		*/
	}
}
export default NeuralNetwork;