// Author: Tiger Huang
// with a few adjustments by Vincent

function Multiselect(label,name,options,custom,selected,exclusive) {
	const REALWIDTH = 22;
	const REALHEIGHT = 5;
	const WIDTH = REALWIDTH + "em";
	const HEIGHT = REALHEIGHT + "em";
	const OFFCOLOR = "#FF0000";
	const ONCOLOR = "#00FF00";
	const BGCOLOR = "#DFDFDF";
	const BORDRADIUS = "4px";

	//Resets this Multiselect to the default values
	this.reset = function() {
		for(var i = 0;i < options.length + (custom ? 1 : 0);i++) {
			flags[i] = false;
		}
		for(var i = 0;i < selected.length;i++) {
			flags[selected[i]] = true;
		}
	}

	var instance = this;
	var input;
	var flags = new Array(options.length + (custom ? 1 : 0));
	var setters = new Array(options.length + (custom ? 1 : 0));
	var parentNode;
	this.reset();

	//Appends this Multiselect to a parent
	this.appendToParent = function(parent) {
		parentNode = parent;
		var div = document.createElement("div");
		div.id = name;
		parent.appendChild(div);

		var bold = document.createElement("b");
		bold.innerHTML = label;
		div.appendChild(bold);

		for(var i = 0;i < options.length + (custom ? 1 : 0);i++) {
			var div2 = document.createElement("div");
			div.appendChild(div2);
			div2.style.width = WIDTH;
			div2.style.height = HEIGHT;
			div2.style.backgroundColor = BGCOLOR;
			div2.style.borderRadius = BORDRADIUS;
			div2.style.margin = ".1em";
			div2.style.cursor = "pointer";

			var div3 = document.createElement("div");
			div2.appendChild(div3);
			div3.className = "btn btn-default";
			div3.style.width = HEIGHT;
			div3.style.height = HEIGHT;
			div3.style.display = "inline-block";
			div3.style.backgroundColor = flags[i] ? ONCOLOR : OFFCOLOR;
			div3.style.borderTopLeftRadius = BORDRADIUS;
			div3.style.borderBottomLeftRadius = BORDRADIUS;

			var div4 = document.createElement("div");
			div2.appendChild(div4);
			div4.style.width = (REALWIDTH - REALHEIGHT) + "em";
			div4.style.height = HEIGHT;
			div4.style.textAlign = "center";
			div4.style.verticalAlign = "top";
			div4.style.lineHeight = HEIGHT;
			div4.style.display = "inline-block";
			div4.style.borderRadius = BORDRADIUS;
			
			setters[i] = (function() {
				var curDiv3 = div3;
				var index = i;
				return function(value) {
					flags[index] = value;
					curDiv3.style.backgroundColor = value ? ONCOLOR : OFFCOLOR;
					if(custom && (index === options.length)) {
						input.disabled = !value;
					}
				}
			})();

			if(i < options.length) {
				var bold = document.createElement("b");
				div4.appendChild(bold);
				bold.innerHTML = options[i];
				
				div2.onclick = (function() {
					var index = i;
					var curDiv3 = div3;
					return function() {
						if(exclusive) {
							instance.falsify();
							flags[index] = true;
							curDiv3.style.backgroundColor = ONCOLOR;
						}
						else {
							flags[index] = !flags[index];
							if(flags[index]) {
								curDiv3.style.backgroundColor = ONCOLOR;
							}
							else {
								curDiv3.style.backgroundColor = OFFCOLOR;
							}
						}
					}
				})();
			}
			else {
				input = document.createElement("input");
				div4.appendChild(input);
				input.id = name + "Other";
				input.className = "form-control";
				input.style.display = "inline-block";
				input.style.width = "auto";
				input.placeholder = "Other";
				input.disabled = !flags[i];
				
				div3.onclick = (function() {
					var index = i;
					return function() {
						if(exclusive) {
							instance.falsify();
							flags[index] = true;
							div3.style.backgroundColor = ONCOLOR;
							input.disabled = false;
						}
						else {
							flags[index] = !flags[index];
							if(flags[index]) {
								div3.style.backgroundColor = ONCOLOR;
								input.disabled = false;
							}
							else {
								div3.style.backgroundColor = OFFCOLOR;
								input.disabled = true;
							}
						}
					}
				})();
			}
		}
	}

	//Sets all fields to false
	this.falsify = function() {
		for(var i = 0;i < setters.length;i++) {
			setters[i](false);
		}
	}

	//Sets all fields to true
	this.truify = function() {
		for(var i = 0;i < setters.length;i++) {
			setters[i](true);
		}
	}

	//Resets values to default
	this.resetAll = function() {
		this.reset();
		for(var i = 0;i < setters.length;i++) {
			setters[i](flags[i]);
		}
		if(custom) {
			input.value = "";
		}
	}

	//Sets values to argument
	this.setAll = function(values) {
		this.falsify();
		if(custom) {
			input.value = "";
		}
		var arr = values.split(", ");
		for(var i = 0;i < arr.length;i++) {
			if(!(arr[i] === "")) {
				var set = false;
				for(var j = 0;j < options.length;j++) {
					if(arr[i] === options[j]) {
						setters[j](true);
						set = true;
					}
				}
				if(!set && custom) {
					setters[j](true);
					input.value = arr[i];
				}
			}
		}
	}

	//Gets the formatted output string
	this.getOutput = function() {
		var output = "";
		for(var i = 0;i < options.length;i++) {
			if(flags[i]) {
				output += options[i] + ", ";
			}
		}
		if(custom && flags[options.length]) {
			output += input.value + ", ";
		}
		//if(output.length > 0) {
		while(output.slice(-2) === ", ") {
			output = output.slice(0,-2);
		}
		return output;
	}

	//Gets the name of this group
	this.getName = function() {
		return name;
	}
}
