const DB_NAME = 'scouting-db';
const DB_VERSION = 6;
var db;

//Global variables for the data
var data = new Object();            //Object for all the data pulled directly from indexeddb
//These variable arrays change upon selecting an active competition
//var competitions = new Array();
var teams = new Array();            //Array for all the competition-selected teams
var robots = new Array();           //Array for all the competition-selected robots
var matches = new Array();          //Array for all the competition-selected matches
var participations = new Array();   //Array for all the competition-selected participations
var records = new Array();          //Array for all the competition-selected records

//Function to easily get an object store from indexedDB
function getObjectStore(store_name, mode) {
	var tx = db.transaction(store_name, mode);
	return tx.objectStore(store_name);
}

//Function to open indexedDB and create the proper tables
function openDb(data) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	console.log("openDb ...");
	req.onsuccess = function (evt) {
		// Better use "this" than "req" to get the result to avoid problems with
		// garbage collection
		// db = req.result;
		db = this.result;
		console.log("openDb DONE");
		loadData(data);
	};
	req.onerror = function (evt) {
		console.error("openDb:", evt.target.errorCode);
	};

	req.onupgradeneeded = function (evt) {
		console.log("openDb.onupgradeneeded");
		if(data != null) {
			var keys = Object.keys(data);

			keys.forEach(function(e,i,a) {
				try {
					evt.currentTarget.result.deleteObjectStore(e);
				} catch(err) {}
				var dataStore = evt.currentTarget.result.createObjectStore(
					e, { keyPath: '_id' });
				var keys = Object.keys(data[e][0]);
				keys.forEach(function(e,i,a) {
					if(e != '_id') {
						dataStore.createIndex(e,e,{unique:false});
					}
				},this);
			},this);
		}
	};
}

//Load the requested data into indexedDB
function loadData(data) {
	if(data != null) {
		var keys = Object.keys(data);

		keys.forEach(function(e,i,a) {
			var store = getObjectStore(e,'readwrite');
			var keys = Object.keys(data[e]);

			keys.forEach(function(e2,i2,a2) {
				store.put(data[e][e2]);
			},this);
		},this);
	}
	dbToData();
}

//This function optains all the data from the data dump page
function requestData() {
	$.ajax({
		//url: "../dump.json",
		url: "api/dump",
		cache: false,
		async: true,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			openDb(null);
			alert("No connection");
		},
		success: function(html){
			var data = html;
			console.log(data);
			openDb(data);
		}
	});
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

//Populate the competition selector with competitions
function populateCompetitions() {
	var compSelect = document.getElementById("workingComp");
	for(var i = -1; i < data.competitions.length; i++) {
		var option = document.createElement("option");
		if(i < 0) {
			option.innerHTML = "All";
			option.selected = true;
			option.value = 0;
		}
		else {
			option.innerHTML = data.competitions[i].name;
			option.value = data.competitions[i]._id;
		}
		compSelect.appendChild(option);
	}
}

var onLoadSeparationFlag = 0; //flag to help determine when to separate all the data into the global data object

//Function that opens indexedDB, accesses all the objectstore names, and then calls a function to access the objectstores
function dbToData(){
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (evt) {
		var db = req.result;
		//console.log(db.objectStoreNames);
		var keys = db.objectStoreNames;
		for(var i = 0; i < keys.length; i++) {
			onLoadSeparationFlag++;
			data[keys[i]] = new Array();
			//console.log(keys[i]);
			//console.log(JSON.stringify(data));
			pushData(keys[i]);
		}
	}
}

//Function that accesses the objectstore that is defined by its paramater and stores the data within that objectstore into the data object
function pushData(key){
	var store = getObjectStore(key, "readonly");
	store.openCursor().onsuccess = function(event) {
		var cursor = this.result;
		if (cursor) {
			data[key].push(cursor.value);
			cursor.continue();
		}
		else {
			if(key === "competitions"){
				populateCompetitions();
			}
			onLoadSeparationFlag--;
			if(!onLoadSeparationFlag)
				separateData("0");
		}
	};
}

//Function that calls other functions to separate all the competition-selected data into their respective global variable arrays
function separateData(id){
	var robots_temp = new Array(); //temporary robots array that will be used before the teams are sorted by numerical order
	if(id === "0") {
		matches = data["matches"];
		participations = data["participations"];
	}
	else {
		matches = [];
		participations = [];
		pushToArray("matches", matches, id);
		pushToArray("participations", participations, id);
	}

	teams = [];
	robots = [];
	robots_temp = [];
	records = [];
	linkArrays("records", "match_id", "_id", records, matches);
	linkArrays("robots", "_id", "robot_id", robots_temp, participations);
	linkArrays("teams", "_id", "team_id", teams, robots_temp);

	teams.sort(setAsc); //sort the teams by numerical order
	//matches.sort(function(a, b) {return a.number.number - b.number.number});
	//Sort the robots in the same order as the teams are sorted
	for(var i = 0; i < teams.length; i++) {
		for(var j = 0; j < robots_temp.length; j++) {
			if(teams[i]._id === robots_temp[j].team_id) {
				robots.push(robots_temp[j]);
			}
		}
	}

	findClimbers();
	findGoodHighGoalers();
	findGoodLowGoalers();
	findlAutons();
	createTables();
	populateTeamsSelectors(true);
}

function pushToArray(key, array, id){
	//array = []; this did not work for some reason
	for(var i = 0; i < data[key].length; i++){
		if(data[key][i].competition_id === id){
			//console.log("Match!");
			array.push(data[key][i]);
		}
	}
}

