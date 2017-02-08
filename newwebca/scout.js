//This section is used for generating the inputs of the scouting form

const DB_NAME = 'match-data';
const DB_VERSION = 6;
const DB_DATA_NAME = 'records1';
const DB_DATA_NAME2 = 'records2';
const DB_MATCH_SCHEDULE_NAME = 'match-schedule';
const DB_CURRENT_COMPETITION = 'current-competition';
const DB_TEAM_NAME = 'team';

// const DEFENSES = [
// 	{
// 		display: "Portcullis",
// 		name: "portcullisCrossed"
// 	}, {
// 		display: "Cheval De Frise",
// 		name: "chevalCrossed"
// 	}, {
// 		display: "Moat",
// 		name: "moatCrossed"
// 	}, {
// 		display: "Ramparts",
// 		name: "rampartsCrossed"
// 	}, {
// 		display: "Drawbridge",
// 		name: "drawbridgeCrossed"
// 	}, {
// 		display: "Sally Port",
// 		name: "sallyportCrossed"
// 	}, {
// 		display: "Rock Wall",
// 		name: "rockwallCrossed"
// 	}, {
// 		display: "Rough Terrain",
// 		name: "roughterrainCrossed"
// 	}
// ];

//Global variables
defaults_object = {};
var submit_flag = 0;
var db;
var rotated;
// var allianceSelectedDefenses = ["", "", "", ""];
// var enemySelectedDefenses = [{}, {}, {}, {}, {name: "lowbar", display: "Low Bar"}, {name: "none", display: "None"}];
//var match_number = 0;

function incSubmit() {
	submit_flag++;
	console.log(submit_flag);
}
function decSubmit() {
	submit_flag--;
	console.log(submit_flag);
	if (submit_flag == 0) {
		console.log("Reloading!");
		location.reload();
	}
	else {
		console.log("Not all saved yet");
	}
}

function getObjectStore(store_name, mode) {
	var tx = db.transaction(store_name, mode);
	return tx.objectStore(store_name);
}

function openDb(forms) {
	console.log("openDb ...");
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	req.onsuccess = function (evt) {
		// Better use "this" than "req" to get the result to avoid problems with
		// garbage collection
		// db = req.result;
		db = this.result;
		console.log("openDb DONE");
		requestDefaults();
	};
	req.onerror = function (evt) {
		console.error("openDb:", evt.target.errorCode);
	};

	req.onupgradeneeded = function (evt) {
		console.log("openDb.onupgradeneeded");
		console.log(forms);

		//Creating the main DB table
		//Stores all data except for the shooting position data
		try {
			evt.currentTarget.result.deleteObjectStore(DB_DATA_NAME);
		} catch(err) {}
		var dataStore = evt.currentTarget.result.createObjectStore(
			DB_DATA_NAME, { keyPath: 'id', autoIncrement: true });
		for(var i = 0;i < forms.length;i++) {
			console.log(forms[i]);
			if (forms[i].createIndex !== false) { // If undefined, we want this to happen still, hence why we explictly check for "false"
				dataStore.createIndex(forms[i].getName(),forms[i].getName(),{unique:false});
			}
		}

		dataStore.createIndex("match_number","match_number",{unique:false});
		dataStore.createIndex("position","position",{unique:false});

		// DEFENSES.forEach(function(def) {
		// 	dataStore.createIndex(def.name, def.name, { unique: false });
		// 	dataStore.createIndex(def.name + "Rating", def.name + "Rating", { unique: false });
		// });

		//Creating the position table
		//Stores data only for the shooting positions
		try {
			evt.currentTarget.result.deleteObjectStore(DB_DATA_NAME2);
		} catch(err) {}
		var dataStore2 = evt.currentTarget.result.createObjectStore(
			DB_DATA_NAME2, { keyPath: 'id', autoIncrement: true }
		);
		dataStore2.createIndex("x","x",{unique:false});
		dataStore2.createIndex("y","y",{unique:false});
		dataStore2.createIndex("type","type",{unique:false});
		dataStore2.createIndex("data_id","data_id",{unique:false});

		//For match schedules?
		try {
			evt.currentTarget.result.deleteObjectStore(DB_MATCH_SCHEDULE_NAME);
		} catch(err) {}
		var matchStore = evt.currentTarget.result.createObjectStore(
			DB_MATCH_SCHEDULE_NAME, { keyPath: 'match_number' }
		);

		//Is this only for storing the competition?
		try {
			evt.currentTarget.result.deleteObjectStore(DB_CURRENT_COMPETITION);
		} catch(err) {}
		var competitionStore = evt.currentTarget.result.createObjectStore(
			DB_CURRENT_COMPETITION, { keyPath: 'id' }
		);
		competitionStore.createIndex("name","name",{unique:false});

		//Teams list
		try {
			evt.currentTarget.result.deleteObjectStore(DB_TEAM_NAME);
		} catch(err) {}
		var robotStore = evt.currentTarget.result.createObjectStore(
			DB_TEAM_NAME, { keyPath: '_id' }
		);
		robotStore.createIndex("number","number",{unique:false});
		robotStore.createIndex("participation_id","participation_id",{unique:false});
	};
}

