<!DOCTYPE html>
<!--Scouting System Html-->
<!--this comment is unnesesary, obviously its the scouting system-->
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
				margin-left: 15px;
			}
		</style>
	</head>
	<body style = "filter: grayscale(0%);">
	<div class = "everything">
	   <div class ="teamInfo">
	      <label style = "font-size:20px; margin-top: 8px; padding-right: 20px; margin-left: -85px;">Match Number:</label><br>
          <input type = "text" id="teamNumber" style="margin-top: 9px;height: 31px;margin-right: 15px"/>
          <label style = "font-size:20px; margin-top: 8px; padding-right: 10px">Team Number:</label><br>
            <input type = "text" id="teamNumber" style="margin-top: 9px;height: 31px;"/>
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
									<p style = "text-decoration: underline;padding-left: 15px; font-size: 25px;"><strong>Preliminary Buttons</strong></p>
									<div class="row">
										<div class="col-md-12" style = "padding-top: 0px; padding-left: 70px;">
											<form action="">
												<input style="width: 15px; height: 15px;" type="checkbox" name="vehicle" value="Bike"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Start with Balls</div><br><br>
												<input style="width: 15px; height: 15px;" type="checkbox" name="vehicle" value="Car"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Start with Gear</div>
											</form>
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
								<p align = "right" style = "text-decoration: underline;padding-right: 15px; font-size: 25px;"><strong>Autonomous Buttons</strong></p>
								<div class="row">
										<div class="col-md-12" style = "padding-top: 0px; padding-left: 165px;">
											<form action="">
												<input style="width: 15px; height: 15px;" type="checkbox" name="vehicle" value="Bike"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Cross Baseline</div><br><br>
												<input style="width: 15px; height: 15px;" type="checkbox" name="vehicle" value="Car"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Score the Gear</div>
											</form>
										</div>
									</div>
								</div>
							</div>
					  </div>

  					<div class="container">
  					  <br><br>
  						<p><center><strong style = "font-size: 35px; text-decoration: underline">Fuel</strong></center></p>
  						<div class="row">
  							<div class="col-md-5">
  								<div class="row">
  									<div class="col-md-12 topStyle" style="background-color:#d3d3d3; margin-bottom: -10px;">
  										<h2><center>Made High Goals: <p style = "display: inline-block;" id= "highScoreAuton">0</p></center></h2>
  									</div>
  								</div>
  								<!--<div class="row">
  									<div class="col-md-6">
  										<div class="make green width button">
  											<h2><center>Make</center></h2>
  										</div>
  									</div>
  														
  									<div class="col-md-6">
  										<div class="miss red width button">
  											<h2><center>Miss</center></h2>
  										</div>
  									</div>
  								</div>-->
  								<div class = "row" style = "margin-top: 10px">
  									<div class = "col-md-4">
  										<button class = "make makeshot darkgreen width button" onclick = "countHighMakeAuton(10)">
  											<p style = "font-size: 25px; padding-top: 5px;">+10</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button class = "make makeshot medgreen width button" onclick = "countHighMakeAuton(5)">
  											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button class = "make makeshot lightgreen width button" onclick = "countHighMakeAuton(1)">
  											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
  										</button>
  									</div>
  								</div>
  								<div class = "row" style = "padding-top: 49px">
  									<div class = "col-md-4">
  										<button class = "make makeshot darkred width button leftcorner" onclick = "countHighMakeAuton(-10)">
  											<p style = "font-size: 25px; padding-top: 5px;">-10</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button class = "make makeshot red width button" onclick = "countHighMakeAuton(-5)">
  											<p style = "font-size: 25px; padding-top: 5px;">-5</p>
  										</button>
  									</div>
  									<div class = "col-md-4">
  										<button class = "make makeshot lightred width button rightcorner" onclick = "countHighMakeAuton(-1)">
  											<p style = "font-size: 25px; padding-top: 5px;">-1</p>
  										</button>
  									</div>
  								</div>
  							</div>
  							<div class="col-md-2">
  								<center>
  									<img id = "ballButton" src = "fuelImage.jpg">
  								</center>
  							</div>
  							<div class="col-md-5">
  								<div class="row">
  									<div class="col-md-12 topStyle" style="background-color:#d3d3d3;padding-left: 0px;">
  										<h2 style = "font-size: 25px;"><center>Low Goal - Balls collected before dump</center></h2>
  									</div>
  								</div>
  								<div class="row">
  									<div class="col-md-4">
  										<button class="make leftcorner red width button opacity dropDown" id = "Small" onclick = "lowDumpAuton('Small')">
  											<p style = "font-size: 25px; padding-top: 5px;">Small 1-19</p>
  										</button>
  									</div>
  									<div class="col-md-4">
  										<button class="width button middle opacity dropDown" id = "Medium" onclick = "lowDumpAuton('Medium')">
  											<p style = "font-size: 25px; padding-top: 5px;">Med 20-39</p>
  										</button>
  									</div>
  									<div class="col-md-4">
  										<button class="miss rightcorner green width button opacity dropDown" id = "Big" onclick = "lowDumpAuton('Big')">
  											<p style = "font-size: 25px; padding-top: 5px;">Large 40+</p>
  										</button>
  									</div>
  								</div>
  								<div class="row percent" style = "display: none; height: 10px; margin-top: 60px;">
									<center>
										<p style = "font-size: 20px;">What percent of collected balls were made?</p>
									</center>
  									<div class="col-lg-3">
  										<button class="make leftcorner red width button opacity hi clickDrop" onclick = "dumpPercentAuton(0)">
  											<p style = "font-size: 25px; padding-top: 5px;">0%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  
  										<button class="width button middle orange clickDrop opacity" onclick = "dumpPercentAuton(25)">
											<p style = "font-size: 25px; padding-top: 5px;">25%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  										<button class="miss middle green width button opacity clickDrop" onclick = "dumpPercentAuton(50)">
  											<p style = "font-size: 25px; padding-top: 5px;">50%</p>
  										</button>
  									</div>
  									<div class="col-lg-2">
  
  										<button class="miss yellowGreen middle width button opacity clickDrop" onclick = "dumpPercentAuton(75)">
											<p style = "font-size: 25px; padding-top: 5px;">75%</p>
  										</button>
  									</div>
  									<div class="col-lg-3">
  										<button class="miss rightcorner green width button opacity goodbye clickDrop" onclick = "dumpPercentAuton(100)">
  											<p style = "font-size: 25px; padding-top: 5px;">100%</p>
  										</button>
  									</div>
  								</div>
  							</div>
  						</div>
						<div class="row">
							<div class="col-md-5">
							</div>
							<div class="col-md-5">
							</div>
							<div class="col-md-2">
								
							</div>
						</div>
						  						
  					</div>
  					
					</div>
				</div>

				<div id="tab2" class="tab">
					<div style="color: none;" class="container">
						<div style="color: none;" class="row">
					<p title="Scouting system">
						<form action="" style = "margin-top: -5px; padding-left: 0px;">
								<input type="checkbox" name="vehicle" value="Bike"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Did not perform / Disabled</div>
								<input type = "checkbox" style = "margin-left: 50px;"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Can collect balls from ground</div>								
								<input type = "checkbox" style = "margin-left: 50px;"><div class="checkboxDescription" style = "display: inline-block; font-size: 20px;">Can use a hopper</div><br><br>
						</form>
						<div class="col-md-2">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#c1c1c1;padding-left: 0px;">
										<h2><center>Speed</center></h2>
									</div>
								</div>
								<div class="row">
								<!--button-->
									<div class="col-md-4">
										<button class="make leftcorner red width button opacity" id = "1">
											<center><p style = "font-size: 25px; padding-top: 5px;">1</p></center>
										</button>
									</div>
									<div class="col-md-4">
										<button class="width button middle opacity" id = "2">
											<center><p style = "font-size: 25px; padding-top: 5px;">2</p></center>
										</button>
									</div>
									<div class="col-md-4">
										<button class="miss rightcorner green width button opacity" id = "3">
											<center><p style = "font-size: 25px; padding-top: 5px;">3</p></center>
										</button>
									</div>
								</div>
							</div>
						<!-- <button class = "leftButton"><img class = "buttons" id = "speed" src = "http://www.rcn.com/assets/images/hub/help/how-to-get-the-most-out-of-your-speed.jpg"></button> -->
							<div class="col-md-3 rightButton leftButton">
								<div class="row">
									<div class="col-md-12 topStyle" style="background-color:#c1c1c1; margin-bottom: -10px; height: 63px;">
										<h2><center>Gears Scored: <p style = "display: inline-block;" id= "gearsTeleop">0</p></center></h2>
									</div>
								</div>
								<div class="row">
								<!--button-->
									<div class="col-md-6" style="margin-top: 10px;">
										<button class="make leftcorner green makeshot width button" onclick="addGears(1)">
											<center>
												<!--<img style = "height: 30px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">-->
												<p style = "font-size: 30px; padding-top: 5px;">+</p>
											</center>
										</button>
									</div>
									<div class="col-md-6" style="margin-top: 10px;">
										<button class="miss rightcorner missshot red width button" margin-left: 3px; onclick="addGears(-1)">
											<center>
												<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">-->
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
								<!--button-->
									<div class="col-md-4">
										<button class="make leftcorner green width button opacity" id = "success">
											<p style = "font-size: 25px; padding-top: 5px;">Success</p>
										</button>
									</div>
									<div class="col-md-4">
										<button class="width button middle opacity" id = "fail">
											<p style = "font-size: 25px; padding-top: 5px;">Fail</p>
										</button>
									</div>
									<div class="col-md-4">
										<button class="miss rightcorner red width button opacity" id = "noattempt">
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
						<img class = "redPic clickGrid" onclick="showCoords(event)" style = "height: 400px; position: relative;" src = "RedTeam.png">
						<img class = "bluePic clickGrid" onclick="showCoords(event)" style = "height: 400px; display: none;" src = "BlueTeam.png">
						<p id="demo"></p>
						<button id = "Rotate" class = "opacity" style = "height: 25px; background-color: #ccc; border-radius: 5px; border-color: #000; font-weight: bold; height: 32px;"><p style = "font-size: 20px;">Rotate Field</p></button>
						</center>
					</div>
					<div class="col-md-6" style = "margin-top: 80px; padding-left: 0px; padding-right: 75px;">
						<div class="row">
							<div class="col-md-12 topStyle" style="background-color:#d3d3d3;">
								<h2><center>Low Goal - Balls collected before dump</center></h2>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<button class="make leftcorner red width button opacity dropDown" id = "Small" onclick = "lowDumpTeleop('Small')">
									<p style = "font-size: 25px; padding-top: 5px;">Small 1-19</p>
								</button>
							</div>
							<div class="col-md-4">
								<button class="width button middle opacity dropDown" id = "Medium" onclick = "lowDumpTeleop('Medium')">
									<p style = "font-size: 25px; padding-top: 5px;">Med 20-39</p>
								</button>
							</div>
							<div class="col-md-4">
								<button class="miss rightcorner green width button opacity dropDown" id = "Big" onclick = "lowDumpTeleop('Big')">
									<p style = "font-size: 25px; padding-top: 5px;">Large 40+</p>
								</button>
							</div>
						</div>
						<div class="row percent" style = "display: none; height: 10px; margin-top: 60px;">
							<center>
								<p style = "font-size: 20px;">What percent of collected balls were made?</p>
							</center>
							<div class="col-lg-3">
								<button class="make leftcorner red width button opacity hi clickDrop" onclick = "dumpPercentTeleop(0)">
									<p style = "font-size: 25px; padding-top: 5px;">0%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button class="width button middle orange clickDrop opacity" onclick = "dumpPercentTeleop(25)">
									<p style = "font-size: 25px; padding-top: 5px;">25%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button class="miss middle green width button opacity clickDrop" onclick = "dumpPercentTeleop(50)">
									<p style = "font-size: 25px; padding-top: 5px;">50%</p>
								</button>
							</div>
							<div class="col-lg-2">
								<button class="miss yellowGreen middle width button opacity clickDrop" onclick = "dumpPercentTeleop(75)">
									<p style = "font-size: 25px; padding-top: 5px;">75%</p>
								</button>
							</div>
							<div class="col-lg-3">
								<button class="miss rightcorner green width button opacity goodbye clickDrop" onclick = "dumpPercentTeleop(100)">
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
										<button class = "make makeshot darkgreen leftcorner width button shotChart" onclick = "countHighMakeTeleop(5), clickZone('Make', 5)">
											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button class = "make makeshot medgreen width button shotChart" onclick = "countHighMakeTeleop(1), clickZone('Make', 1)">
											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button class = "make makeshot rightcorner grey width button shotChart" onclick = "countHighMakeTeleop(-1), clickZone('Make', -1)">
											<p style = "font-size: 25px; padding-top: 5px;">-1</p>
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
										<button class = "make makeshot darkred width leftcorner button shotChart" onclick = "countHighMissTeleop(5), clickZone('Miss', 5)">
											<p style = "font-size: 25px; padding-top: 5px;">+5</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button class = "make makeshot red width button shotChart" onclick = "countHighMissTeleop(1), clickZone('Miss', 1)">
											<p style = "font-size: 25px; padding-top: 5px;">+1</p>
										</button>
									</div>
									<div class = "col-md-4">
										<button class = "make makeshot width grey button rightcorner shotChart" onclick = "countHighMissTeleop(-1), clickZone('Miss', -1)">
											<p style = "font-size: 25px; padding-top: 5px;">-1</p>
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
							<!--button-->
								<div class="col-md-6" style="margin-top:10px">
									<button class="make leftcorner green makeshot width button"  onclick="countFouls(1)">
										<center>
											<!--<img style = "height: 40px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">-->
										<p style="font-size: 30px; padding-top: 5px;">+</p>
										</center>
									</button>
								</div>
								<div class="col-md-6" style="margin-top:10px">
								<button class="miss rightcorner missshot red width button" style = "margin-left: 3px;" onclick="countFouls(-1)">
										<center>
											<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">-->
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
							<!--button-->
								<div class="col-md-6" style="margin-top:10px">
									<button class="make leftcorner green makeshot width button" onclick="countTechnicals(1)">
										<center>
											<!--<img style = "height: 40px; margin-top: 11px; margin-bottom: 11px; margin-left: 3px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/green-plus-clip-art.png">-->
										<p style="font-size: 30px; padding-top: 5px;">+</p>
										</center>
									</button>
								</div>
								<div class="col-md-6" style="margin-top:10px">
								<button class="miss rightcorner missshot red width button" margin-left: 3px; onclick="countTechnicals(-1)">
										<center>
											<!--<img style = "height: 40px;  margin-top: 11px; margin-bottom: 11px;" src = "http://bsccongress.com/wp-content/uploads/2016/06/red-minus-clip-art.png">-->
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
					<div style="margin-top: 50px;" class="row top" id="pepe">
							<div class="col-md-4">
								<h2><strong><center>Yellow Card:</center></strong></h2><center>
								  <td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox" value=""><p style="font-size: 20px;"></p></label></td>
								</center>
							</div>
							<div class="col-md-4">
								<h2><strong><center>Red Card:</center></strong></h2><center>
								<td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox" value=""><p style="font-size: 20px;"></p></label></td>
								</center>
							</div>
							<div class="col-md-4"><center>
								<h2><strong><center>Ejection:</center></strong></h2>
								<td style="paddzing-top: 27px"><label class="check"><input style="width: 40px;height: 40px;" type="checkbox" value=""><p style="font-size: 20px;"></p></label></td>
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
					<button style="margin-top: 80px; margin-right: 440px; border-radius: 4px; width: 400px; height: 80px;" id = "submit" class="make makeshot width grey button rightcorner shotChart" onclick="submit">
						<p style="font-size: 35px; padding-top: 5px;">Submit</p>
					</button>
					</center>
				</div>

        </div>
						<script>
							function showCoords(event) {
								var x = event.clientX;
								var y = event.clientY;
								setGridClickPos(x,y);
								var coords = "X coords: " + x + ", Y coords: " + y;
								document.getElementById("demo").innerHTML = coords;
							}
						</script>
	</div>
  	</body>
</html>

<script>
	
	jQuery(document).ready(function() {
	opacity = 1;
	rotate = 0;
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
	$(".clickGrid").on("click", function(){
		$("#popup").css("display", "block");
	});
	
	$(".shotChart").on("click", function(){
		$("#popup").css("display", "none");
	});
	
	$("#blueButton").on("click", function(){
		$(".redPic").css("display", "none");
		$(".bluePic").css("display", "block");
	});
	
	$("#redButton").on("click", function(){
		$(".redPic").css("display", "block");
		$(".bluePic").css("display", "none");
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
