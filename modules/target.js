class Target {

	constructor() {
		this.position = createVector(width / 2, 50);
	}

	render() {
		fill(255);

		ellipse(this.position.x, this.position.y, 16, 16);
	}

}