function linkArrays(key, key2, key3, array, array2){
	for(var i = 0; i < data[key].length; i++) {
		//console.log(data[key][i][key2]);
		for(var j = 0; j < array2.length; j++){
			if(data[key][i][key2] === array2[j][key3]) {
				//console.log("Match!");
				array.push(data[key][i]);
				j = array2.length;
			}
		}
	}
}

////////////////////// Added visualization functions below this line /////////////////////

//Populate any teams selectors with teams
function populateTeamsSelectors(change) {
	//var select = document.getElementById("singleTeam");
	var select = $(".teams").map((index, element) => element);
	for(var j = 0; j < select.length; j++) {
		if(!select[j].firstChild || change) {
			while (select[j].firstChild) {
				select[j].removeChild(select[j].firstChild);
			}
			for(var i = -1; i < robots.length; i++) {
				var option = document.createElement("option");
				if(i < 0) {
					option.innerHTML = "Select a Team";
					option.selected = true;
					option.disabled = true;
					option.value = 0;
				}
				else {
					option.innerHTML = teams[i].number; //This might need to change to account for if there's ever a case (which there shouldn't be) where we have more teams than we have robots
					option.value = robots[i]._id;
				}
				select[j].appendChild(option);
			}
		}
	}
}
// UI Logic
var compareTeams = $("#compare-teams");

var generalGraphList = $("#general-graph-list");
var compareGraphList = $("#compare-graph-list");

var generalSpace = $("#general-stats .graph-space");
var compareSpace = $("#compare .graph-space");

function addGraphButton(toDiv, className, graph) {
	var graphButtonDiv = $("<div>")
			.attr("data-toggle", "buttons")
			.addClass("btn-group")
			.addClass(className);

	var graphLabel = $("<label>")
			.addClass("btn btn-default btn-lg")
			.append($("<input>")
					.prop("type", "checkbox"))
			.append(graph);

	graphButtonDiv.append(graphLabel);
	toDiv.append(graphButtonDiv);
}

function addGraph(toDiv, graphs, graphName, opts) {
	var graphCallback = graphs[graphName];
	var separateTeams = false;

	if (typeof graphCallback === "object") {
		separateTeams = graphCallback.separateTeams;
		graphCallback = graphCallback.callback;
	}
	var graphDiv = $("<div>")
			.addClass("panel panel-default")
			.data("name", graphName);
	var graphBody = $("<div>").addClass("panel-body");

	if (opts.useTeams) {
		compareTeams.find("select").each(function() {
			var value = $(this).find("option:selected").val();
			var robot = robots.find(robot => robot._id == $(this).val());
			var team = teams.find(team => team._id === robot.team_id);

			var targetDiv = graphBody;
			if (separateTeams || separateTeamGraphsBtn.is(":checked")) {
				targetDiv = $("<div class='panel-data'>");
				graphBody.append(targetDiv);
			}

			graphCallback(targetDiv, team, robot);
			if (separateTeams || separateTeamGraphsBtn.is(":checked")) {
				targetDiv.prepend($("<h2>").text("Team " + team.number));
			}
		});
	} else {
		graphCallback(graphBody);
	}

	graphDiv.prepend($("<div>").text(graphName).addClass("panel-heading datavis"));
	graphDiv.append(graphBody);

	toDiv.append(graphDiv);
}

function addTeamSelect() {
	var select = $("<select>").addClass("form-control teams");
	select.change(updateCompareGraphs);
	compareTeams.append(select);
	populateTeamsSelectors(false);

	updateCompareGraphs();
}

function removeTeamSelect() {
	if (compareTeams.children().length > 1) {
		compareTeams.find("select").last().remove();
		updateCompareGraphs();
	}
}

function updateGraphs(graphList, graphSpace, graphDefs, opts) {
	graphSpace.empty();

	graphList.find("input:checked").each(function() {
		var graphName = $(this).parent().text();
		addGraph(graphSpace, graphDefs, graphName, opts);
	});
}

function updateGeneralGraphs() {
	updateGraphs(generalGraphList, generalSpace, generalGraphs, {
		useTeams: false
	});
}

function updateCompareGraphs() {
	updateGraphs(compareGraphList, compareSpace, compareGraphs, {
		useTeams: true
	});
}

var separateTeamGraphsBtn = $("#separate-teams");

Object.keys(generalGraphs).forEach(addGraphButton.bind(this, generalGraphList, "general-graph-btn"));
Object.keys(compareGraphs).forEach(addGraphButton.bind(this, compareGraphList, "compare-graph-btn"));

$(".general-graph-btn input").change(updateGeneralGraphs);
$(".compare-graph-btn input").change(updateCompareGraphs);

function generateHeats(robot_id, teamCompare, points) {
	var success = 0;
	var fail = 0;
	var accuracy = 0;
	var heatmap;
	var div = document.createElement("div");

	teamCompare.appendChild(div);

	heatmap = new Heatmap(2,50,50); //Change the 2nd and 3rd params to adjust the resolution
	heatmap.setDomain(0,100,0,100);
	heatmap.setOffsets(0,0,0,0);
	heatmap.setImage("img/2016/blue.png");
	heatmap.setColors([{red:0,green:255,blue:0},{red:255,green:0,blue:0}]);

	for(var i = 0; i < points.length; i++){
		heatmap.addPoint(points[i].type,points[i].x,points[i].y);
	}

	heatmap.process();
	console.log("process");
	heatmap.appendToParent(div);
	console.log("append");

	return div;
}

addTeamSelect();
requestData();
