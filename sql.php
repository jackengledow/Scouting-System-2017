<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv = "refresh" content = "1.5; url = scouting.html">
		<title>SQL</title>
	</head>
	<body>
		<center><h2 style= "font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">Successfully Submitted</h2></center>
		<?php
			$host = "localhost";
			$user = "pi";
			$pass = "team868!";
			$dbname = "techHounds";

			$con = new mysqli($host,$user,$pass,$dbname);

			$teamNumber = $_POST['teamNumber'];
			$matchNumber = $_POST['matchNumber'];
			$startFuel = $_POST['startFuel'];
			$startGears = $_POST['startGears'];
			$baseline = $_POST['baseline'];
			$scoreGear = $_POST['scoreGear'];
			$autonHigh = $_POST['autonHigh'];
			$speed = $_POST['speed'];
			$disabled = $_POST['disabled'];
			$collectsFuel = $_POST['collectsFuel'];
			$useHopper = $_POST['useHopper'];
			$collectsGear = $_POST['collectsGear'];
			$teleopGears = $_POST['teleopGears'];
			$climb = $_POST['climb'];
			$teleopHigh = $_POST['t eleopHigh'];
			$fouls = $_POST['fouls'];
			$technicals = $_POST['technicals'];
			$yellows = $_POST['yellows'];
			$reds = $_POST['reds'];
			$ejections = $_POST['ejections'];
			$notes = $_POST['notes'];

			if(startFuel=="on") {
				startFuel="TRUE";
			} else {
				startFuel="FALSE";
			}

			if(startGears=="on") {
				startGears="TRUE";
			} else {
				startGears="FALSE";
			}

			if(baseline=="on") {
				baseline="TRUE";
			} else {
				baseline="FALSE";
			}

			if(scoreGear=="on") {
				scoreGear="TRUE";
			} else {
				scoreGear="FALSE";
			}

			if(disabled=="on") {
				disabled="TRUE";
			} else {
				disabled="FALSE";
			}

			if(collectsFuel=="on") {
				collectsFuel="TRUE";
			} else {
				collectsFuel="FALSE";
			}

			if(useHopper=="on") {
				useHopper="TRUE";
			} else {
				useHopper="FALSE";
			}

			if(collectsGear=="on") {
				collectsGear="TRUE";
			} else {
				collectsGear="FALSE";
			}


			$query = "INSERT INTO generic(teamNumber,matchNumber,startFuel,startGears,baseline,scoreGear,autonHigh, 				autonGears,speed,disabled,collectsFuel,useHopper,collectsGear,teleopGears,teleopHigh,climb,fouls,technicals,yellows,reds,ejections,notes) VALUES($teamNumber,$matchNumber,$startFuel,$startGears,$baseline,$scoreGear,$autonHigh, 				$autonGears,$speed,$disabled,$collectsFuel,$useHopper,$collectsGear,$teleopGears,$teleopHigh,$climb,$fouls,$technicals,$yellows,$reds,$ejections,$notes);";

			$con->query($query);


			/*echo "$teamNumber\n";
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
