function getVal(o) {
	return $(o).val();
}

function getCoords(arr,offset){
	for (var i = 0;i < arr.length;i++) {
		console.log((arr[i].x));
		console.log((arr[i].y));
		console.log((arr[i].i + offset));

		data["x"].push((arr[i].x));
		data["y"].push((arr[i].y));
		data["type"].push((arr[i].i + offset));
	}
}

function submitData() {
	var teleopArr = teleopField.getPositions();
	var autonArr = autonField.getPositions();
	var startPos = startField.getPositions();

	data = {};
	$(".form-control").map(function() {
		data[$(this).prop("id")] = getVal($(this));
	});
	data["startPos"] = $("input:radio[name=startPos]:checked").val();
	data["passingEase"] = $("input:radio[name=passingEase]:checked").val();
	data["receivingEaseRobot"] = $("input:radio[name=receivingEaseRobot]:checked").val();
	data["receivingEaseHuman"] = $("input:radio[name=receivingEaseHuman]:checked").val();
	data["defensiveAbility"] = $("input:radio[name=defensiveAbility]:checked").val();
	data["maneuverability"] = $("input:radio[name=maneuverability]:checked").val();
	data["driveSpeed"] = $("input:radio[name=driveSpeed]:checked").val();
	data["x"] = [];
	data["y"] = [];
	data["type"] = [];

	getCoords(startPos,0);
	getCoords(autonArr,10);
	getCoords(teleopArr,20);

	data["competition"] = defaults_object;

	var jsonData = JSON.stringify(data);
	console.log(jsonData);
	console.log(submit_flag);
	submit_flag++;
	$.ajax({
		url: "/api/records",
		type: "post",
		data: jsonData,
		error: function() {
			console.log("Submission Failed");										 
		},
		success: function() {
			console.log("Data Submitted");
			submit_flag--;
			console.log(submit_flag);
			//location.reload();
			if (submit_flag == 0) {
				console.log("Reloading!");
				location.reload();
			}
			else {
				console.log("We have an issue.");
			}
		}
	});
}

function syncData() {
	submitData();
	location.reload();
}
function requestDefaults() {
	$.ajax({
		url: "/defaults",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			var store = getObjectStore(DB_CURRENT_COMPETITION, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					defaults_object = cursor.value;
					cursor.continue();
				}
			}
		},
		success: function(html){
			data = html;
			console.log(data.competition.name);
			defaults_object = data.competition;
			var store = getObjectStore(DB_CURRENT_COMPETITION, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					store.delete(cursor.value.competition);
					cursor.continue();
				}
				else {
					var obj = {competition:data.competition.name};
					var req2 = store.put(obj);
				}
			}
		}
	});
}

