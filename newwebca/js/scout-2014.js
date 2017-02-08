//Author Vincent Mai
//Author Tiger Huang
//This js file is used to modularly generate inputs for the scouting form.

const DB_NAME = 'match-data';
const DB_VERSION = 6;
const DB_DATA_NAME = 'records1';
const DB_DATA_NAME2 = 'records2';
const DB_MATCH_SCHEDULE_NAME = 'match-schedule';
const DB_CURRENT_COMPETITION = 'current-competition';
const DB_TEAM_NAME = 'team';

defaults_object = {};
var submit_flag = 0;
var db;
var match_number = 0;

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
		requestTeams();
		requestDefaults();
	};
	req.onerror = function (evt) {
		console.error("openDb:", evt.target.errorCode);
	};
	
	req.onupgradeneeded = function (evt) {
		console.log("openDb.onupgradeneeded");
		
		//Creating the main DB table
		//Stores all data except for the shooting position data
		try {
			evt.currentTarget.result.deleteObjectStore(DB_DATA_NAME);
		} catch(err) {}
		var dataStore = evt.currentTarget.result.createObjectStore(
			DB_DATA_NAME, { keyPath: 'id', autoIncrement: true });
		for(var i = 0;i < forms.length;i++) {
			dataStore.createIndex(forms[i].getName(),forms[i].getName(),{unique:false});
		}
		dataStore.createIndex("match_number","match_number",{unique:false});
		dataStore.createIndex("competition_name","competition_name",{unique:false});
		dataStore.createIndex("starting_location","starting_location",{unique:false});

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
		var teamStore = evt.currentTarget.result.createObjectStore(
			DB_MATCH_SCHEDULE_NAME, { keyPath: 'match_number' }
		);
		
		//Is this only for storing the competition?
		try {
			evt.currentTarget.result.deleteObjectStore(DB_CURRENT_COMPETITION);
		} catch(err) {}
		var teamStore = evt.currentTarget.result.createObjectStore(
			DB_CURRENT_COMPETITION, { keyPath: 'competition' }
		);

		//Teams list
		try {
			evt.currentTarget.result.deleteObjectStore(DB_TEAM_NAME);
		} catch(err) {}
		var teamStore = evt.currentTarget.result.createObjectStore(
			DB_TEAM_NAME, { keyPath: 'team' }
		);
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

var forms = new Array();

new generateInput("input","text","form-control")
	.appendToParent(document.getElementById("matchDiv"))
	.setName("Match Number","match_number");
	//.setCustomInputAttribute("onchange","matchLoad(this)");

forms.push(new generateInput("select",undefined,"form-control")
		   .appendToParent(document.getElementById("teamDiv"))
		   .setName("Team Number","team_number"));
forms.push(new generateInput("select",undefined,"form-control")
		   .appendToParent(document.getElementById("allianceDiv"))
		   .setName("Alliance","position")
		   .setSelect(["R1","R2","R3","B1","B2","B3"],"Select a Position")
		   .setCustomInputAttribute("onchange","colorChange()"));
forms.push(new generateInput("select",undefined,"form-control")
		   .appendToParent(document.getElementById("preloadDiv"))
		   .setName("Ball Preloading","ballPreload")
		   .setSelect(["Robot","Field","2 Ball","3 Ball","4 Ball","None"],"Select a Preload"));
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("autonBlockSDiv"))
		   .setName(undefined,"autonBlockS")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Success")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("autonBlockFDiv"))
		   .setName(undefined,"autonBlockF")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Failed")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("pass1Div"))
		   .setName(undefined,"pass1")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Pass 1")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("pass2Div"))
		   .setName(undefined,"pass2")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Pass 2")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("trussThrowSDiv"))
		   .setName(undefined,"trussThrowS")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Successful")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("trussThrowFDiv"))
		   .setName(undefined,"trussThrowF")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Failed")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("trussCatchSDiv"))
		   .setName(undefined,"trussCatchS")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Successful")
		   .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("trussCatchFDiv"))
		   .setName(undefined,"trussCatchF")
		   .setReadOnly()
		   .setInputAddon("input-group-addon","Failed")
		   .setLarge());
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("passingEaseDiv"))
		   .setName("Passing Ease","passingEase"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("receivingEaseRobotDiv"))
		   .setName("Receiving Ease from Robot","receivingEaseRobot"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("receivingEaseHumanDiv"))
		   .setName("Receiving Ease from Human","receivingEaseHuman"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("defensiveAbilityDiv"))
		   .setName("Defensive Ability","defensiveAbility"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("maneuverabilityDiv"))
		   .setName("Maneuverability","maneuverability"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"]).appendToParent(document.getElementById("driveSpeedDiv"))
		   .setName("Drive Speed","driveSpeed"));
