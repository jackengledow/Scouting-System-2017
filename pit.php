<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv = "refresh" content = "1.5; url = scouting.html">
		<title>SQL</title>
	</head>
	<body>
		<center><h2 style= "font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">Successfully Submitted</h2></center>
		<?php
			
			$server = "localhost";
			$user = "pi";
			$pass = "team868!";
			$db = "techHounds";
				
			$con = mysqli_connect($server,$user,$pass,$db);
			echo "$con";

			$teamNumber = $_POST['teamNumber'];
			$driveTrain = $_POST['driveTrain'];
			$focus = $_POST['focus'];
			$climb = $_POST['climb'];
			$fuelOrigin = $_POST['fuelOrigin'];
			$gear = $_POST['gear'];
			$fuel = $_POST['fuel'];
			$gearCycles = $_POST['gearCycles'];
			$fuelPerMatch = $_POST['fuelPerMatch'];

			$query = "INSERT INTO pit(teamNumber,driveTrain,focus,climb,fuelOrigin,gear,fuel,gearCycles,fuelPerMatch) VALUES($teamNumber,$driveTrain,$focus,$climb,$fuelOrigin,$fuel,$gearCycles,$fuelPerMatch);"

			$con->query($query);

			mysqli_close($con);

		?>
	</body>
</html>
