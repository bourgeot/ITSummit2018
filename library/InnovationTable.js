
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
	createNewInnovation(innovationID, type, inNodeID, outNodeID, nodeID, nodeType) {
		var record;
		record = new InnovationRecord(
			innovationID,
			type,
			inNodeID,
			outNodeID,
			nodeID,
			nodeType
		);					
		this.innovations.push(record);
		this.GeneticAlgorithm.innovationID++;
		return record;
	}
	findInnovation(type, inNodeID = -1, outNodeID = -1, nodeType = "none") {
		//return the id if it is found, otherwise return -1;
		var found = {innovationID: -1};
		for (let i=0; i < this.innovations.length; i++) {
			let inn = this.innovations[i];
			//neuron
			if(	inn.type == type &&
					inn.nodeType == nodeType &&
					inn.inNodeID == inNodeID &&
					inn.outNodeID == outNodeID) {
				found = inn;
				break;
			}
		}
		return found;
	}

}
export default InnovationTable;