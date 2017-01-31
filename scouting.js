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
var rotate = 0;

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
	if(mouse_x>=138 && mouse_x<211){
		index_x = 0;
	}
	if(mouse_x>=211 && mouse_x<290){
		index_x = 1;
	}
	if(mouse_x>=290 && mouse_x<364){
		index_x = 2;
	}
	if(mouse_x>=364 && mouse_x<438){
		index_x = 3;
	}
	if(mouse_x>=438 && mouse_x<509){
		index_x = 4;
	}
	
	
	if(mouse_y>=399 && mouse_y<479){
		index_y = 0;
	}
	if(mouse_y>=479 && mouse_y<558){
		index_y = 1;
	}
	if(mouse_y>=558 && mouse_y<639){
		index_y = 2;
	}
	if(mouse_y>=639 && mouse_y<720){
		index_y = 3;
	}
	if(mouse_y>=720 && mouse_y<795){
		index_y = 4;
	}
	
	if(makemiss == "Make"){
		gridCounterMake[index_x][index_y] += change;
		if (gridCounterMake[index_x][index_y] < 0){
			gridCounterMake[index_x][index_y] = 0;
		}
	}
	if(makemiss == "Miss"){
		gridCounterMiss[index_x][index_y] += change;
		if (gridCounterMiss[index_x][index_y] < 0){
			gridCounterMiss[index_x][index_y] = 0;
		}
	}
	console.log("When shooting from spot " + index_x + "," + index_y + ". Make: " + gridCounterMake[index_x][index_y] + ". Miss: " + gridCounterMiss[index_x][index_y] + ". Percent: " + 100*gridCounterMake[index_x][index_y]/(gridCounterMake[index_x][index_y]+gridCounterMiss[index_x][index_y])+ "%.");
}