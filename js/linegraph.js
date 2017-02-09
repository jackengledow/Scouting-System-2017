
function LineGraph(base, width, height, labels, notches, digits, offsets, squareSize, padding) {
	this.width = width;
	this.height = height;

	this.squareSize = squareSize || 4;
	this.padding = padding || 40;

	this.paddedWidth = this.width - this.padding * 2;
	this.paddedHeight = this.height - this.padding * 2;

	this.domain = 0;
	this.range = 0;
	
	if (labels) {
		this.xLabel = labels[0];
		this.yLabel = labels[1];
	} else {
		this.xLabel = "";
		this.yLabel = "";
	}
	
	if (notches) {	
		this.xNotches = notches[0];
		this.yNotches = notches[1];
	} else {
		this.xNotches = 5;
		this.yNotches = 5;
	}

	if (digits) {
		this.xDigits = digits[0];
		this.yDigits = digits[1];
	} else {
		this.xDigits = 2;
		this.yDigits = 2;
	}

	if (offsets) {
		this.xOffset = offsets[0];
		this.yOffset = offsets[1];
	} else {
		this.xOffset = 0;
		this.yOffset = 0;
	}

	this.svg = base.append("svg")
		.attr("width", width)
		.attr("height", height);

	this.data = [];
	this.lineColors = [];
	this.keys = []; // Matches up line colors with line names
	this.activeLine = -1; // Refers to active line, if -1, no active line is selected.
}

LineGraph.prototype = {
	// Sets the number of display digits for the x and y axes
	setDigits: function(xDigits, yDigits) {
		this.xDigits = xDigits;
		this.yDigits = yDigits;
	},

	// Sets the number of notches for the axes along x and y
	setNotches: function(xNotches, yNotches) {
		this.xNotches = xNotches;
		this.yNotches = yNotches;
	},

	// Sets the offsets along x and y axis
	setOffsets: function(xOffset, yOffset) {
		this.xOffset = xOffset;
		this.yOffset = yOffset;
	},

	// Sets the line that data will be appended to
	currentLine: function(key, color) {
		this.keys.push(key);
		this.lineColors.push(color);
		this.activeLine++;

		this.data[this.activeLine] = [];
	},	

	// Adds a data point and resizes domain and range if needed
	push: function(point) {
		this.domain = Math.max(this.domain, point.x);
		this.range = Math.max(this.range, point.y);

		this.data[this.activeLine].push({
			x: point.x,
			y: point.y
		});
	},

	// Modifies svg and draws graph 
	draw: function() {
		this.drawData();
		this.drawLabels();
		this.drawAxes();
		this.drawKey();
	},

	drawData: function() {
		for (var i = 0; i <= this.activeLine; i++) {
			for (var j = 0; j < this.data[i].length - 1; j++) {
				var points = {
					beg: this.normalize(this.data[i][j]),
					end: this.normalize(this.data[i][j + 1]),
				};
			
				this.svg.append("line")
					.attr("x1", points.beg.x)
					.attr("x2", points.end.x)
					.attr("y1", points.beg.y)
					.attr("y2", points.end.y)
					.attr("style", "stroke: " + this.lineColors[i] + "; stroke-width: 2");

				for (var point in points) {
					this.svg.append("rect")
						.attr("x", points[point].x - (this.squareSize / 2))
						.attr("y", points[point].y - (this.squareSize / 2))
						.attr("width", this.squareSize)
						.attr("height", this.squareSize)
						.attr("style", "stroke: " + this.lineColors[i] + "; stroke-width: 2; fill: #FFF");
				}
			}
		}
	},

	drawLabels: function() {
		var textStyle = "font-size: 18; text-anchor: middle";

		// Placing X label
		this.svg.append("text")
			.html(this.xLabel)
			.attr("x", this.width / 2)
			.attr("y", this.height - 1)
			.attr("style", textStyle);

		// Now, placing Y
		var yText = this.svg.append("text")
			.html(this.yLabel)
			.attr("x", 5)
			.attr("y", this.height / 2)
			.attr("style", textStyle);

		yText.attr("transform", "rotate(-90, " + yText.attr("x") + ", " + yText.attr("y") + ")");
	},

	drawAxes: function() {
		var axisStyle = "fill: #000";

		var intervalX = this.paddedWidth / this.xNotches;
		var intervalY = this.paddedHeight / this.yNotches;
		
		// Draw lines
		this.svg.append("rect")
			.attr("x", this.padding)
			.attr("y", this.paddedHeight + this.padding + 10)
			.attr("width", this.paddedWidth)
			.attr("height", 2)
			.style(axisStyle);

		this.svg.append("rect")
			.attr("x", 10)
			.attr("y", this.padding)
			.attr("width", 2)
			.attr("height", this.paddedHeight)
			.style(axisStyle);

		var rectX, rectY;
		for (var x = 0; x <= this.paddedWidth + 0.01; x += intervalX) {
			rectX = this.padding + x;
			rectY = this.paddedHeight + this.padding + 10;

			this.svg.append("rect")
				.attr("x", rectX)
				.attr("y", rectY)
				.attr("width", 2)
				.attr("height", 10)
				.attr("style", axisStyle)

			this.svg.append("text")
				.html(((x / this.paddedWidth) * (this.domain - this.xOffset) + this.xOffset).toFixed(this.xDigits))
				.attr("x", rectX)
				.attr("y", rectY + 30);
		}

		for (var y = 0; y <= this.paddedHeight + 0.01; y += intervalY) {
			var rectX = 10;
			var rectY = this.padding + y;

			this.svg.append("rect")
				.attr("x", rectX)
				.attr("y", rectY)
				.attr("width", 10)
				.attr("height", 2)
				.attr("style", axisStyle);

			this.svg.append("text")
				.html((((this.paddedHeight - y) / this.paddedHeight) * (this.range - this.yOffset) + this.yOffset).toFixed(this.yDigits))
				.attr("x", rectX + 15)
				.attr("y", rectY - 5);
		}
	},

	drawKey: function() {
		for (var i = 0; i < this.keys.length; i++) {
			var key = this.keys[i];

			this.svg.append("text")
				.html(key)
				.attr("x", this.width - getTextWidth(key) - 20)
				.attr("y", this.padding * (i + 1))
				.attr("style", "fill: " + this.lineColors[i]);
		}
	},

	normalize: function(point) {
		var result = {};
		
		result.x = this.padding + (point.x - this.xOffset) / (this.domain - this.xOffset) * this.paddedWidth;
		result.y = this.padding + this.paddedHeight - ((point.y - this.yOffset) / (this.range - this.yOffset) * this.paddedHeight);

		return result;
	},
};

// Misc util functions go here

// Thanks StackOverflow! http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
	console.log(document.body.style.fontSize + " " + document.body.style.fontFamily);
    var metrics = context.measureText(text);
    return metrics.width;
};
