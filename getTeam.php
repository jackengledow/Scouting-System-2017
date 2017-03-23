<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv = "refresh" content = "0, URL = 'dataVisualization.html'"/>
		<title>Team Get</title>
	</head>
	<body>
		<h2>THis</h2>
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
				if(!empty($_POST[$key])){					
					return $_POST[$key];
				}
				return $defVal;
			}		
			$dataTeamNumber = getVal('dataTeamNumber', 0);
			echo "$dataTeamNumber\n";

			$query = "SELECT * FROM generic WHERE teamNumber='" . $dataTeamNumber . "';";
			$con->query($query);
			mysqli_close($con);
		?>
	</body>
</html>
