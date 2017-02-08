var generalGraphs = {
	// Some day stuff will go here
};

var compareGraphs = {
	"Auton Per Match": {
		separateTeams: true,
		callback: function(div, team, robot) {
			var dataSet = new Array();
			var matches2 = new Array();
			var reachedOuterworks = new Array();
			// var defenseCrossed = new Array();
			var startWithBoulder = new Array();
			var spyBot = new Array();
			var lowSuccess = new Array();
			var lowFail = new Array();
			var highSuccess = new Array();
			var highFail = new Array();
			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							var obj = new Object();
							if(records[i]["startedWGear"].length === 0) {
								obj.spyBot = "No";
							}
							else {
								obj.spyBot = "Yes";
							}
							if(records[i]["startedWFuel"].length === 0) {
								obj.startWithBoulder = "No";
							}
							else {
								obj.startWithBoulder = "Yes";
							}
							if(records[i]["crossedLine"].length === 0) {
								obj.reachedOuterworks = "No";
							}
							else {
								obj.reachedOuterworks = "Yes";
							}
							// obj.defenseCrossed = records[i]["autonDefense"];
							obj.lowSuccess = Number(records[i]["autonLowMade"]);
							obj.lowFail = Number(records[i]["autonHighMade"]);

							obj.highSuccess = 0;
							obj.highFail = 0;
							if(records[i].x.length !== 0) {
								for(var j = 0; j < records[i].x.length; j++) {
									var type = records[i].type;

									if(type[j] == 10) {
										obj.highSuccess += 1;
									}
									else if(type[j] == 11) {
										obj.highFail += 1;
									}
								}
							}

							for(var j = 0; j < matches.length; j++) {
								if(matches[j]._id === records[i].match_id) {
									obj.match = matches[j].number.number;
								}
							}
							dataSet.push(obj);
						}
					}
				}
			}
			dataSet.sort(function(a, b) {return a.match - b.match});
			//console.log(dataSet);
			for(var i = 0; i < dataSet.length; i++) {
				matches2.push(dataSet[i].match);
				spyBot.push(dataSet[i].spyBot);
				startWithBoulder.push(dataSet[i].startWithBoulder);
				reachedOuterworks.push(dataSet[i].reachedOuterworks);
				// defenseCrossed.push(dataSet[i].defenseCrossed);
				lowSuccess.push(dataSet[i].lowSuccess);
				lowFail.push(dataSet[i].lowFail);
				highSuccess.push(dataSet[i].highSuccess);
				highFail.push(dataSet[i].highFail);
			}
			for(var i = 0; i < matches2.length; i++) {
				var matchElem = document.createElement("h3")
				var spyBotElem = document.createElement("h4");
				var boulderStartElem = document.createElement("h4");
				var reachedOuterworksElem = document.createElement("h4");
				var defenseCrossedElem = document.createElement("h4");
				var lowSuccessElem = document.createElement("h4");
				var lowFailElem = document.createElement("h4");
				var highSuccessElem = document.createElement("h4");
				var highFailElem = document.createElement("h4");
				matchElem.innerHTML = "<u>Match " + matches2[i] + "</u>";
				spyBotElem.innerHTML = "Spy Bot: <strong>" + spyBot[i] + "</strong>";
				boulderStartElem.innerHTML = "Started With Boulder: <strong>" + startWithBoulder[i] + "</strong>";
				reachedOuterworksElem.innerHTML = "Reached Outerworks: <strong>" + reachedOuterworks[i] + "</strong>";
				// defenseCrossedElem.innerHTML = "Defense Crossed: <strong>None" + "</strong>";
				// for(var j = 0; j < DEFENSES.length; j++) {
				// 	if(DEFENSES[j].name === defenseCrossed[i] + "Crossed") {
				// 		defenseCrossedElem.innerHTML = "Defense Crossed: <strong>" + DEFENSES[j].display + "</strong>";
				// 	}
				// }
				lowSuccessElem.innerHTML = "Successful Low Goals: <strong>" + lowSuccess[i] + "</strong>";
				lowFailElem.innerHTML = "Failed Low Goals: <strong>" + lowFail[i] + "</strong>";
				highSuccessElem.innerHTML = "Successful High Goals: <strong>" + highSuccess[i] + "</strong>";
				highFailElem.innerHTML = "Failed High Goals: <strong>" + highFail[i] + "</strong>";
				div.get(0).appendChild(matchElem);
				div.get(0).appendChild(spyBotElem);
				div.get(0).appendChild(boulderStartElem);
				div.get(0).appendChild(reachedOuterworksElem);
				// div.get(0).appendChild(defenseCrossedElem);
				div.get(0).appendChild(lowSuccessElem);
				div.get(0).appendChild(lowFailElem);
				div.get(0).appendChild(highSuccessElem);
				div.get(0).appendChild(highFailElem);
			}
		}
	},
	// "Defenses Per Match": {
	// 	separateTeams: true,
	// 	callback: function(div, team, robot) {
	// 		var dataSet = new Array();
	// 		var matches2 = new Array();
	// 		var autonDefenseCrossed = new Array();
	// 		var teleopPortcullis = new Array();
	// 		var teleopCheval = new Array();
	// 		var teleopMoat = new Array();
	// 		var teleopRamparts = new Array();
	// 		var teleopDrawbridge = new Array();
	// 		var teleopSallyport = new Array();
	// 		var teleopRockwall = new Array();
	// 		var teleopRoughterrain = new Array();
	// 		var teleopLowbar = new Array();
	// 		for(var k = 0; k < participations.length; k++) {
	// 			if(robot._id === participations[k].robot_id) {
	// 				for(var i = 0; i < records.length; i++) {
	// 					if(records[i].participation_id === participations[k]._id) {
	// 						var obj = new Object();

	// 						obj.autonDefenseCrossed = records[i]["autonDefense"];
	// 						obj.teleopPortcullis = Number(records[i]["portcullisCrossed"]);
	// 						obj.teleopCheval = Number(records[i]["chevalCrossed"]);
	// 						obj.teleopMoat = Number(records[i]["moatCrossed"]);
	// 						obj.teleopRamparts = Number(records[i]["rampartsCrossed"]);
	// 						obj.teleopDrawbridge = Number(records[i]["drawbridgeCrossed"]);
	// 						obj.teleopSallyport = Number(records[i]["sallyportCrossed"]);
	// 						obj.teleopRockwall = Number(records[i]["rockwallCrossed"]);
	// 						obj.teleopRoughterrain = Number(records[i]["roughterrainCrossed"]);
	// 						obj.teleopLowbar = Number(records[i]["lowbarCrossed"]);

	// 						for(var j = 0; j < matches.length; j++) {
	// 							if(matches[j]._id === records[i].match_id) {
	// 								obj.match = matches[j].number.number;
	// 							}
	// 						}
	// 						dataSet.push(obj);
	// 					}
	// 				}
	// 			}
	// 		}
	// 		dataSet.sort(function(a, b) {return a.match - b.match});
	// 		//console.log(dataSet);
	// 		for(var i = 0; i < dataSet.length; i++) {
	// 			matches2.push(dataSet[i].match);
	// 			autonDefenseCrossed.push(dataSet[i].autonDefenseCrossed);
	// 			teleopPortcullis.push(dataSet[i].teleopPortcullis);
	// 			teleopCheval.push(dataSet[i].teleopCheval);
	// 			teleopMoat.push(dataSet[i].teleopMoat);
	// 			teleopRamparts.push(dataSet[i].teleopRamparts);
	// 			teleopDrawbridge.push(dataSet[i].teleopDrawbridge);
	// 			teleopSallyport.push(dataSet[i].teleopSallyport);
	// 			teleopRockwall.push(dataSet[i].teleopRockwall);
	// 			teleopRoughterrain.push(dataSet[i].teleopRoughterrain);
	// 			teleopLowbar.push(dataSet[i].teleopLowbar);
	// 		}
	// 		console.log(teleopLowbar);
	// 		for(var i = 0; i < matches2.length; i++) {
	// 			var matchElem = document.createElement("h3")
	// 			var autonElem = document.createElement("h3");
	// 			var teleopElem = document.createElement("h3");
	// 			var reachedOuterworksElem = document.createElement("h4");
	// 			var autonDefenseCrossedElem = document.createElement("h4");

	// 			autonElem.innerHTML = "<strong>Auton</strong>";
	// 			teleopElem.innerHTML = "<strong>Teleop</strong>";
	// 			matchElem.innerHTML = "<u>Match " + matches2[i] + "</u>";
	// 			autonDefenseCrossedElem.innerHTML = "Defense Crossed: None";
	// 			for(var j = 0; j < DEFENSES.length; j++) {
	// 				if(DEFENSES[j].name === autonDefenseCrossed[i] + "Crossed") {
	// 					autonDefenseCrossedElem.innerHTML = "Defense Crossed: " + DEFENSES[j].display;
	// 				}
	// 			}
	// 			div.get(0).appendChild(matchElem);
	// 			div.get(0).appendChild(autonElem);
	// 			div.get(0).appendChild(autonDefenseCrossedElem);
	// 			div.get(0).appendChild(teleopElem);
	// 			if(teleopPortcullis[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Portcullis Crossed: " + teleopPortcullis[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopCheval[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Cheval Crossed: " + teleopCheval[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopMoat[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Moat Crossed: " + teleopMoat[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopRamparts[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Ramparts Crossed: " + teleopRamparts[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopDrawbridge[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Drawbridge Crossed: " + teleopDrawbridge[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopSallyport[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Sally Port Crossed: " + teleopSallyport[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopRockwall[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Rock Wall Crossed: " + teleopRockwall[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopRoughterrain[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Rough Terrain Crossed: " + teleopRoughterrain[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 			if(teleopLowbar[i] !== 0) {
	// 				var defenseElem = document.createElement("h4");
	// 				defenseElem.innerHTML = "Low Bar Crossed: " + teleopLowbar[i] + " times";
	// 				div.get(0).appendChild(defenseElem);
	// 			}
	// 		}
	// 	}
	// },
	"Auton High Goal": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var success = 0;
			var fail = 0;
			var accuracy = 0;
			var points = new Array();
			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							if(records[i].x.length !== 0) {
								for(var j = 0; j < records[i].x.length; j++) {
									var x = records[i].x;
									var y = records[i].y;
									var type = records[i].type;


									if(type[j] == 10) {
										console.log(type[j],x[j],y[j]);
										points.push({"type":0,"x": x[j],"y":y[j]})
										success++;
										console.log("add");
									}
									else if(type[j] == 11) {
										console.log(type[j],x[j],y[j]);
										points.push({"type":1,"x":x[j],"y":y[j]});
										fail++;
										console.log("add");
									}
								}
							}
						}
					}
				}
			};
			if(points.length === 0) {
				div.append("No Shot Data");
			}
			else {
				generateHeats(robot._id, div.get(0), points);

				var successElement = document.createElement("h3");
				var failElement = document.createElement("h3");
				var totalElement = document.createElement("h3");
				var accuracyElement = document.createElement("h3");

				successElement.innerHTML = "Success: " + success;
				failElement.innerHTML = "Fail: " + fail;
				totalElement.innerHTML = "Total Shots Taken: " + (success + fail);
				accuracyElement.innerHTML = "Accuracy: " + (isNaN(0 / (success + fail)) ? "N/A" : ((success / (success + fail)) * 100).toFixed(2)) + "%";
				div.get(0).appendChild(successElement);
				div.get(0).appendChild(failElement);
				div.get(0).appendChild(totalElement);
				div.get(0).appendChild(accuracyElement);
			}
		}
	},
	"Auton Low Goal": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var success = 0;
			var fail = 0;
			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							success += Number(records[i]["autonLowMade"]);
							fail += Number(records[i]["autonLowMiss"]);
						}
					}
				}
			}

			var successElement = document.createElement("h3");
			var failElement = document.createElement("h3");
			var accuracyElement = document.createElement("h3");
			var div = div.get(0);
			successElement.innerHTML = "Success: " + success;
			failElement.innerHTML = "Fail: " + fail;
			accuracyElement.innerHTML = "Accuracy: " + (isNaN(0 / (success + fail)) ? "N/A" : ((success / (success + fail)) * 100).toFixed(2)) + "%";
			div.appendChild(successElement);
			div.appendChild(failElement);
			div.appendChild(accuracyElement);
		}
	},
	"Teleop Defenses": function(div, team, robot) {
		console.log(robot);
		var portcullis = 0;
		var cheval = 0;
		var moat = 0;
		var ramparts = 0;
		var drawbridge = 0;
		var sallyport = 0;
		var rockwall = 0;
		var roughterrain = 0;
		var lowbar = 0;
		for(var i = 0; i < participations.length; i++) {
			if(robot._id === participations[i].robot_id) {
				for(var j = 0; j < records.length; j++) {
					if(records[j].participation_id === participations[i]._id) {
						//console.log(Number(records[j]["portcullisCrossed"]));
						portcullis += Number(records[j]["portcullisCrossed"]);
						cheval += Number(records[j]["chevalCrossed"]);
						moat += Number(records[j]["moatCrossed"]);
						ramparts += Number(records[j]["rampartsCrossed"]);
						drawbridge += Number(records[j]["drawbridgeCrossed"]);
						sallyport += Number(records[j]["sallyportCrossed"]);
						rockwall += Number(records[j]["rockwallCrossed"]);
						roughterrain += Number(records[j]["roughterrainCrossed"]);
						lowbar += Number(records[j]["lowbarCrossed"]);
					}
				}
			}
		}
		var data = [{
			type: 'bar',
			name: team.number,

			x: DEFENSES.map(def => def.display),
			y: [portcullis, cheval, moat, ramparts, drawbridge, sallyport, rockwall, roughterrain, lowbar]
		}];

		var layout = {
			yaxis: { title: "Frequency"},
			xaxis: { title: "Defenses"},
		};
		Plotly.plot(div.get(0), data, layout);
	},
	"Teleop Defense Ratings": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var portcullis = 0;
			var cheval = 0;
			var moat = 0;
			var ramparts = 0;
			var drawbridge = 0;
			var sallyport = 0;
			var rockwall = 0;
			var roughterrain = 0;
			var lowbar = 0;

			var portcullisRating = 0;
			var chevalRating = 0;
			var moatRating = 0;
			var rampartsRating = 0;
			var drawbridgeRating = 0;
			var sallyportRating = 0;
			var rockwallRating = 0;
			var roughterrainRating = 0;
			var lowbarRating = 0;
			for(var i = 0; i < participations.length; i++) {
				if(robot._id === participations[i].robot_id) {
					for(var j = 0; j < records.length; j++) {
						if(records[j].participation_id === participations[i]._id) {
							if(records[j]["portcullisCrossedRating"] !== "N/A" && records[j]["portcullisCrossedRating"].length !== 0) {
								portcullisRating += Number(records[j]["portcullisCrossedRating"]);
								portcullis++;
							}
							if(records[j]["chevalCrossedRating"] !== "N/A" && records[j]["chevalCrossedRating"].length !== 0) {
								chevalRating += Number(records[j]["chevalCrossedRating"]);
								cheval++;
							}
							if(records[j]["moatCrossedRating"] !== "N/A" && records[j]["moatCrossedRating"].length !== 0) {
								moatRating += Number(records[j]["moatCrossedRating"]);
								moat++;
							}
							if(records[j]["rampartsCrossedRating"] !== "N/A" && records[j]["rampartsCrossedRating"].length !== 0) {
								rampartsRating += Number(records[j]["rampartsCrossedRating"]);
								ramparts++;
							}
							if(records[j]["drawbridgeCrossedRating"] !== "N/A" && records[j]["drawbridgeCrossedRating"].length !== 0) {
								drawbridgeRating += Number(records[j]["drawbridgeCrossedRating"]);
								drawbridge++;
							}
							if(records[j]["sallyportCrossedRating"] !== "N/A" && records[j]["sallyportCrossedRating"].length !== 0) {
								sallyportRating += Number(records[j]["sallyportCrossedRating"]);
								sallyport++;
							}
							if(records[j]["rockwallCrossedRating"] !== "N/A" && records[j]["rockwallCrossedRating"].length !== 0) {
								rockwallRating += Number(records[j]["rockwallCrossedRating"]);
								rockwall++;
							}
							if(records[j]["roughterrainCrossedRating"] !== "N/A" && records[j]["roughterrainCrossedRating"].length !== 0) {
								roughterrainRating += Number(records[j]["roughterrainCrossedRating"]);
								roughterrain++;
							}
							if(records[j]["lowbarCrossedRating"] !== "N/A" && records[j]["lowbarCrossedRating"].length !== 0) {
								lowbarRating += Number(records[j]["lowbarCrossedRating"]);
								lowbar++;
							}
						}
					}
				}
			}

			div.get(0).innerHTML += "Portcullis Rating: " + (isNaN(0 / portcullis) ? "N/A" : (portcullisRating / portcullis).toFixed(2)) + "<br>";
			div.get(0).innerHTML += "Cheval de Frise Rating: " + (isNaN(0 / cheval) ? "N/A" : (chevalRating / cheval).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Moat Rating: " + (isNaN(0 / moat) ? "N/A" : (moatRating / moat).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Ramparts Rating: " + (isNaN(0 / ramparts) ? "N/A" : (rampartsRating / ramparts).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Drawbridge Rating: " + (isNaN(0 / drawbridge) ? "N/A" : (drawbridgeRating / drawbridge).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Sally Port Rating: " + (isNaN(0 / sallyport) ? "N/A" : (sallyportRating / sallyport).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Rock Wall Rating: " + (isNaN(0 / rockwall) ? "N/A" : (rockwallRating / rockwall).toFixed(2))  + "<br>";
			div.get(0).innerHTML += "Rough Terrain Rating: " + (isNaN(0 / roughterrain) ? "N/A" : (roughterrainRating / roughterrain).toFixed(2)) + "<br>";
			div.get(0).innerHTML += "Low Bar Rating: " + (isNaN(0 / lowbar) ? "N/A" : (lowbarRating / lowbar).toFixed(2));
		}
	},
	"Teleop High Goal Over Time": function(div, team, robot) {
		var dataSet = new Array();
		var matches2 = new Array();
		var balls = new Array();
		for(var k = 0; k < participations.length; k++) {
			if(robot._id === participations[k].robot_id) {
				for(var i = 0; i < records.length; i++) {
					if(records[i].participation_id === participations[k]._id) {
						var obj = new Object();
						var count = 0;
						if(records[i].x.length !== 0) {
							for(var j = 0; j < records[i].x.length; j++) {
								if(records[i].type[j] == 20) {
									count++;
								}
							}
						}
						obj.success = count;
						for(var j = 0; j < matches.length; j++) {
							if(matches[j]._id === records[i].match_id) {
								obj.match = matches[j].number.number;
							}
						}
						dataSet.push(obj);
					}
				}
			}
		}
		dataSet.sort(function(a, b) {return a.match - b.match});
		//console.log(dataSet);
		for(var i = 0; i < dataSet.length; i++) {
			matches2.push(dataSet[i].match);
			balls.push(dataSet[i].success);
		}
		var data = [{
			type: 'scatter',
			name: team.number,

			x: matches2,
			y: balls
		}];

		var layout = {
			yaxis: { title: "# High Goals"},
			xaxis: { title: "Match"},
		};

		Plotly.plot(div.get(0), data, layout);
	},
	"Teleop Low Goal Over Time": function(div, team, robot) {
		var dataSet = new Array();
		var matches2 = new Array();
		var balls = new Array();
		for(var k = 0; k < participations.length; k++) {
			if(robot._id === participations[k].robot_id) {
				for(var i = 0; i < records.length; i++) {
					if(records[i].participation_id === participations[k]._id) {
						var obj = new Object();
						obj.success = Number(records[i]["teleopLowMade"]);
						for(var j = 0; j < matches.length; j++) {
							if(matches[j]._id === records[i].match_id) {
								obj.match = matches[j].number.number;
							}
						}
						dataSet.push(obj);
					}
				}
			}
		}
		dataSet.sort(function(a, b) {return a.match - b.match});
		//console.log(dataSet);
		for(var i = 0; i < dataSet.length; i++) {
			matches2.push(dataSet[i].match);
			balls.push(dataSet[i].success);
		}
		var data = [{
			type: 'scatter',
			name: team.number,

			x: matches2,
			y: balls
		}];

		var layout = {
			yaxis: { title: "# Low Goals"},
			xaxis: { title: "Match"},
		};

		Plotly.plot(div.get(0), data, layout);
	},
	"Teleop High Goal": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var success = 0;
			var fail = 0;
			var accuracy = 0;
			var points = new Array();
			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							if(records[i].x.length !== 0) {
								for(var j = 0; j < records[i].x.length; j++) {
									var x = records[i].x;
									var y = records[i].y;
									var type = records[i].type;

									if(type[j] == 20) {
										console.log(type[j],x[j],y[j]);
										points.push({"type":0,"x": x[j],"y":y[j]})
										success++;
										console.log("add");
									}
									else if(type[j] == 21) {
										console.log(type[j],x[j],y[j]);
										points.push({"type":1,"x": x[j],"y":y[j]})
										fail++;
										console.log("add");
									}
								}
							}
						}
					}
				}
			}

			if(points.length === 0) {
				div.append("No Shot Data");
			}
			else {
				generateHeats(robot._id, div.get(0), points);

				var successElement = document.createElement("h3");
				var failElement = document.createElement("h3");
				var totalElement = document.createElement("h3");
				var accuracyElement = document.createElement("h3");

				successElement.innerHTML = "Success: " + success;
				failElement.innerHTML = "Fail: " + fail;
				totalElement.innerHTML = "Total Shots Taken: " + (success + fail);
				accuracyElement.innerHTML = "Accuracy: " + (isNaN(0 / (success + fail)) ? "N/A" : ((success / (success + fail)) * 100).toFixed(2)) + "%";
				div.get(0).appendChild(successElement);
				div.get(0).appendChild(failElement);
				div.get(0).appendChild(accuracyElement);
			}
		}
	},
	"Teleop Low Goal": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var success = 0;
			var fail = 0;
			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							success += Number(records[i]["teleopLowMade"]);
							console.log(records[i]["teleopLowMade"]);
							fail += Number(records[i]["teleopLowMiss"]);
						}
					}
				}
			}

			var successElement = document.createElement("h3");
			var failElement = document.createElement("h3");
			var accuracyElement = document.createElement("h3");
			var div = div.get(0);
			successElement.innerHTML = "Success: " + success;
			failElement.innerHTML = "Fail: " + fail;
			accuracyElement.innerHTML = "Accuracy: " + (isNaN(0 / (success + fail)) ? "N/A" : ((success / (success + fail)) * 100).toFixed(2)) + "%";
			div.appendChild(successElement);
			div.appendChild(failElement);
			div.appendChild(accuracyElement);
		}
	},
	"Challenge": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var dataSet = new Array();

			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							if(records[i]["teleopChallenge"].length !== 0) {
								var obj = new Object;
								for(var j = 0; j < matches.length; j++) {
									if(matches[j]._id === records[i].match_id) {
										obj.match = matches[j].number.number;
										j = matches.length;
									}
								}
								obj.challenge = records[i]["teleopChallenge"];
								dataSet.push(obj);
								//console.log(obj.match,records[i]);
							}
						}
					}
				}
			}
			dataSet.sort(function(a, b) {return a.match - b.match});
			for(var i = 0; i < dataSet.length; i++) {
				var strong = document.createElement("strong");
				strong.innerHTML = "Match " + dataSet[i].match + ": ";
				div.get(0).appendChild(strong);
				div.append(dataSet[i].challenge);
				div.get(0).appendChild(document.createElement("br"));
			}
			//console.log(dataSet);
		}
	},
	"Climb": {
		separateTeams: true,

		callback: function(div, team, robot) {
			var dataSet = new Array();

			for(var k = 0; k < participations.length; k++) {
				if(robot._id === participations[k].robot_id) {
					for(var i = 0; i < records.length; i++) {
						if(records[i].participation_id === participations[k]._id) {
							if(records[i]["teleopClimb"].length !== 0) {
								var obj = new Object;
								for(var j = 0; j < matches.length; j++) {
									if(matches[j]._id === records[i].match_id) {
										obj.match = matches[j].number.number;
										j = matches.length;
									}
								}
								obj.climb = records[i]["teleopClimb"];
								dataSet.push(obj);
								//console.log(obj.match,records[i]);
							}
						}
					}
				}
			}
			dataSet.sort(function(a, b) {return a.match - b.match});
			for(var i = 0; i < dataSet.length; i++) {
				var strong = document.createElement("strong");
				strong.innerHTML = "Match " + dataSet[i].match + ": ";
				div.get(0).appendChild(strong);
				div.append(dataSet[i].climb);
				div.get(0).appendChild(document.createElement("br"));
			}
			//console.log(dataSet);
		}
	}
}
