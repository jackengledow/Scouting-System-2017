var makeHigh=0;
var totalHigh=0;
var makeLow=0;
var totalLow=0;
var totalGears =0;

var countHighMake=function (){
	makeHigh++;
	totalHigh++;
	console.log(makeHigh + " high shots made")
	//console.log(totalHigh + " total high shots");
	console.log(Math.round(100*(makeHigh/totalHigh)) + "% of high shots made");

}

var countHighMiss=function () {
	totalHigh++;
	//console.log(totalHigh + " total high shots");
	console.log(Math.round(100*(makeHigh/totalHigh)) + "% of high shots made");
}

var countLowMake=function (){
	makeLow++;
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
