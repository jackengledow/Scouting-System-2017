var matchPredictorTeams = new Array(6);
var redAllianceScore = {};
var blueAllianceScore = {};

function addTeamMatchPredictor(input, alliance) {
	var robot_id = input.value;
	var id = input.id;
	var index = input.id.substring(id.length - 1,id.length) - 1;

	var totalMatches = 0;
	var autonCross = 0;
	var autonReach = 0;
	var autonHGSuccess = 0;
	var autonLGSuccess = 0;

	var teleopHGSuccess = 0;
	var teleopHGFail = 0;
	var teleopLGSuccess = 0;
	var teleopLGFail = 0;
	var teleopCross = 0;

	var climbSuccess = 0;
	var challengeSuccess = 0;
	var climbFail = 0;
	var challengeFail = 0;

	for(var k = 0; k < participations.length; k++) {
		if(robot_id === participations[k].robot_id) {
			for(var i = 0; i < records.length; i++) {
				if(records[i].participation_id === participations[k]._id) {
					if(records[i].reachedOuterworks === "yes" && records[i].autonDefense === "none") {
						autonReach++;
					}
					else if(records[i].autonDefense !== "none") {
						autonCross++;
					}
					if(records[i].x.length !== 0) {
						for(var j = 0; j < records[i].x.length; j++) {
							var type = records[i].type;
							if(type[j] == 10) {
								autonHGSuccess++;
							}
							else if(type[j] == 20) {
								teleopHGSuccess++;
							}
							else if(type[j] == 21) {
								teleopHGFail++;
							}
						}
					}
					autonLGSuccess += Number(records[i]["autonLowMade"]);
					teleopLGSuccess += Number(records[i]["teleopLowMade"]);
					teleopLGFail += Number(records[i]["teleopLowMiss"]);

					teleopCross += Number(records[i]["portcullisCrossed"]);
					teleopCross += Number(records[i]["chevalCrossed"]);
					teleopCross += Number(records[i]["moatCrossed"]);
					teleopCross += Number(records[i]["rampartsCrossed"]);
					teleopCross += Number(records[i]["drawbridgeCrossed"]);
					teleopCross += Number(records[i]["sallyportCrossed"]);
					teleopCross += Number(records[i]["rockwallCrossed"]);
					teleopCross += Number(records[i]["roughterrainCrossed"]);
					teleopCross += Number(records[i]["lowbarCrossed"]);

					if(records[i]["teleopClimb"].length !== 0) {
						if(records[i]["teleopClimb"] === "Success") {
							climbSuccess++;
						}
						else if(records[i]["teleopClimb"] === "Fail") {
							climbFail++;
						}
					}

					if(records[i]["teleopChallenge"].length !== 0) {
						if(records[i]["teleopChallenge"] === "Success" && (records[i]["teleopClimb"] === "Fail" || records[i]["teleopClimb"] === "None")) {
							challengeSuccess++;
						}
						else if(records[i]["teleopChallenge"] === "Fail") {
							challengeFail++;
						}
					}
					totalMatches++;
				}
			}
		}
	}

	var obj = {
		"autonCross": autonCross / totalMatches,
		"autonReach": autonReach / totalMatches,
		"autonHGSuccess": autonHGSuccess / totalMatches,
		"autonLGSuccess": autonLGSuccess / totalMatches,
		"teleopHGSuccess": teleopHGSuccess / totalMatches,
		"teleopHGAccuracy": (teleopHGSuccess + teleopHGFail) ? (teleopHGSuccess / (teleopHGSuccess + teleopHGFail)) : 0,
		"teleopLGSuccess": teleopLGSuccess / totalMatches,
		"teleopLGAccuracy": (teleopLGSuccess + teleopLGFail) ? (teleopLGSuccess / (teleopLGSuccess + teleopLGFail)) : 0,
		"teleopCross": teleopCross / totalMatches,
		"climb": climbSuccess / totalMatches,
		"challenge": challengeSuccess / totalMatches
	}
	matchPredictorTeams[index] = obj;

	if(typeof(matchPredictorTeams[0]) !== "undefined" && typeof(matchPredictorTeams[1]) !== "undefined" && typeof(matchPredictorTeams[2]) !== "undefined") {
		calculateScore("red");
	}
	if(typeof(matchPredictorTeams[3]) !== "undefined" && typeof(matchPredictorTeams[4]) !== "undefined" && typeof(matchPredictorTeams[5]) !== "undefined") {
		calculateScore("blue");
	}
}