var debug_level = 4;
function debug(message,level) {
	if(typeof level == 'undefined') {
		level = 5;
	}
	if(level <= debug_level) {
		if(level < 0) {
			console.error("Level " + level + ": " + message);
		}
		else {
			console.log("Level " + level + ": " + message);
		}
	}
}

function saveData() {
	debug("Saving");
	var obj = new Object();
	obj.match_number = document.getElementById("matchType").value + document.getElementById("matchNumber").value;

	// DEFENSES.forEach(function(def) {
	// 	obj[def.name] = 0;
	// 	obj[def.name + "Rating"] = [];
	// });

	for(var i = 0;i < forms.length;i++) {
		obj[forms[i].getName()] = forms[i].getOutput();
		console.log(forms[i]);
	}

	obj["position"] = getAlliancePosition("alliance") + getAlliancePosition("position");

	saveLocalData();

	var store = getObjectStore(DB_DATA_NAME, 'readwrite');
	var req;
	try {
		req = store.put(obj);
	} catch (e) {
		throw e;
	}
	incSubmit();
	req.onsuccess = function (evt) {
		console.log("Insertion in DB successful");
		var id = evt.target.result;
		console.log(id);
		//getStacks(id);
		getCoordinatePositions(id);
		decSubmit();
		//displayActionSuccess();
		//displayPubList(store);
	};
	req.onerror = function() {
		console.error("DB Insertation error", this.error);
		//displayActionFailure(this.error);
	};
}

function storeCoordinates(arr,offset,id){
	//console.log(arr);
	if (arr.length != 0){
		for (var i = 0;i < arr.length;i++) {
			var obj = new Object();
			obj["x"] = arr[i].x;
			obj["y"] = arr[i].y;
			obj["type"] = arr[i].i + offset;
			obj["data_id"] = id;

			incSubmit();
			var store = getObjectStore(DB_DATA_NAME2, 'readwrite');
			var req;
			try {
				req = store.put(obj);
			} catch (e) {
				throw e;
			}
			req.onsuccess = function (evt) {
				console.log("Insertion in DB successful");
				decSubmit();
			}
		}
	}
}

function getCoordinatePositions(id) {
	var teleopArr = teleopField.getPositions();
	var autonArr = autonField.getPositions();
	//var startPos = startField.getPositions();

	//storeCoordinates(startPos,0,id);
	storeCoordinates(autonArr,10,id);
	storeCoordinates(teleopArr,20,id);
}

//This function is used to restore match data saved in the indexedDB to the form itself
//The key is the match_number
//Restore must be true for it to restore to the page
function openData(key,restore) {
	if(key === "0") {
		return;
	}

	//Declare variables to open up records1 DB
	var store = getObjectStore(DB_DATA_NAME, 'readwrite');
	var index = store.index("match_id");
	var req = index.get(key);

	req.onsuccess = function(evt) {
		var value = this.result;
		console.log(value);
		debug(value);
		if (value) {
			if(restore) {
				debug("Restoring");
				var id = value.id;
				console.log(id);

				//Declare arrays for x, y, type coordinates
				var x = [];
				var y = [];
				var type = [];

				//Declare variables to open records2 DB
				var store = getObjectStore(DB_DATA_NAME2, "readwrite");
				var index = store.index("data_id");
				var req = index.openCursor(IDBKeyRange.only(id));

				//Request successful
				req.onsuccess = function(event) {
					var cursor = this.result;
					if(cursor) {
						//Add the coordinate points to the respective arrays
						console.log("POSITION");
						x.push(cursor.value.x);
						y.push(cursor.value.y);
						type.push(cursor.value.type);
						console.log("pushing values");
						cursor.continue();
					}
					else {
						//console.log(x);
						for(var i = 0; i < x.length; i++){
							//console.log(x[i]);
							//console.log(y[i]);
							//console.log(type[i]);
							if (type[i] >= 20) {
								//Restore to teleop field
							}
							if (type[i] >= 10 && type[i] < 20) {
								//Restore to auton field
							}
							if (type[i] < 10){
								//Restore to starting
	// 	display: "Cheval De Frise", pos field
							}
						}
					}
				}
				for(var i = 0;i < forms.length;i++) {
					var values = value[forms[i].getName()];
					forms[i].setValue(values);
				}
			}
			else {
				debug("Exporting");
			}
		}
		else {
			if(restore) {
				debug("Not in DB, Resetting");
				for(var i = 0;i < forms.length;i++) {
					forms[i].reset();
				}
			}
			else {
				debug("Not in DB, Exporting");
			}
		}
	};
}

var match;
var teams = [];
var robots = [];
var participations = [];

