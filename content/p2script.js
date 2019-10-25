(function () {
	var canvas, ctx, w, h,
		world, circleBody, planeBody;

	// init();
	// animate();

	function init() {
		let lettersBody;

		// Init canvas
		canvas = document.getElementById("title");
		w = canvas.width;
		h = canvas.height;

		ctx = canvas.getContext("2d");
		ctx.lineWidth = 0.05;

		// Init p2.js
		world = new p2.World();

		// Add a circle
		aLetter = new p2.Shape({
			"P_Letter": [
				{
					"shape": [67, 77, 67, 30, 72, 61, 72, 77]
				},
				{
					"shape": [86, 64, 80, 64, 72, 61, 90, 31, 95, 39, 95, 53, 93, 58, 90, 62]
				},
				{
					"shape": [95, 39, 90, 31, 93, 34]
				},
				{
					"shape": [72, 61, 80, 64, 75, 63]
				},
				{
					"shape": [67, 30, 72, 30, 90, 31, 72, 61]
				},
				{
					"shape": [90, 31, 72, 30, 86, 29]
				}
			]
		}
		);
		lettersBody = new p2.Body({ mass: 1, position: [, 23] });


		lettersBody.addShape(new p2.Shape({ position2: [67, 77, 67, 30, 72, 61, 72, 77] }));
		lettersBody.addShape(new p2.Shape({ position2: [86, 64, 80, 64, 72, 61, 90, 31, 95, 39, 95, 53, 93, 58, 90, 62] }));
		lettersBody.addShape(new p2.Shape({ position2: [95, 39, 90, 31, 93, 34] }));
		lettersBody.addShape(new p2.Shape({ position2: [72, 61, 80, 64, 75, 63] }));
		lettersBody.addShape(new p2.Shape({ position2: [67, 30, 72, 30, 90, 31, 72, 61] }));
		lettersBody.addShape(new p2.Shape({ position2: [90, 31, 72, 30, 86, 29] }));





		lettersBody.addShape(new p2.Shape());
		world.addBody(lettersBody);

		circleShape = new p2.Circle({ radius: 1 });

		circleBody = new p2.Body({ mass: 1, position: [0, 3] });
		circleBody.addShape(circleShape);
		world.addBody(circleBody);

		// Add a plane
		planeShape = new p2.Plane();
		planeBody = new p2.Body();
		planeBody.addShape(planeShape);
		world.addBody(planeBody);
	}

	function drawCircle() {
		ctx.beginPath();
		var x = circleBody.position[0],
			y = circleBody.position[1],
			radius = circleShape.radius;
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	function drawPlane() {
		var y = planeBody.position[1];
		ctx.moveTo(-w, y);
		ctx.lineTo(w, y);
		ctx.stroke();
	}

	function render() {
		// Clear the canvas
		ctx.clearRect(0, 0, w, h);

		// Transform the canvas
		// Note that we need to flip the y axis since Canvas pixel coordinates
		// goes from top to bottom, while physics does the opposite.
		ctx.save();
		ctx.translate(w / 2, h / 2);  // Translate to the center
		ctx.scale(50, -50);       // Zoom in and flip y axis

		// Draw all bodies
		drawCircle();
		drawPlane();

		// Restore transform
		ctx.restore();
	}

	// Animation loop
	function animate() {
		requestAnimationFrame(animate);

		// Move physics bodies forward in time
		world.step(1 / 60);

		// Render scene
		render();
	}
})();