function calculateScore(alliance) {
	var cutoff = 3;

	var autonCrossPt = 10;
	var autonReachPt = 2;
	var autonHGPt = 10;
	var autonLGPt = 5;

	var teleopCrossPt = 5;
	var teleopHGPt = 5;
	var teleopLGPt = 2;
	var teleopExtraHGConversion = 0.2;
	var teleopExtraLGConversion = 0.3;

	var challengePt = 5;
	var climbPt = 15;

	var autonScore = 0;
	var autonCrossScore = 0;

	var teleopTotalHGAccuracy = 0;
	var teleopTotalLGAccuracy = 0;
	var teleopScore = 0;
	var teleopDefenseScore = 0;
	var teleopExtraScore = 0;

	var totalLG = 0;
	var totalHG = 0;
	var totalClimbPercent = 0;
	var totalChallengePercent = 0;
	var endGameScore = 0;

	var totalScore = 0;

	var capture = false;
	var breach = false;
	var rankingScore = 0;

	for(var i = 0; i < matchPredictorTeams.length; i++) {
		//Silly way to not have to make this repetitive
		if(alliance === "blue" && i === 0) {
			i = cutoff;
		}
		autonCrossScore += matchPredictorTeams[i].autonCross * autonCrossPt;
		autonScore += matchPredictorTeams[i].autonCross * autonCrossPt;
		autonScore += matchPredictorTeams[i].autonReach * autonReachPt;
		autonScore += matchPredictorTeams[i].autonHGSuccess * autonHGPt;
		autonScore += matchPredictorTeams[i].autonLGSuccess * autonLGPt;
		totalHG += matchPredictorTeams[i].autonHGSuccess;
		totalLG += matchPredictorTeams[i].autonLGSuccess;

		totalHG += matchPredictorTeams[i].teleopHGSuccess;
		totalLG += matchPredictorTeams[i].teleopLGSuccess;
		teleopTotalHGAccuracy += matchPredictorTeams[i].teleopHGAccuracy;
		teleopTotalLGAccuracy += matchPredictorTeams[i].teleopLGAccuracy;
		teleopScore += matchPredictorTeams[i].teleopHGSuccess * teleopHGPt;
		teleopScore += matchPredictorTeams[i].teleopLGSuccess * teleopLGPt;
		teleopDefenseScore += matchPredictorTeams[i].teleopCross * teleopCrossPt;

		totalClimbPercent += matchPredictorTeams[i].climb;
		totalChallengePercent += matchPredictorTeams[i].challenge;
		endGameScore += matchPredictorTeams[i].climb * climbPt;
		endGameScore += matchPredictorTeams[i].challenge * challengePt;

		if(alliance === "red" && i === (cutoff - 1)) {
			i = matchPredictorTeams.length;
		}
	}

	autonCrossScore = Math.round(autonCrossScore / 10) * 10;
	//console.log("Auton Cross Score: " + autonCrossScore);
	//console.log("Teleop Defense Score: " + teleopDefenseScore);
	if(teleopDefenseScore >= (40 - (autonCrossScore / 2))) {
		teleopExtraScore = teleopDefenseScore - (40 - (autonCrossScore / 2));
		if(teleopExtraScore >= 25) {
			teleopDefenseScore = 50;
			teleopExtraScore -= 10;
		}
		else if (teleopExtraScore >= 10) {
			teleopDefenseScore = 45;
			teleopExtraScore -= 5;
		}
		else {
			teleopDefenseScore = 40;
		}
		breach = true;
	}

	teleopScore += teleopDefenseScore - (autonCrossScore / 2);
	//console.log("Extra Teleop Score: " + teleopExtraScore);
	//console.log("Total Defense Score in Teleop Values: " + (teleopDefenseScore + autonCrossScore / 2));
	if(teleopExtraScore !== 0) {
		console.log("Has extra score.");
		teleopScore += teleopExtraScore * (teleopTotalHGAccuracy / 3) * teleopHGPt * teleopExtraHGConversion;
		//console.log(teleopExtraScore * (teleopTotalHGAccuracy / 3) * teleopHGPt * teleopExtraHGConversion);
		totalHG += Math.round((teleopExtraScore * (teleopTotalHGAccuracy / 3) * teleopHGPt * teleopExtraHGConversion) / teleopHGPt);
		teleopScore += teleopExtraScore * (teleopTotalLGAccuracy / 3) * teleopLGPt * teleopExtraLGConversion;
		//console.log(teleopExtraScore * (teleopTotalLGAccuracy / 3) * teleopLGPt * teleopExtraLGConversion);
		totalLG += Math.round((teleopExtraScore * (teleopTotalLGAccuracy / 3) * teleopLGPt * teleopExtraLGConversion) / teleopLGPt);
	}

	if(totalHG + totalLG >= 8 && ((totalClimbPercent + totalChallengePercent) / 3) >= 0.75) {
		capture = true;
	}

	totalScore = Math.round(autonScore) + Math.round(teleopScore) + Math.round(endGameScore);
	//console.log("Goals scored: " + (totalHG + totalLG));
	//console.log(autonScore, teleopScore, endGameScore, totalScore);
	//console.log(breach, capture);
	if(alliance === "red") {
		redAllianceScore = {};
		redAllianceScore.autonScore = Math.round(autonScore);
		redAllianceScore.teleopScore = Math.round(teleopScore);
		redAllianceScore.endGameScore = Math.round(endGameScore);
		redAllianceScore.score = Math.round(totalScore);
		redAllianceScore.breach = breach;
		redAllianceScore.capture = capture;
	}
	else {
		blueAllianceScore = {}
		blueAllianceScore.autonScore = Math.round(autonScore);
		blueAllianceScore.teleopScore = Math.round(teleopScore);
		blueAllianceScore.endGameScore = Math.round(endGameScore);
		blueAllianceScore.score = Math.round(totalScore);
		blueAllianceScore.breach = breach;
		blueAllianceScore.capture = capture;
	}

	if(Object.keys(redAllianceScore).length !== 0 && Object.keys(blueAllianceScore).length !== 0) {
		outputScore();
	}
}

