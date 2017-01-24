var makeHighTeleop=0;
var makeHighAuton=0;
var makeLowTeleop=0;
var totalGears =0;
var lowDumps = [""];
var lowCount = 0;
var smallLoads = [""];
var smallCount = 0;
var mediumLoads = [""];
var mediumCount = 0;
var mediumCount = 0;
var bigLoads = [""];
var bigCount = 0;
var canvas = document.getElementById('cnv');

var countHighMakeTeleop=function (change){
	makeHighTeleop+=change;
	if (makeHighTeleop<0){
		makeHighTeleop = 0;
	}
	document.getElementById("highScoreTeleop").innerHTML = makeHighTeleop;

}

var countHighMakeAuton=function (change){
	makeHighAuton+=change;
	if (makeHighAuton<0){
		makeHighAuton = 0;
	}
	document.getElementById("highScoreAuton").innerHTML = makeHighAuton;

}

var addGears=function (change){
	totalGears+=change;
	if (totalGears<0){
		totalGears = 0;
	}
	document.getElementById("gearsTeleop").innerHTML = totalGears;

}

var countLowMake=function (){
	makeLowTeleop++;
	totalLow++;
	console.log(makeLow + " low shots made")
	//console.log(totalLow + " total low shots");
	console.log(Math.round(100*(makeLow/totalLow)) + "% of made low shots");
}

var countLowMiss=function () {
	totalLow++;
	//console.log(totalLow + " total low shots");
	console.log(Math.round(100*(makeLow/totalLow)) + "% of made low shots");
}

var changeGear = function (change){
	totalGears += change;
	console.log(totalGears + " gears collected.")
}

var lowDump = function(type){
	lowDumps[lowCount] = type;
	lowCount++;
	console.log(lowDumps);
}

var dumpPercent = function(percent){
	size = lowDumps[lowCount-1];
	if (size=="Small"){
		smallLoads[smallCount]=percent;
		smallCount++;
		console.log("Small: " + smallLoads);
	}
	if (size=="Medium"){
		mediumLoads[mediumCount]=percent;
		mediumCount++;
		console.log("Medium: " + mediumLoads);
	}
	if (size=="Big"){
		bigLoads[bigCount]=percent;
		bigCount++;
		console.log("Big: " + bigLoads);
	}
}