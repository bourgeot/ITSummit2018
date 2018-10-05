
const POPULATION_SIZE = 20;
const INPUT_NODES = 5;
const OUTPUT_NODES = 2;
const PRETURBATION_CHANCE = 0;
const WEIGHT_REPLACEMENT_CHANCE = 0;
const CROSSOVER_CHANCE = 0.75;
const MUTATE_CONNECTIONS_CHANCE = 0;
const LINK_MUTATION_CHANCE = 0;
const BIAS_MUTATION_CHANCE = 0;
const NODE_MUTATION_CHANCE = 0;
const ENABLE_MUTATION_CHANCE = 0;
const DISABLE_MUTATION_CHANCE = 0;
const STEP_SIZE  = 0;

//include block
import InnovationTable from "./InnovationTable.js";
import Genome from "./Genome.js";
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";
import math from "./utils/math.js";
import Species from "./Species.js";

class GeneticAlgorithm {
	constructor() {
		this.innovationID = 1;
		this.nodeID = 1;
		this.genomeID = 1;
		this.speciesID = 1;
		this.innovationTable = new InnovationTable(this);
		this.species = [];
		this.genomes = [];

	}
	initialize() {
		//create POPULATION_SIZE initial Genomes where all the inputs are connected directly to the outputs.
		//all are members of an initial species.
		/*
		first create all the initial nodes and links and add them to the innovation table. These will be common
		to all the initial genomes created below.
		They will differ in terms of their weights.
		*/
		var inNodes = [];
		var outNodes = [];
		for (let j = 0; j < INPUT_NODES; j++) {
			const inputNode = new NodeGene(this.nodeID, "input", false, 1.0, {x:j+1, y:0});
			inNodes.push(inputNode);
			this.nodeID++;
			const innovation = this.innovationTable.createNewInnovation(
				this.innovationID,
				"new_node",
				-1,
				-1,
				inputNode.ID,
				inputNode.type
			);
			this.innovationID++;
		}
		for (let j = 0; j < OUTPUT_NODES; j++) {
			const outputNode = new NodeGene(this.nodeID, "output", false, 1.0, {x:j+1, y:1});
			outNodes.push(outputNode);
			this.nodeID++;
			const innovation = this.innovationTable.createNewInnovation(
				this.innovationID,
				"new_node",
				-1,
				-1,
				outputNode.ID,
				outputNode.type
			);
			this.innovationID++;
		}

		for (let i=0; i < POPULATION_SIZE; i++) {
			//build a basic genome and randomize the connection weights
			//NOTE: right now the weight differences are not captured in the innovation number. That is,
			//they don't count as a distinct innovation. I am not sure at this point if that matters or not.
			//i found out it does, because objects need to be created or the weight change will affect all instances.
			var genome = new Genome();
			genome.ID = this.genomeID;
			genome.nodeGenes = inNodes.concat(outNodes);
			genome.maxNeuron = genome.nodeGenes.length + 1;
			genome.mutationRates = {
				connections: MUTATE_CONNECTIONS_CHANCE,
				link: LINK_MUTATION_CHANCE,
				bias: BIAS_MUTATION_CHANCE,
				node: NODE_MUTATION_CHANCE,
				enable: ENABLE_MUTATION_CHANCE,
				disable: DISABLE_MUTATION_CHANCE,
				step: STEP_SIZE
			};
			//randomize the connection weights
			//we have to create new connection objects 
			
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
			
			//now create a phenotype (a neural network) for each genome.
			if (i<5) genome.createPhenotype();
			this.genomes.push(genome);
			this.genomeID++;
		}
		return this;
	}
	epoch() {
		//this is where fitness is evaluated, evolution happens, and a new generation is spawned.
	}
}
export default GeneticAlgorithm;