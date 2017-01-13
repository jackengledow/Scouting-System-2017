var makeHigh=0;
var totalHigh=0;
var makeLow=0;
var totalLow=0;

var countHighMake=function (){
	makeHigh++;
	totalHigh++;
	//console.log(makeHigh + " high shots made")
	//console.log(totalHigh + " total high shots");
	//return makeHigh;
	//return totalHigh;
	console.log(100*(makeHigh/totalHigh) + "% of made high shots");

}

var countHighMiss=function () {
	totalHigh++;
	//console.log(totalHigh + " total high shots");
	//return totalHigh;
	console.log(100*(makeHigh/totalHigh) + "% of made high shots");
}

var countLowMake=function (){
	makeLow++;
	totalLow++;
	//console.log(makeLow + " low shots made")
	//console.log(totalLow + " total low shots");
	//return makeLow;
	//return totalLow;
	console.log(100*(makeLow/totalLow) + "% of made low shots");
}

var countLowMiss=function () {
	totalLow++;
	//console.log(totalLow + " total low shots");
	//return totalLow;
	console.log(100*(makeLow/totalLow) + "% of made low shots");
}
