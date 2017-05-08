let rocket;

/**
 * Global variables
 */
let target;
let obstacle;
let population;
let max_force = 0.2;
let life_span = 350;
let count     = 0;

function setup() {
	createCanvas(750, 750);

	target     = new Target();
	obstacle   = new Obstacle();
	population = new Population();

	generation_text = createP();
	count_text      = createP();
}

function draw() {
	background(0);
	
	population.run();

	count++;
	if (count == life_span) {
		population.evolve();
		count = 0;
	}

	target.render();
	obstacle.render();

	generation_text.html("Generation: " + population.generation);
	count_text.html("Next generation in: " + (life_span - count));
}

