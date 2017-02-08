var fieldTappedNumber = 0;
function teleopFieldTapped(event) {
	var img = document.getElementById("teleopShootImg");
	var clk = document.getElementById("teleopShootClk");
	var div = document.getElementById("teleopShoot");
	var offset = $(img).offset();
	var coffset = $(clk).offset();
	var x = event.pageX - coffset.left;
	var y = event.pageY - coffset.top;
	var xp = x/img.width * 100;
	var yp = y/img.height * 100;
	var xr = Math.round(xp);
	var yr = Math.round(yp);
	if(field_left_right) {
		xr = 100 - xr;
	}
	var list = document.getElementById("teleopShootList");
	var content = document.createElement("div");
	var current = fieldTappedNumber.toString();
	content.className = "shootPos" + current;
	//content.onclick = function() { removeFieldTap("shootPos" + current); };
	content.appendChild(document.createTextNode(current + ": " + xr + "," + yr));
	content.id = "shootPosList" + current;
	var input = document.createElement("input");
	input.name = "shootPos[]";
	input.value = yr + " " + xr + " " + 0;
	input.type = "hidden";
	content.appendChild(input);
	list.style.backgroundColor = "#00AC00";
	list.style.color = "#FFFFFF";
	content.style.paddingLeft = "4px";
	list.appendChild(content);
	var dot = document.createElement("div");
	dot.className = "shootCircle shootPos" + current;
	dot.id = "shootPosDot" + current;
	//	dot.style.position = "absolute";
	dot.style.top = (yp) - 1.75 + "%";
	dot.style.left = (xp + (field_left_right ? 0 : 0) - 1.75) + "%";
	//	dot.style.width = "4%";
	//	dot.style.height = "4%";
	dot.appendChild(document.createTextNode(current));
	dot.onclick = function() { changeFieldTap("shootPos",current); };
	div.appendChild(dot);
	fieldTappedNumber++;
}
function removeFieldTap(name) {
	var content = document.getElementsByClassName(name);
	content[0].parentElement.removeChild(content[0]);
	content[0].parentElement.removeChild(content[0]);
}
function changeFieldTap(name,number) {
	var dot = document.getElementById(name + "Dot" + number);
	var list = document.getElementById(name + "List" + number);
	var nums = list.lastChild.value.split(" ");
	if(nums[2] === "0") {
		dot.style.backgroundColor = "#FF0000";
		list.style.backgroundColor = "#CF0000";
		list.lastChild.value = nums[0] + " " + nums[1] + " 1";
	}
	else {
		//dot.style.backgroundColor = "#00FF00";
		//list.style.backgroundColor = "#007F00";
		//list.lastChild.value = nums[0] + " " + nums[1] + " 0";
		removeAutonFieldTap(name + number);
	}
}
var autonFieldTappedNumber = 0;
function autonFieldTapped(event) {
	var img = document.getElementById("autonShootImg");
	var clk = document.getElementById("autonShootClk");
	var div = document.getElementById("autonShoot");
	var offset = $(img).offset();
	var coffset = $(clk).offset();
	var x = event.pageX - coffset.left;
	var y = event.pageY - coffset.top;
	var xp = x/img.width * 100;
	var yp = y/img.height * 100;
	var xr = Math.round(xp);
	var yr = Math.round(yp);
	if(field_left_right) {
		xr = 100 - xr;
	}
	var list = document.getElementById("autonShootList");
	var content = document.createElement("div");
	var current = autonFieldTappedNumber.toString();
	content.className = "autonShootPos" + current;
	//content.onclick = function() { removeAutonFieldTap("autonShootPos" + current); };
	content.appendChild(document.createTextNode(current + ": " + xr + "," + yr));
	content.id = "autonShootPosList" + current;
	var input = document.createElement("input");
	input.name = "autonShootPos[]";
	input.value = yr + " " + xr + " " + 10;
	input.type = "hidden";
	content.appendChild(input);
	list.style.backgroundColor = "#00AC00";
	list.style.color = "#FFFFFF";
	content.style.paddingLeft = "4px";
	list.appendChild(content);
	var dot = document.createElement("div");
	dot.className = "shootCircle autonShootPos" + current;
	dot.id = "autonShootPosDot" + current;
	//	dot.style.position = "absolute";
	dot.style.top = (yp) - 1.75 + "%";
	dot.style.left = (xp + (field_left_right ? 0 : 0) - 1.75) + "%";
	//	dot.style.width = "4%";
	//	dot.style.height = "4%";
	dot.appendChild(document.createTextNode(current));
	dot.onclick = function() { changeAutonFieldTap("autonShootPos",current); };
	div.appendChild(dot);
	autonFieldTappedNumber++;
}
function removeAutonFieldTap(name) {
	var content = document.getElementsByClassName(name);
	content[0].parentElement.removeChild(content[0]);
	content[0].parentElement.removeChild(content[0]);
}
function changeAutonFieldTap(name,number) {
	var dot = document.getElementById(name + "Dot" + number);
	var list = document.getElementById(name + "List" + number);
	var nums = list.lastChild.value.split(" ");
	if(nums[2] === "10") {
		dot.style.backgroundColor = "#FFFF00";
		list.style.backgroundColor = "#DFDF00";
		list.style.color = "#000000";
		list.lastChild.value = nums[0] + " " + nums[1] + " 11";
	}
	else if(nums[2] === "11") {
		dot.style.backgroundColor = "#FF0000";
		list.style.backgroundColor = "#CF0000";
		list.style.color = "#ffffff";
		list.lastChild.value = nums[0] + " " + nums[1] + " 12";
	}
	else {
		//dot.style.backgroundColor = "#00FF00";
		//list.style.backgroundColor = "#007F00";
		//list.lastChild.value = nums[0] + " " + nums[1] + " 10";
		removeAutonFieldTap(name + number);
	}
}
