<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv = "refresh" content = "1.5; url = scouting.html">
		<title>SQL</title>
	</head>
	<body>
		<center><h2 style= "font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">Successfully Submitted</h2></center>
		<?php 
			function getValue($key, $defVal){
				if(isset($_POST[$key]) && !empty($_POST[$key])){
					return $_POST[$key];
				}
				return $defVal;
			} 
			function getString($key, $defVal){
				return "'" . getValue($key, $defVal) . "'";
			}
			$host = "localhost";
			$user = "root";
			$pass = "team868!";
			$dbname = "techHounds";

			$con = new mysqli($host,$user,$pass,$dbname);
			if($con->connect_errno) {
				echo "Connection failed: " . $con->connect_error;
			}

			$teamNumber = getValue('teamNumber', 0);
			$matchNumber = getValue('matchNumber', 0);
			$startFuel = getValue('startFuel', "FALSE");
			$startGears = getValue('startGears', "FALSE");
			$baseline = getValue('baseline', "FALSE");
			$scoreGear = getValue('scoreGear', "FALSE");
			$autonHigh = getValue('autonHigh', 0);
			$speed = getValue('speed', "0");
			$disabled = getValue('disabled', "FALSE");
			$collectsFuel = getValue('collectsFuel', "FALSE");
			$useHopper = getValue('useHopper', "FALSE");
			$collectsGear = getValue('collectsGear', "FALSE");
			$teleopGears = getValue('teleopGears', 0);
			$climb = getValue('climb', '0');
			$teleopHigh = getValue('teleopHigh', 0);
			$fouls = getValue('fouls', "0");
			$technicals = getValue('technicals', 0);
			$yellows = getValue('yellows', "FALSE");
			$reds = getValue('reds', "TRUE");
			$ejections = getValue('ejections', "FALSE");
			$notes = getString('notes', '');

			if($startFuel=="on") {
				$startFuel="TRUE";
			} else {
				$startFuel="FALSE";
			}

			if($startGears=="on") {
				$startGears="TRUE";
			} else {
				$startGears="FALSE";
			}

			if($baseline=="on") {
				$baseline="TRUE";
			} else {
				$baseline="FALSE";
			}

			if($scoreGear=="on") {
				$scoreGear="TRUE";
			} else {
				$scoreGear="FALSE";
			}

			if($disabled=="on") {
				$disabled="TRUE";
			} else {
				$disabled="FALSE";
			}

			if($collectsFuel=="on") {
				$collectsFuel="TRUE";
			} else {
				$collectsFuel="FALSE";
			}

			if($useHopper=="on") {
				$useHopper="TRUE";
			} else {
				$useHopper="FALSE";
			}

			if($collectsGear=="on") {
				$collectsGear="TRUE";
			} else {
				$collectsGear="FALSE";
			}
			if($yellows == "on"){
				$yellows = "TRUE";
			} else {
				$yellows = "FALSE";
			}
			if($reds == "on"){
				$reds = "TRUE";
			} else {
				$reds = "FALSE";
			}
			if($ejections == "on"){
				$ejections = "TRUE";
			} else {
				$ejections = "FALSE";
			}

			$query = "INSERT INTO generic(teamNumber,matchNumber,startFuel,startGears,baseline,scoreGear,autonHigh,speed,disabled,collectsFuel,useHopper,collectsGear,teleopGears,teleopHigh,climb,fouls,technicals,yellows,reds,ejections,notes) VALUES($teamNumber,$matchNumber,$startFuel,$startGears,$baseline,$scoreGear,$autonHigh,$speed,$disabled,$collectsFuel,$useHopper,$collectsGear,$teleopGears,$teleopHigh,$climb,$fouls,$technicals,$yellows,$reds,$ejections,$notes);";
			$con->query($query);
			/*
			echo "$teamNumber\n";
			echo "$matchNumber\n";
			echo "$startFuel\n";
			echo "$startGears\n";
			echo "$baseline\n";
			echo "$scoreGear\n";
			echo "$autonHigh\n";
			echo "$speed\n";
			echo "$disabled\n";
			echo "$collectsFuel\n";
			echo "$useHopper\n";
			echo "$collectsGear\n";
			echo "$teleopGears\n";
			echo "$climb\n";
			echo "$teleopHigh\n";
			echo "$fouls\n";
			echo "$technicals\n";
			echo "$yellows\n";
			echo "$reds\n";
			echo "$ejections\n";
			echo "$notes\n";*/

			mysqli_close($con);
		?>
	</body>
</html>
