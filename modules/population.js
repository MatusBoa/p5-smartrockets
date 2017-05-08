class Population {

	constructor() {
		this.size       = 30;
		this.generation = 0;

		this.rockets = this.generateRockets();
	}

	eachRocket(callback) {
		for (let i = 0; i <= this.size; i++) {
			callback(this.rockets[i], i);
		}
	}

	generateRockets() {
		let rockets = [];

		for (let i = 0; i <= this.size; i++) {
			rockets[i] = new Rocket()
		}

		return rockets;
	}

	run() {
		this.eachRocket(rocket => {
			rocket.update();
			rocket.render();
		});
	}

	evolve() {
		let	max_fitness           = 0;
		let payload               = [];
		let new_generation_rocket = [];

		this.eachRocket(rocket => {
			let fitness = rocket.getFitness();

			if (max_fitness < fitness) {
				max_fitness = fitness;
			} 
		});

		this.eachRocket(rocket => {
			let fitness = rocket.getFitness() / max_fitness;

			for (let i = 0; i <= fitness * 100; i++) {
				payload.push(rocket);
			}
		});

		this.eachRocket((rocket, i) => {
			new_generation_rocket[i] = this.mate(payload);
		});


		this.rockets = new_generation_rocket;
		this.generation++;
	}

	mate(payload) {
		let male   = random(payload).dna;
		let female = random(payload).dna;

		return new Rocket(this.crossOver(male, female));
	}

	crossOver(male, female) {
		let child_genes = [];

		for (let i = 0; i <= life_span; i++) {
			if (i > Math.round(life_span / 2)) {
				child_genes[i] = male.genes[i];
			} else {
				child_genes[i] = female.genes[i];
			}
		}

		let child = new DNA(child_genes);
		child.mutate();

		return child;
	}

}