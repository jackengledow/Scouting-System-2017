// Author: Tiger Huang

//Creates a new heatmap with depth types of locations, numX number of columns, and numY number of rows
//If you need to modify any of these, you are better off creating a new Heatmap
function Heatmap(depth,numX,numY) {
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

	//Scales a number from the domain to the range of the tiles
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
	// Begin tile declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Clears the array of tiles
	this.clearTiles = function() {
		for(var v = 0;v < numY;v++) {
			for(var h = 0;h < numX;h++) {
				for(var d = 0;d < depth;d++) {
					tiles[v][h][d] = 0;
					tiles[v][h].red = 0;
					tiles[v][h].green = 0;
					tiles[v][h].blue = 0;
					tiles[v][h].alpha = 0;
				}
			}
		}
	}

	//Creating the tiles array
	//Initializing all positions to zero
	//tiles[y][x][depth]
	var tiles = new Array(numY);
	for(var v = 0;v < numY;v++) {
		tiles[v] = new Array(numX);
		for(var h = 0;h < numX;h++) {
			tiles[v][h] = new Array(depth);
		}
	}
	instance.clearTiles();

	//Gets the array of tiles
	this.getTiles = function() {
		return tiles;
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
	// Begin processing declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	this.process = function() {
		for(var i = 0;i < positions.length;i++) {
			var current = positions[i];
			for(var v = 0;v < numY;v++) {
				for(var h = 0;h < numX;h++) {
					var distance = Math.sqrt((v - current.y) * (v - current.y) + 
											 (h - current.x) * (h - current.x));
					var output = 1 / positions.length / Math.pow(distance + 1,1.5);
					//var output = 1 / positions.length / ((distance + 1) * (distance + 1));
					//var output = 1 / positions.length / ((distance + 1));
					tiles[v][h][current.d] += output;
				}
			}
		}
		var maxAlpha = 0;
		for(var v = 0;v < numY;v++) {
			for(var h = 0;h < numX;h++) {
				var current = tiles[v][h];
				current.red = 0;
				current.green = 0;
				current.blue = 0;
				for(var i = 0;i < depth;i++) {
					current.red += current[i] * colors[i].red;
					current.green += current[i] * colors[i].green;
					current.blue += current[i] * colors[i].blue;
				}
				current.alpha = (current.red + current.green + current.blue) / 255;
				if(current.alpha > maxAlpha) {
					maxAlpha = current.alpha;
				}
				var scalar = Math.max(current.red,current.green,current.blue);
				current.red = current.red / scalar * 255;
				current.green = current.green / scalar * 255;
				current.blue = current.blue / scalar * 255;
			}
		}
		for(var v = 0;v < numY;v++) {
			for(var h = 0;h < numX;h++) {
				tiles[v][h].alpha /= maxAlpha;
			}
		}
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

		var tileWidth = ((100 - offsetLeft - offsetRight) / 100) * width / numX;
		var tileHeight = ((100 - offsetTop - offsetBottom) / 100) * height / numY;

		for(var v = 0;v < numY;v++) {
			for(var h = 0;h < numX;h++) {
				ctx.fillStyle = 'rgba(' + Math.round(tiles[v][h].red) + ',' + Math.round(tiles[v][h].green) + ',' +
					Math.round(tiles[v][h].blue) + ',' + tiles[v][h].alpha + ')';
				ctx.fillRect((offsetLeft / 100) * width + h * tileWidth,
							 (offsetTop / 100) * height + v * tileHeight,
							 tileWidth,tileHeight);
			}
		}
	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin misc declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	this.reset = function() {
		instance.clearTiles();
		instance.clearPositions();
	}

}
