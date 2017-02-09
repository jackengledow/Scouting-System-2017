function findClimbers() {
	var climbersList = document.getElementById("climbersList");
	
	while (climbersList.firstChild) {
		climbersList.removeChild(climbersList.firstChild);
	}

	var climbers = new Array();
	for(var i = 0; i < robots.length; i++) {
		var success = 0;
		var fail = 0;
		var matches = 0;
		for(var j = 0; j < participations.length; j++) {
			if(robots[i]._id === participations[j].robot_id) {
				for(var k = 0; k < records.length; k++) {
					if(records[k].participation_id === participations[j]._id) {
						if(records[k]["teleopClimb"] === "Success")
							success++;
						else if(records[k]["teleopClimb"] === "Fail")
							fail++;
						matches++;
					}
				}
			}
		}
		if(success + fail !== 0) {
			var obj = new Object();
			for(var l = 0; l < teams.length; l++) {
				if(robots[i].team_id === teams[l]._id) {
					obj.team = teams[l].number;
				}
			}
			obj.success = success;
			obj.fail = fail;
			obj.matches = matches;
			climbers.push(obj);
		}
	}

	climbers.sort(function(a, b) {return b.success / b.matches  - a.success / a.matches});
	for(var i = 0; i < climbers.length; i++) {
		var strong = document.createElement("strong");
		strong.innerHTML = climbers[i].team + ": ";
		climbersList.appendChild(strong);
		climbersList.innerHTML += (climbers[i].success / climbers[i].matches).toFixed(2) + " Climbs / Match";
		climbersList.appendChild(document.createElement("br"));
	}
	console.log(climbers);
}

function findGoodHighGoalers() {
	var highGoalersList = document.getElementById("highGoalersList");
	
	while (highGoalersList.firstChild) {
		highGoalersList.removeChild(highGoalersList.firstChild);
	}

	var goodHighGoalers = new Array();
	for(var i = 0; i < robots.length; i++) {
		var success = 0;
		var fail = 0;
		var matches = 0;
		for(var j = 0; j < participations.length; j++) {
			if(robots[i]._id === participations[j].robot_id) {
				for(var k = 0; k < records.length; k++) {
					if(records[k].participation_id === participations[j]._id) {
						if(records[k].x.length !== 0) {
							for(var l = 0; l < records[k].x.length; l++) {
								var type = records[k].type;
								if(type[l] == 10) {
									success++;
								}
								else if(type[l] == 11) {
									fail++;
								}
								else if(type[l] == 20) {
									success++;
								}
								else if(type[l] == 21) {
									fail++;
								}
							}
						}
						matches++;
					}
				}
			}
		}
		if(success + fail !== 0 && success / matches > 3) {
			var obj = new Object();
			for(var l = 0; l < teams.length; l++) {
				if(robots[i].team_id === teams[l]._id) {
					obj.team = teams[l].number;
				}
			}
			obj.success = success;
			obj.fail = fail;
			obj.matches = matches;
			goodHighGoalers.push(obj);
		}
	}
	goodHighGoalers.sort(function(a, b) {return b.success / b.matches  - a.success / a.matches});

	for(var i = 0; i < goodHighGoalers.length; i++) {
		var strong = document.createElement("strong");
		strong.innerHTML = goodHighGoalers[i].team + ": ";
		highGoalersList.appendChild(strong);
		highGoalersList.innerHTML += (goodHighGoalers[i].success / goodHighGoalers[i].matches).toFixed(2) + " High Goals / Match";
		highGoalersList.appendChild(document.createElement("br"));
	}
}

function findGoodLowGoalers() {
	var lowGoalersList = document.getElementById("lowGoalersList");
	
	while (lowGoalersList.firstChild) {
		lowGoalersList.removeChild(lowGoalersList.firstChild);
	}

	var goodLowGoalers = new Array();
	for(var i = 0; i < robots.length; i++) {
		var success = 0;
		var fail = 0;
		var matches = 0;
		for(var j = 0; j < participations.length; j++) {
			if(robots[i]._id === participations[j].robot_id) {
				for(var k = 0; k < records.length; k++) {
					if(records[k].participation_id === participations[j]._id) {
						success += Number(records[k]["autonLowMade"]);
						fail += Number(records[k]["autonLowMiss"]);
						success += Number(records[k]["teleopLowMade"]);
						fail += Number(records[k]["teleopLowMiss"]);
						matches++;
					}
				}
			}
		}
		if(success + fail !== 0 && success / matches > 2.5) {
			var obj = new Object();
			for(var l = 0; l < teams.length; l++) {
				if(robots[i].team_id === teams[l]._id) {
					obj.team = teams[l].number;
				}
			}
			obj.success = success;
			obj.fail = fail;
			obj.matches = matches;
			goodLowGoalers.push(obj);
		}
	}
	goodLowGoalers.sort(function(a, b) {return b.success / b.matches  - a.success / a.matches});

	for(var i = 0; i < goodLowGoalers.length; i++) {
		var strong = document.createElement("strong");
		strong.innerHTML = goodLowGoalers[i].team + ": ";
		lowGoalersList.appendChild(strong);
		lowGoalersList.innerHTML += (goodLowGoalers[i].success / goodLowGoalers[i].matches).toFixed(2) + " Low Goals / Match";
		lowGoalersList.appendChild(document.createElement("br"));
	}
}

function findMultiBallAutons() {
	var multiBallAutonsList = document.getElementById("multiBallAutonsList");
	
	while (multiBallAutonsList.firstChild) {
		multiBallAutonsList.removeChild(multiBallAutonsList.firstChild);
	}

	var multiBallAutons = new Array();
	for(var i = 0; i < robots.length; i++) {
		var matches = 0;
		var multiBallSuccess = 0;
		var multiBallFail = 0;
		for(var j = 0; j < participations.length; j++) {
			if(robots[i]._id === participations[j].robot_id) {
				for(var k = 0; k < records.length; k++) {
					if(records[k].participation_id === participations[j]._id) {
						var success = 0;
						var fail = 0;
						if(records[k].x.length !== 0) {
							for(var l = 0; l < records[k].x.length; l++) {
								var type = records[k].type;
								if(type[l] == 10) {
									success++;
								}
								else if(type[l] == 11) {
									fail++;
								}
							}
						}
						if(success + fail > 1) {
							if(fail === 0) {
								multiBallSuccess++;
							}
							else {
								multiBallFail++;
							}
						}
						matches++;
					}
				}
			}
		}
		if(multiBallSuccess + multiBallFail > 1) {
			var obj = new Object();
			for(var l = 0; l < teams.length; l++) {
				if(robots[i].team_id === teams[l]._id) {
					obj.team = teams[l].number;
				}
			}
			obj.success = multiBallSuccess;
			obj.fail = multiBallFail;
			obj.matches = matches;
			multiBallAutons.push(obj);
		}
	}
	multiBallAutons.sort(function(a, b) {return b.success / b.matches  - a.success / a.matches});

	for(var i = 0; i < multiBallAutons.length; i++) {
		var strong = document.createElement("strong");
		strong.innerHTML = multiBallAutons[i].team + ": ";
		multiBallAutonsList.appendChild(strong);
		multiBallAutonsList.innerHTML += (multiBallAutons[i].success / multiBallAutons[i].matches).toFixed(2) + " Successful Multi-Ball Autons / Match";
		multiBallAutonsList.appendChild(document.createElement("br"));
	}
}
