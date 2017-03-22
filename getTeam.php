<!DOCTYPE html>
<html>
	<head>
		<title>Team Get</title>
	</head>
	<body>
		<h2>THis</h2>
		<?php 
			$speed = 2;
			$host = "localhost";
			$user = "root";
			$pass = "team868!";
			$dbname = "techHounds";
			$con = new mysqli($host,$user,$pass,$dbname);
			if($con->connect_errno) {
				echo "Connection failed: " . $con->connect_error;
			}
			function getVal($key, $defVal){
				echo "$key\n";
				if(isset($POST_[$key]) && !empty($POST_[$key])){
					echo $POST_[$key];					
					return $POST_[$key];
				}
				return $defVal;
			}
					
			$dataTeamNumber = getVal('dataTeamNumber', 0);
			echo "$dataTeamNumber\n";

			$query = "SELECT * FROM generic WHERE teamNumber='" . $dataTeamNumber . "';";
			$row = mysql_fetch_row($query);
			echo $row;
			$con->query($query);
			mysqli_close($con);
		?>
	</body>
</html>
