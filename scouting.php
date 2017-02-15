<!DOCTYPE html>
<!--Scouting System Html-->
<!--this comment is unnesesary, obviously its the scouting system
<html lang="en">
	<head>
		<link rel = "stylesheet" href = "tab_stuff.css">
		<script src = "jquery-3.1.1.min.js"></script>
		<meta charset="utf-8">
		<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
		<script src="scouting.js"></script>
		<style>
			.make{
				margin-left: 15px;
			}
			.leftcorner{
				border-radius:0px 0px 0px 5px;
			}
			.rightcorner{
				border-radius:0px 0px 5px 0px;
			}
			.green{
				background-color: #9eff9b;
				border:2px solid green;
			}
			.lightgreen{
				background-color: #b5f2b3;
				border:2px solid green;
			}
			.darkgreen{
				background-color: #40963d;
				border:2px solid green;
			}
			.grey{
				background-color: #C0C0C0;
				border: 2px solid black;
			}
			.medgreen{
				background-color: #89e088;
				border:2px solid green;
			}
			.red{
				background-color: #ff9b9b;
				border:2px solid red;
			}
			.lightred{
				background-color: #fcbdbd;
				border: 2px solid red;
			}
			.darkred{
				background-color: #e04545;
				border: 2px solid red;
			}
			.yellowGreen {
				background-color: #bfff80 !important;
				border: 2px solid #80ff00 !important;
			}
			.orange{
				background-color: #FFAD7F !important;
				border:2px solid #ff6600 !important;
			}
			.miss{
				margin-left: 15px;
			}
			.middle{
				border:2px solid #d8d802;background-color: #ffff99;
				margin-left: 15px;
			}
			.width{
				width: 100%;
			}
			.button{
				 position: absolute; right: 0px;
				 text-align: center;
				 paddin 	g-left: 0% !important;
			}
			.hi {
				border-radius: 5px 0px 0px 5px;
			}
			.goodbye {
				border-radius: 0px 5px 5px 0px;
			}
			.newSize {
				font-size:
			}
			.checkboxDescription {
				margin-left: 11px;
			}
		</style>
	</head>
	<body style = "filter: grayscale(0%);">
	<form action="sql.php" method="post">
	<div class = "everything">
	   <div class ="teamInfo">
	      <label style = "font-size:20px; margin-top: 8px; padding-right: 20px; margin-left: -85px;">Match Number:</label><br>
          <input type = "text" id="teamNumber" style="margin-top: 9px;height: 31px;margin-right: 15px" name="match"/>
          <label style = "font-size:20px; margin-top: 8px; padding-right: 10px">Team Number:</label><br>
            <input type = "text" id="teamNumber" style="margin-top: 9px;height: 31px;" name="teamNum"/>
            <p  style = "display: flex">
            <label style = "font-size:20px; margin-top: 8px; padding-left: 20px">Team Color:</label><br>
            <button type="button" id ="redButton" style = "margin-right: 5px; margin-left: 10px; padding-left: 15px">Red</button>
            <button type="button" id ="blueButton" style = "padding-left: 15px">Blue</button>
            </p>
         </div>
		<div class="tabs">
			<ul class="tab-links">
				<li class="active"><a href="#tab1">Autonomous</a></li>
				<li><a href="#tab2">Teleop</a></li>
				<li><a href="#tab3">Penalties</a></li>
				<li><a href="#tab4">Final</a></li>
			</ul>
				 
			<div class="tab-content">
				<div id="tab1" class="tab active">
					<div class="container" style="margin-top:15px;">
						<div class="container top">
							<div class="row">
								<div class = "col-md-4">
									<p style = "padding-left: 15px; font-size: 25px;"><strong style = "text-decoration: underline">Preliminary Buttons:</strong></p>
									<div class="row">
										<div class="col-md-12" style = "padding-top: 0px; padding-left: 70px;">
												<input style="width: 15px; height: 15px;" type="checkbox" name="balls"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Start with Balls</div><br><br>
												<input style="width: 15px; height: 15px;" type="checkbox" name="gears"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Start with Gear</div>
										</div>
									</div>
								</div>
								<div class = "col-md-4">
									<br>
									<center>
										<p>
											<p align = "center" style="font-size:18px;">Instructions</p>
											<ol align = "left" style = "font-size: 17px;">
												<li>Click button when action is completed</li>
												<li>Count high balls made in High Score</li>
												<li>Select capacity and % made in Low Score</li>
											</ol>
										</p>
									</center>
								</div>
								<div class = "col-md-4" style = "padding-bottom: 20px">
									<p align = "right" style = "padding-right: 15px; font-size: 25px;"><strong style = "text-decoration: underline; padding-bottom: 5px;">Autonomous Buttons:</strong></p>
									<div class="row">
										<div class="col-md-12" style = "padding-top: 0px; padding-left: 165px;">
												<input style="width: 15px; height: 15px;" type="checkbox" name="baseline"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Cross Baseline</div><br><br>
												<input style="width: 15px; height: 15px;" type="checkbox" name="autongear"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Score the Gear</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

  					<div class="container">
						<br><br>
							<!-- <p><center><strong style = "font-size: 35px; text-decoration: underline">Fuel</strong></center></p> -->
							
  						<!--<div class="row">
  							<div class="col-md-4">
								<canvas id="tools_sketch" width="320px" onclick = "clear" height="350px" style="background: url(RedTeam.png); background-size: contain;" onmouseleave = "clearArray()"></canvas>				 
								<div class="tools">
									<a href="#tools_sketch" style = "color:black" data-tool="marker"><button class = "opacity marker" style = "height: 25px; background-color: #ccc; border-radius: 5px; border-color: #000; font-weight: bold; height: 32px;">Marker</button></a>
									<a href="#tools_sketch" style = "color:black; margin-left: 195px;" data-tool="eraser"><button id = "something" class = "opacity eraser" style = "opacity: 0.3; height: 25px; background-color: #ccc; border-radius: 5px; border-color: #000; font-weight: bold; height: 32px;" onclick = "undoLastPoint()">Eraser</button></a>
								</div>
								<script type="text/javascript">
								  $(function() {
									$('#tools_sketch').sketch({defaultColor: "#ff0"});
								  });
								</script>
  							</div>
							
							<div class="col-md-3">
							<p>
								<p align = "center" styler="font-size:18px">Instructions</p>
								<ol align = "left" style = "font-size: 15px;">
									<li> Use the map to trace the robot's path during the Auton period </li>
								</ol>
							</p>
							</div>
  							
							<div class="col-md-5">
  								<div class="row">
  									<div class="col-md-12 topStyle" style="background-color:#d3d3d3; margin-bottom: -10px;">
  										<h2><center>Made High Goals: <p style = "display: inline-block;" id= "highScoreAuton" name="AutonHigh"s>0</p></center></h2>
  									</div>
  								</div>
  								<div class = "row" style = "margin-top: 10px">
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot darkgreen width button" onclick = "countHighMakeAuton(10)">
  											<p style = "font-size: 25px; padding-top: 5px;">+10</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot medgreen width button" onclick = "countHighMakeAuton(5)">
  											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot lightgreen width button" onclick = "countHighMakeAuton(1)">
  											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
  										</button>
  									</div>
  								</div>
  								<div class = "row" style = "padding-top: 49px">
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot darkred width button leftcorner" onclick = "countHighMakeAuton(-10)">
  											<p style = "font-size: 25px; padding-top: 5px;">-10</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot red width button" onclick = "countHighMakeAuton(-5)">
  											<p style = "font-size: 25px; padding-top: 5px;">-5</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button type = "button" class = "make makeshot lightred width button rightcorner" onclick = "countHighMakeAuton(-1)">
  											<p style = "font-size: 25px; padding-top: 5px;">-1</p>
  										</button>
  									</div>
  								</div>
  								<div class="row" style = "margin-top: 75px">
  									<div class="col-md-12 topStyle" style="background-color:#d3d3d3;padding-left: 0px;">
  										<h2 style = "font-size: 25px;"><center>Low Goal - Balls collected before dump</center></h2>
  									</div>
  								</div>
  								<div class="row">
  									<div class="col-md-4">
  										<button type = "button" class="make leftcorner red width button opacity dropDown1" id = "Small" onclick = "lowDumpAuton('Small')">
  											<p style = "font-size: 25px; padding-top: 5px;">Small 1-19</p>
  										</button>
  									</div>
  									<div class="col-md-4">
  										<button type = "button" class="width button middle opacity dropDown1" id = "Medium" onclick = "lowDumpAuton('Medium')">
  											<p style = "font-size: 25px; padding-top: 5px;">Med 20-39</p>
  										</button>
  									</div>
  									<div class="col-md-4">
  										<button type = "button" class="miss rightcorner green width button opacity dropDown1" id = "Big" onclick = "lowDumpAuton('Big')">
  											<p style = "font-size: 25px; padding-top: 5px;">Large 40+</p>
  										</button>
  									</div>
  								</div>
  								<div class="row percent1" style = "display: none; height: 10px; margin-top: 60px;">
									<center>
										<p style = "font-size: 20px;">What percent of collected balls were made?</p>
									</center>
  									<div class="col-lg-3">
  										<button type = "button" class="make leftcorner red width button opacity hi clickDrop1" onclick = "dumpPercentAuton(0)">
  											<p style = "font-size: 25px; padding-top: 5px;">0%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  
  										<button type = "button" class="width button middle orange clickDrop opacity1" onclick = "dumpPercentAuton(25)">
											<p style = "font-size: 25px; padding-top: 5px;">25%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  										<button type = "button" class="miss middle green width button opacity clickDrop1" onclick = "dumpPercentAuton(50)">
  											<p style = "font-size: 25px; padding-top: 5px;">50%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  
  										<button type = "button" class="miss yellowGreen middle width button opacity clickDrop1" onclick = "dumpPercentAuton(75)">
											<p style = "font-size: 25px; padding-top: 5px;">75%</p>
  										</button>
  									</div>
  									<div class="col-lg-3">
  										<button type = "button" class="miss rightcorner green width button opacity goodbye clickDrop1" onclick = "dumpPercentAuton(100)">
  											<p style = "font-size: 25px; padding-top: 5px;">100%</p>
  										</button>
  									</div>
  								</div>
  							</div>
						</div> 						
  					</div>
				</div>

				<div id="tab2" class="tab">
					<div style="color: none;" class="container">
						<div style="color: none;" class="row">
					<p title="Scouting system">
						<div style = "margin-top: -5px; padding-left: 0px;">
								<input type="checkbox" name="vehicle"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Did not perform / Disabled</div>
								<input type = "checkbox" style = "margin-left: 50px;"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Can collect balls from ground</div>								
								<input type = "checkbox" style = "margin-left: 50px;"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Can use a hopper</div>
								<input type = "checkbox" style = "margin-left: 50px;"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Can collect gear from ground</div><br><br>
						</div>
						<div class="col-md-2">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#c1c1c1;padding-left: 0px;">
										<h2><center>Speed</center></h2>
									</div>
								</div>
								<div class="row">
								<!--button-
									<div class="col-md-4">
										<button type = "button" class="make leftcorner red width button opacity" id = "1">
											<center><p style = "font-size: 25px; padding-top: 5px;">1</p></center>
										</button>
									</div>
									<div class="col-md-4">
										<button type = "button" class="width button middle opacity" id = "2">
											<center><p style = "font-size: 25px; padding-top: 5px;">2</p></center>
										</button>
									</div>
									<div class="col-md-4">
										<button type = "button" class="miss rightcorner green width button opacity" id = "3">
											<center><p style = "font-size: 25px; padding-top: 5px;">3</p></center>
										</button>
									</div>
								</div>
							</div>
						<!-- <button class = "leftButton"><img class = "buttons" id = "speed" src = "http://www.rcn.com/assets/images/hub/help/how-to-get-the-most-out-of-your-speed.jpg"></button>
							<div class="col-md-3 rightButton leftButton">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#c1c1c1; margin-bottom: -10px; height: 63px;">
										<h2><center>Gears Scored: <p style = "display: inline-block;" id= "gearsTeleop">0</p></center></h2>
									</div>
								</div>
								<div class="row">
								<!--button
									<div class="col-md-6" style="margin-top: 10px;">
										<button type = "button" class="make leftcorner green makeshot width button" onclick="addGears(1)">
											<center>
												<!--<img style = "height: 30px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">
												<p style = "font-size: 30px; padding-top: 5px;">+</p>
											</center>
										</button>
									</div>
									<div class="col-md-6" style="margin-top: 10px;">
										<button type = "button" class="miss rightcorner missshot red width button" margin-left: 3px; onclick="addGears(-1)">
											<center>
												<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">
												<p style = "font-size: 30px; padding-top: 1px;">-</p>
											</center>
										</button>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#c1c1c1;padding-left: 0px;">
										<h2><center>Climbing</center></h2>
									</div>
								</div>
								<div class="row">
								<!--button
									<div class="col-md-4">
										<button type = "button" class="make leftcorner green width button opacity" id = "success">
											<p style = "font-size: 25px; padding-top: 5px;">Success</p>
										</button>
									</div>
									<div class="col-md-4">
										<button type = "button" class="width button middle opacity" id = "fail">
											<p style = "font-size: 25px; padding-top: 5px;">Fail</p>
										</button>
									</div>
									<div class="col-md-4">
										<button type = "button" class="miss rightcorner red width button opacity" id = "noattempt">
											<p style = "font-size: 25px; padding-top: 5px;">No attempt</p>
										</button>
									</div>
								</div>
								
							</div>
						</p>
						</div>
					</div>

					<div class="col-md-6" style = "margin-top: 80px;">
						<center>
						<p style = "font-size: 17px;"><strong>Instructions:</strong> Click the location of an attempted High-Goal shot</p>
						<p style = "display:none" id = "jalensTag"></p>
						<img class = "redPic clickGrid" id = "fieldpic" onclick="showCoords(event, this)" style = "height: 400px; position: relative;" src = "RedTeam.png"><div id = "fieldPicDiv"></div>
						<img class = "bluePic clickGrid" id = "fieldpic2" onclick="showCoords(event, this)" style = "height: 400px; display: none;" src = "BlueTeam.png"><div id = "fieldPicDiv2"></div>
						<p id="demo"></p>
						</center>
						<button type = "button" id = "Rotate" class = "opacity" style = "margin-left: 115px; height: 25px; background-color: #ccc; border-radius: 5px; border-color: #000; font-weight: bold; height: 32px;"><p style = "font-size: 20px;">Rotate Field</p></button>
						<button type = "button" id = "undo" class = "opacity" style = "margin-left: 165px; height: 25px; background-color: #ccc; border-radius: 5px; border-color: #000; font-weight: bold; height: 32px;"><p style = "font-size: 20px;">Undo</p></button>
						
					</div>
					<div class="col-md-6" style = "margin-top: 80px; padding-left: 0px; padding-right: 75px;">
						<div class="row">
							<div class="col-md-12 topStyle" style="background-color:#d3d3d3;">
								<h2><center>Low Goal - Balls collected before dump</center></h2>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<button type = "button" class="make leftcorner red width button opacity dropDown" id = "Small" onclick = "lowDumpTeleop('Small')">
									<p style = "font-size: 25px; padding-top: 5px;">Small 1-19</p>
								</button>
							</div>
							<div class="col-md-4">
								<button type = "button" class="width button middle opacity dropDown" id = "Medium" onclick = "lowDumpTeleop('Medium')">
									<p style = "font-size: 25px; padding-top: 5px;">Med 20-39</p>
								</button>
							</div>
							<div class="col-md-4">
								<button type = "button" class="miss rightcorner green width button opacity dropDown" id = "Big" onclick = "lowDumpTeleop('Big')">
									<p style = "font-size: 25px; padding-top: 5px;">Large 40+</p>
								</button>
							</div>
						</div>
						<div class="row percent" style = "display: none; height: 10px; margin-top: 60px;">
							<center>
								<p style = "font-size: 20px;">What percent of collected balls were made?</p>
							</center>
							<div class="col-lg-3">
								<button type = "button" class="make leftcorner red width button opacity hi clickDrop" onclick = "dumpPercentTeleop(0)">
									<p style = "font-size: 25px; padding-top: 5px;">0%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button type = "button" class="width button middle orange clickDrop opacity" onclick = "dumpPercentTeleop(25)">
									<p style = "font-size: 25px; padding-top: 5px;">25%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button type = "button" class="miss middle green width button opacity clickDrop" onclick = "dumpPercentTeleop(50)">
									<p style = "font-size: 25px; padding-top: 5px;">50%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button type = "button" class="miss yellowGreen middle width button opacity clickDrop" onclick = "dumpPercentTeleop(75)">
									<p style = "font-size: 25px; padding-top: 5px;">75%</p>
								</button>
							</div>
							<div class="col-lg-3">
								<button type = "button" class="miss rightcorner green width button opacity goodbye clickDrop" onclick = "dumpPercentTeleop(100)">
									<p style = "font-size: 25px; padding-top: 5px;">100%</p>
								</button>
							</div>
						</div>
					</div>
					<div class = "col-md-6" style = "padding-left: 0px; margin-top: 80px;">
						<div class="row" id = "popup" style = "display: none; height: 10px;">
							<div class="col-md-5" style = "margin-left: 0px; margin-right: 40px;">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#d3d3d3; margin-bottom: 0px;">
										<h2 style = "font-size: 24px"><center>Made High Goals: <p style = "display: inline-block;" id= "highScoreTeleop">0</p></center></h2>
									</div>
								</div>
								<div class = "row">
									<div class = "col-md-4">
										<button type = "button" id = "20" class = "deleter make makeshot darkgreen leftcorner width button shotChart madeShot" onclick = "countHighMakeTeleop(10), clickZone('Make', 10)">
											<p style = "font-size: 25px; padding-top: 5px;">+10</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button type = "button" id = "15" class = "deleter make makeshot medgreen width button shotChart madeShot" onclick = "countHighMakeTeleop(5), clickZone('Make', 5)">
											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button type = "button" id = "10" class = "deleter make makeshot rightcorner lightgreen width button shotChart madeShot" onclick = "countHighMakeTeleop(1), clickZone('Make', 1)">
											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
										</button>
									</div>
								</div>
							</div>
							<div class="col-md-5" style = "margin-left: 10px;">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#d3d3d3; margin-bottom: 0px;">
										<h2 style = "font-size: 24px"><center>Miss High Goals: <p style = "display: inline-block;" id= "highMissTeleop">0</p></center></h2>
									</div>	
								</div>
								<div class = "row">
									<div class = "col-md-4">
										<button type = "button" id = "20" class = "deleter make makeshot darkred width leftcorner button shotChart miss" onclick = "countHighMissTeleop(10), clickZone('Miss', 10)">
											<p style = "font-size: 25px; padding-top: 5px;">+10</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button type = "button" id = "15" class = "deleter make makeshot red width button shotChart miss" onclick = "countHighMissTeleop(5), clickZone('Miss', 5)">
											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button type = "button" id = "10" class = "deleter make makeshot width lightred button rightcorner shotChart miss" onclick = "countHighMissTeleop(1), clickZone('Miss', 1)">
											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
										</button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div id="tab3" class="tab">
				
				<p style = "padding-left: 50px; font-size: 25px; text-decoration: underline;"><strong>Penalty Buttons:</strong></p>
				 <div class="container">
					<div class="row">
						<br><br>
					<div class="col-md-2">
					</div>
					<center><div>
						<div style="margin-right:15px;" class="col-md-4">
							<div class="row">
								<div class="col-md-12 topStyle" style="background-color:#c1c1c1; margin-bottom: -10px;">
									<h2><center>Foul(s): <p style = "display: inline-block;" id = "addFoul">0</p></center></h2>
								</div>
							</div>
							<div class="row">
							<!--button
								<div class="col-md-6" style="margin-top:10px">
									<button type = "button" class="make leftcorner green makeshot width button"  onclick="countFouls(1)">
										<center>
											<!--<img style = "height: 40px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">
										<p style="font-size: 30px; padding-top: 5px;">+</p>
										</center>
									</button>
								</div>
								<div class="col-md-6" style="margin-top:10px">
								<button type = "button" class="miss rightcorner missshot red width button" style = "margin-left: 3px;" onclick="countFouls(-1)">
										<center>
											<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">
											<p style="font-size: 30px; padding-top: 1px;">-</p>
										</center>
									</button>
								</div>
							</div>
						</div>
						<div style="margin-left:15px;" class="col-md-4">
							<div  class="row">
								<div class="col-md-12 topStyle" style="background-color:#c1c1c1; margin-bottom: -10px;">
									<h2><center>Technical(s): <p style = "display: inline-block;" id= "addTechnical">0</p></center></h2>
								</div>
							</div>
							<div class="row">
							<!--button
								<div class="col-md-6" style="margin-top:10px">
									<button type = "button" class="make leftcorner green makeshot width button" onclick="countTechnicals(1)">
										<center>
											<!--<img style = "height: 40px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">
										<p style="font-size: 30px; padding-top: 5px;">+</p>
										</center>
									</button>
								</div>
								<div class="col-md-6" style="margin-top:10px">
								<button class="miss rightcorner missshot red width button" margin-left: 3px; onclick="countTechnicals(-1)">
										<center>
											<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">
											<p style="font-size: 30px; padding-top: 1px;">-</p>
										</center>
									</button>
								</div>
							</div>
						</div>
					</div></center>
					<div style="padding-left: none;" class="col-md-2 sizeFix">
					</div>
					</div>
						<br><br><br><br>
					<div style="margin-top: 50px;" class="row top" id="marginTop">
							<div class="col-md-4">
								<h2><strong><center>Yellow Card:</center></strong></h2><center>
								  <td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox"><p style="font-size: 20px;"></p></label></td>
								</center>
							</div>
							<div class="col-md-4">
								<h2><strong><center>Red Card:</center></strong></h2><center>
								<td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox"><p style="font-size: 20px;"></p></label></td>
								</center>
							</div>
							<div class="col-md-4"><center>
								<h2><strong><center>Ejection:</center></strong></h2>
								<td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox"><p style="font-size: 20px;"></p></label></td>
							</center>
						</div>
					</div>
				</div>
			</div>
				
			<div id="tab4" class="tab">
				<div class="container">
					<h2><b>Match Notes:</b></h2>
					<textarea id="textarea" contenteditable="true" style="border-radius: 4px; width: 1100px; height: 150px; padding: 10px;"></textarea>
				</div>
				<center>
				<button style="margin-top: 80px; margin-right: 440px; border-radius: 4px; width: 400px; height: 80px; font-size: 40px" id = "submit" class="make makeshot width grey button rightcorner shotChart" value="Submit" type="submit">
					<p style="font-size: 35px; padding-top: 5px;" >Submit</p>
				</button>
				<!--<br>
				<div>
					<select name="competitionDropdown">
						<option value="comp1">Competition 1</option>
						<option value="comp2">Competition 2</option>
					</select>
				</div>
				</center>
			</div>
		</div>
		<script>
			function showCoords(event, elem) {
				var box = elem.getBoundingClientRect();
				var boxY = box.top;
				var boxX = box.left;
				var x = event.clientX;
				var y = event.clientY;
				setGridClickPos(x,y);
				var newX = x - boxX;
				var newY = y - boxY;
				var newerX = Math.floor(newX);
				var newerY = Math.floor(newY);
				document.getElementById("demo").innerHTML = "X coords: " + newerX + ",Y coords: " + newerY;
			}
		</script>
	</div>
	</form>
  	</body>
