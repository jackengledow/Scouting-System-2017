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

//Diagnostics function
function submitTestData() {
	data = {};
	data["team_number"] = "1";
	data["match_number"] = "qm2";
	data["position"] = "B3"
	//data["position"] = {"alliance":"blue","number":"1"};

	data["competition_name"] = defaults_object.name;

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
	Defaults.get({
		error: function(XMLHttpRequest) {
			defaults_object = new Object();
			var store = getObjectStore(DB_CURRENT_COMPETITION, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					defaults_object = {_id:cursor.value,name:cursor.value.name};
					cursor.continue();
				}
				else {
					requestTeams();
					requestRobots();
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
					store.delete(cursor.value.id);
					cursor.continue();
				}
				else {
					var obj = {id:data.competition._id,name:data.competition.name};
					var req2 = store.put(obj);
				}
			}
			requestTeams();
			requestRobots();
		}
	});
}