function requestMatch(number) {
	$.ajax({
		url: "/api/matches?competition_id=" + defaults_object._id + "&number=" + number,
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(errorThrown);
		},
		success: function(html){
			match = html;
			console.log(match);
			if(match.length == 0) {
				createMatch(number);
			}
		}
	});
}

function createMatch(number) {
	$.ajax({
		url: "/api/matches",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"number":number, "competition_id":defaults_object._id}),
		processData: false,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(errorThrown);
		},
		success: function(html){
			console.log(html);
			requestMatch(number);
		}
	});
}

function requestTeams() {
	$.ajax({
		url: "/api/competitions/" + defaults_object._id + "/teams",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(errorThrown);
			requestParticipations();
		},
		success: function(html){
			teams = html;
			requestParticipations();
		}
	});
}

function requestParticipations() {
	$.ajax({
		url: "/api/competitions/" + defaults_object._id + "/participations",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(errorThrown);

			requestRobots();
		},
		success: function(html){
			participations = html;

			requestRobots();
		}
	});
}

function requestRobots() {
	$.ajax({
		url: "/api/competitions/" + defaults_object._id + "/robots",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("On error");

			robots = new Array();
			var store = getObjectStore(DB_TEAM_NAME, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					teams.push(cursor.value);
					cursor.continue();
				}
				else {
					console.log("I am called");
					populateList();
				}
			}
		},
		success: function(html){
			console.log(teams);
			robots = html;
			for(var i = 0;i < teams.length;i++) {
				for(var j = 0; j < robots.length; j++) {
					if(teams[i]._id == robots[j].team_id) {
						teams[i].robot_id = robots[j]._id;
					}
					for(var k = 0; k < participations.length; k++) {
						if(teams[i].robot_id == participations[k].robot_id) {
							teams[i].participation_id = participations[k]._id;
						}
					}
				}
			}
			var store = getObjectStore(DB_TEAM_NAME, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					store.delete(cursor.primaryKey);
					cursor.continue();
				}
				else {
					for(var i = 0;i < robots.length;i++) {
						var obj = new Object();

						obj["_id"] = teams[i]._id;
						obj["number"] = teams[i].number;
						obj["participation_id"] = teams[i].participation_id;
						var req2 = store.put(obj);
					}
					populateList();
				}
			}
		}
	});
}

function populateList() {
	teams.sort(setAsc);
	for(var i = -1;i < teams.length;i++) {
		var select = document.getElementById("participation_id");
		var option = document.createElement("option");
		if(i < 0) {
			option.innerHTML = "Select a Team";
			option.selected = true;
			option.disabled = true;
			option.value = 0;
		}
		else {
			console.log("Populating list");
			option.innerHTML = teams[i].number;
			option.value = teams[i].participation_id;
		}
		select.appendChild(option);
	}
}

//This is a debug function
//It restores data saved in the IndexedDB back onto the scouting form
function matchLoad(input){
	var match = input.value;
	openData(match,true);
}

function test(values, id){
	var store = getObjectStore(DB_DATA_NAME2, "readwrite");
	var index = store.index("data_id");
	var req = index.openCursor(IDBKeyRange.only(id));

	var x = [];
	var y = [];
	var type = [];

	incSubmit();
	req.onsuccess = function(event) {
		var cursor = this.result;
		if(cursor) {
			//Add the coordinate points to an array
			console.log("POSITION");
			x.push(cursor.value.x);
			y.push(cursor.value.y);
			type.push(cursor.value.type);
			console.log("pushing values");
			cursor.continue();
		}
		else {
			//Add these array values to the match data object
			values.x = x;
			values.y = y;
			values.type = type;
			console.log(values);
			console.log(x);
			var jsonData = JSON.stringify(values);
			console.log(jsonData);
			incSubmit();
			//Send off the data
			$.ajax({
				url: "/api/records",
				type: "post",
				data: jsonData,
				async: true,
				error: function() {
					console.log("AJAX Request Failed");
				},
				success: function() {
					//These need to be redefined so the data can be deleted
					var store = getObjectStore(DB_DATA_NAME, "readwrite");
					var req = store.openCursor();
					incSubmit();
					req.onsuccess = function(event) {
						var cursor = this.result;
						if(cursor){
							var store2 = getObjectStore(DB_DATA_NAME2, "readwrite");
							var index = store2.index("data_id");
							var req = index.openCursor(IDBKeyRange.only(cursor.value.id));
							incSubmit();
							req.onsuccess = function(event) {
								var cursor = this.result;
								if(cursor) {
									store2.delete(cursor.primaryKey);
									cursor.continue();
								}
								else {
									decSubmit();
								}
							}
							store.delete(cursor.primaryKey);
							cursor.continue();
						}
						else {
							decSubmit();
						}
					}
					decSubmit();
				}
			});
			decSubmit();
		}
	}
	decSubmit();
}

