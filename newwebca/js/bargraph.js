
LABEL_HEIGHT = 10; // fixme

function BarGraph(base, width, height, padding, barSpace) {
	this.width = width;
	this.height = height;

	this.svg = base.append("svg")
		.attr("width", width)
		.attr("height", height);

	this.range = 0;

	this.padding = padding || 15;
	this.barSpace = barSpace || 10;

	this.paddedWidth = width - padding * 2;
	this.paddedHeight = height - padding * 2 - LABEL_HEIGHT; // 10 pixels are reserved for the labels

	// data.bar1 = [10, 20, 30];
	this.data = {};
	this.colors = [];
	this.curBar = "";
}	

BarGraph.prototype = {
	currentBar: function(name, color) {
		this.data[name] = [];
		this.colors.push(color);
		this.curBar = name;
	},

	push: function(value) {
		this.data[this.curBar].push(value);

		if (value > this.range) {
			this.range = value;
		}
	},

	draw: function() {
		this.drawBars();
		this.drawAxes();
	},

	drawBars: function() {
		var numOfBars = Object.keys(this.data).length;
		var gap = this.paddedWidth / numOfBars;

		var i = 0;	
		for (var name in this.data) {
			var curColor = this.colors[i];

			var x = gap * i;
			x += this.padding;

			var average = this.average(name);

			var barHeight = (average / this.range) * this.paddedHeight;
			console.log(barHeight);
			var y = this.paddedHeight - barHeight;	
			y += this.padding - LABEL_HEIGHT; // again, reserve space for label

			var barWidth = gap - this.barSpace;

			this.svg.append("rect")
				.attr("x", x + this.barSpace) 
				.attr("y", y) 
				.attr("height", barHeight)
				.attr("width", barWidth) 
				.attr("style", "fill: " + curColor + "; stroke-width: 2px; stroke: #111;");
			
			var subBarWidth = barWidth / this.data[name].length;

			var j = 0;
			for (var value of this.data[name]) {
				var subBarX = x + subBarWidth * j + this.barSpace;
				var subBarHeight = (value / this.range) * this.paddedHeight;
				var subBarY = this.paddedHeight - subBarHeight;

				this.svg.append("rect")
					.attr("x", subBarX)
					.attr("y", subBarY)
					.attr("height", subBarHeight)
					.attr("width", subBarWidth)
					.attr("style", "fill: #000; fill-opacity: 0.7;");

				j++;
			}

			var label = this.svg.append("text")
				.html(name)
				.attr("x", x + this.barSpace * 0.75)
			   	.attr("y", y + 50)
				.attr("style", "font-size: 14px; text-anchor: left");

			label.attr("transform", "rotate(-90, " + label.attr("x") + ", " + label.attr("y") + ")");

			i++;
		}
	},

	drawAxes: function() {

	},

	average: function(name) {
		var data = this.data[name];
		var total = 0;

		for (var value of data) {
			total += value;	
		}

		return total / data.length;
	},
};