forms.push(new generateInput("textarea",undefined,"form-control notes").appendToParent(document.getElementById("notesDiv"))
		   .setName(undefined,"notes"));

function saveData() {
	debug("Saving");
	var obj = new Object();
	obj.match_number = match_number;
	for(var i = 0;i < forms.length;i++) {
		obj[forms[i].getName()] = forms[i].getOutput();
	}
	obj["match_number"] = document.getElementById("match_number").value;
	obj["competition_name"] = defaults_object.name;

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
		getCoordinatePositions(id);
		decSubmit();
		//location.reload();
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
	var startPos = startField.getPositions();
	
	storeCoordinates(startPos,0,id);
	storeCoordinates(autonArr,10,id);
	storeCoordinates(teleopArr,20,id);
}

//This function is used to restore match data saved in the indexedDB to the form itself
//The key is the match_number
//Restore must be true for it to restore to the page
function openData(key,restore) {
	debug("Opening");

	if(key === "0") {
		return;
	}

	//Declare variables to open up records1 DB
	var store = getObjectStore(DB_DATA_NAME, 'readwrite');
	var index = store.index("match_number");
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
								//Restore to starting pos field
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

var teams;

function requestTeams() {
	$.ajax({
		url: "/api/teams",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			teams = new Array();
			var store = getObjectStore(DB_TEAM_NAME, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					teams.push(cursor.value.team);
					cursor.continue();
				}
				else {
					populateList(false);
				}
			}
		},
		success: function(html){
			teams = html;
			var store = getObjectStore(DB_TEAM_NAME, 'readwrite');
			var req = store.openCursor();
			req.onsuccess = function(event) {
				var cursor = this.result;
				if(cursor) {
					store.delete(cursor.value.team);
					cursor.continue();
				}
				else {
					for(var i = 0;i < teams.length;i++) {
						var obj = {team:teams[i].number};
						var req2 = store.put(obj);
					}
				}
			}
			populateList(true);
		}
	});
}

function populateList(online) {
	for(var i = -1;i < teams.length;i++) {
		var select = document.getElementById("team_number");
		var option = document.createElement("option");
		if(i < 0) {
			option.innerHTML = "Select a Team";
			option.selected = true;
			option.disabled = true;
			option.value = 0;
		}
		else {
			if (online){
				option.innerHTML = teams[i].number;
				option.value = teams[i].number;
			}
			else {
				option.innerHTML = teams[i];
				option.value = teams[i];
			}
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
			//console.log(values);
			var x = [];
			var y = [];
			var type = [];

			var store = getObjectStore(DB_DATA_NAME2, "readwrite");
			var index = store.index("data_id");
			var req = index.openCursor(IDBKeyRange.only(id));

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
			alert("Match Submitted!");
			saveData();
		},
		success: function(){
			alert("Match Submitted!");
			saveData();
			uploadData();
			//submitData();
		}
	});
}

var startField;
var autonField;
var teleopField;

function startField() {
	startField = new Touchfield(1,4);
	var div = document.getElementById("startDiv");
	startField.setDomain(0,100,0,50);
	startField.setOffsets(0,0,0,0);
	startField.setSingle(true);
	startField.setImage("img/2014/field.svg");
	startField.setColors([{red:0,green:255,blue:0}]);
	
	startField.appendToParent(div);
}
function autonField() {
	autonField = new Touchfield(3,4);
	var div = document.getElementById("autonShootDiv");
	autonField.setDomain(0,100,0,100);
	autonField.setOffsets(0,0,0,0);
	autonField.setImage("img/2014/fieldred.svg");
	autonField.setColors([{red:0,green:255,blue:0},
						  {red:255,green:255,blue:0},
						  {red:255,green:0,blue:0}]);
	
	autonField.appendToParent(div);
}
function teleopField() {
	teleopField = new Touchfield(2,4);
	var div = document.getElementById("teleopShootDiv");
	teleopField.setDomain(0,100,0,100);
	teleopField.setOffsets(0,0,0,0);
	teleopField.setImage("img/2014/fieldred.svg");
	teleopField.setColors([{red:0,green:255,blue:0},
						   {red:255,green:0,blue:0}]);
	
	teleopField.appendToParent(div);
}

startField();
autonField();
teleopField();
openDb(forms);