</html>

<script>
	$(document).ready(function() {
		opacity = 1;
		rotate = 0;
		var i  = 1;
		var count = 1;
		var top = 0;
		var left = 0;
		$('.clickable').on("click", function(){
				if(opacity==1){
					$(this).css("opacity", 0.25);
					opacity = 0.25;
				}
				else{
					$(this).css("opacity", 1);
					opacity = 1;
				}
		});
		
	$("#Small").on("click", function(){
			$("#Small").css("opacity", 1);
			$("#Medium").css("opacity", 0.3);
			$("#Big").css("opacity", 0.3);
	});
	$("#Medium").on("click", function(){
			$("#Small").css("opacity", 0.3);
			$("#Medium").css("opacity", 1);
			$("#Big").css("opacity", 0.3);
	});
	$("#Big").on("click", function(){
			$("#Small").css("opacity", 0.3);
			$("#Medium").css("opacity", 0.3);
			$("#Big").css("opacity", 1);
	});
	$('#success').on("click", function(){
			$('#success').css("opacity", 1);
			$('#fail').css("opacity", 0.3);
			$('#noattempt').css("opacity", 0.3);
	});
		
	$('#fail').on("click", function(){
			$('#success').css("opacity", 0.3);
			$('#fail').css("opacity", 1);
			$('#noattempt').css("opacity", 0.3);
	});
		
	$('#noattempt').on("click", function(){
			$('#success').css("opacity", 0.3);
			$('#fail').css("opacity", 0.3);
			$('#noattempt').css("opacity", 1);
	});
		
	$('#1').on("click", function(){
			$('#1').css("opacity", 1);
			$('#2').css("opacity", 0.3);
			$('#3').css("opacity", 0.3);
	});
		
	$('#2').on("click", function(){
			$('#1').css("opacity", 0.3);
			$('#2').css("opacity", 1);
			$('#3').css("opacity", 0.3);
	});
		
	$('#3').on("click", function(){
			$('#1').css("opacity", 0.3);
			$('#2').css("opacity", 0.3);
			$('#3').css("opacity", 1);
	});
	$('.marker').on("click", function(){
			$('.marker').css("opacity", 1);
			$('.eraser').css("opacity", 0.3);
	});
	$('.eraser').on("click", function(){
			$('.eraser').css("opacity", 1);
			$('.marker').css("opacity", 0.3);
		});
	$(".dropDown").on("click", function(){
		$(".percent").css("display", "block");
	});
	$(".clickDrop").on("click", function(){
		$(".percent").css("display", "none");
	});
	$(".dropDown1").on("click", function(){
		$(".percent1").css("display", "block");
	});
	$(".clickDrop1").on("click", function(){
		$(".percent1").css("display", "none");
	});
	$(".clickGrid").on("click", function(){
		$("#popup").css("display", "block");
	});
	
	$("#fieldPicDiv").on("click", function(){
		$("#popup").css("display", "block");
	});
	
	$(".shotChart").on("click", function(){
		$("#popup").css("display", "none");
	});
	
	$("#blueButton").on("click", function(){
		$(".redPic").css("display", "none");
		$(".bluePic").css("display", "block");
		$("#fieldPicDiv2").css("display", "block");
		$("#fieldPicDiv").css("display", "none");
	});
	
	$("#redButton").on("click", function(){
		$(".redPic").css("display", "block");
		$(".bluePic").css("display", "none");
		$("#fieldPicDiv").css("display", "block");
		$("#fieldPicDiv2").css("display", "none");
	});	
	$("#Rotate").on("click", function(){
		if (rotate == 0){
			$(".redPic").css("transform", "rotate(180deg)");
			$(".bluePic").css("transform", "rotate(180deg)");
			rotate = 180;
		}
		else{
			$(".redPic").css("transform", "rotate(0deg)");
			$(".bluePic").css("transform", "rotate(0deg)");
			rotate = 0;
		}
		
	});
	
	$('#fieldPicDiv').on("click", function(ev){
		console.log("yeah");
		if(count<=1){
			top = ev.pageY-282
			left = ev.pageX-20.5
		$("#fieldPicDiv").append(
			$('<div id = "shot'+i+'" class = "circleThing"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.4
			}) 
		);
		i++;
		count++;
		}
		else{
			console.log("deleting");
			i--;
			top = ev.pageY-282
			left = ev.pageY-20.5
			$('#shot' + i).remove();
			$("#fieldPicDiv").append(
			$('<div id = "shot'+i+'"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.4
			}) 
			);
			i++;
		}
    });
	
	$('#fieldPicDiv2').on("click", function(ev){
		console.log("yeah");
		if(count<=1){
			top = ev.pageY-282
			left = ev.pageX-20.5
		$("#fieldPicDiv2").append(
			$('<div id = "shot'+i+'" class = "circleThing"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.4
			}) 
		);
		i++;
		count++;
		}
		else{
			console.log("deleting");
			i--;
			top = ev.pageY-282
			left = ev.pageY-20.5
			$('#shot' + i).remove();
			$("#fieldPicDiv2").append(
			$('<div id = "shot'+i+'"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.4
			}) 
			);
			i++;
		}
    });
	
	
	$('#fieldpic').on("click", function(ev){
		if(count<=1){
			top = ev.pageY-282
			left = ev.pageX-20.5
		$("#fieldPicDiv").append(
			$('<div id = "shot'+i+'" class = "circleThing"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.5
			}) 
		);
		i++;
		count++;
		}
		else{
			console.log("deleting");
			i--;
			top = ev.pageY-282
			left = ev.pageX-20.5
			$('#shot' + i).remove();
			$("#fieldPicDiv").append(
			$('<div id = "shot'+i+'"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.5
			}) 
			);
			i++;
		}
    });
	
	$('#fieldpic2').on("click", function(ev){
		if(count<=1){
			top = ev.pageY-282
			left = ev.pageX-20.5
		$("#fieldPicDiv2").append(
			$('<div id = "shot'+i+'" class = "circleThing"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.5
			}) 
		);
		i++;
		count++;
		}
		else{
			console.log("deleting");
			i--;
			top = ev.pageY-282
			left = ev.pageX-20.5
			$('#shot' + i).remove();
			$("#fieldPicDiv2").append(
			$('<div id = "shot'+i+'"></div>').css({
				position: 'absolute',
				top: ev.pageY-282 + 'px',
				left: ev.pageX-20.5 + 'px',
				width: '10px',
				height: '10px',
				background: '#FFF',
				'border-radius': '100%',
				opacity: 0.5
			}) 
			);
			i++;
		}
    });
	
	$('.deleter').on("click", function(){
		count = 1;
	});
	
	
	$('#undo').on("click", function(){
		i--;
		count = 1;
		$('#shot' + i).remove();
	});
	
	$('.madeShot').on("click", function(){
		size = $(this).attr('id');
		i--;
		$('#shot' + i).css("background", "#0F0");
		$('#shot' + i).css("height", size);
		$('#shot' + i).css("width", size);
		$('#shot' + i).css("top", top-(size/2-5) + 'px');
		$('#shot' + i).css("left", left-(size/2-5) + 'px');
		i++;
	});
	$('.miss').on("click", function(){
		size = $(this).attr('id');
		i--;
		$('#shot' +i).css("background", "red");
		$('#shot' + i).css("height", size);
		$('#shot' + i).css("width", size);
		$('#shot' + i).css("top", top-(size/2-5) + 'px');
		$('#shot' + i).css("left", left-(size/2-5) + 'px');
		i++;
	});
		
	/*
	$('#speed').on("click", function(){
		var speed = prompt("What is the speed from 1-3? 3 is fastest.")
		if (speed ==1){
			jQuery('#speed').attr('src','http://www.clker.com/cliparts/X/f/4/c/w/i/one-in-circle-md.png');
		}
		else if (speed ==2){
			jQuery('#speed').attr('src','http://www.clker.com/cliparts/V/X/q/v/W/X/2-inside-a-circle-md.png');
		}
		else if (speed ==3){
			jQuery('#speed').attr('src','http://www.clker.com/cliparts/9/3/h/S/g/Y/number-3-in-circle-hi.png');
		}
		else{
			jQuery('#speed').attr('src','http://www.rcn.com/assets/images/hub/help/how-to-get-the-most-out-of-your-speed.jpg');
		}
	});
	*/
	
	
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');

        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
		
    });
});
</script>
  <script>
  	
  	jQuery(document).ready(function() {
  	opacity = 1;
  	$('.clickable').on("click", function(){
  			if(opacity==1){
  				$(this).css("opacity", 0.25);
  				opacity = 0.25;
  			}
  			else{
  				$(this).css("opacity", 1);
  				opacity = 1;
  			}
  		});
  		
  		
  	$('#success').on("click", function(){
  			$('#success').css("opacity", 1);
  			$('#fail').css("opacity", 0.3);
  			$('#noattempt').css("opacity", 0.3);
  		});
  		
  	$('#fail').on("click", function(){
  			$('#success').css("opacity", 0.3);
  			$('#fail').css("opacity", 1);
  			$('#noattempt').css("opacity", 0.3);
  		});
  		
  	$('#noattempt').on("click", function(){
  			$('#success').css("opacity", 0.3);
  			$('#fail').css("opacity", 0.3);
  			$('#noattempt').css("opacity", 1);
  		});
  		
  	$('#1').on("click", function(){
  			$('#1').css("opacity", 1);
  			$('#2').css("opacity", 0.3);
  			$('#3').css("opacity", 0.3);
  		});
  		
  	$('#2').on("click", function(){
  			$('#1').css("opacity", 0.3);
  			$('#2').css("opacity", 1);
  			$('#3').css("opacity", 0.3);
  		});
		
	$('#redButton').on("click", function(){
  			$('#redButton').css("opacity", 1);
  			$('#blueButton').css("opacity", 0.3);
  		});
  		
  	$('#blueButton').on("click", function(){
  			$('#redButton').css("opacity", 0.3);
  			$('#blueButton').css("opacity", 1);
  		});
  		
  	$('#3').on("click", function(){
  			$('#1').css("opacity", 0.3);
  			$('#2').css("opacity", 0.3);
  			$('#3').css("opacity", 1);
  		});
  	$(".dropDown").on("click", function(){
  		$(".percent").css("display", "block");
  	});
  	$(".clickDrop").on("click", function(){
  		$(".percent").css("display", "none");
  	});
  		
  	/*
  	$('#speed').on("click", function(){
  		var speed = prompt("What is the speed from 1-3? 3 is fastest.")
  		if (speed ==1){
  			jQuery('#speed').attr('src','http://www.clker.com/cliparts/X/f/4/c/w/i/one-in-circle-md.png');
  		}
  		else if (speed ==2){
  			jQuery('#speed').attr('src','http://www.clker.com/cliparts/V/X/q/v/W/X/2-inside-a-circle-md.png');
  		}
  		else if (speed ==3){
  			jQuery('#speed').attr('src','http://www.clker.com/cliparts/9/3/h/S/g/Y/number-3-in-circle-hi.png');
  		}
  		else{
  			jQuery('#speed').attr('src','http://www.rcn.com/assets/images/hub/help/how-to-get-the-most-out-of-your-speed.jpg');
  		}
  	});
  	*/
  	
  	
    $('.tabs .tab-links a').on('click', function(e)  {
          var currentAttrValue = jQuery(this).attr('href');
  
          // Show/Hide Tabs
          jQuery('.tabs ' + currentAttrValue).show().siblings().hide();
  
          // Change/remove current tab to active
          jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
  
          e.preventDefault();
  		
      });
  });
  </script>-->