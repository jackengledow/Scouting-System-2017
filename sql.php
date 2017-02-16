<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv = "refresh" content = "1.5; url = scouting.html">
		<title>SQL</title>
	</head>
	<body>
		<center><h2>Successfully Submitted</h2></center>
		<?php
			$match = $_POST['match'];
			$teamNum = $_POST['teamNum'];
			$balls = $_POST['balls'];
			$gears = $_POST['gears'];
			$baseline = $_POST['baseline'];
			$autongears = $_POST['autongears'];
			$autonhigh = $_POST['autonhigh'];
			
			<h2>submitted</h2>

			echo "$match\n";
			echo "$teamNum\n";
			echo "$balls\n";
			echo "$gears\n";
			echo "$baseline\n";
			echo "$autongears\n";
			echo "$autonhigh\n";
		?>
	</body>
</html>
