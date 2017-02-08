//Author Vincent Mai with derivations from Tiger's code
//This js file is used to generate inputs for the scouting form. It is designed so that scouting forms can be designed modularly.
//Some of the functions have been tailored to fit bootstrap's classes. This can easily be adjusted if need be.

function generateInput(inputType,type,inputClass) {
	var DIVCLASS = "form-group";

	this.appendToParent = function(parent) {
		var div = document.createElement("div");

		div.className = DIVCLASS;
		parent.appendChild(div);

		var input = document.createElement(inputType);
		this.element = input;
		
		if (inputClass !== undefined){
			input.className = inputClass;
		}

		if (type === "radio" || type === "checkbox") {
			div.className = type;
		}

		input.type = type;
		div.appendChild(input);

		//Use this function call when generating a <label> for the data input. You don't need this when generating buttons
		this.setName = function(name,nameAttr,id){
			var label = document.createElement("label");

			if(nameAttr !== undefined) {
				label.htmlFor = nameAttr;
				input.name = nameAttr;
			}
			if(id !== undefined) {
				input.id = id;
			}

			if (name !== undefined) {
				if (type === "radio" || type === "checkbox") {
					div.appendChild(label); 
					label.appendChild(input);
					label.innerHTML += name;
				}
				else {
					label.innerHTML = name;
					div.insertBefore(label,input);
				}
			}

			this.setLabelClass = function(labelClass) {
				label.className = labelClass;
				if (labelClass === "btn btn-primary") {
					div.className = "btn-group";
				}
				return this;
			}

			this.setCustomLabelAttribute = function(attr,value) {
				label.setAttribute(attr,value);
				return this;
			}

			this.getName = function(){
				return nameAttr;
			}

			this.getOutput = function() {
				var output;
				if(type === "checkbox" || type === "radio"){
					var diffInput = document.getElementsByName(nameAttr);
					output = [];
					for (var i = 0; i < diffInput.length; i++) {
						if (diffInput[i].type === "radio"){
							if (diffInput[i].checked) {
								output = diffInput[i].value;
								console.log(output);
							}
						}
						else if (diffInput[i].type === "checkbox"){
							if (diffInput[i].checked) {
								output.push(diffInput[i].value);
								console.log(output);
							}
						}
					}
				}
				else {
					output = input.value;
				}
				//	alert(output);
				return output;
			}
			return this;
		}

		//Use this function call for the contents of buttons
		this.setContent = function(content) { 
			input.innerHTML = content;
			return this;
		}

		this.setReadOnly = function() {
			input.readOnly = true;
			return this;
		}
		
		this.setCustomDivAttribute = function(attr,value) {
			div.setAttribute(attr,value);
			return this;
		}
		
		this.setCustomInputAttribute = function(attr,value) {
			input.setAttribute(attr,value);
			return this;
		}
		
		//Use this function when wanting to use bootstrap input group addons
		this.setInputAddon = function(addonClass,addonContent){
			const ADDONTAG = "span";

			var addon = document.createElement(ADDONTAG);

			if (addonClass !== undefined){
				addon.className = addonClass;
			}
			div.className = "input-group";
			addon.innerHTML = addonContent;
			div.insertBefore(addon,input);

			//These functions are for setting the entire input group to large or small
			//Only for use the input group inputs
			//Do not use both at the same time . . .
			this.setLarge = function(){
				div.className += " input-group-lg";		
				return this;
			}

			this.setSmall = function(){
				div.className += " input-group-sm";		
				return this;
			}
			
			return this;
		}
		
		//Use this function call when generating a select menu
		this.setSelect = function(selectOptions,optionInnerHTML,disabledOption) {
			for(var i = -1;i < selectOptions.length;i++) {
				var option = document.createElement("option");
				if(i < 0){
					option.innerHTML = disabledOption;
					option.disabled = true;
					option.selected = true;
					option.value = 0;
				}
				else {
					option.innerHTML = optionInnerHTML[i];
					option.value = selectOptions[i];
				}
				input.appendChild(option);
			}

			return this;
		}

		this.setValue = function(newValue) {
			input.value = newValue;
		}

		this.reset = function() {
			if (inputType === "textarea") {
				input.value = "";
			}
			else {
				input.value = 0;
			}
		}
		return this;
	}
}
//This function is used to generate custom radio button groups, such as in the Post-Match/Specs section of the scouting form.
//It was designed to be used with bootstrap.

function generateCustomOptions(type, options, customSize, justified){
	const SIZE = "1.75em";
	//Need to add code to dynamically change size

	//Creates the div and appends it to the specified parent
	this.appendToParent = function(parent){
		var parentDiv = document.createElement("div");
		var div = document.createElement("div");
		
		parentDiv.className = "form-group";
		div.setAttribute("data-toggle","buttons");
		div.className = "btn-group";
		if(justified)
			div.className += " btn-group-justified";
		parent.appendChild(parentDiv);
		parentDiv.appendChild(div);

		//This function is used to set the title and name attribute of the radio inputs
		this.setName = function(name,nameAttr){
			if(name !== undefined) {
				var title = document.createElement("label");
				title.innerHTML = name;
				title.style.width = "100%";
				parentDiv.insertBefore(title,div);
			}
			
			for(var i = 0;i < options.length;i++) {
				var label = document.createElement("label");
				div.appendChild(label);
				label.className = "btn btn-default btn-lg";

				var input = document.createElement("input");
				label.appendChild(input);
				if (type === "radio"){
					input.type = "radio";
					//input.setAttribute("data-validation","required");
				}
				else if (type === "checkbox"){
					input.type = "checkbox";
				}

				if (customSize){
					label.style.height = SIZE;
					label.style.width = SIZE;
					label.style.lineHeight = SIZE;
					label.style.fontSize = SIZE;
					label.style.padding = 0;
				}
				if(nameAttr !== undefined) {
					input.name = nameAttr;
				}
				input.value = options[i];
				
				if(i < options.length) {
					label.innerHTML += options[i];
				}
			}

			this.getName = function(){
				return nameAttr;
			}
			
			this.getOutput = function() {
				var input = document.getElementsByName(nameAttr);
				var value = [];
				for (i = 0; i < input.length; i++) {
					if (input[i].type === "radio"){
						if (input[i].checked) {
							value = input[i].value;
							console.log(value);
						}
					}
					else if (input[i].type === "checkbox"){
						if (input[i].checked) {
							value.push(input[i].value);
							console.log(value);
						}
					}
				}
				return value;
			}
			
			this.setValue = function(newValue){
				this.reset();
				var input = document.getElementsByName(nameAttr);
				for (i = 0; i < input.length; i++) {
					if (input[i].value == newValue) {
						input[i].checked = true;
						var title = input[i].parentNode;
						title.className += " active";
					}
				}
			}

			this.reset = function() {
				var input = document.getElementsByName(nameAttr);
				for (i = 0; i < input.length; i++) {
					if (input[i].checked) {
						input[i].checked = false;
						var title = input[i].parentNode;
						title.className = "btn btn-default";
					}
				}
			}
			
			return this;
		}
		return this;
	}
}

function customOptionsAttribute(name,attributeName,attributeValue){
	var inputs = document.getElementsByName(name);
	for(var i = 0; i < inputs.length; i++){
		for(var j = 0; j < attributeName.length; j++){
			inputs[i].setAttribute(attributeName[j],attributeValue[j]);
		}
	};
}
