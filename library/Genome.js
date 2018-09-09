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
	constructor() {
		this.genes = [];
		this.fitness = 0;
		this.adjustedFitness = 0;
		this.network = {};
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
	}
	static from (g) {
		return new Genome().copy(g);
	}
	copy ({genes, fitness, adjustedFitness, network, maxNeuron, globalRank, mutationRates}) {
		//make a copy of the genes
		for (let i=0; i < genes.length; i++) {
			this.genes.append(genes[i].from());
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
	mutate() {
		for mutation,rate in pairs(genome.mutationRates) do
			if math.random(1,2) == 1 then
				genome.mutationRates[mutation] = 0.95*rate
			else
				genome.mutationRates[mutation] = 1.05263*rate
			end
		end

		if math.random() < genome.mutationRates["connections"] then
			pointMutate(genome)
		end
		
		local p = genome.mutationRates["link"]
		while p > 0 do
			if math.random() < p then
				linkMutate(genome, false)
			end
			p = p - 1
		end

		p = genome.mutationRates["bias"]
		while p > 0 do
			if math.random() < p then
				linkMutate(genome, true)
			end
			p = p - 1
		end
		
		p = genome.mutationRates["node"]
		while p > 0 do
			if math.random() < p then
				nodeMutate(genome)
			end
			p = p - 1
		end
		
		p = genome.mutationRates["enable"]
		while p > 0 do
			if math.random() < p then
				enableDisableMutate(genome, true)
			end
			p = p - 1
		end

		p = genome.mutationRates["disable"]
		while p > 0 do
			if math.random() < p then
				enableDisableMutate(genome, false)
			end
			p = p - 1
		end
	}

}
export default Genome;