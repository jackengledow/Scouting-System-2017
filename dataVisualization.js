var autonHigh1 = 0;
var autonHigh2 = 0;
var autonHigh3 = 0;
var autonHigh4 = 0;
var autonHigh5 = 0;
var autonHigh6 = 0;
var autonHigh7 = 0;
var autonHigh8 = 0;
var autonHigh9 = 0;
var autonHigh10 = 0;
var teleopHigh1 = 0;
var teleopHigh2 = 0;
var teleopHigh3 = 0;
var teleopHigh4 = 0;
var teleopHigh5 = 0;
var teleopHigh6 = 0;
var teleopHigh7 = 0;
var teleopHigh8 = 0;
var teleopHigh9 = 0;
var teleopHigh10 = 0;
var teleopGear1 = 0;
var teleopGear2 = 0;
var teleopGear3 = 0;
var teleopGear4 = 0;
var teleopGear5 = 0;
var teleopGear6 = 0;
var teleopGear7 = 0;
var teleopGear8 = 0;
var teleopGear9 = 0;
var teleopGear10 = 0;
var startFuel = false;
var startGear = false;
var scoreGear = false;
var crossBaseline = false;
var useHopper = false;
var groundGear = false;
var graphIndex = 0;
var display = function(){
	if (startFuel == true){
		document.getElementById("startFuel").innerHTML = "Yes";
	}
	else {
		document.getElementById("startFuel").innerHTML = "No";
	}
	if (startGear == true){
		document.getElementById("startGear").innerHTML = "Yes";
	}
	else {
		document.getElementById("startGear").innerHTML = "No";
	}
	if(scoreGear == true){
		document.getElementById("scoreGear").innerHTML = "Yes";
	}
	else {
		document.getElementById("scoreGear").innerHTML = "No";
	}
	if (crossBaseline == true){
		document.getElementById("baseline").innerHTML = "Yes";
	}
	else {
		document.getElementById("baseline").innerHTML = "No";
	}
	if (groundCollect == true){
		document.getElementById("groundCollect").innerHTML = "Yes";
	}
	else {
		document.getElementById("groundCollect").innerHTML = "No";
	}
	if (useHopper == true){
		document.getElementById("hopper").innerHTML = "Yes";
	}
	else {
		document.getElementById("hopper").innerHTML = "No";
	}
	if (groundGear == true){
		document.getElementById("groundGear").innerHTML = "Yes";
	}
	else {
		document.getElementById("groundGear").innerHTML = "No";
	}
	document.getElementById("avgSpeed").innerHTML = avgSpeed;
	FusionCharts.ready(function () {
		var autonHigh = new FusionCharts({
			type: 'line',
			renderAt: 'autonHigh',
			width: '500',
			height: '300',
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Auton High Goals per Match",
					"xAxisName": "Match",
					"yAxisName": "No. of High Goals",
					"lineThickness" : "2",
					"paletteColors" : "#0075c2",
					"baseFontColor" : "#333333",
					"baseFont" : "Helvetica Neue,Arial",
					"captionFontSize" : "14",
					"subcaptionFontSize" : "14",
					"subcaptionFontBold" : "0",
					"showBorder" : "0",
					"bgColor" : "#ffffff",
					"showShadow" : "0",
					"canvasBgColor" : "#ffffff",
					"canvasBorderAlpha" : "0",
					"divlineAlpha" : "100",
					"divlineColor" : "#999999",
					"divlineThickness" : "1",
					"divLineIsDashed" : "1",
					"divLineDashLen" : "1",
					"divLineGapLen" : "1",
					"showXAxisLine" : "1",
					"xAxisLineThickness" : "1",
					"xAxisLineColor" : "#999999",
					"showAlternateHGridColor" : "0",
					
				},
				"data": [
					{
						"label": "Match 1",
						"value": autonHigh1
					},
					{
						"label": "Match 2",
						"value": autonHigh2
					},
					{
						"label": "Match 3",
						"value": autonHigh3
					},
					{
						"label": "Match 4",
						"value": autonHigh4
					},
					{
						"label": "Match 5",
						"value": autonHigh5
					},
					{
						"label": "Match 6",
						"value": autonHigh6
					},
					{
						"label": "Match 7",
						"value": autonHigh7
					},
					{
						"label": "Match 8",
						"value": autonHigh8
					},
					{
						"label": "Match 9",
						"value": autonHigh9
					},
					{
						"label": "Match 10",
						"value": autonHigh10
					},
				],
				"trendlines": [
					{
						"line": [
							{
								"startvalue": (autonHigh1 + autonHigh2 + autonHigh3 + autonHigh4 + autonHigh5 + autonHigh6 + autonHigh7 + autonHigh8 + autonHigh9 + autonHigh10)/10,
								"color": "#1aaf5d",
								"displayvalue": "Average{br}High-Goal{br}Auton",
								"valueOnRight" : "1",
								"thickness" : "2"
							}
						]
					}
				]
			}
		});
		
		autonHigh.render();
	});
	FusionCharts.ready(function () {
		var teleopHigh = new FusionCharts({
			type: 'line',
			renderAt: 'teleopHigh',
			width: '500',
			height: '300',
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Teleop High Goals per Match",
					"xAxisName": "Match",
					"yAxisName": "No. of High Goals",
					"lineThickness" : "2",
					"paletteColors" : "#0075c2",
					"baseFontColor" : "#333333",
					"baseFont" : "Helvetica Neue,Arial",
					"captionFontSize" : "14",
					"subcaptionFontSize" : "14",
					"subcaptionFontBold" : "0",
					"showBorder" : "0",
					"bgColor" : "#ffffff",
					"showShadow" : "0",
					"canvasBgColor" : "#ffffff",
					"canvasBorderAlpha" : "0",
					"divlineAlpha" : "100",
					"divlineColor" : "#999999",
					"divlineThickness" : "1",
					"divLineIsDashed" : "1",
					"divLineDashLen" : "1",
					"divLineGapLen" : "1",
					"showXAxisLine" : "1",
					"xAxisLineThickness" : "1",
					"xAxisLineColor" : "#999999",
					"showAlternateHGridColor" : "0",
					
				},
				"data": [
					{
						"label": "Match 1",
						"value": teleopHigh1
					},
					{
						"label": "Match 2",
						"value": teleopHigh2
					},
					{
						"label": "Match 3",
						"value": teleopHigh3
					},
					{
						"label": "Match 4",
						"value": teleopHigh4
					},
					{
						"label": "Match 5",
						"value": teleopHigh5
					},
					{
						"label": "Match 6",
						"value": teleopHigh6
					},
					{
						"label": "Match 7",
						"value": teleopHigh7
					},
					{
						"label": "Match 8",
						"value": teleopHigh8
					},
					{
						"label": "Match 9",
						"value": teleopHigh9
					},
					{
						"label": "Match 10",
						"value": teleopHigh10
					},
				],
				"trendlines": [
					{
						"line": [
							{
								"startvalue": (teleopHigh1 + teleopHigh2 + teleopHigh3 + teleopHigh4 + teleopHigh5 + teleopHigh6 + teleopHigh7 + teleopHigh8 + teleopHigh9 + teleopHigh10)/10,
								"color": "#1aaf5d",
								"displayvalue": "Average{br}High-Goal{br}Teleop",
								"valueOnRight" : "1",
								"thickness" : "2"
							}
						]
					}
				]
			}
		});
		
		teleopHigh.render();
	});
		FusionCharts.ready(function () {
		var teleopGear = new FusionCharts({
			type: 'line',
			renderAt: 'teleopGear',
			width: '500',
			height: '300',
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Teleop Gears per Match",
					"xAxisName": "Match",
					"yAxisName": "No. of High Goals",
					"lineThickness" : "2",
					"paletteColors" : "#0075c2",
					"baseFontColor" : "#333333",
					"baseFont" : "Helvetica Neue,Arial",
					"captionFontSize" : "14",
					"subcaptionFontSize" : "14",
					"subcaptionFontBold" : "0",
					"showBorder" : "0",
					"bgColor" : "#ffffff",
					"showShadow" : "0",
					"canvasBgColor" : "#ffffff",
					"canvasBorderAlpha" : "0",
					"divlineAlpha" : "100",
					"divlineColor" : "#999999",
					"divlineThickness" : "1",
					"divLineIsDashed" : "1",
					"divLineDashLen" : "1",
					"divLineGapLen" : "1",
					"showXAxisLine" : "1",
					"xAxisLineThickness" : "1",
					"xAxisLineColor" : "#999999",
					"showAlternateHGridColor" : "0",
					
				},
				"data": [
					{
						"label": "Match 1",
						"value": teleopGear1
					},
					{
						"label": "Match 2",
						"value": teleopGear2
					},
					{
						"label": "Match 3",
						"value": teleopGear3
					},
					{
						"label": "Match 4",
						"value": teleopGear4
					},
					{
						"label": "Match 5",
						"value": teleopGear5
					},
					{
						"label": "Match 6",
						"value": teleopGear6
					},
					{
						"label": "Match 7",
						"value": teleopGear7
					},
					{
						"label": "Match 8",
						"value": teleopGear8
					},
					{
						"label": "Match 9",
						"value": teleopGear9
					},
					{
						"label": "Match 10",
						"value": teleopGear10
					},
				],
				"trendlines": [
					{
						"line": [
							{
								"startvalue": (teleopGear1 + teleopGear2 + teleopGear3 + teleopGear4 + teleopGear5 + teleopGear6 + teleopGear7 + teleopGear8 + teleopGear9 + teleopGear10)/10,
								"color": "#1aaf5d",
								"displayvalue": "Average{br}Gear{br}Teleop",
								"valueOnRight" : "1",
								"thickness" : "2"
							}
						]
					}
				]
			}
		});
		
		teleopGear.render();
	});
}
var makeGraphAutonHighGoals = function(){
	console.log("This other function ran");
	document.getElementById('six').style.display = 'inline-block';
	graphIndex += 1;
	FusionCharts.ready(function () {
		var visitChart = new FusionCharts({
			type: 'msline',
			renderAt: 'six'+graphIndex,
			width: '100%',
			height: '100%',
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Number of visitors last week",
					"subCaption": "Bakersfield Central vs Los Angeles Topanga",
					"captionFontSize": "14",
					"subcaptionFontSize": "14",
					"subcaptionFontBold": "0",
					"paletteColors": "#0075c2,#1aaf5d",
					"bgcolor": "#ffffff",
					"showBorder": "0",
					"showShadow": "0",
					"showCanvasBorder": "0",
					"usePlotGradientColor": "0",
					"legendBorderAlpha": "0",
					"legendShadow": "0",
					"showAxisLines": "0",
					"showAlternateHGridColor": "0",
					"divlineThickness": "1",
					"divLineIsDashed": "1",
					"divLineDashLen": "1",
					"divLineGapLen": "1",
					"xAxisName": "Day",
					"showValues": "0"               
				},
				"categories": [
					{
						"category": [
							{ "label": "Mon" }, 
							{ "label": "Tue" }, 
							{ "label": "Wed" },
							{
								"vline": "true",
								"lineposition": "0",
								"color": "#6baa01",
								"labelHAlign": "center",
								"labelPosition": "0",
								"label": "National holiday",
								"dashed":"1"
							},
							{ "label": "Thu" }, 
							{ "label": "Fri" }, 
							{ "label": "Sat" }, 
							{ "label": "Sun" }
						]
					}
				],
				"dataset": [
					{
						"seriesname": "Bakersfield Central",
						"data": [
							{ "value": "15123" }, 
							{ "value": "14233" }, 
							{ "value": "25507" }, 
							{ "value": "9110" }, 
							{ "value": "15529" }, 
							{ "value": "20803" }, 
							{ "value": "19202" }
						]
					}, 
					{
						"seriesname": "Los Angeles Topanga",
						"data": [
							{ "value": "13400" }, 
							{ "value": "12800" }, 
							{ "value": "22800" }, 
							{ "value": "12400" }, 
							{ "value": "15800" }, 
							{ "value": "19800" }, 
							{ "value": "21800" }
						]
					}
				], 
				"trendlines": [
					{
						"line": [
							{
								"startvalue": "17022",
								"color": "#6baa01",
								"valueOnRight": "1",
								"displayvalue": "Average"
							}
						]
					}
				]
			}
		}).render();
	});
};