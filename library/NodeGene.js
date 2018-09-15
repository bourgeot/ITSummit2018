
class NodeGene {
	constructor(ID, type="none", recurrent=false, activationResponse, position={x:0,y:0}) {
		/*
		NEAT’s genetic encoding scheme is designed to allow corresponding genes to be easily lined up when two genomes cross over during mating. Genomes are linear representations of network connectivity (Figure 2). Each genome includes a list of connection genes, each of which refers to two node genes being connected. Node genes provide a list of inputs, hidden nodes, and outputs that can be connected. Each connection gene speciﬁes the in-node, the out-node, the weight of the connection, whether or not the connection gene is expressed (an enable bit), and an innovation number, which allows ﬁnding corresponding genes (as will be explained below).
		*/
		//connection genes specify the two nodes linked together (an in node and an node
		this.ID = ID;
		// input, hidden, bias, output, none
		this.type = type;
		this.recurrent = recurrent;
		this.activationResponse = activationResponse;
		this.position = position;

		}
	static from (g) {
		return new NodeGene().copy(g);
	}
	copy({ID, type, recurrent, activationResponse, position}) {
		this.ID = ID;
		this.type = type;
		this.recurrent = recurrent;
		this.activationResponse = activationResponse;
		this.position = position;
		return this;
	}
	
}
export default NodeGene;