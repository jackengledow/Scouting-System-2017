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
var gridCounterMake = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var gridCounterMiss = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mouse_x = 0;
var mouse_y = 0;
var fouls = 0;
var technicals = 0;

var countFouls=function (change) {
	fouls+=change;
	if (fouls<0){
		fouls = 0;
	}
	document.getElementById("addFoul").innerHTML = fouls;
}

var countTechnicals=function (change) {
	technicals+=change;
	if (technicals<0) {
		technicals=0;
	}
	document.getElementById("addTechnical").innerHTML = technicals;
}

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

var setGridClickPos = function(x,y){
	mouse_x = x;
	mouse_y = y;
}

var clickZone = function (makemiss, change){
	if(mouse_x>=15 && mouse_x<89){
		index_x = 0;
	}
	if(mouse_x>=89 && mouse_x<163){
		index_x = 1;
	}
	if(mouse_x>=163 && mouse_x<237){
		index_x = 2;
	}
	if(mouse_x>=237 && mouse_x<311){
		index_x = 3;
	}
	if(mouse_x>=311 && mouse_x<384){
		index_x = 4;
	}
	
	
	if(mouse_y>=65 && mouse_y<145){
		index_y = 0;
	}
	if(mouse_y>=145 && mouse_y<226){
		index_y = 1;
	}
	if(mouse_y>=226 && mouse_y<305){
		index_y = 2;
	}
	if(mouse_y>=305 && mouse_y<386){
		index_y = 3;
	}
	if(mouse_y>=386 && mouse_y<464){
		index_y = 4;
	}
	
	if(makemiss == "Make"){
		gridCounterMake[index_x][index_y] += change;
	}
	if(makemiss == "Miss"){
		gridCounterMiss[index_x][index_y] += change;
	}
	console.log("When shooting from spot " + index_x + "," + index_y + ". Make: " + gridCounterMake[index_x][index_y] + ". Miss: " + gridCounterMiss[index_x][index_y] + ". Percent: " + 100*gridCounterMake[index_x][index_y]/(gridCounterMake[index_x][index_y]+gridCounterMiss[index_x][index_y])+ "%.");
}