
import Container from "./Container.js";
import Arc from "./Arc.js";
import Path from "./Path.js";
import Neuron from "./Neuron.js";
import Genome from "./Genome.js";
const SPEED_NEURON  = 0;
const HEADING_NEURON = 1;


class NeuralNetwork extends Container {
	constructor(genome, neurons = [], connections = []) {
		//by extending Container there is a renderable children array, a position, and an update method.
		//nodes: ID, type, recurrent, activationResponse, position
		//connections: ID, inNode, outNode, connectionWeight, enabled, recurrent
		super();
		this.genome = genome;
		this.neurons = neurons;
		this.connections = connections;
		this.inputSensors = [0, 0, 0, 0, 0];
		this.outputActions = [0, .5];
		this.fitness = 0;
		
		
	}
	
	update(deltaT, t) {
		/*
		for (let i=0; i < this.outputActions.length-1; i++) {
			if(this.outputActions[i]  >.5) {
				this.outputActions[i] -= .001;
			}
			else if (this.outputActions[i] < .44 ) {
		
				this.outputActions[i] += 0.001;
			}
		}
		*/
		for (let j=0; j < this.neurons.length; j++) {
			this.neurons[j].calculateOutput();
			if (this.neurons[j].type == "speed") {
				this.outputActions[SPEED_NEURON] = this.neurons[j].output;
			}
			if (this.neurons[j].type == "heading") {
				this.outputActions[HEADING_NEURON] = this.neurons[j].output;
			}
		}
		
	}
}
export default NeuralNetwork;