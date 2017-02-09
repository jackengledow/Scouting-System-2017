// Author: Tiger Huang

//Creates a new Scatter Plot
function Scatterplot() {
	var instance = this;

	////////////////////////////////////////////////////////////////////////////////
	// Begin domain declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Domain for the input
	var minX = 0;
	var maxX = 0;
	var minY = 0;
	var maxY = 0;

	//Set Domain for inputs
	this.setDomain = function(newMinX,newMaxX,newMinY,newMaxY) {
		minX = newMinX;
		maxX = newMaxX;
		minY = newMinY;
		maxY = newMaxY;
	}

	//Scales a number from the domain to the range of the display
	this.scaleNumber = function(x,y) {
		var output = {x:x,y:y};
		output.x /= (maxX - minX);
		output.y /= (maxY - minY);
		output.x *= numX;
		output.y *= numY;
		output.x -= 0.5;
		output.y -= 0.5;
		return output;
	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin offset declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Offsets for the output
	var offsetLeft = 0;
	var offsetRight = 0;
	var offsetTop = 0;
	var offsetBottom = 0;

	this.setOffsets = function(newOffsetLeft,newOffsetRight,newOffsetTop,newOffsetBottom) {
		offsetLeft = newOffsetLeft;
		offsetRight = newOffsetRight;
		offsetTop = newOffsetTop;
		offsetBottom = newOffsetBottom;
	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin positions declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Creating the positions array
	var positions = new Array();
	
	//Adding a point to the array
	this.addPoint = function(d,x,y) {
		var location = this.scaleNumber(x,y);
		location.d = d;
		positions.push(location);
	}

	//Gets the array of positions
	this.getPositions = function() {
		return positions;
	}

	//Clears the array of positions
	this.clearPositions = function() {
		positions = new Array();
	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin canvas and image declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//The array of the colors to be used
	var colors;

	//Sets the colors for the different position information
	this.setColors = function(newColors) {
		colors = newColors;
	}

	var image = document.createElement("img");
	image.style.width = "100%";
	var canvas = document.createElement("canvas");
	canvas.style.position = "absolute";
	canvas.style.top = "0px";
	canvas.style.left = "0px";

	//Sets the image that this heatmap uses
	this.setImage = function(name) {
		image.src = name;
	}

	//Gets the image that this heatmap uses
	this.getImage = function() {
		return image;
	}

	//Gets the canvas that this heatmap draws on
	this.getCanvas = function() {
		return canvas;
	}

	//Appends the canvas to a parent container
	this.appendToParent = function(parent) {
		parent.style.position = "relative";
		parent.appendChild(image);

		var width = image.clientWidth;
		var height = image.clientHeight;
		canvas.width = width;
		canvas.height = height;
		parent.appendChild(canvas);
		instance.render();

		image.onload = function() {
			var width = image.clientWidth;
			var height = image.clientHeight;
			canvas.width = width;
			canvas.height = height;
			parent.appendChild(canvas);
			instance.render();

			$(parent).resize(function() {
				parent.removeChild(image);
				parent.removeChild(canvas);
				instance.appendToParent(parent);
			});
			$(parent).on('appear', function(event, $all_appeared_elements) {
				parent.removeChild(image);
				parent.removeChild(canvas);
				instance.appendToParent(parent);
			});

		}
	}

	//Renders everything
	this.render = function() {
		var width = image.clientWidth;
		var height = image.clientHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image,0,0,width,height);

	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin misc declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	this.reset = function() {
		instance.clearTiles();
		instance.clearPositions();
	}

}
