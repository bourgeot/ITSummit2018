
const POPULATION_SIZE = 20;
const INPUT_NODES = 5;
const OUTPUT_NODES = 2;
const PRETURBATION_CHANCE = 0.5;
const WEIGHT_REPLACEMENT_CHANCE = 0.1;
const CROSSOVER_CHANCE = 0.75;
const MUTATE_CONNECTIONS_CHANCE = 0.3;
const LINK_MUTATION_CHANCE = 0.17;
const BIAS_MUTATION_CHANCE = 0;
const NODE_MUTATION_CHANCE = 0.514;
const ENABLE_MUTATION_CHANCE = 0;
const DISABLE_MUTATION_CHANCE = 0;

const COMPATIBILITY_THRESHOLD = 0.26;


const STEP_SIZE  = 0;
/*
iNumAddLinkAttempts 5
dSurvivalRate 0.2
iNumGensAllowedNoImprovement 15
iMaxPermittedNeurons 100
dChanceAddLink 0.17
dChanceAddNode	0.14
dChanceAddRecurrentLink 0.05
dMutationRate 0.3
dMaxWeightPerturbation 0.5
dProbabilityWeightReplaced 0.1
dActivationMutationRate 0.1
dMaxActivationPerturbation 0.1
dCompatibilityThreshold 0.26
iOldAgeThreshold 50
dOldAgePenalty 0.7
dYoungFitnessBonus 1.4
iYoungBonusAgeThreshhold 10
dCrossoverRate 0.7

*/

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
	newGenomeID() {
		return this.genomeID++;
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
			this.innovationTable.createNewInnovation(
				this.innovationID,
				"new_node",
				-1,
				-1,
				inputNode.ID,
				inputNode.type
			);
			//this.innovationID++;
		}
		for (let j = 0; j < OUTPUT_NODES; j++) {
			const outputNode = new NodeGene(this.nodeID, "output", false, 1.0, {x:j+1, y:1});
			outNodes.push(outputNode);
			this.nodeID++;
			this.innovationTable.createNewInnovation(
				this.innovationID,
				"new_node",
				-1,
				-1,
				outputNode.ID,
				outputNode.type
			);
			//this.innovationID++;
		}
		var genome = new Genome(this.genomeID, this);
		genome.nodeGenes = inNodes.concat(outNodes);
		genome.maxNeuron = genome.nodeGenes.length + 1;
		genome.mutationRates = {
			connections: MUTATE_CONNECTIONS_CHANCE,
			link: LINK_MUTATION_CHANCE,
			bias: BIAS_MUTATION_CHANCE,
			node: NODE_MUTATION_CHANCE,
			enable: ENABLE_MUTATION_CHANCE,
			disable: DISABLE_MUTATION_CHANCE,
			preturbation: PRETURBATION_CHANCE,
			weightReplacement: WEIGHT_REPLACEMENT_CHANCE
		};
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
				this.innovationTable.createNewInnovation(
					this.innovationID,
					"new_connection",
					connection.inNode.ID,
					connection.outNode.ID,
					-1,
					"none"
				);
				//this.innovationID++;
			}
		}
		genome.createPhenotype();
		this.genomes.push(genome);
		//Now from this master create copies with random connection weights.
		for (let i=1; i<POPULATION_SIZE; i++) {
			this.newGenomeID();
			const g2 = genome.copy(this.genomeID);
			for (let j = 0; j < g2.connectionGenes.length; j++){
				g2.connectionGenes[j].connectionWeight = math.randf(-1,1);
			}
			//test
			//g2.addNode();
			//g2.addConnection();
			//g2.deletePhenotype();
			g2.createPhenotype();
			this.genomes.push(g2);
		}
		this.genomes[0].fitness = 1;
		this.crossover(this.genomes[0], this.genomes[POPULATION_SIZE - 1]);
		return this;
	}
	epoch(population) {
		//this is where fitness is evaluated, evolution happens, and a new generation is spawned.
		//console.log(this.genomes.map(a=>a.fitness));
		//console.log(population.map(a=>a.fitness));
		this.genomes = population;
	}
	crossover (mother, father) {
		//let mom = mother;
		//let dad = father;
		let kidGenes = [];
		let kidNeurons = [];
		//sort by IDs 
		let momGenes = mother.connectionGenes.sort((a, b) => a.ID < b.ID);
		let dadGenes = father.connectionGenes.sort((a, b) => a.ID < b.ID);
		// choose the parent with the highest fitness or, if equal, pick one at random
		let fittest = "m";
		let kidGenome = mother.copy(this.newGenomeID(), this);
		if (mother.fitness == father.fitness) {
			if (Math.random() > 0.5000) {
				fittest = "d";
				kidGenome = father.copy(this.newGenomeID(), this);

			}
		}
		else {
			if(mother.fitness < father.fitness) {
				fittest = "d";
				kidGenome = father.copy(this.newGenomeID(), this);

			}
		}
		//the crossover will choose matching genes at random. Disjoint genes will be inherited from the fittest parent.
		let mIdx = 0;
		let dIdx = 0;
		let mLen = momGenes.length;
		let dLen = dadGenes.length;
		let selected = {};
		while (mIdx != mLen && dIdx != dLen)  {
			//edge: no more mom genes
			if(mIdx == mLen && dIdx != dLen) {
				if (fittest == "d") {
					selected = dadGenes[dIdx].copy(dadGenes[dIdx].ID);
					dIdx++;
				}
			}
			//edge: no more dad genes
			else if(mIdx != mLen && dIdx == dLen) {
				if (fittest == "m") {
					selected = momGenes[mIdx].copy(momGenes[mIdx].ID);
					mIdx++;
				}
			}
			//mom's innovation lower
			else if (momGenes[mIdx].ID < dadGenes[dIdx].ID) {
				if (fittest == "m") {
					selected = momGenes[mIdx].copy(momGenes[mIdx].ID);
					mIdx++;
				}
			}
			//dad's innovation lower
			else if (dadGenes[dIdx].ID < momGenes[mIdx].ID) {
				if (fittest == "d") {
					selected = dadGenes[dIdx].copy(dadGenes[dIdx].ID);
					dIdx++;
				}
			}
			//equal
			else if (momGenes[mIdx].ID == dadGenes[dIdx].ID) {
				if (Math.random() > .50000) {
					selected = momGenes[mIdx].copy(momGenes[mIdx].ID);
				}
				else {
					selected = dadGenes[dIdx].copy(dadGenes[dIdx].ID);
				}
				//increment both
				mIdx++;
				dIdx++;
			}
			//add the selected gene if it hasn't already been added
			if (kidGenes.length == 0) {
				kidGenes.push(selected);
			}
			else if (kidGenes.filter(obj => obj.ID == selected.ID).length == 0 ) {
				kidGenes.push(selected);
			}
			//add the neuron Genes
			if (kidNeurons.filter(obj => obj.ID == selected.inNode.ID).length == 0) {
				kidNeurons.push(selected.inNode.copy());
			}
			if (kidNeurons.filter(obj => obj.ID == selected.outNode.ID).length == 0) {
				kidNeurons.push(selected.outNode.copy());
			}

		}
		//return the new genome based on the fittest
		kidGenome.connectionGenes = kidGenes;
		kidGenome.nodeGenes = kidNeurons;
		//console.log(fittest);
		//console.log(kidGenome);
		return kidGenome;
	}
}
export default GeneticAlgorithm;