function uploadData(){
	var store = getObjectStore(DB_DATA_NAME, "readwrite");
	var req = store.openCursor();

	incSubmit();
	req.onsuccess = function(event) {
		var cursor = this.result;

		if(cursor) {
			var id = cursor.value["id"];

			//Delete the stupid piece of crap that was causing 500 errors
			delete cursor.value["id"];

			//Okay back to normal again
			var values = cursor.value;
			incSubmit()
			$.ajax({
				url: "/api/matches?competition_id=" + defaults_object._id + "&number=" + values.match_number,
				cache: false,
				async: true,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//alert(errorThrown);
				},
				success: function(html){
					incSubmit()
					match = html;
					console.log(match);
					if(match.length == 0) {
						$.ajax({
							url: "/api/matches",
							type: "POST",
							contentType: "application/json",
							data: JSON.stringify({"number":values.match_number, "competition_id":defaults_object._id}),
							processData: false,
							dataType: "json",
							error: function(XMLHttpRequest, textStatus, errorThrown) {
								//alert(errorThrown);
							},
							success: function(html){
								match = html;
								console.log(match._id);
								values.match_id = match._id;
								test(values, id);
							}
						});
					}
					else {
						values.match_id = match[0]._id;
						test(values, id);
					}
					decSubmit();
				}
			});
			cursor.continue();
		}
		else {
			decSubmit();
		}
	}
}
//End of indexedDB code

function finalSubmit() {
	$.ajax({
		url: "ping",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			saveData();
		},
		success: function(){
			saveData();
			uploadData();
			//submitData();
		}
	});
}

function applyOpts(forms, opts, generatedInput) {
	if (opts.init) {
		opts.init(generatedInput);
	}

	generatedInput.createIndex = opts.createIndex;
	forms.push(generatedInput);
}

function counter(forms, opts) {
	var input = new generateInput("input", "text", "form-control addIncDec")
		.appendToParent(opts.parent.get(0))
		.setName(undefined, opts.name, opts.name)
		.setReadOnly()
		.setInputAddon("input-group-addon", opts.label)
		.setLarge();
		-
		applyOpts(forms, opts, input);
	return input;
}

function checkbox(forms, opts) {
	var input = new generateInput("input", "checkbox", undefined)
		.appendToParent(opts.parent.get(0))
		.setName(undefined, opts.name, opts.name)
		.setInputAddon(undefined, opts.label)
		.setCustomInputAttribute("value", "yes")
		.setCustomDivAttribute("class", "check-box");

	$("#" + opts.name).parent().find("span").replaceWith(function() {
		return $("<label>").text($(this).text());
	});

	applyOpts(forms, opts, input);
	return input;
}

function textarea(forms, opts) {
	var input = new generateInput("textarea", undefined, "form-control")
		.appendToParent(opts.parent.get(0))
		.setName(opts.label, opts.name);

	if (opts.rows) {
		input.setCustomInputAttribute("rows", opts.rows)
	}

	if (opts.cols) {
		input.setCustomInputAttribute("cols", opts.cols)
	}

	applyOpts(forms, opts, input);
	return input;
}

var forms = new Array();

new generateInput("select",undefined,"form-control input-lg")
	.appendToParent(document.getElementById("matchTypeDiv"))
	.setName("Match Type","matchType","matchType")
	.setLabelClass("control-label")
	.setSelect(["qm","qfm","sfm","fm"],["Qualifying","Quarterfinal","Semifinal","Final"],"Select a Match Type")
	.setCustomInputAttribute("data-validation","required")
	.setCustomInputAttribute("data-validation-error-msg","You did not select a match type!");
new generateInput("input","text","form-control input-lg")
	.appendToParent(document.getElementById("matchNumberDiv"))
	.setName("Match #","matchNumber","matchNumber")
	.setLabelClass("control-label")
	.setCustomInputAttribute("data-validation","required")
	.setCustomInputAttribute("data-validation-error-msg","You did not enter a match number!");
forms.push(new generateInput("select",undefined,"form-control input-lg")
		   .appendToParent(document.getElementById("teamDiv"))
		   .setName("Team number","participation_id","participation_id")
		   .setLabelClass("control-label")
		   .setCustomInputAttribute("onchange","changeTeam(this.options[this.selectedIndex].text)")
		   .setCustomInputAttribute("data-validation","required")
		   .setCustomInputAttribute("data-validation-error-msg","You did not enter a team number!"));
new generateCustomOptions("radio", ["1", "2", "3"], false, true).appendToParent(document.getElementById("positionDiv"))
	.setName("Position #","position");
// insert other inputs here!
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
		   .setName("Auton Notes","autonNotes","autonNotes")
		   .setCustomInputAttribute("rows","4")
		   .setCustomInputAttribute("cols","21"));
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
		   .setName("Teleop Notes","teleopNotes","teleopNotes")
		   .setCustomInputAttribute("rows","4")
		   .setCustomInputAttribute("cols","21"));
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
		   .setName("Robot Issues","robotNotes","robotNotes")
		   .setCustomInputAttribute("rows","4")
		   .setCustomInputAttribute("cols","21"));
