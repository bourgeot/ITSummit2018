import Genome from "./genome.js";
import math from "./utils/math.js";
const EXCESS_COEFFICIENT = 1;
const MATCHING_COEFFICIENT = .4;
const DISJOINT_COEFFICIENT = 1;
const MAX_GENERATIONS_STAGNANT = 5;

class Species {
	constructor(ID) {
		this.ID = ID;
		this.memberZero = {};
		this.topFitness = 0;
		this.lastAvgAdjFitness = 0;
		this.genomes = [];
		this.averageAdjFitness = 0;
		this.age = 0;
		this.generationsStagnant = 0;
		this.spawnQuantity = 0;
		this.extinct = false;
		
	}
	addMemberZero(genome) {
		this.memberZero = genome;
		this.genomes.push(genome);
		this.topFitness = genome.fitness;
		this.lastAvgAdjFitness = genome.fitness;
	}
	cull() {
		this.genomes = [];
		this.genomes.push(this.memberZero);
	}
	happyBirthday() {
		this.age++;
		if(this.averageAdjFitness <= this.lastAvgAdjFitness) {
			this.generationsStagnant++;
		}
		if (this.generationsStagnant > MAX_GENERATIONS_STAGNANT) {
			this.extinct =  true;
		}
		this.lastAvgAdjFitness = this.averageAdjFitness;
	}
	manageFitnessAndSpawnLevels() {
		this.topFitness = this.memberZero.fitness;
		let total = 0;
		for(let i=0; i<this.genomes.length; i++) {
			//fitness adjustment
			this.genomes[i].adjustedFitness = this.genomes[i].fitness / this.genomes[i].length;
			if (this.genomes[i].fitness > this.topFitness) {
				this.topFitness = this.genomes[i].fitness;
				this.memberZero = this.genomes[i];
			}
			this.memberZero.connectionGenes.sort((a,b) => b.fitness > a.fitness);
			total += this.genomes[i].adjustedFitness;
			this.averageAdjFitness = total/this.genomes.length;
		for(let i=0; i<this.genomes.length; i++) {
			this.spawnQuantity += this.genomes[i].adjustedFitness/this.averageAdjFitness;
		}
		this.spawnQuantity = Math.floor(this.spawnQuantity);
	}
	spawnOffspring() {
		
	}
	compatibilityScore(genome1) {
		//this measures the genetic distance between two genomes, and is used to determine
		//whether or not they are part of the same species.
		let g1IDs = genome1.connectionGenes.map(obj=> obj.ID).sort();
		let g2IDs = this.memberZero.connectionGenes.map(obj=> obj.ID).sort();
		console.log(g1IDs);
		//console.log(g2IDs);
		let weightDifference = 0;
		
		let matched = 0;
		//excess is the length difference.
		let excess = Math.abs(g1IDs.length - g2IDs.length);
		let longest = Math.max(g1IDs.length, g2IDs.length);
		let disjoint = 0;
		for(let i=0; i<g1IDs.length; i++) {
			let noMatch = true;
			for (let j=0; j<g2IDs.length; j++) {
				if (g1IDs[i] == g2IDs[j]) {
					matched++;
					noMatch = false;
					weightDifference += Math.abs(genome1.connectionGenes[i].connectionWeight - this.memberZero.connectionGenes[j].connectionWeight);
					//weightDifference += Math.abs(g1IDs[i].connectionWeight - g2IDs[j].connectionWeight);
					//splice the array to remove the matched element
					g2IDs.splice(j, 1);
					break;
				}
			}
			if(noMatch) {
				disjoint++;
			}
		}
		//because we spliced the array we know the remaining elements are disjoint.
		disjoint += g2IDs.length;
		//console.log(matched, excess, longest, disjoint, weightDifference);
		return (EXCESS_COEFFICIENT * excess)/longest + (DISJOINT_COEFFICIENT * disjoint)/longest + 
		  (MATCHING_COEFFICIENT * weightDifference)/matched;
		//return WEIGHT_DIFFERENCE_COEFFICIENT * weightDifference + (EXCESS_COEFFICIENT * excess + DISJOINT_COEFFICIENT * disjoint)/longest; 
	}

}
export default Species;