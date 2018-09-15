const PRETURBATION_CHANCE = 0;
const CROSSOVER_CHANCE = 0.75;
const MUTATE_CONNECTIONS_CHANCE = 0;
const LINK_MUTATION_CHANCE = 0;
const BIAS_MUTATION_CHANCE = 0;
const NODE_MUTATION_CHANCE = 0;
const ENABLE_MUTATION_CHANCE = 0;
const DISABLE_MUTATION_CHANCE = 0;
const STEP_SIZE  = 0;


class Genome {
	constructor(ID, inputs, outputs) {
		//this creates a basic genome where all the input nodes are connected to the 
		//output nodes with no intervening structure and some basic weights.
		this.ID = ID;
		this.connectionGenes = [];
		this.nodeGenes = [];
		this.fitness = 0;
		this.adjustedFitness = 0;
		this.network = {};  //phenotype
		this.maxNeuron = 0;
		this.globalRank = 0;
		this.mutationRates = {
			connections: MUTATE_CONNECTIONS_CHANCE,
			link: LINK_MUTATION_CHANCE,
			bias: BIAS_MUTATION_CHANCE,
			node: NODE_MUTATION_CHANCE,
			enable: ENABLE_MUTATION_CHANCE,
			disable: DISABLE_MUTATION_CHANCE,
			step: STEP_SIZE
		};
		for (let i=0; i < inputs; i++0) {
			
		}
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