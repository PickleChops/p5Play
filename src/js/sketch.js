/**
 * Play around with P5 - I used to like Processing, it was very accessible, so trying out p5
 */

var frameRater = null;
var starField = null;

/**
 * Go large
 */
function setup() {
	createCanvas(windowWidth, windowHeight, 'webgl');

	frameRater = new ShowFrameRate();
	starFieldRed = new StarField({fieldWidth: windowWidth, fieldHeight: windowHeight, starColour: color(255,0,0)});
	starFieldBlue = new StarField({fieldWidth: windowWidth/4, fieldHeight: windowHeight/4, starColour: color(0,0,255)});
}

/**
 * Draw loop
 */
function draw() {

	background(0);
	frameRater.render();
	starFieldRed.render();
	push();
	translate(windowWidth*3/8, windowHeight*3/8);
	starFieldBlue.render();
	pop();

}


/**
 * Display frame rate in top left of display
 */
function ShowFrameRate() {

	this.textHeight = 25;
	this.fpsString = 'FPS : ';

	this.render = function () {
		push();
		translate(0, 0);

		textSize(16);
		textAlign(RIGHT);

		var textDisplayWidth = textWidth(this.fpsString + '999');

		fill(255);
		noStroke();
		rect(0, 0, textDisplayWidth, this.textHeight);
		fill(0);

		text(this.fpsString + Math.floor(getFrameRate()), textDisplayWidth, this.textHeight);
		pop();
	}
}


/**
 * Super simple star field
 * @constructor
 */
function StarField(options) {

	this.options = Utils.mergeRecursive({
		fieldWidth: width,
		fieldHeight: height,
		numStars: 100,
		velocity: 0.005,
		starColour: 200
	}, options || {});

	console.log(this.options);

	this.stars = [];
	this.numStars = this.options.numStars;

	for (var i = 0; i < this.numStars; i++) {
		var s = new Star(this.options.fieldWidth, this.options.fieldHeight, this.options.velocity, this.options.starColour);
		this.stars.push(s);
		s.reset();
	}

	this.render = function () {
		for (var i = 0; i < this.numStars; i++) {
			var s = this.stars[i];
			s.render();
			if (s.dead) {
				s.reset();
			}
		}
	};

	/**
	 * Stars for the field
	 * @constructor
	 */
	function Star(fieldWidth, fieldHeight, velocity, colour) {

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.w = 0;
		this.xv = 0;
		this.yv = 0;
		this.color = 0;
		this.dead = false;

		this.px = fieldWidth / 2;
		this.py = fieldHeight / 2;


		/**
		 * Reset a star
		 */
		this.reset = function () {

			this.x = fieldWidth * Math.random();
			this.y = fieldHeight * Math.random();
			this.color = colour;
			this.w = 1 + Math.random() * 2;


			//  calculate the velocity for star
			//  velocity is based on distance from px, py coords

			// Weighting for velocities to adjust distance from
			// px and py to something slow enough to see

			this.xw = velocity;
			this.yw = this.xw * (fieldHeight / fieldWidth);


			var rx = this.x - this.px;
			this.xv = rx * this.xw;

			var ry = this.y - this.py;
			this.yv = ry * this.yw;

			this.dead = false;
		};

		//noinspection JSPotentiallyInvalidUsageOfThis
		/**
		 *
		 * @param pg
		 */
		this.render = function (pg) {
			//Move the stars
			this.x += this.xv;
			this.y += this.yv;

			//Draw the star
			noStroke();
			fill(this.color);
			ellipse(this.x, this.y, this.w, this.w);

			//Mark as dead if centre of ellipse is off screen
			if (this.x < 0 || this.x > fieldWidth || this.y < 0 || this.y > fieldHeight)
				this.dead = true;
		}
	}
}

/**
 * Merge objects
 * @constructor
 */
var Utils = {};

/*
 * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
 * Recursively merge properties of two objects
 */
Utils.mergeRecursive = function (obj1, obj2) {

	for (var p in obj2) {
		try {
			// Property in destination object set; update its value.
			if (obj2[p].constructor == Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);

			} else {
				obj1[p] = obj2[p];

			}

		} catch (e) {
			// Property in destination object not set; create it and set its value.
			obj1[p] = obj2[p];

		}
	}

	return obj1;
};


