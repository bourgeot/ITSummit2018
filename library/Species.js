import Genome from "./genome.js";
import math from "./utils/math.js";
const EXCESS_COEFFICIENT = 1;
const MATCHING_COEFFICIENT = 1;
const DISJOINT_COEFFICIENT = 1;
const WEIGHT_DIFFERENCE_COEFFICIENT = 1;

class Species {
	constructor() {
		this.ID;
		this.memberZero = {};
		this.topFitness = 0;
		this.staleness = 0;
		this.genomes = {};
		this.averageFitness = 0;
		this.fittestGenome = {};
		this.age = 0;
		this.generationsStagnant = 0;
		this.spawnQuantity = 0;
		this.extinct = false;
		
	}

	compatibilityScore(genome1, genome2) {
		//this measures the genetic distance between two genomes, and is used to determine
		//whether or not they are part of the same species.
		let g1IDs = genome1.connectionGenes.map(obj=>obj.ID).sort();
		let g2IDs = genome2.connectionGenes.map(obj=> obj.ID).sort();
		console.log(g1IDs);
		console.log(g2IDs);
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
					weightDifference += Math.abs(genome1.connectionGenes[i].connectionWeight - genome2.connectionGenes[j].connectionWeight);
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
		console.log(matched, excess, longest, disjoint, weightDifference);
		return WEIGHT_DIFFERENCE_COEFFICIENT * weightDifference + (EXCESS_COEFFICIENT * excess + DISJOINT_COEFFICIENT * disjoint)/longest; 
	}

}
export default Species;