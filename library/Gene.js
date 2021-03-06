
class Gene {
	constructor() {
		/*
		NEAT’s genetic encoding scheme is designed to allow corresponding genes to be easily lined up when two genomes cross over during mating. Genomes are linear representations of network connectivity (Figure 2). Each genome includes a list of connection genes, each of which refers to two node genes being connected. Node genes provide a list of inputs, hidden nodes, and outputs that can be connected. Each connection gene speciﬁes the in-node, the out-node, the weight of the connection, whether or not the connection gene is expressed (an enable bit), and an innovation number, which allows ﬁnding corresponding genes (as will be explained below).
		*/
		//connection genes specify the two nodes linked together (an in node and an node
		this.inNode = 0;
		this.outNode = 0;
		this.connectionWeight = 0.0;
		this.enabled = true;
		this.innovationNumber = 0;
	}
	static from (g) {
		return new Gene().copy(g);
	}
	copy({inNode, outNode, connectionWeight, enabled, innovationNumber}) {
		this.inNode = inNode;
		this.outNode = outNode;
		this.connectionWeight = connectionWeight;
		this.enabled = enabled;
		this.innovationNumber = innovationNumber;
		return this;
	}
	
}
export default Gene;