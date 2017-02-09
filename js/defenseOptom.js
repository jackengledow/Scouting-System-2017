var robot = { //number of times the robot crosses each defense
	type_a: {
	"chival": 2,
	"porticullis": 2,
	},
	type_b: {
	"moat": 3,
	"ramparts": 1,
	},
	type_c: {
	"drawbridge": 0,
	"sally_port": 0,
	},
	type_d: {
	"rock_wall": 1,
	"rough_terrain": 3,
	},
	"low_bar": 2
}

var testRobot1 = { //number of times the robot crosses each defense
	type_a: {
	"chival": 1001,
	"porticullis": 2,
	},
	type_b: {
	"moat": 6,
	"ramparts": 2,
	},
	type_c: {
	"drawbridge": 1,
	"sally_port": 0,
	},
	type_d: {
	"rock_wall": 5,
	"rough_terrain": 3,
	},
	"low_bar": 2
}

var testRobot2 = { //number of times the robot crosses each defense
	type_a: {
	"chival": 2,
	"porticullis": 10000,
	},
	type_b: {
	"moat": 3,
	"ramparts": 5,
	},
	type_c: {
	"drawbridge": 4,
	"sally_port": 2,
	},
	type_d: {
	"rock_wall": 3,
	"rough_terrain": 3,
	},
	"low_bar": 5
}

var testRobot3 = { //number of times the robot crosses each defense
	type_a: {
	"chival": 10,
	"porticullis": 16,
	},
	type_b: {
	"moat": 2012,
	"ramparts": 17,
	},
	type_c: {
	"drawbridge": 12,
	"sally_port": 14,
	},
	type_d: {
	"rock_wall": 15,
	"rough_terrain": 16,
	},
	"low_bar": 13
}



var totals = { //stores percentages across a select group of robots
	"chival": 0,
	"porticullis": 0,
	"moat": 0,
	"ramparts": 0,
	"drawbridge": 0,
	"sally_port": 0,
	"rock_wall": 0,
	"rough_terrain": 0
}

var getTotal = function(robot){ //takes one robot
	var total = 0;
	for(var type in robot){
		for(var defense in robot[type]){
			total += robot[type][defense];
		}
	}
	return total;
}

var getPercentage = function(robot, defense){ //takes one robot and one defense
	for(var type in robot){
		if(Object.keys(robot[type])[0] == defense ||
			Object.keys(robot[type])[1] == defense){ //if type contains defense
			return robot[type][defense] / getTotal(robot);
	}
}
}

var getAudiencePick = function(robots, type){ //takes one or many robots (array) and the type of defense
	var percentages = [];
	var totalA = 0;
	var totalB = 0;
	robots.forEach(function(robot){
		for (var defense in robot[type]) {
				percentages.push(getPercentage(robot, defense));
			}
		});
	//percentages [] now contains all percentages with each defense offset
	//For example if three robots were compared with respect to type A,
	//the array would contain "chival" data in index 0, 2, and 4.
	console.log(percentages);
	for(i = 0; i < percentages.length; i += 2){
		totalA += percentages[i];
	}
	for(i = 1; i < percentages.length; i += 2){
		totalB += percentages[i];
	}
	if(totalA > totalB){
		//http://stackoverflow.com/questions/19138250/get-value-of-first-object-poperty-in-javascript
		 return("Audience should pick the " + Object.keys(robot[type])[1]);
		 //return Object.keys(robot[type])[1]; //return lowest percentage
	}else if(totalA <= totalB){
		return("Audience should pick the " + Object.keys(robot[type])[0]);
		//return Object.keys(robot[type])[0]; //return lowest percentage
	}else{
		return("Error in getting optimal audience pick");
		//return null;
	}
}

var getOptimalDefenses = function(robots){ //takes robots on opposing alliance
											//returns top FOUR defenses

	var alertMessage = "";
	robots.forEach(function(robot){
		for(var type in robot){
			for(var defense in robot[type]){
				if(defense != "low_bar") totals[defense] += getPercentage(robot, defense);
			}
		}
	});
	console.log(totals);
	for(i = 1; i < 5; i++){
		var lowest = 1000;
		var lowestName = "";
		for(var defenseTotal in totals){
			if(totals[defenseTotal] < lowest){
				lowest = totals[defenseTotal];
				lowestName = defenseTotal;
			}
		}
		/*
		totals.forEach(function(defenseTotal){
			if(defenseTotal.value < lowest){
				lowestName = defenseTotal; //name of defense with lowest percentage
			}
		})
*/		
		totals[lowestName] = 1000;
		alertMessage += ("#" + i + " defense:\t" + lowestName + "\n");
	}
	return(alertMessage);
}

function getBestDefenses(){
	$("#DefensePopup").html(getOptimalDefenses([testRobot1, testRobot2, testRobot3]));
}

function getAudiencePik(){
	console.log(getAudiencePick([testRobot1, testRobot2, testRobot3], "type_a"));
	$("#AudiencePopup").html(getAudiencePick([testRobot1, testRobot2, testRobot3], "type_a"));
}

/*
var obj = {
  x: 42,
  y: "HI CHRIS MY WIFE IS A REAL HUMA SUT UP",
};
undefined
obj
Object {x: 42, y: "HI CHRIS MY WIFE IS A REAL HUMA SUT UP"}
for (key in obj) {
  console.log(key, obj[key]);
}
VM37264:3 x 42
VM37264:3 y HI CHRIS MY WIFE IS A REAL HUMA SUT UP
*/

/*
function callbackfn(value, index, array1)
You can declare the callback function by using up to three parameters.
The callback function parameters are as follows.
Callback argument
Definition
value
The value of the array element.
index
The numeric index of the array element.
array1
The array object that contains the element.
*/
