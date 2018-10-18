
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";
import InnovationTable from "./InnovationTable.js";
import Neuron from "./Neuron.js";
import NeuralNetwork from "./NeuralNetwork.js";
import math from "./utils/math.js";

const MAX_CONNECTION_ATTEMPTS = 5;

class Genome {
	constructor(ID, GA) {
		//this creates a basic genome where all the input nodes are connected to the 
		//output nodes with no intervening structure and some basic weights.
		this.GeneticAlgorithm = GA;
		this.ID = ID;
		this.connectionGenes = [];
		this.nodeGenes = [];
		this.fitness = 0;
		this.adjustedFitness = 0;
		this.network = {};  //phenotype
		this.maxNeuron = 0;
		this.globalRank = 0;
		this.mutationRates = {
			connections: 0,
			link: 0,
			bias: 0,
			node: 0,
			enable: 0,
			disable: 0,
			step: 0
		};
	}

	copy (ID) {

		var c = new Genome(ID, this.GeneticAlgorithm);  // <-- a new chomosome
		c.fitness = this.fitness;
		c.adjustedFitness = this.adjustedFitness;
		c.network = this.network;
		c.maxNeuron = this.maxNeuron;
		c.globalRank = this.globalRank;
		c.mutationRates = this.mutationRates;
		//make a copy of the genes
		for (let i = 0; i < this.nodeGenes.length; i++) {
			let g = this.nodeGenes[i].copy();
			c.nodeGenes.push(g);
		}
		for (let i = 0; i < this.connectionGenes.length; i++) {
			let g = this.connectionGenes[i].copy();
			c.connectionGenes.push(g);
		}
		return c;
	}
	addNode () {
		if (Math.random() > this.mutationRates.node) {
			return;
		}
		for(let i=0; i < MAX_CONNECTION_ATTEMPTS; i++) {
			var linkToTry = math.rand(0, this.connectionGenes.length - 1);
			
		//if there are fewer than 5 hidden neurons then don't choose a link
		//at random, otherwise do.
			if (this.nodeGenes.filter(obj => obj.type == "hidden").length < 5 ) {
				//not linked to bias, enabled, and not recurrent.
				//pick older genes (lower numbers)
				 linkToTry = math.rand(0, 
					this.connectionGenes.length - 1 - Math.sqrt(this.connectionGenes.length));

			}
			const aLink = this.connectionGenes[linkToTry];
			//console.log(aLink);
			if (aLink.enabled && 
			  aLink.recurrent == false && 
			  aLink.inNode.type != "bias" ) {
				//okay
				//disable this link, add a neuron and create links to it.
				i = MAX_CONNECTION_ATTEMPTS;
				aLink.enabled = false;
				//the new position will be split between the positions of the two connected neurons
				const nodePosition = {x: (aLink.inNode.position.x + aLink.outNode.position.x)/2,
					y: (aLink.inNode.position.y + aLink.outNode.position.y) / 2};
				const originalWeight = aLink.connectionWeight;
				//create a new node Gene constructor(ID, type="hidden", recurrent=false, activationResponse = 1.0, position={x:0,y:0}) {
				const inno = this.GeneticAlgorithm.innovationTable.findInnovation(
					"new_neuron", 
					aLink.inNode.ID,
					aLink.outNode.ID,
					"hidden");
				if (inno.innovationID == -1) {						//this should return the record if found
					//new innovation
					const inputNode = new NodeGene(
						this.GeneticAlgorithm.nodeID,
						"hidden",
						false,
						1.0,
						{x: (aLink.inNode.position.x + aLink.outNode.position.x)/2,
						y: (aLink.inNode.position.y + aLink.outNode.position.y) / 2}
					);
					this.nodeGenes.push(inputNode);
					this.maxNeuron++;
					this.GeneticAlgorithm.nodeID++;
					this.GeneticAlgorithm.innovationTable.createNewInnovation(
						this.GeneticAlgorithm.innovationID,
						"new_node",
						aLink.inNode.ID,
						aLink.outNode.ID,
						inputNode.ID,
						inputNode.type
					);
					//this.GeneticAlgorithm.innovationID++;
					//now add the two new connectionGenes
					let c1 = new ConnectionGene(
						this.GeneticAlgorithm.innovationID,
						aLink.inNode,
						inputNode,
						originalWeight, //not random to preserve learning...math.randf(-1,1),
						true,
						false
					);
					this.connectionGenes.push(c1);
					this.GeneticAlgorithm.innovationTable.createNewInnovation(
						this.GeneticAlgorithm.innovationID,
						"new_connection",
						aLink.inNode.ID,
						inputNode.ID,
						-1,
						"none"
					);
					//this.GeneticAlgorithm.innovationID++;
					//second
					let c2 = new ConnectionGene(
						this.GeneticAlgorithm.innovationID,
						inputNode,
						aLink.outNode,
						1, //not random ...math.randf(-1,1),
						true,
						false
					);
					this.connectionGenes.push(c2);
					this.GeneticAlgorithm.innovationTable.createNewInnovation(
						this.GeneticAlgorithm.innovationID,
						"new_connection",
						inputNode.ID,
						aLink.outNode.ID,
						-1,
						"none"
					);
					//this.GeneticAlgorithm.innovationID++;
					//console.log(this);

				}	
				else {
					//find the innovations and create new genes from them
					//the innovation already exists.
					const inputNode = new NodeGene(
						inno.nodeID,
						"hidden",
						false,
						1.0,
						nodePosition
					);
					this.nodeGenes.push(inputNode);
					this.maxNeuron++;
					//now find the connection Genes
					let iC1 = this.GeneticAlgorithm.innovationTable.findInnovation(
						"new_connection", 
						aLink.inNode.ID,
						inputNode.ID,
						"none");
					//make the connection gene
					let c1 = new ConnectionGene(
						iC1.innovationID,
						aLink.inNode,
						inputNode,
						originalWeight, //not random to preserve learning...math.randf(-1,1),
						true,
						false
					);
					this.connectionGenes.push(c1);
					let iC2 = this.GeneticAlgorithm.innovationTable.findInnovation(
						"new_connection", 
						inputNode.ID,
						aLink.outNode.ID,
						"none");
					let c2 = new ConnectionGene(
						ic2.innovationID,
						inputNode,
						aLink.outNode,
						1, //not random ...math.randf(-1,1),
						true,
						false
					);
					this.connectionGenes.push(c2);

				}						
			}
		}
	}
	addConnection (GeneticAlgorithm) {
		if (Math.random() > this.mutationRates.connections) {
			return;
		}
	//just return dependent on the mutation rate

	//define holders for the two neurons to be linked. If we have find two 
	//valid neurons to link these values will become >= 0.

	//flag set if a recurrent link is selected (looped or normal)

	//first test to see if an attempt shpould be made to create a 
	//link that loops back into the same neuron

	//YES: try NumTrysToFindLoop times to find a neuron that is not an
		//input or bias neuron and that does not already have a loopback
		//connection

		//grab a random neuron

		
			//check to make sure the neuron does not already have a loopback 


			//No: try to find two unlinked neurons. Make NumTrysToAddLink
		//attempts

		//choose two neurons, the second must not be an input or a bias

		//make sure these two are not already linked and that they are
			//not the same neuron

			
	//return if unsuccessful in finding a link

	
	//check to see if we have already created this innovation

	
	//is this link recurrent?

	//we need to create a new innovation

	
		//then create the new gene


		//the innovation has already been created so all we need to
		//do is create the new gene using the existing innovation ID
		//determine the kind of connection (loopback, recurrent, or forward)
		
		for (let j = 0; j < INPUT_NODES; j++) {
			for (let k = 0; k < OUTPUT_NODES; k++) {
				const connection = new ConnectionGene(
					this.innovationID,
					inNodes[j],
					outNodes[k],
					math.randf(-1,1),
					true,
					false
				);
				genome.connectionGenes.push(connection);
				const innovation = this.innovationTable.createNewInnovation(
					this.innovationID,
					"new_connection",
					connection.inNode,
					connection.outNode,
					-1,
					"none"
				);
				this.innovationID++;
			}
		}

		//
		
	}
	mutateWeights () {
		
	}
	mutateActivationResponse () {
		
	}
	compatibilityScore () {
		
	}
	createPhenotype () {
		//instantiate a neural network based on the node and connection genes.
		//this.connectionGenes;
		//this.nodeGenes;
		var nodes = [];
		//create the neurons from the nodes.
		//this means summing over all the inputs into the nodes X the weights
		//[xi*wi]
		for (let j=0; j < this.nodeGenes.length; j++) {
			const {
				ID: nID, 
				type: nType, 
				recurrent: recurrent,//here
				activationResponse: aR, 
				position: nPos} = this.nodeGenes[j];
			const node = new Neuron(
				nID,
				nType,
				recurrent,
				aR,
				nPos
			);
			//node.position = nPos;
			nodes.push(node);
		}
		//for each enabled connection, add the inputs and the weights
		for (let j = 0; j < this.connectionGenes.length; j++) {
			if (this.connectionGenes[j].enabled) {
				const {
					inNode: inN, 
					outNode: outN, 
					connectionWeight: weight, 
					recurrent: rec} = this.connectionGenes[j];
				let n = nodes.find(function(e) {
					return e.ID == outN.ID;
				});
				n.inputNeurons.push(nodes.find(function(e) {
					return e.ID == inN.ID;
				}));
				n.weights.push(weight);
				//now where it's the in node, push it to the outno
				let m = nodes.find(function(e) {
					return e.ID == inN.ID;
				});
				m.outputNeurons.push(n);
			}
		}
		//console.log(nodes);
		this.network = new NeuralNetwork(nodes, this.connectionGenes);
	}
	deletePhenotype () {
		this.network = {};
	}
	sortGenes () {
		
	}

}
export default Genome;