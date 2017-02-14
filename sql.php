<!DOCTYPE html>
<html>
	<head>
		<title>SQL</title>
	</head>
	<body>
		<?php
			$match = $_POST['match'];
			$teamNum = $_POST['teamNum'];
			$balls = $_POST['balls'];
			$gears = $_POST['gears'];
			$baseline = $_POST['baseline'];
			$autongears = $_POST['autongears'];
			$autonhigh = $_POST['autonhigh'];

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
