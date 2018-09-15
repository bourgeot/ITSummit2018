
import InnovationRecord from "./InnovationRecord.js";
import NodeGene from "./NodeGene.js";
import ConnectionGene from "./ConnectionGene.js";

class InnovationTable {
	constructor() {
		this.innovationID = 0;
		this.nodeID = 0;
		this.innovations = [];
	}
	createNewInnovation(type, parameters) {
		if(type == "new_connection") {
			const connection = new ConnectionGene(
				this.nextInnovationID,
				parameters.inNode,
				parameters.outNode,
				parameters.connectionWeight,
				parameters.enabled,
				parameters.recurrent
			);
			this.innovations.append(
				new InnovationRecord(
					this.nextInnovationID,
					"new_connection",
					connection.inNode,
					connection.outNode,
					-1,
					"none"
				);
			);					
		}
		else if (type == "new_node") {
			//parameters object has type,
			// input, hidden, bias, output, none
			const node = new nodeGene(
				this.nextNodeID,
				parameters.type,
				parameters.recurrent,
				parameters.activationResponse,
				parameters.position
			);
			this.innovations.append(
				new InnovationRecord(
					this.nextInnovationID,
					"new_node",
					-1,
					-1,
					node.ID,
					node.type
				);
			);		
		}
		else {
			//unknown type
			return;
		]
	}
	get nextInnovationID () {
		this.innovationID++;
		return this.innovationID;
	}
	get nextNodeID () {
		this.nodeID++;
		return this.nodeID;
	}
	get nodeID() {
		return this.nodeID;
	}
	get innovationID() {
		return this.innovationID;
	}
}
export default InnovationTable;