class DNA {

	constructor(genes) {
		this.genes = [];

		if (genes) {
			this.genes = genes;
		} else {
			/**
			 * Generate new random genes.
			 */
			for (let i = 0; i <= life_span; i++) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(max_force);
			}
		}
	}

	mutate() {
		for (let i = 0; i <= life_span; i++) {
			if (random(1) < 0.01) {
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(max_force);
			}
		}
	}
	
}