// forms.push(new generateInput("select", undefined, "form-control input-lg")
// 		   // .appendToParent($("#auton-defense-div").get(0))
// 		   // .setName("Cross Defense","autonDefense","autonDefense")
// 		   // .setCustomInputAttribute("data-validation", "required")
// 		   );
//STARTING

// forms.push(new generateInput("select",undefined,"form-control input-lg alliance-defense-dropdown")
// 		   .appendToParent(document.getElementById("defenseDiv1"))
// 		   .setName("1","allianceDefense_1","allianceDefense_1")
// 		   .setSelect(["portcullis","cheval","moat","ramparts","drawbridge","sallyport","rockwall","roughterrain"],["Portcullis","Cheval de Frise","Moat","Ramparts","Drawbridge","Sally Port","Rock Wall","Rough Terrain"],"Select a Defense")
// 		   .setLabelClass("control-label")
// 		   .setCustomInputAttribute("data-validation","required")
// 		   .setCustomInputAttribute("data-validation-error-msg","You did not select an alliance defense!"));
// forms.push(new generateInput("select",undefined,"form-control input-lg alliance-defense-dropdown")
// 		   .appendToParent(document.getElementById("defenseDiv2"))
// 		   .setSelect(["portcullis","cheval","moat","ramparts","drawbridge","sallyport","rockwall","roughterrain"],["Portcullis","Cheval de Frise","Moat","Ramparts","Drawbridge","Sally Port","Rock Wall","Rough Terrain"],"Select a Defense")
// 		   .setName("2","allianceDefense_2","allianceDefense_2")
// 		   .setLabelClass("control-label")
// 		   .setCustomInputAttribute("data-validation","required")
// 		   .setCustomInputAttribute("data-validation-error-msg","You did not select an alliance defense!"));
// forms.push(new generateInput("select",undefined,"form-control input-lg alliance-defense-dropdown")
// 		   .appendToParent(document.getElementById("defenseDiv3"))
// 		   .setName("3","allianceDefense_3","allianceDefense_3")
// 		   .setSelect(["portcullis","cheval","moat","ramparts","drawbridge","sallyport","rockwall","roughterrain"],["Portcullis","Cheval de Frise","Moat","Ramparts","Drawbridge","Sally Port","Rock Wall","Rough Terrain"],"Select a Defense")
// 		   .setLabelClass("control-label")
// 		   .setCustomInputAttribute("data-validation","required")
// 		   .setCustomInputAttribute("data-validation-error-msg","You did not select an alliance defense!"));
// forms.push(new generateInput("select",undefined,"form-control input-lg alliance-defense-dropdown")
// 		   .appendToParent(document.getElementById("defenseDiv4"))
// 		   .setName("4","allianceDefense_4","allianceDefense_4")
// 		   .setSelect(["portcullis","cheval","moat","ramparts","drawbridge","sallyport","rockwall","roughterrain"],["Portcullis","Cheval de Frise","Moat","Ramparts","Drawbridge","Sally Port","Rock Wall","Rough Terrain"],"Select a Defense")
// 		   .setLabelClass("control-label")
// 		   .setCustomInputAttribute("data-validation","required")
// 		   .setCustomInputAttribute("data-validation-error-msg","You did not select an alliance defense!"));
// AUTON
counter(forms, {
	name: "autonLowMade",
	label: "",
	parent: $("#auton-low-made-div")
});

counter(forms, {
	name: "autonHighMade",
	label: "",
	parent: $("#auton-high-made-div")
});

checkbox(forms, {
	name: "autonGear",
	label: "Loaded Gear",
	parent: $("#auton-gear-div")
});

checkbox(forms, {
	name: "startedWFuel",
	label: "Started with Fuel",
	parent: $("#start-w-fuel")
});
checkbox(forms, {
	name: "startedWGear",
	label: "Started with Gear",
	parent: $("#start-w-gear")
});

checkbox(forms, {
	name: "crossedLine",
	label: "Crossed Base Line",
	parent: $("#crossed-line-div")
});

// TELEOP
counter(forms, {
	name: "teleopLowMade",
	label: "",
	parent: $("#teleop-low-made-div")
});

counter(forms, {
	name: "teleopHighMade",
	label: "Made",
	parent: $("#teleop-high-made-div")
});

// $(".teleop-defense-div").each(function(index) {
// 	counter(forms, {
// 		name: "defense" + (index + 1),
// 		//label: "Defense",
// 		label: index + 1,
// 		parent: $(this),

// 		createIndex: false
// 	});
// });

// forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], false, true).appendToParent(document.getElementById("defense1RatingDiv"))
// 		   .setName(undefined,"defense1Rating"));
// forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], false, true).appendToParent(document.getElementById("defense2RatingDiv"))
// 		   .setName(undefined,"defense2Rating"));
// forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], false, true).appendToParent(document.getElementById("defense3RatingDiv"))
// 		   .setName(undefined,"defense3Rating"));
// forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], false, true).appendToParent(document.getElementById("defense4RatingDiv"))
// 		   .setName(undefined,"defense4Rating"));
// forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], false, true).appendToParent(document.getElementById("lowbarCrossedRatingDiv"))
// 		   .setName(undefined,"lowbarCrossedRating"));
// customOptionsAttribute("lowbarCrossedRating",["data-validation","data-validation-error-msg"],["required","You did not choose a Low Bar rating!"]);

// counter(forms, {
// 	name: "lowbarCrossed",
// 	label: "Low Bar",
// 	parent: $("#teleop-lowbar-div")
// });

// checkbox(forms, {
// 	name: "teleopDefenseStruggle",
// 	label: "Struggled with Defenses",
// 	parent: $("#teleop-struggle")
// });

// textarea(forms, {
// 	name : "teleopDefenseStruggleText",
// 	label: "Defenses Struggled With",
// 	parent: $("#teleop-struggle-text"),
// 	rows: 4,
// 	cols: 30,
// });

counter(forms, {
	name: "teleopMovementBlocks",
	label: "Movement",
	parent: $("#teleop-movement-blocks")
});

counter(forms, {
	name: "teleopScoringBlocks",
	label: "Scoring",
	parent: $("#teleop-scoring-blocks")
});

/*
  checkbox(forms, {
  name: "teleopChallenge",
  label: "Challenged",
  parent: $("#teleop-challenge")
  });

  checkbox(forms, {
  name: "teleopClimb",
  label: "Climbed",
  parent: $("#teleop-climb")
  });*/

// forms.push(new generateCustomOptions("radio", ["Success","Fail", "None"], false, true).appendToParent(document.getElementById("teleop-challenge"))
// 		   .setName("Challenge Attempt","teleopChallenge"));
// customOptionsAttribute("teleopChallenge",["data-validation","data-validation-error-msg"],["required","You did not choose whether the robot attempted to Challenge!"]);
forms.push(new generateCustomOptions("radio", ["Success","Fail", "None"], false, true).appendToParent(document.getElementById("teleop-climb"))
		   .setName("Climb Attempt","teleopClimb"));
customOptionsAttribute("teleopClimb",["data-validation","data-validation-error-msg"],["required","You did not choose whether the robot attempted to Climb!"]);
// PENALTY
counter(forms, {
	name: "fouls",
	label: "Fouls",
	parent: $("#foul-div")
});

counter(forms, {
	name: "techFouls",
	label: "Tech Fouls",
	parent: $("#tech-foul-div")
});

counter(forms, {
	name: "yellowCards",
	label: "Yellow Cards",
	parent: $("#yellow-card-div")
});

counter(forms, {
	name: "redCards",
	label: "Red Cards",
	parent: $("#red-card-div")
});

checkbox(forms, {
	name: "disabled",
	label: "Disabled",
	parent: $("#disabled-div")
});

//plus and minus button functions
function increment(name) {
	var num = parseInt(document.getElementById(name).value);
	document.getElementById(name).value = num + 1;
}
function decrement(name) {
	var num = parseInt(document.getElementById(name).value);
	if(num > 0) {
		document.getElementById(name).value = num - 1;
	}
}

//functions for auton start and end positions
var alliance = "";
function changeAlliance(input) {
	//var temp = alliance;
	var val = input.value;
	// if(alliance === "" && val === "Blue") {
	// 	autonField.setXInverted(!Xinverted);
	// 	autonField.setYInverted(!Yinverted);
	// 	teleopField.setXInverted(!Xinverted);
	// 	teleopField.setYInverted(!Yinverted);
	// 	Xinverted = !Xinverted;
	// 	Yinverted = !Yinverted;
	// }

	// if(alliance !== "") {
	// 	console.log(alliance);
	// 	autonField.setXInverted(!Xinverted);
	// 	autonField.setYInverted(!Yinverted);
	// 	teleopField.setXInverted(!Xinverted);
	// 	teleopField.setYInverted(!Yinverted);
	// 	Xinverted = !Xinverted;
	// 	Yinverted = !Yinverted;
	// }

	// if(val === "Red"){
	// 	alliance = "red";
	// 	setTeamRed(rotated);
	// }
	// else {
	// 	alliance = "blue";
	// 	setTeamBlue(rotated);
	// }

	// document.getElementById("allianceSpan").innerHTML = val ? val.substring(0, 1) : "?";
	// //document.getElementById("allianceDefenseSpan").innerHTML = val ? val : "?";
	// if(val === "Red") {
	// 	document.getElementById("allianceDefenseSpan").innerHTML = "Red";
	// 	document.getElementById("allianceDefenseSpan").className = "label label-danger";
	// 	document.getElementById("enemyAllianceDefenseSpan").innerHTML = "Blue";
	// 	document.getElementById("enemyAllianceDefenseSpan").className = "label label-primary";
	// }
	// else {
	// 	console.log(rotated);
	// 	document.getElementById("allianceDefenseSpan").innerHTML = "Blue";
	// 	document.getElementById("allianceDefenseSpan").className = "label label-primary";
	// 	document.getElementById("enemyAllianceDefenseSpan").innerHTML = "Red";
	// 	document.getElementById("enemyAllianceDefenseSpan").className = "label label-danger";
	// }
}

