<!DOCTYPE html>
<html>
	<head>
		<title>Data Visualization</title>
		<script src = "fusioncharts-suite-xt/js/fusioncharts.js"></script>
		<script src = "fusioncharts-suite-xt/js/fusioncharts.charts.js"></script>
		<style>
			a {
				border: 2px solid black;
				border-radius: 2px;
				text-decoration: none;
				padding: 8px;
				color: black;
			}
			a:hover{
				opacity: 0.7;
			}
			body {
				color: black;
				font-family: "Verdana", sans-serif; 
			}
			form{
				margin-bottom: 10px;
			}
			input[type="submit"]{
				padding: 8px;
				font-size: 15px;
				border: 2px solid black;
				border-radius: 2px;
				background-color: white;
			}
			input[type="number"]{
				height:30px;
			} 
			input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button{
				-webkit-appearance: none;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<h2>Team Data</h2>
		<form action = "getTeam.php" method = "post">TeamNumber: <input type = "number" name = "dataTeamNumber"><input type = "submit"></form>
		<a href = "dataVisualization.html">Back</a>
		<?php
			$host = "localhost";
			$user = "root";
			$pass = "team868!";
			$dbname = "techHounds";
			$con = new mysqli($host,$user,$pass,$dbname);
			if($con->connect_errno) {
				echo "Connection failed: " . $con->connect_error;
			}
			function getVal($key, $defVal){
				if(isset($_POST[$key]) && !empty($_POST[$key])){
					return $_POST[$key];
				}
				return $defVal;
			}
			$dataTeamNumber = getVal('dataTeamNumber', 0);

			$query = "SELECT * FROM generic WHERE teamNumber='" . $dataTeamNumber . "';";
			$autonHighMake = array();
			$teleopHighMake = array();
			$teleopGearsScored = array();
			$startGearsTrue = 0;
			$scoreGearTrue = 0;
			$baselineTrue = 0;
			$collectsFuelTrue = 0;
			$collectsGearTrue = 0;
			$climbTrue = 0;
			$useHopperTrue = 0;
			$teleopHighTotal = 0;
			$teleopGearTotal = 0;
			$autonHighTotal = 0;
			$result = $con->query($query);
			$count = 0;
			while($row = $result->fetch_assoc()){
				$count++;
				$startGears = $row["startGears"];
				if ($startGears == 1){
					$startGearsTrue++;
				}
				$scoreGear = $row["scoreGear"];
				if ($scoreGear == "1"){
					$scoreGearTrue++;
				}
				$autonHigh = $row["autonHigh"];
				array_push($autonHighMake, $autonHigh);
				$autonHighTotal = $autonHighTotal + $autonHigh;
				$baseline = $row["baseline"];
				if ($baseline == 1){
					$baselineTrue++;
				}
				$collectsFuel = $row["collectsFuel"];
				if ($collectsFuel == 1){
					$collectsFuelTrue++;
				}
				$collectsGear = $row["collectsGear"];
				if ($collectsGear == 1){
					$collectsGearTrue++;
				}
				$useHopper = $row["useHopper"];
				if ($useHopper == 1){
					$useHopperTrue++;
				}
				$climb = $row["climb"];
				if($climb == "1"){
					$climbTrue++;
				}
				$reds = $row["reds"];
				$yellows = $row["yellows"];
				$fouls = $row["fouls"];
				$techs = $row["technicals"];
				$ejections = $row["ejections"];
				$notes = $row["notes"];
				$teleopHigh = $row["teleopHigh"];
				$teleopHighTotal = $teleopHighTotal + $teleopHigh;
				array_push($teleopHighMake, $teleopHigh);
				$teleopGears = $row["teleopGears"];
				$totalTeleopGears =  $totalTeleopGears + $teleopGears;
				array_push($teleopGearsScored, $teleopGears);
			}
			$autonHighAvg = round(($autonHighTotal/$count), 2);
			$teleopHighAvg = round(($teleopHighTotal/$count), 2);
			$teleopGearAvg = round(($totalTeleopGears/$count), 2);
			$climbing = 100*($climbTrue/$count);
			$climbPer = round($climbing, 2);
			$startingGear = 100*($startGearTrue/$count);
			$startGearPer = round($startingGear, 2);
			$startingFuel = 100*($startFuelTrue/$count);
			$startFuelPer = round($startingFuel, 2);
			$scoringGear = 100*($scoreGearTrue/$count);
			$scoreGearPer = round($scoringGear, 2);
			$collectingGroundGear = $collectsGearTrue/$count;
			$collectingGroundFuel = $collectsFuelTrue/$count;
			$usingTheHopper = $useHopperTrue/$count;
			if($collectingGroundGear >= .5){
				$collectsGroundGear = "Yes";
			}else{
				$collectsGroundGear = "Nope";
			}
			if($usingTheHopper >= .5){
				$usesHopper = "Yes";
			}else{
				$usesHopper = "Nope";
			}
			if($collectingGroundFuel >= .5){
				$collectsGroundFuel = "Yes";
			}else{
				$collectsGroundFuel = "Nope";
			}
			echo "<p>Auton High Average: " . $autonHighAvg . "</p>";
			echo "<p>Teleop Gear Average: " . $teleopGearAvg . "</p>";
			echo "<p>Teleop High Average: " . $teleopHighAvg . "</p>";
			echo "<p>Collects Gear From Ground: " . $collectsGroundGear . "</p>";
			echo "<p>Collects Fuel From Ground: " . $collectsGroundFuel . "</p>";
			echo "<p>Uses Hopper: " . $usesHopper . "</p>";
			echo "<p>Start Fuel: " . $startFuelPer . "</p>";
			echo "<p>Start Gear: " . $startGearPer . "</p>";
			echo "<p>Scored Gear: " . $scoreGearPer . "%</p>";
			echo "<p>Percent Climbed: " . $climbPer . "%</p>";
			mysqli_close($con);
		?>
		<div id = "autonHigh"></div>
		<div id = "teleopHigh"></div>
		<div id = "teleopGear"></div>
		<script>
			var autonHighArray = <?php echo json_encode($autonHighMake)?>;
			var teleopGearArray = <?php echo json_encode($teleopGearsScored)?>;
			var teleopHighArray = <?php echo json_encode($teleopHighMake)?>;
			var teleopHighData = [];
			var autonHighData = [];
			var teleopGearData = [];
			for(u = 0; u <= teleopGearArray.length; u++){
				var obj = {
					"label": "Match " + u,
					"value": teleopGearArray[u]
				}
				teleopGearData.push(obj);
			}
			for(t = 0;  t <= teleopHighArray.length; t++){
				var obj = {
					"label": "Match " + t,
					"value": teleopHighArray[t]
				}
				teleopHighData.push(obj);
			}
			for(y = 0; y <= autonHighArray.length; y++){
				var obj = {
					"label": "Match " + y,
					"value": autonHighArray[y]
				}
				autonHighData.push(obj);
			}
			FusionCharts.ready(function(){
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
							"lineThickness": "2",
							"paletteColors": "#0075c2",
							"baseFontColor": "#333333",
							"baseFont" : "Helvetica Neue, Arial",
							"captionFontSize": "14",
							"showBorder" : "0",
							"showShadow" : "0",
							"canvasBgColor" : "#ffffff",
							"canvasBorderAlpha": "0",
							"divlineAlpha" : "100",
							"divLineColor": "#999999",
							"divLineThickness": "1",
							"divLineIsDashed": "1",
							"divLineGepLen" : "1",
							"showXAxisLine" : "1",
							"XAxisLineThickness": "1",
							"xAxisLineColor" : "#999999",
							"showAlternateHGridColor": "0",
						},
						"data": autonHighData,
					}
				});
				autonHigh.render();
			});
			FusionCharts.ready(function(){
				var teleopGear = new FusionCharts({
					type: 'line',
					renderAt: 'teleopGear',
					width: '500',
					height: '300',
					dataFormat: 'json',
					dataSource: {
						"chart": {
							"caption": "TeleopGears per Match",
							"xAxisName": "Match",
							"yAxisName": "No. of Gears",
							"lineThickness": "2",
							"paletteColors": "#0075c2",
							"baseFontColor": "#333333",
							"baseFont" : "Helvetica Neue, Arial",
							"captionFontSize": "14",
							"showBorder" : "0",
							"showShadow" : "0",
							"canvasBgColor" : "#ffffff",
							"canvasBorderAlpha": "0",
							"divlineAlpha" : "100",
							"divLineColor": "#999999",
							"divLineThickness": "1",
							"divLineIsDashed": "1",
							"divLineGepLen" : "1",
							"showXAxisLine" : "1",
							"XAxisLineThickness": "1",
							"xAxisLineColor" : "#999999",
							"showAlternateHGridColor": "0",
						},
						"data": teleopGearData,
					}
				});
				teleopGear.render();
			});
			FusionCharts.ready(function(){
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
							"lineThickness": "2",
							"paletteColors": "#0075c2",
							"baseFontColor": "#333333",
							"baseFont" : "Helvetica Neue, Arial",
							"captionFontSize": "14",
							"showBorder" : "0",
							"showShadow" : "0",
							"canvasBgColor" : "#ffffff",
							"canvasBorderAlpha": "0",
							"divlineAlpha" : "100",
							"divLineColor": "#999999",
							"divLineThickness": "1",
							"divLineIsDashed": "1",
							"divLineGepLen" : "1",
							"showXAxisLine" : "1",
							"XAxisLineThickness": "1",
							"xAxisLineColor" : "#999999",
							"showAlternateHGridColor": "0",
						},
						"data": teleopHighData,
					}
				});
				teleopHigh.render();
			});
		</script>
	</body>
</html>
