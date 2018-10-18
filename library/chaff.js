	//just return dependent on the mutation rate

	//define holders for the two neurons to be linked. If we have find two 
	//valid neurons to link these values will become >= 0.

	//flag set if a recurrent link is selected (looped or normal)

	//first test to see if an attempt shpould be made to create a 
	//link that loops back into the same neuron

	//YES: try NumTrysToFindLoop times to find a neuron that is not an
		//input or bias neuron and that does not already have a loopback
		//connection

		//grab a random neuron

		
			//check to make sure the neuron does not already have a loopback 


			//No: try to find two unlinked neurons. Make NumTrysToAddLink
		//attempts

		//choose two neurons, the second must not be an input or a bias

		//make sure these two are not already linked and that they are
			//not the same neuron

			
	//return if unsuccessful in finding a link

	
	//check to see if we have already created this innovation

	
	//is this link recurrent?

	//we need to create a new innovation

	
		//then create the new gene


		//the innovation has already been created so all we need to
		//do is create the new gene using the existing innovation ID
