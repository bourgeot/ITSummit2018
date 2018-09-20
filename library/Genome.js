
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";
import InnovationTable from "./InnovationTable.js";
import Neuron from "./Neuron.js";
import NeuralNetwork from "./NeuralNetwork.js";

class Genome {
	constructor() {
		//this creates a basic genome where all the input nodes are connected to the 
		//output nodes with no intervening structure and some basic weights.
		this.InnovationTable = [];
		this.ID = 0;
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
	static from (g) {
		return new Genome().copy(g);
	}
	copy ({genes, fitness, adjustedFitness, network, maxNeuron, globalRank, mutationRates}) {
		//make a copy of the genes
		for (let i=0; i < genes.length; i++) {
			this.genes.append(Gene.from(genes[i]));
		}
		//this.genes = genes;
		this.fitness = fitness;
		this.adjustedFitness = adjustedFitness;
		this.network = network;
		this.maxNeuron = maxNeuron;
		this.globalRank = globalRank;
		this.mutationRates = mutationRates;
		return this;
	}
	addNode () {
		
	}
	addConnection (GeneticAlgorithm) {
		if (Math.random() > this.mutationRates.connections) {
			return;
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
				activationResponse: aR, 
				position: nPos} = this.nodeGenes[j];
			const node = new Neuron(
				nID,
				nType,
				aR
			);
			node.position = nPos;
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