
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
			bias: 0,
			node: 0,
			enable: 0,
			disable: 0,
			preturbation: 0,
			weightReplacement: 0
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
	//just return dependent on the mutation rate
		if (Math.random() > this.mutationRates.connections) {
			return;
		}
		for (let i=0; i < MAX_CONNECTION_ATTEMPTS; i++) {
			let candidates = this.nodeGenes.filter(obj => obj.type != 'bias');
			let node1 = candidates[math.rand(0, candidates.length - 1)];
			let candidates2 = candidates.filter(obj => obj.type != 'input');
			let node2 = candidates2[math.rand(0, candidates2.length - 1)];
			//console.log(candidates);
			//console.log(node1);
			//console.log(candidates2);
			//console.log(node2);
			//note: these two candidates could be the same neuron. This will create a loopback.
			//Search the innovation database to find out if this connection has been discovered before
			//if it has not, then it has not also occurred in this particular genome so we don't have to
			//check that. Otherwise we do.
			let inno = this.GeneticAlgorithm.innovationTable.findInnovation(
			  "new_connection", 
			  node1.ID,
			  node2.ID,
			  "none");
			//console.log(this.GeneticAlgorithm.innovationTable);
			//console.log(inno);
			if (inno.innovationID == -1) {
				//check the other direction
				inno = this.GeneticAlgorithm.innovationTable.findInnovation(
				  "new_connection",
				  node2.ID,
				  node1.ID,
				  "none");
				  //console.log('did not find ' + node1.ID + '->' + node2.ID);
				if (inno.innovationID == -1) {
					//not present in either direction.
					//console.log('did not find ' + node2.ID + '->' + node1.ID);
					const connection = new ConnectionGene(
					  this.GeneticAlgorithm.innovationID,
					  node1,
					  node2,
					  math.randf(-1,1),
					  true,
					  false
					);
					this.connectionGenes.push(connection);
					const innovation = this.GeneticAlgorithm.innovationTable.createNewInnovation(
					  this.GeneticAlgorithm.innovationID,
					  "new_connection",
					  node1.ID,
					  node2.ID,
					  -1,
					  "none"
					);
					//since an innovation has been added don't retry
					i = MAX_CONNECTION_ATTEMPTS;
					//console.log('added connection: ' +  + node1.ID + '->' + node2.ID);
				}
				else {
					//it was found in the other direction, so the neutrons are already connected so try again.
					//break;
				}
			}
			else {
				//search the connection genes in this genome to make sure these two neurons aren't already connected here.
				//if they aren't, make a new gene with the discovered innovationID
				let connectionFound = false;
				//console.log('found innovation: '  + node1.ID + '->' + node2.ID);
				for(let j=0; j < this.connectionGenes.length; j++) {
					if(this.connectionGenes[j].inNode.ID == node1.ID && this.connectionGenes[j].outNode.ID == node2.ID) {
						//found it
						connectionFound = true;
						//console.log('found in genome: '  + node1.ID + '->' + node2.ID);
						if(this.connectionGenes[j].enabled != true) {
							this.connectionGenes[j].enabled = true;
						}
						//break;
					}
				}
				if (!connectionFound) {
					//add it
					const connection = new ConnectionGene(
					  inno.innovationID,
					  node1,
					  node2,
					  math.randf(-1,1),
					  true,
					  false
					);
					this.connectionGenes.push(connection);
				    //console.log('found innovation but not in genome: '  + node1.ID + '->' + node2.ID);
					//console.log('added connection: ' + node1.ID + '->' + node2.ID);
				}
			}
		}
		
	}
	mutateWeights () {
		if (Math.random() > this.mutationRates.preturbation) {
			return;
		}
		for (let i=0; i < this.connectionGenes.length; i++) {
			//pick a new random weight and assign it...or replace it
			if (Math.random() > this.mutationRates.weightReplacement) {
				//preturb it
				this.connectionGenes[i].connectionWeight += math.randf(-.5,.5);
			}
			else {
				//replace it
				this.connectionGenes[i].connectionWeight = math.randf(-1, 1);
			}
		}
	}
	mutateActivationResponse () {
		
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
		//console.log(this.connectionGenes);
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