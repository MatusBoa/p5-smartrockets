class Obstacle {

	constructor() {
		this.width  = 250;
		this.height = 10;
		this.x      = (750 - this.width) / 2;
		this.y      = target.position.y + 200;
	}

	render() {
		fill(255);
		rect( this.x, this.y, this.width, this.height );
	}

}