function changePosition(input) {
	var val = input.value;
	document.getElementById("positionSpan").innerHTML = val || "?";
}

function changeTeam(text) {
	document.getElementById("teamSpan").innerHTML = text || "?";
}

var teleopField;
var autonField;

////////////////////////////////////////
// Auton Shooting Field ///////////////
////////////////////////////////////////

function autonField() {
	autonField = new Touchfield(2,4);
	var div = document.getElementById("autonShootDiv");

	autonField.setDomain(0,100,0,100);
	autonField.setOffsets(0,0,0,0);
	autonField.setImage("img/2016/red.png");
	autonField.setColors([{red:0,green:255,blue:0},
						  {red:255,green:0,blue:0}]);

	autonField.appendToParent(div);
}

////////////////////////////////////////
// Teleop Shooting Field ///////////////
////////////////////////////////////////

function teleopField() {
	teleopField = new Touchfield(2,4);
	var div = document.getElementById("teleopShootDiv");

	teleopField.setDomain(0,100,0,100);
	teleopField.setOffsets(0,0,0,0);
	teleopField.setImage("img/2016/red.png");
	teleopField.setColors([{red:0,green:255,blue:0},
						   {red:255,green:0,blue:0}]);

	teleopField.appendToParent(div);
}

////////////////////////////////////////
// Save position ///////////////////////
////////////////////////////////////////

//Restore data to the page upon load
$(document).ready(function() {
	restoreAlliancePosition("alliance");
	restoreAlliancePosition("position");
	restoreMatchType();
	restoreRotation();
});

$(window).resize(function() {
	$('.shootCircle').each(function() {
		if($(this).parent().width() > 100) {
			$('.shootCircle').css('font-size', $(this).parent().width() * ((0.02157164869 + 0.0233463035) / 2));
			return false;
		}
	});
});

window.onbeforeunload = function(){ window.scrollTo(0,0); }

//Retrieve the data from the localStorage
function retrieveLocalData(key) {
	var value = localStorage.getItem(key);
	console.log(key + " => " + value);
	return value;
}

//Restore data from the localStorage back to the page
function restoreAlliancePosition(key){
	var input = document.getElementsByName(key);
	var value = retrieveLocalData(key);
	for (i = 0; i < input.length; i++) {
		if (input[i].value === value) {
			input[i].checked = true;
			var title = input[i].parentNode;
			title.className += " active";
		}
	}

	if(key === "alliance"){
		if(value === "Blue"){
			alliance = "blue";
			setTeamBlue(rotated);
			autonField.setXInverted(!Xinverted);
			autonField.setYInverted(!Yinverted);
			teleopField.setXInverted(!Xinverted);
			teleopField.setYInverted(!Yinverted);
			Xinverted = !Xinverted;
			Yinverted = !Yinverted;
			// document.getElementById("allianceDefenseSpan").innerHTML = "Blue";
			// document.getElementById("allianceDefenseSpan").className = "label label-primary";
			// document.getElementById("enemyAllianceDefenseSpan").innerHTML = "Red";
			// document.getElementById("enemyAllianceDefenseSpan").className = "label label-danger";
		}
		else if(value === "Red"){
			alliance = "red";
			setTeamRed(rotated);
			// document.getElementById("allianceDefenseSpan").innerHTML = "Red";
			// document.getElementById("allianceDefenseSpan").className = "label label-danger";
			// document.getElementById("enemyAllianceDefenseSpan").innerHTML = "Blue";
			// document.getElementById("enemyAllianceDefenseSpan").className = "label label-primary";
		}
		else
			setTeamRed(rotated);
		//console.log("Changing start field");
	}

	if (typeof value === "string"){
		//console.log("restore");
		document.getElementById(key + "Span").innerHTML = value === "undefined" ? "?" : value.substring(0, 1);
	}
}

//Grabs the values from the custom radio buttons for alliance and position
//This function also gets used in saveData()
function getAlliancePosition(key) {
	var input = document.getElementsByName(key);
	var value;
	for (i = 0; i < input.length; i++) {
		if (input[i].checked) {
			value = input[i].value;
			console.log(value);
		}
	}
	return value;
}

//Time to store stuff
function saveLocalData() {
	localStorage.setItem("alliance", getAlliancePosition("alliance"));
	localStorage.setItem("position", getAlliancePosition("position"));
	localStorage.setItem("matchType", getMatchType());
	localStorage.setItem("fieldRotated", rotated);
	console.log("Position saved");
}

