var makeHighTeleop=0;
var makeHighAuton=0;
var makeLowTeleop=0;
var totalGears =0;

var countHighMakeTeleop=function (change){
	makeHighTeleop+=change;
	document.getElementById("highScoreTeleop").innerHTML = makeHighTeleop;

}

var countHighMakeAuton=function (change){
	makeHighAuton+=change;
	document.getElementById("highScoreAuton").innerHTML = makeHighAuton;

}

var addGears=function (change){
	totalGears+=change;
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
