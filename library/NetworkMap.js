import Path from "./Path.js";
import Arc from "./Arc.js";
//import Path from "./Path.js";
import Container from "./Container.js";
import Neuron from "./Neuron.js";

const INPUT_NEURONS = 5;
const OUTPUT_NEURONS = 3;
const BORDER = 5;
const INPUT_ICON_SIZE = 13;
const INPUT_ICON_TYPE = "Rectangle";
const HIDDEN_ICON_SIZE = 9;
const HIDDEN_ICON_TYPE = "Arc";
const OUTPUT_ICON_SIZE = 12;
const OUTPUT_ICON_TYPE = "Arc";

class NetworkMap extends Container {
	constructor ( network, width, height) {
		//the layout of nodes and paths...
		//input  nodes at the bottom and output nodes at the top. 
		//intervening nodes in the spaces in between. Each node has a icon that is rendered,
		//so the NetworkMap only needs to concern itself with the layout relative to the container
		//size, specified by the height and width element.
		super();
		this.h = height;
		this.w = width;
		//network.neurons; //array //neuron has an icon and a type (input, hidden, output) and a position
		let inputCtr = 0;
		let outputCtr = 0;
		let hiddenCtr = 0;
		for(let i=0; i<network.neurons.length; i++) {
			//deal out the nodes
			if (network.neurons[i].type == "input") { 
				inputCtr++;
				let firstIn = 0;
				if (inputCtr == 1) firstIn = 1;
				network.neurons[i].position = {
					x:Math.floor((width - BORDER*2 - INPUT_ICON_SIZE) * inputCtr / INPUT_NEURONS),
					y:height - BORDER - INPUT_ICON_SIZE
				};
			}
			else if (network.neurons[i].type == "speed" || network.neurons[i].type =="heading") {
				outputCtr++;
				let firstOut = 0;
				if (outputCtr == 1) firstOut = 1;
				network.neurons[i].position = {
					x: Math.floor((width-BORDER*2-OUTPUT_ICON_SIZE) * outputCtr / OUTPUT_NEURONS),
					y: BORDER + OUTPUT_ICON_SIZE
				};
			}
			else {
				hiddenCtr++;
				//more to come here
				//console.log('hidden added to map');
				//console.log(network.neurons[i]);
				network.neurons[i].position = {
					x: Math.floor((width-BORDER*2-HIDDEN_ICON_SIZE) * hiddenCtr / hiddenCtr),
					y: BORDER + HIDDEN_ICON_SIZE
				};
			}
			this.add(network.neurons[i]);
		}
		
		for (let i = 0; i<network.neurons.length; i++) {
			//inNode, outNode
			for (let j=0; j <network.neurons[i].outputNeurons.length; j++) {
				let n = network.neurons.find(function(e) {
						return e.ID == network.neurons[i].outputNeurons[j].ID;
					});
				const connection = new Path(
					[network.neurons[i].position, n.position],
					{fill: "black"}
				);
				this.add(connection);
			}
		}
		//network.connections; //array
		//this.add(netwo);
	}
}
export default NetworkMap;