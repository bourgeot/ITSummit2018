
import Container from "./Container.js";
import Arc from "./Arc.js";
import Path from "./Path.js";


class NeuralNetwork extends Container {
	constructor(nodes = [], connections = []) {
		//by extending Container there is a renderable children array, a position, and an update method.
		//nodes: ID, type, recurrent, activationResponse, position
		//connections: ID, inNode, outNode, connectionWeight, enabled, recurrent
		super();
		this.nodes = nodes;  //these will be rendered as arcs with a radius
		this.connections = connections;
		this.inputs = []; 
		//for each outNode, collect the inNodes and the weights
		for (let j=0; j < connections.length; j++) {
			 if (connections[j].enabled) {
				 
			 }
		}
		
	}
	
	update(deltaT, t) {
		//calculate the output given the inputs
	}
}
export default NeuralNetwork;