var makeHighTeleop=0;
var makeHighAuton=0;
var makeLowTeleop=0;
var totalGears =0;
var lowDumpsAuton = [""];
var lowDumpsTeleop = [""];
var lowCountAuton = 0;
var lowCountTeleop = 0;
var smallLoadsAuton = [""];
var smallLoadsTeleop = [""];
var smallCountAuton = 0;
var smallCountTeleop = 0;
var mediumLoadsAuton = [""];
var mediumLoadsTeleop = [""];
var mediumCountAuton = 0;
var mediumCountTeleop = 0;
var bigLoadsAuton = [""];
var bigLoadsTeleop = [""];
var bigCountAuton = 0;
var bigCountTeleop = 0;
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

var lowDumpAuton = function(type){
	lowDumpsAuton[lowCountAuton] = type;
	lowCountAuton++;
	console.log("Auton: " + lowDumpsAuton);
}

var lowDumpTeleop = function(type){
	lowDumpsTeleop[lowCountTeleop] = type;
	lowCountTeleop++;
	console.log("Teleop: " + lowDumpsTeleop);
}

var dumpPercentAuton = function(percent){
	size = lowDumpsAuton[lowCountAuton-1];
	if (size=="Small"){
		smallLoadsAuton[smallCountAuton]=percent;
		smallCountAuton++;
		console.log("Small Auton: " + smallLoadsAuton);
	}
	if (size=="Medium"){
		mediumLoadsAuton[mediumCountAuton]=percent;
		mediumCountAuton++;
		console.log("Medium Auton: " + mediumLoadsAuton);
	}
	if (size=="Big"){
		bigLoadsAuton[bigCountAuton]=percent;
		bigCountAuton++;
		console.log("Big Auton: " + bigLoadsAuton);
	}
}

var dumpPercentTeleop = function(percent){
	size = lowDumpsTeleop[lowCountTeleop-1];
	if (size=="Small"){
		smallLoadsTeleop[smallCountTeleop]=percent;
		smallCountTeleop++;
		console.log("Small Teleop: " + smallLoadsTeleop);
	}
	if (size=="Medium"){
		mediumLoadsTeleop[mediumCountTeleop]=percent;
		mediumCountTeleop++;
		console.log("Medium Teleop: " + mediumLoadsTeleop);
	}
	if (size=="Big"){
		bigLoadsTeleop[bigCountTeleop]=percent;
		bigCountTeleop++;
		console.log("Big Teleop: " + bigLoadsTeleop);
	}
}