
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";
import InnovationTable from "./InnovationTable.js";

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
		
	}
	deletePhenotype () {
		
	}
	sortGenes () {
		
	}

}
export default Genome;