////////////////////////////////////////
// End save position ///////////////////
////////////////////////////////////////

//Function that gets the match type
function getMatchType() {
	var input = document.getElementById("matchType");
	var value = input.value;
	console.log(value);
	return value;
}

//Function that restores the match type
function restoreMatchType() {
	var input = document.getElementById("matchType");
	var value = retrieveLocalData("matchType");
	if(value !== null){
		input.value = value;
	}
	else {
		input.value = "0";
	}
}

//Function that restores whether the starting field is rotated or not
function restoreRotation() {
	rotated = JSON.parse(retrieveLocalData("fieldRotated"));
	console.log(Xinverted, Yinverted);

	var startImage = document.getElementById('map-img');
	var autonImage = autonField.getImage();
	var teleopImage = teleopField.getImage();

	if (rotated !== null) {
		console.log(rotated);
		if(rotated) {
			startImage.src = "./img/2016/field_flipped.png";
			autonField.setXInverted(!Xinverted);
			autonField.setYInverted(!Yinverted);
			teleopField.setXInverted(!Xinverted);
			teleopField.setYInverted(!Yinverted);
			Xinverted = !Xinverted;
			Yinverted = !Yinverted;
			console.log(alliance);
			if(alliance === "blue") {
				autonField.setImage("./img/2016/red_flipped.png");
				teleopField.setImage("./img/2016/red_flipped.png");
			}
			else {
				autonField.setImage("./img/2016/blue_flipped.png");
				teleopField.setImage("./img/2016/blue_flipped.png");
			}
			/*autonImage.style.WebkitTransform = "rotate(180deg)";
			  autonImage.style.msTransform = "rotate(180deg)";
			  autonImage.style.transform = "rotate(180deg)";
			  teleopImage.style.WebkitTransform = "rotate(180deg)";
			  teleopImage.style.msTransform = "rotate(180deg)";
			  teleopImage.style.transform = "rotate(180deg)";*/
			//autonField.setImage("./img/" + YEAR + "/" + fieldblue"
		}
		else {
			// startImage.src = "./img/2016/field.png";
			autonField.setXInverted(Xinverted);
			autonField.setYInverted(Yinverted);
			teleopField.setXInverted(Xinverted);
			teleopField.setYInverted(Yinverted);
		}
	}
	else {
		console.log("rotated is null");
		autonField.setYInverted(false);
		teleopField.setYInverted(false);
		rotated = false;
	}
}

function setRotation(rotated) {
	var startImage = document.getElementById('map-img');
	var autonImage = autonField.getImage();
	var teleopImage = teleopField.getImage();
	if(rotated) {
		startImage.src = "./img/2016/field_flipped.png";
		/*autonImage.style.WebkitTransform = "rotate(180deg)";
		  autonImage.style.msTransform = "rotate(180deg)";
		  autonImage.style.transform = "rotate(180deg)";
		  teleopImage.style.WebkitTransform = "rotate(180deg)";
		  teleopImage.style.msTransform = "rotate(180deg)";
		  teleopImage.style.transform = "rotate(180deg)";*/
		if(alliance === "blue") {
			autonField.setImage("./img/2016/red_flipped.png");
			teleopField.setImage("./img/2016/red_flipped.png");
		}
		else {
			autonField.setImage("./img/2016/blue_flipped.png");
			teleopField.setImage("./img/2016/blue_flipped.png");
		}
	}
	else {
		startImage.src = "./img/2016/field.png";
		/*startImage.style.WebkitTransform = "none";
		  autonImage.style.WebkitTransform = "none";
		  autonImage.style.msTransform = "none";
		  autonImage.style.transform = "none";
		  teleopImage.style.WebkitTransform = "none";
		  teleopImage.style.msTransform = "none";
		  teleopImage.style.transform = "none";*/
		if(alliance === "blue") {
			autonField.setImage("./img/2016/red.png");
			teleopField.setImage("./img/2016/red.png");
		}
		else {
			autonField.setImage("./img/2016/blue.png");
			teleopField.setImage("./img/2016/blue.png");
		}
	}
	autonField.setXInverted(!Xinverted);
	autonField.setYInverted(!Yinverted);
	teleopField.setXInverted(!Xinverted);
	teleopField.setYInverted(!Yinverted);
	Xinverted = !Xinverted;
	Yinverted = !Yinverted;
}

function rotateField() {
	rotated = !rotated;
	setRotation(rotated);
}

//Functions to be run at the start
openDb(forms);
autonField();
teleopField();
//////////////////////////////////

var Xinverted = teleopField.getXInverted();
var Yinverted = teleopField.getYInverted();

//Functions that add custom attributes to the customOptions
//These are necessary because it's a pain to add attributes to each input in a group

customOptionsAttribute("position",["onchange","data-validation","data-validation-error-msg"],["changePosition(this);","required","You did not select a position!"]);
