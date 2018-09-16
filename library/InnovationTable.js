
import InnovationRecord from "./InnovationRecord.js";
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";

class InnovationTable {
	constructor(GeneticAlgorithm) {
		//this.innovationID = 0;
		//this.nodeID = 0;
		//this.genomeID = 0;
		this.GeneticAlgorithm = GeneticAlgorithm;
		this.innovations = [];

	}
	createNewInnovation(innovationID, type, inNode, outNode, nodeID, nodeType) {
		var record;
		record = new InnovationRecord(
			innovationID,
			type,
			inNode,
			outNode,
			nodeID,
			nodeType
		);					
		this.innovations.push(record);
		return innovationID;
	}
	findInnovation(parameters) {
		//I don't know yet
		//return the id if it is found, otherwise return -1;
	}

}
export default InnovationTable;