function outputScore() {
	var red = document.getElementById("red-prediction");
	var blue = document.getElementById("blue-prediction");
	var winnerElem = document.createElement("h2");
	winnerElem.innerHTML = "Winner";

	var winner;
	var redRankPt = 0;
	var blueRankPt = 0;

	while (red.firstChild) {
		red.removeChild(red.firstChild);
	}
	while (blue.firstChild) {
		blue.removeChild(blue.firstChild);
	}

	var redAutonScoreElem1 = document.createElement("p");
	redAutonScoreElem1.innerHTML = "Auton Score: ";
	var redAutonScoreElem2 = document.createElement("strong");
	redAutonScoreElem2.innerHTML = redAllianceScore.autonScore;

	var redTeleopScoreElem1 = document.createElement("p");
	redTeleopScoreElem1.innerHTML = "Teleop Score: ";
	var redTeleopScoreElem2 = document.createElement("strong");
	redTeleopScoreElem2.innerHTML = redAllianceScore.teleopScore;

	var redEndGameScoreElem1 = document.createElement("p");
	redEndGameScoreElem1.innerHTML = "End Game Score: ";
	var redEndGameScoreElem2 = document.createElement("strong");
	redEndGameScoreElem2.innerHTML = redAllianceScore.endGameScore;

	var redScoreElem1 = document.createElement("p");
	redScoreElem1.innerHTML = "Total Score: ";
	var redScoreElem2 = document.createElement("strong");
	redScoreElem2.innerHTML = redAllianceScore.score;

	var redBreachElem1 = document.createElement("p");
	redBreachElem1.innerHTML = "Breach: ";
	var redBreachElem2 = document.createElement("strong");
	redBreachElem2.innerHTML = redAllianceScore.breach;

	var redCaptureElem1 = document.createElement("p");
	redCaptureElem1.innerHTML = "Capture: ";
	var redCaptureElem2 = document.createElement("strong");
	redCaptureElem2.innerHTML = redAllianceScore.capture;

	if(redAllianceScore.capture) {
		redRankPt++;
	}

	if(redAllianceScore.breach) {
		redRankPt++;
	}

	redAutonScoreElem1.appendChild(redAutonScoreElem2);
	redTeleopScoreElem1.appendChild(redTeleopScoreElem2);
	redEndGameScoreElem1.appendChild(redEndGameScoreElem2);
	redScoreElem1.appendChild(redScoreElem2);
	redBreachElem1.appendChild(redBreachElem2);
	redCaptureElem1.appendChild(redCaptureElem2);
	
	red.appendChild(redBreachElem1);
	red.appendChild(redCaptureElem1);
	red.appendChild(redAutonScoreElem1);
	red.appendChild(redTeleopScoreElem1);
	red.appendChild(redEndGameScoreElem1);
	red.appendChild(redScoreElem1);

	var blueAutonScoreElem1 = document.createElement("p");
	blueAutonScoreElem1.innerHTML = "Auton Score: ";
	var blueAutonScoreElem2 = document.createElement("strong");
	blueAutonScoreElem2.innerHTML = blueAllianceScore.autonScore;

	var blueTeleopScoreElem1 = document.createElement("p");
	blueTeleopScoreElem1.innerHTML = "Teleop Score: ";
	var blueTeleopScoreElem2 = document.createElement("strong");
	blueTeleopScoreElem2.innerHTML = blueAllianceScore.teleopScore;

	var blueEndGameScoreElem1 = document.createElement("p");
	blueEndGameScoreElem1.innerHTML = "End Game Score: ";
	var blueEndGameScoreElem2 = document.createElement("strong");
	blueEndGameScoreElem2.innerHTML = blueAllianceScore.endGameScore;

	var blueScoreElem1 = document.createElement("p");
	blueScoreElem1.innerHTML = "Total Score: ";
	var blueScoreElem2 = document.createElement("strong");
	blueScoreElem2.innerHTML = blueAllianceScore.score;

	var blueBreachElem1 = document.createElement("p");
	blueBreachElem1.innerHTML = "Breach: ";
	var blueBreachElem2 = document.createElement("strong");
	blueBreachElem2.innerHTML = blueAllianceScore.breach;

	var blueCaptureElem1 = document.createElement("p");
	blueCaptureElem1.innerHTML = "Capture: ";
	var blueCaptureElem2 = document.createElement("strong");
	blueCaptureElem2.innerHTML = blueAllianceScore.capture;

	
	if(blueAllianceScore.capture) {
		blueRankPt++;
	}

	if(blueAllianceScore.breach) {
		blueRankPt++;
	}

	blueAutonScoreElem1.appendChild(blueAutonScoreElem2);
	blueTeleopScoreElem1.appendChild(blueTeleopScoreElem2);
	blueEndGameScoreElem1.appendChild(blueEndGameScoreElem2);
	blueScoreElem1.appendChild(blueScoreElem2);
	blueBreachElem1.appendChild(blueBreachElem2);
	blueCaptureElem1.appendChild(blueCaptureElem2);

	if(redAllianceScore.score > blueAllianceScore.score) {
		winner = "red";
	}
	else if(blueAllianceScore.score > redAllianceScore.score) {
		winner = "blue";
	}
	
	blue.appendChild(blueBreachElem1);
	blue.appendChild(blueCaptureElem1);
	blue.appendChild(blueAutonScoreElem1);
	blue.appendChild(blueTeleopScoreElem1);
	blue.appendChild(blueEndGameScoreElem1);
	blue.appendChild(blueScoreElem1);

	if(winner === "red") {
		redRankPt += 2;
		red.appendChild(winnerElem);
	}
	else if(winner === "blue") {
		blueRankPt += 2;
		blue.appendChild(winnerElem);
	}

	var redRankPtElem1 = document.createElement("p");
	redRankPtElem1.innerHTML = "Ranking Points Earned: ";
	var redRankPtElem2 = document.createElement("strong");
	redRankPtElem2.innerHTML = redRankPt;
	redRankPtElem1.appendChild(redRankPtElem2);
	
	var blueRankPtElem1 = document.createElement("p");
	blueRankPtElem1.innerHTML = "Ranking Points Earned: ";
	var blueRankPtElem2 = document.createElement("strong");
	blueRankPtElem2.innerHTML = blueRankPt;
	blueRankPtElem1.appendChild(blueRankPtElem2);
	
	red.appendChild(redRankPtElem1);
	blue.appendChild(blueRankPtElem1);
}
