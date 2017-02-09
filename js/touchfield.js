// Author: Tiger Huang

//Creates a new Touch field with depth types of locations, and a circle size of dotSize
//If you need to modify any of these, you are better off creating a new Heatmap
function Touchfield(depth,dotSize) {
	var instance = this;
	var index = 0;
	var single = false;
	var Double = false;
	var Xinverted = false;
	var Yinverted = false;

	////////////////////////////////////////////////////////////////////////////////
    // Begin domain declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Sets if it is a single select field
	this.setSingle = function(isSingle) {
		single = isSingle;
	}

	//Sets if it is a double select field
	this.setDouble = function(isDouble) {
		Double = isDouble;
	}

	//Sets if this field is inverted across the x axis
	this.setXInverted = function(isXInverted) {
		if(isXInverted != Xinverted) {
			for(var i = 0;i < positions.length;i++) {
				if(positions[i] !== null) {
					//console.log(positions);
					positions[i].cd.style.left = (100 - dotSize - +(positions[i].cd.style.left.replace("%",""))) + "%";
				}
			}
		}
		Xinverted = isXInverted;
	}

	//Sets if this field is inverted across the y axis
	this.setYInverted = function(isYInverted) {
		if(isYInverted != Yinverted) {
			for(var i = 0;i < positions.length;i++) {
				if(positions[i] !== null) {
					positions[i].cd.style.top = (100 - dotSize - +(positions[i].cd.style.top.replace("%",""))) + "%";
				}
			}
		}
		Yinverted = isYInverted;
	}

	//Gets whether the field is inverted across the x axis
	this.getXInverted = function() {
		return Xinverted;
	}

	//Gets whether the field is inverted across the y axis
	this.getYInverted = function() {
		return Yinverted;
	}

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

	//Scales a number from the input to the domain
	this.scaleNumber = function(x,y) {
		var output = {x:x,y:y};
		output.x *= (maxX - minX);
		output.y *= (maxY - minY);
		output.x += minX;
		output.y += minY;
		return output;
	}

	////////////////////////////////////////////////////////////////////////////////
	// Begin positions declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//Creating the positions array
	var positions = new Array();

	this.getPositions = function() {
		return positions.filter(function(e) {
			return e != null;
		});
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
	// Begin image and div declarations and functions
	////////////////////////////////////////////////////////////////////////////////

	//The array of the colors to be used
	var colors;

	//Sets the colors for the different position information
	this.setColors = function(newColors) {
		colors = newColors;
	}

	var image = document.createElement("img");
	image.style.width = "100%";

	//Sets the image that this heatmap uses
	this.setImage = function(name) {
		image.src = name;
	}

	//Gets the image that this heatmap uses
	this.getImage = function() {
		return image;
	}

	//Appends the canvas to a parent container
	this.appendToParent = function(parent) {
		//parent.style.position = "relative";
		//parent.style.display = "inline-block";
		var fieldDiv = document.createElement("div");
		fieldDiv.style.position = "relative";
		fieldDiv.style.display = "inline-block";
		if(!single && !Double) {
			fieldDiv.style.width = "85%";
		}
		else {
			fieldDiv.style.width = "100%";
		}
		parent.appendChild(fieldDiv);

		fieldDiv.appendChild(image);

		var touchDiv = document.createElement("div");
		touchDiv.style.position = "absolute";
		touchDiv.style.top = offsetTop + "%";
		touchDiv.style.height = (100 - offsetTop - offsetBottom) + "%";
		touchDiv.style.left = offsetLeft + "%";
		touchDiv.style.width = (100 - offsetLeft - offsetRight) + "%";
		touchDiv.style.cursor = "pointer";
		fieldDiv.appendChild(touchDiv);

		var listDiv = document.createElement("div");
		listDiv.style.position = "relative";
		listDiv.style.display = "inline-block";
		listDiv.style.width = "15%";
		listDiv.style.verticalAlign = "top";

		if(!single && !Double) {
			parent.appendChild(listDiv);
		}

		touchDiv.onclick = function(event) {
			var x = event.pageX - $(this).offset().left;
			var y = event.pageY - $(this).offset().top;
			var width = this.clientWidth;
			var height = this.clientHeight;

			//alert(x / width + "," + y / height);

			var posX = x / width;
			var posY = y / height;

			var out;

			if(!Xinverted && !Yinverted){
				out = instance.scaleNumber(posX,posY);
			}
			else if(Xinverted && !Yinverted) {
				out = instance.scaleNumber(1 - posX,posY);
			}
			else if(!Xinverted && Yinverted) {
				out = instance.scaleNumber(posX, 1 - posY);
			}
			else {
				out = instance.scaleNumber(1 - posX, 1 - posY);
			}

			var circleDiv = document.createElement("div");
			circleDiv.className = "shootCircle";
			circleDiv.style.borderRadius = "100%";
			circleDiv.style.width = dotSize + "%";
			circleDiv.style.height = dotSize * width / height + "%";
			circleDiv.style.left = (100 * posX - dotSize / 2) + "%";
			circleDiv.style.top = (100 * posY - dotSize * width / height / 2) + "%";
			circleDiv.style.position = "absolute";
			circleDiv.style.textAlign = "center";
			circleDiv.style.fontSize = width * ((0.02157164869 + 0.0233463035) / 2) + "px";
			circleDiv.style.backgroundColor = "rgba(" + colors[0].red + "," +
				+ colors[0].green + "," + 
				+ colors[0].blue + ",0.75";
			circleDiv.style.lineHeight = dotSize / 2;
			if(!single && !Double) {
				circleDiv.appendChild(document.createTextNode(index));
				touchDiv.appendChild(circleDiv);
			}
			else if (single) {
				//circleDiv.appendChild(document.createTextNode(Math.round(out.x) + "," + Math.round(out.y)));
				if(index == 0) {
					touchDiv.appendChild(circleDiv);
				}
				else {
					positions[0].cd.style.left = (100 * posX - dotSize / 2) + "%";
					positions[0].cd.style.top = (100 * posY - dotSize * width / height / 2) + "%";
					//positions[0].cd.removeChild(positions[0].cd.firstChild);
					//positions[0].cd.appendChild(document.createTextNode(Math.round(out.x) + "," + Math.round(out.y)));
					positions[0].x = out.x;
					positions[0].y = out.y;
				}
			}
			else {
				//circleDiv.appendChild(document.createTextNode(Math.round(out.x) + "," + Math.round(out.y)));
				if(index < 2) {
					touchDiv.appendChild(circleDiv);
					console.log(index);
				}
				if(index == 1) {
					circleDiv.style.backgroundColor = "rgba(" + colors[index].red + "," +
						+ colors[index].green + "," + 
						+ colors[index].blue + ",0.75";
				}
				else if (index == 2) {
					positions[0].cd.style.left = (100 * posX - dotSize / 2) + "%";
					positions[0].cd.style.top = (100 * posY - dotSize * width / height / 2) + "%";
					//positions[0].cd.removeChild(positions[0].cd.firstChild);
					//positions[0].cd.appendChild(document.createTextNode(Math.round(out.x) + "," + Math.round(out.y)));
					positions[0].x = out.x;
					positions[0].y = out.y;
					console.log(index);
				}
				else if (index == 3) {
					positions[1].cd.style.left = (100 * posX - dotSize / 2) + "%";
					positions[1].cd.style.top = (100 * posY - dotSize * width / height / 2) + "%";
					//positions[1].cd.removeChild(positions[1].cd.firstChild);
					//positions[1].cd.appendChild(document.createTextNode(Math.round(out.x) + "," + Math.round(out.y)));
					positions[1].x = out.x;
					positions[1].y = out.y;
					console.log(index);
				}
			}
			

			if(!single && !Double) {
				var textDiv = document.createElement("div");
				textDiv.style.backgroundColor = circleDiv.style.backgroundColor;
				textDiv.appendChild(document.createTextNode(index + ": " + Math.round(out.x) + "," + Math.round(out.y)));
				listDiv.appendChild(textDiv);
			}

			if (!Double){
				var data = {x:out.x,y:out.y,i:0,cd:circleDiv};
			}
			else {
				if (index != 1){
					var data = {x:out.x,y:out.y,i:0,cd:circleDiv};
				}
				else {
					var data = {x:out.x,y:out.y,i:1,cd:circleDiv};
				}
			}

			if(!single && !Double) {
				positions.push(data);
				index++;
			}
			else if (single) {
				if(index == 0) {
					positions.push(data);
					index++;
				}
			}
			else {
				if(index <= 1) {
					positions.push(data);
				}
				if(index == 3) {
					index = 1;
				}
				index++;
			}

			circleDiv.onclick = function(event) {
				if(!single && !Double) {
					event.stopPropagation();
					data.i++;
					if(data.i >= depth) {
						listDiv.removeChild(textDiv);
						touchDiv.removeChild(circleDiv);
						positions[positions.indexOf(data)] = null;
						return;
					}
					circleDiv.style.backgroundColor = "rgba(" + colors[data.i].red + "," +
						+ colors[data.i].green + "," + 
						+ colors[data.i].blue + ",0.75";
					textDiv.style.backgroundColor = circleDiv.style.backgroundColor;
				}
			}
		}
	}
}

