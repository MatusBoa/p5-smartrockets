class Rocket {

	constructor(dna) {
		this.position     = createVector(width / 2, height - 80);
		this.velocity     = createVector();
		this.acceleration = createVector();
		this.crashed      = false;
		this.completed    = false;
		this.crash_type   = "";

		this.dna;

		if (dna) {
			this.dna = dna;
		} else {
			/**
			 * Get new DNA.
			 */
			this.dna = new DNA();
		}
	}

	/**
	 * Render the rocket in canvas.
	 */
	render() {
		push();

	    stroke(255, 200);
	    fill(255, 100);
	    translate(this.position.x, this.position.y);
	    rotate(this.velocity.heading());
	    rectMode(CENTER);
	    rect(0, 0, 25, 5);

	    pop();
	}

	/**
	 * Update rocket's movement
	 */
	update() {
		this.applyForce(this.dna.genes[count]);

		this.checkForCrash();
		this.render();
	}

	applyForce(force) {
		if (!this.completed) {
			this.acceleration.add(force);
		}
		
		if (!this.crashed || this.completed) {
			this.velocity.add(this.acceleration);
			this.position.add(this.velocity);
			this.acceleration.mult(0);
			this.velocity.limit(4);
		}
	}

	/**
	 * Check if rocket crashed
	 */
	checkForCrash() {
		if (dist( this.position.x, this.position.y, target.position.x, target.position.y ) < 10) {
			this.completed = true;
			this.position = target.position.copy();
		}

		if (this.position.x > obstacle.x && this.position.x < obstacle.x + obstacle.width && this.position.y > obstacle.y && this.position.y < obstacle.y + obstacle.height) {
			this.crashed    = true;
			this.crash_type = "obstacle";
		}

		if (this.position.x > width || this.position.x < 0) {
			this.crashed    = true;
			this.crash_type = "border";
		}

		if (this.position.y > height || this.position.y < 0) {
			this.crashed    = true;
			this.crash_type = "border";
		}
	}

	/**
	 * Get rocket's fitness based on distance from target
	 */
	getFitness() {
		let distance = dist( this.position.x, this.position.y, target.position.x, target.position.y );
		let fitness = map( distance, 0, width, width, 0 );

		if (this.completed) {
			/**
			 * If rocket finds the target, boost its fintess.
			 */
			fitness *= 15;
		} 

		if (this.crashed) {
			/**
			 * If rocket crashed, reduce its fitness
			 */
			if (this.crash_type == "obstacle") {
				fitness /= 15;
			} else if (this.crash_type == "border") {
				fitness /= 10;
			}
		}

		return fitness;
	}

}