function createTables() {
	var dataSet = new Array();
	for(var i = 0; i < robots.length; i++) {
		var obj = new Object();
		var autonLowSuccess = 0;
		var autonLowFail = 0;
		var autonHighSuccess = 0;
		var autonHighFail = 0;

		var teleopLowSuccess = 0;
		var teleopLowFail = 0;
		var teleopLowAvg = 0;
		var teleopHighSuccess = 0;
		var teleopHighFail = 0;
		var teleopHighAvg = 0;

		// var autonPortcullis = 0;
		// var autonCheval = 0;
		// var autonMoat = 0;
		// var autonRamparts = 0;
		// var autonDrawbridge = 0;
		// var autonSallyport = 0;
		// var autonRockwall = 0;
		// var autonRoughterrain = 0;
		// var autonLowbar = 0;

		// var teleopPortcullis = 0;
		// var teleopCheval = 0;
		// var teleopMoat = 0;
		// var teleopRamparts = 0;
		// var teleopDrawbridge = 0;
		// var teleopSallyport = 0;
		// var teleopRockwall = 0;
		// var teleopRoughterrain = 0;
		// var teleopLowbar = 0;

		// var portcullisRatingCount = 0;
		// var chevalRatingCount = 0;
		// var moatRatingCount = 0;
		// var rampartsRatingCount = 0;
		// var drawbridgeRatingCount = 0;
		// var sallyportRatingCount = 0;
		// var rockwallRatingCount = 0;
		// var roughterrainRatingCount = 0;
		// var lowbarRatingCount = 0;
		// var portcullisRating = 0;
		// var chevalRating = 0;
		// var moatRating = 0;
		// var rampartsRating = 0;
		// var drawbridgeRating = 0;
		// var sallyportRating = 0;
		// var rockwallRating = 0;
		// var roughterrainRating = 0;
		// var lowbarRating = 0;

		var totalMatches = 0;

		for(var j = 0; j < teams.length; j++) {
			if(robots[i].team_id === teams[j]._id)
				obj.number = teams[j].number;
		}
		for(var k = 0; k < participations.length; k++) {
			if(robots[i]._id === participations[k].robot_id) {
				for(var l = 0; l < records.length; l++) {
					if(records[l].participation_id === participations[k]._id) {
						totalMatches++;
						autonLowSuccess += Number(records[l]["autonLowMade"]);
						autonLowFail += Number(records[l]["autonLowMiss"]);
						teleopLowSuccess += Number(records[l]["teleopLowMade"]);
						teleopLowFail += Number(records[l]["teleopLowMiss"]);
						if(records[l].x.length !== 0) {
							for(var m = 0; m < records[l].x.length; m++) {
								var type = records[l].type;

								if(type[m] == 10) {
									autonHighSuccess++;
								}
								else if(type[m] == 11) {
									autonHighFail++;
								}
								else if(type[m] == 20) {
									teleopHighSuccess++;
								}
								else if(type[m] == 21) {
									teleopHighFail++;
								}
							}
						}
						// if(records[l]["autonDefense"] === "portcullis") {
						// 	autonPortcullis++;
						// }
						// else if(records[l]["autonDefense"] === "cheval") {
						// 	autonCheval++;
						// }
						// else if(records[l]["autonDefense"] === "moat") {
						// 	autonMoat++;
						// }
						// else if(records[l]["autonDefense"] === "ramparts") {
						// 	autonRamparts++;
						// }
						// else if(records[l]["autonDefense"] === "drawbridge") {
						// 	autonDrawbridge++;
						// }
						// else if(records[l]["autonDefense"] === "sallyport") {
						// 	autonSallyport++;
						// }
						// else if(records[l]["autonDefense"] === "rockwall") {
						// 	autonRockwall++;
						// }
						// else if(records[l]["autonDefense"] === "roughterrain") {
						// 	autonRoughterrain++;
						// }
						// else if(records[l]["autonDefense"] === "lowbar") {
						// 	autonLowbar++;
						// }
						// teleopPortcullis += Number(records[l]["portcullisCrossed"]);
						// teleopCheval += Number(records[l]["chevalCrossed"]);
						// teleopMoat += Number(records[l]["moatCrossed"]);
						// teleopRamparts += Number(records[l]["rampartsCrossed"]);
						// teleopDrawbridge += Number(records[l]["drawbridgeCrossed"]);
						// teleopSallyport += Number(records[l]["sallyportCrossed"]);
						// teleopRockwall += Number(records[l]["rockwallCrossed"]);
						// teleopRoughterrain += Number(records[l]["roughterrainCrossed"]);
						// teleopLowbar += Number(records[l]["lowbarCrossed"]);
						// if(records[l]["portcullisCrossedRating"] !== "N/A" && records[l]["portcullisCrossedRating"].length !== 0) {
						// 	portcullisRating += Number(records[l]["portcullisCrossedRating"]);
						// 	portcullisRatingCount++;
						// }
						// if(records[l]["chevalCrossedRating"] !== "N/A" && records[l]["chevalCrossedRating"].length !== 0) {
						// 	chevalRating += Number(records[l]["chevalCrossedRating"]);
						// 	chevalRatingCount++;
						// }
						// if(records[l]["moatCrossedRating"] !== "N/A" && records[l]["moatCrossedRating"].length !== 0) {
						// 	moatRating += Number(records[l]["moatCrossedRating"]);
						// 	moatRatingCount++;
						// }
						// if(records[l]["rampartsCrossedRating"] !== "N/A" && records[l]["rampartsCrossedRating"].length !== 0) {
						// 	rampartsRating += Number(records[l]["rampartsCrossedRating"]);
						// 	rampartsRatingCount++;
						// }
						// if(records[l]["drawbridgeCrossedRating"] !== "N/A" && records[l]["drawbridgeCrossedRating"].length !== 0) {
						// 	drawbridgeRating += Number(records[l]["drawbridgeCrossedRating"]);
						// 	drawbridgeRatingCount++;
						// }
						// if(records[l]["sallyportCrossedRating"] !== "N/A" && records[l]["sallyportCrossedRating"].length !== 0) {
						// 	sallyportRating += Number(records[l]["sallyportCrossedRating"]);
						// 	sallyportRatingCount++;
						// }
						// if(records[l]["rockwallCrossedRating"] !== "N/A" && records[l]["rockwallCrossedRating"].length !== 0) {
						// 	rockwallRating += Number(records[l]["rockwallCrossedRating"]);
						// 	rockwallRatingCount++;
						// }
						// if(records[l]["roughterrainCrossedRating"] !== "N/A" && records[l]["roughterrainCrossedRating"].length !== 0) {
						// 	roughterrainRating += Number(records[l]["roughterrainCrossedRating"]);
						// 	roughterrainRatingCount++;
						// }
						// if(records[l]["lowbarCrossedRating"] !== "N/A" && records[l]["lowbarCrossedRating"].length !== 0) {
						// 	lowbarRating += Number(records[l]["lowbarCrossedRating"]);
						// 	lowbarRatingCount++;
						// }
					}
				}
			}
		}

		// var combinedPortcullis = autonPortcullis + teleopPortcullis;
		// var combinedCheval = autonCheval + teleopCheval;
		// var combinedMoat = autonMoat + teleopMoat;
		// var combinedRamparts = autonRamparts + teleopRamparts;
		// var combinedDrawbridge = autonDrawbridge + teleopDrawbridge;
		// var combinedSallyport = autonSallyport + teleopSallyport;
		// var combinedRockwall = autonRockwall + teleopRockwall;
		// var combinedRoughterrain = autonRoughterrain + teleopRoughterrain;
		// var combinedLowbar = autonLowbar + teleopLowbar;

		obj.autonLowSuccess = autonLowSuccess;
		obj.autonLowFail = autonLowFail;
		obj.autonLowTotal = autonLowSuccess + autonLowFail;
		obj.autonLowAccuracy = isNaN(0 / (autonLowSuccess + autonLowFail)) ? "0.00" : ((autonLowSuccess / (autonLowSuccess + autonLowFail)) *  100).toFixed(2);
		obj.autonHighSuccess = autonHighSuccess;
		obj.autonHighFail = autonHighFail;
		obj.autonHighTotal = autonHighSuccess + autonHighFail;
		obj.autonHighAccuracy = isNaN(0 / (autonHighSuccess + autonHighFail)) ? "0.00" : ((autonHighSuccess / (autonHighSuccess + autonHighFail)) *  100).toFixed(2);

		obj.teleopLowSuccess = teleopLowSuccess;
		obj.teleopLowFail = teleopLowFail;
		obj.teleopLowTotal = teleopLowSuccess + teleopLowFail;
		obj.teleopLowAccuracy = isNaN(0 / (teleopLowSuccess + teleopLowFail)) ? "0.00" : ((teleopLowSuccess / (teleopLowSuccess + teleopLowFail)) *  100).toFixed(2);
		obj.teleopLowAvg = teleopLowSuccess / totalMatches;
		obj.teleopHighSuccess = teleopHighSuccess;
		obj.teleopHighFail = teleopHighFail;
		obj.teleopHighTotal = teleopHighSuccess + teleopHighFail;
		obj.teleopHighAccuracy = isNaN(0 / (teleopHighSuccess + teleopHighFail)) ? "0.00" : ((teleopHighSuccess / (teleopHighSuccess + teleopHighFail)) *  100).toFixed(2);
		obj.teleopHighAvg = teleopHighSuccess / totalMatches;

		// obj.autonPortcullis = autonPortcullis;
		// obj.autonCheval = autonCheval;
		// obj.autonTypeA = autonPortcullis + autonCheval;

		// obj.autonMoat = autonMoat;
		// obj.autonRamparts = autonRamparts;
		// obj.autonTypeB = autonMoat + autonRamparts;

		// obj.autonDrawbridge = autonDrawbridge;
		// obj.autonSallyport = autonSallyport;
		// obj.autonTypeC = autonDrawbridge + autonSallyport;

		// obj.autonRockwall = autonRockwall;
		// obj.autonRoughterrain = autonRoughterrain;
		// obj.autonTypeD = autonRockwall + autonRoughterrain;

		// obj.autonLowbar = autonLowbar;

		// obj.teleopPortcullis = teleopPortcullis;
		// obj.teleopCheval = teleopCheval;
		// obj.teleopTypeA = teleopPortcullis + teleopCheval;

		// obj.teleopMoat = teleopMoat;
		// obj.teleopRamparts = teleopRamparts;
		// obj.teleopTypeB = teleopMoat + teleopRamparts;

		// obj.teleopDrawbridge = teleopDrawbridge;
		// obj.teleopSallyport = teleopSallyport;
		// obj.teleopTypeC = teleopDrawbridge + teleopSallyport;

		// obj.teleopRockwall = teleopRockwall;
		// obj.teleopRoughterrain = teleopRoughterrain;
		// obj.teleopTypeD = teleopRockwall + teleopRoughterrain;

		// obj.teleopLowbar = teleopLowbar;

		// obj.combinedPortcullis = combinedPortcullis;
		// obj.combinedCheval = combinedCheval;
		// obj.combinedTypeA = combinedPortcullis + combinedCheval;

		// obj.combinedMoat = combinedMoat;
		// obj.combinedRamparts = combinedRamparts;
		// obj.combinedTypeB = combinedMoat + combinedRamparts;

		// obj.combinedDrawbridge = combinedDrawbridge;
		// obj.combinedSallyport = combinedSallyport;
		// obj.combinedTypeC = combinedDrawbridge + combinedSallyport;

		// obj.combinedRockwall = combinedRockwall;
		// obj.combinedRoughterrain = combinedRoughterrain;
		// obj.combinedTypeD = combinedRockwall + combinedRoughterrain;

		// obj.combinedLowbar = combinedLowbar;

		// obj.portcullisRating = isNaN(0 / portcullisRatingCount) ? "0.00" : (portcullisRating / portcullisRatingCount).toFixed(2);
		// obj.chevalRating = isNaN(0 / chevalRatingCount) ? "0.00" : (chevalRating / chevalRatingCount).toFixed(2);
		// obj.moatRating = isNaN(0 / moatRatingCount) ? "0.00" : (moatRating / moatRatingCount).toFixed(2);
		// obj.rampartsRating = isNaN(0 / rampartsRatingCount) ? "0.00" : (rampartsRating / rampartsRatingCount).toFixed(2);
		// obj.drawbridgeRating = isNaN(0 / drawbridgeRatingCount) ? "0.00" : (drawbridgeRating / drawbridgeRatingCount).toFixed(2);
		// obj.sallyportRating = isNaN(0 / sallyportRatingCount) ? "0.00" : (sallyportRating / sallyportRatingCount).toFixed(2);
		// obj.rockwallRating = isNaN(0 / rockwallRatingCount) ? "0.00" : (rockwallRating / rockwallRatingCount).toFixed(2);
		// obj.roughterrainRating = isNaN(0 / roughterrainRatingCount) ? "0.00" : (roughterrainRating / roughterrainRatingCount).toFixed(2);
		// obj.lowbarRating = isNaN(0 / lowbarRatingCount) ? "0.00" : (lowbarRating / lowbarRatingCount).toFixed(2);

		dataSet.push(obj);
	}

	if($.fn.DataTable.isDataTable('#table-shoot')) {
		$('#table-auton-defenses').DataTable().destroy();
		$('#table-auton-defenses').empty();
		$('#table-teleop-defenses').DataTable().destroy();
		$('#table-teleop-defenses').empty();
		$('#table-combined-defenses').DataTable().destroy();
		$('#table-combined-defenses').empty();
		$('#table-defense-ratings').DataTable().destroy();
		$('#table-defense-ratings').empty();
		$('#table-shoot').DataTable().destroy();
		$('#table-shoot').empty();
	}

	$('#table-auton-defenses').DataTable( {
		data: dataSet,
		paging: false,
		columns: [
			{ data: 'number', title: 'Number'},
			// { data: 'autonPortcullis', title: 'Portcullis' },
			// { data: 'autonCheval', title: 'Cheval' },
			// { data: 'autonTypeA', title: 'Type A' },
			// { data: 'autonMoat', title: 'Moat' },
			// { data: 'autonRamparts', title: 'Ramparts' },
			// { data: 'autonTypeB', title: 'Type B' },
			// { data: 'autonDrawbridge', title: 'Drawbridge' },
			// { data: 'autonSallyport', title: 'Sally Port' },
			// { data: 'autonTypeC', title: 'Type C' },
			// { data: 'autonRockwall', title: 'Rock Wall' },
			// { data: 'autonRoughterrain', title: 'Rough Terrain' },
			// { data: 'autonTypeD', title: 'Type D' },
			// { data: 'autonLowbar', title: 'Low Bar' }
		]
	})
	$('#table-teleop-defenses').DataTable( {
		data: dataSet,
		paging: false,
		columns: [
			{ data: 'number', title: 'Number'},
			// { data: 'teleopPortcullis', title: 'Portcullis' },
			// { data: 'teleopCheval', title: 'Cheval' },
			// { data: 'teleopTypeA', title: 'Type A' },
			// { data: 'teleopMoat', title: 'Moat' },
			// { data: 'teleopRamparts', title: 'Ramparts' },
			// { data: 'teleopTypeB', title: 'Type B' },
			// { data: 'teleopDrawbridge', title: 'Drawbridge' },
			// { data: 'teleopSallyport', title: 'Sallyport' },
			// { data: 'teleopTypeC', title: 'Type C' },
			// { data: 'teleopRockwall', title: 'Rock Wall' },
			// { data: 'teleopRoughterrain', title: 'Rough Terrain' },
			// { data: 'teleopTypeD', title: 'Type D' },
			// { data: 'teleopLowbar', title: 'Low Bar' }
		]
	})
	$('#table-combined-defenses').DataTable( {
		data: dataSet,
		paging: false,
		columns: [
			{ data: 'number', title: 'Number'},
			// { data: 'combinedPortcullis', title: 'Portcullis' },
			// { data: 'combinedCheval', title: 'Cheval' },
			// { data: 'combinedTypeA', title: 'Type A' },
			// { data: 'combinedMoat', title: 'Moat' },
			// { data: 'combinedRamparts', title: 'Ramparts' },
			// { data: 'combinedTypeB', title: 'Type B' },
			// { data: 'combinedDrawbridge', title: 'Drawbridge' },
			// { data: 'combinedSallyport', title: 'Sally Port' },
			// { data: 'combinedTypeC', title: 'Type C' },
			// { data: 'combinedRockwall', title: 'Rock Wall' },
			// { data: 'combinedRoughterrain', title: 'Rough Terrain' },
			// { data: 'combinedTypeD', title: 'Type D' },
			// { data: 'combinedLowbar', title: 'Low Bar' }
		]
	})
	$('#table-defense-ratings').DataTable( {
		data: dataSet,
		paging: false,
		columns: [
			{ data: 'number', title: 'Number'},
			// { data: 'portcullisRating', title: 'Portcullis' },
			// { data: 'chevalRating', title: 'Cheval' },
			// { data: 'moatRating', title: 'Moat' },
			// { data: 'rampartsRating', title: 'Ramparts' },
			// { data: 'drawbridgeRating', title: 'Drawbridge' },
			// { data: 'sallyportRating', title: 'Sally Port' },
			// { data: 'rockwallRating', title: 'Rock Wall' },
			// { data: 'roughterrainRating', title: 'Rough Terrain' },
			// { data: 'lowbarRating', title: 'Low Bar' }
		]
	})
	$('#table-shoot').DataTable( {
		data: dataSet,
		paging: false,
		columns: [
			{ data: 'number', title: 'Number'},
			{ data: 'autonLowTotal', title: 'Auton Attempted Low Goals' },
			{ data: 'autonLowAccuracy', title: 'Auton Low Goal Accuracy (%)' },
			{ data: 'autonHighTotal', title: 'Auton Attempted High Goals' },
			{ data: 'autonHighAccuracy', title: 'Auton High Goal Accuracy (%)' },
			{ data: 'teleopLowTotal', title: 'Teleop Attempted Low Goals' },
			{ data: 'teleopLowAccuracy', title: 'Teleop Low Goal Accuracy (%)' },
			{ data: 'teleopLowAvg', title: 'Average Successful Low Goals / Match' },
			{ data: 'teleopHighTotal', title: 'Teleop Attempted High Goals' },
			{ data: 'teleopHighAccuracy', title: 'Teleop High Goal Accuracy (%)' },
			{ data: 'teleopHighAvg', title: 'Average Successful Teleop High Goals / Match' }
		]
	})
}

/*function test(input) {
	if(input.checked) {
		console.log(input.value);
	}
	//return input.value;
}*/
