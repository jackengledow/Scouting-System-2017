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
var gridCounterMake = [[0],[0],[0],[0],[0]];
var gridCounterMiss = [[0],[0],[0],[0],[0]];

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

var clickZone = function (x,y,makemiss){
	if(x>=15 && x<89){
		index_x = 0;
	}
	if(x>=89 && x<163){
		index_x = 1;
	}
	if(x>=163 && x<237){
		index_x = 2;
	}
	if(x>=237 && x<311){
		index_x = 3;
	}
	if(x>=311 && x<384){
		index_x = 4;
	}
	
	
	if(y>=65 && y<145){
		index_y = 0;
	}
	if(y>=145 && y<226){
		index_y = 1;
	}
	if(y>=226 && y<305){
		index_y = 2;
	}
	if(y>=305 && y<386){
		index_y = 3;
	}
	if(y>=386 && y<464){
		index_y = 4;
	}
	
	if(makemiss = "Make"){
		gridCounterMake[index_x,index_y] += 1;
	}
	if(makemiss = "Miss"){
		gridCounterMiss[index_x,index_y] += 1;
	}
	console.log("When shooting from spot " + index_x + "," + index_y + ". Make: " + gridCounterMake[index_x, index_y] + ". Miss: " + gridCounterMiss[index_x, index_y] + ". Percent: " + gridCounterMake[index_x, index_y]/(gridCounterMake[index_x, index_y]+gridCounterMiss[index_x, index_y])+ "%.");
}