var lastError;
var competitions = [];
var defaults = {};

/* Sends a new competition to the API, fetches new competitions. */
function createCompetition() {
	/* Find the competition name and location entry fields. */
	var newCompetitionNameElement = document.getElementById("newCompetitionName");
	var newCompetitionLocationElement = document.getElementById("newCompetitionLocation");

	/* Grab the values from the name and location entry fields. */
	var newCompetitionName = newCompetitionNameElement.value;
	var newCompetitionLocation = newCompetitionLocationElement.value;

	/* Create a new competition with the given name and location. */
	$.ajax({
		url: "/api/competitions",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"name": newCompetitionName, "location": newCompetitionLocation}),
		processData: false,
		dataType: "json",

		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Big problems!");
			alert(errorThrown);
			lastError = XMLHttpRequest;
		},
		success: function(html) {
			/* Update competition listings and such. */
			getCompetitions();

			/* Reset the competition name and location
			 * entry fields.
			 */
			newCompetitionNameElement.value = "";
			newCompetitionLocationElement.value = "";
		}
	});
}

/* Assume an already-populated competitions list, and reset the select menu
 * with the competitions list.
 */
function populateCompetitionSelect() {
	/* Find the select menu */
	var competitionSelect = document.getElementById("currentCompetitionSelect");
	/* <option default>Select a Default Competition</option> */

	/* Get rid of all of the select menu's DOM children. */
	while(competitionSelect.firstChild) {
		competitionSelect.removeChild(competitionSelect.firstChild);
	}

	/* Create a new placeholder element if we don't have competitions. */
	if(!defaults["competition"]) {
		var newPlaceHolderElement = document.createElement("option");
		newPlaceHolderElement.selected = true;
		newPlaceHolderElement.disabled = true;
		competitionSelect.appendChild(newPlaceHolderElement);
	}

	/* Iterate through the competitions array, 
	for(var i = 0; i < competitions.length; i += 1) {
		competition_i = competitions[i];

		/* Cache the id and name of the competition,
		 * so we don't have to type this over and over again.
		 
		newCompetitionID = competition_i["_id"];
		newCompetitionName = competition_i["name"];

		/* Create a new option, with the value being the id. 
		var newCompetitionElement = document.createElement("option");
		newCompetitionElement.setAttribute("value", newCompetitionID);

		/* Set the displayed text of that option to the competition's name. 
		var newCompetitionTextNode = document.createTextNode(newCompetitionName);

		/* Add the text to the option, and the option to the select menu. 
		newCompetitionElement.appendChild(newCompetitionTextNode);
		competitionSelect.appendChild(newCompetitionElement);
	}
}

/* Assume an already-populated competitions list, and reset the
 * displayed competitions list.
 */
function populateCompetitionList() {
	/* Find the list element */
	var competitionList = document.getElementById("competitionList");

	/* Get rid of all of list element's DOM children. */
	while(competitionList.firstChild) {
		competitionList.removeChild(competitionList.firstChild);
	}

	/* Iterate through the competitions array */
	for(var i = 0; i < competitions.length; i += 1) {
		competition_i = competitions[i];

		/* Cache the oid, name, and location of the competition,
		 * so we don't have to type this over and over again.
		 */
		newCompetitionID = competition_i["_id"];
		newCompetitionName = competition_i["name"];
		newCompetitionLocation = competition_i["location"];

		/* Create a new div for the competition, and an emdash to separate the
		 * competition's name and location.
		 */
		var newCompetitionElement = document.createElement("div");
		var newCompetitionBulletTextNode = document.createTextNode("\u2014");

		/* Create a new bold tag to store the name in, mash the name into
		 * a TextNode, and shove that TextNode into the bold tag.
		 */
		var newCompetitionNameElement = document.createElement("b");
		var newCompetitionNameTextNode = document.createTextNode(newCompetitionName);
		newCompetitionNameElement.appendChild(newCompetitionNameTextNode);

		/* Create a new small tag to store the location in, mash the location into
		 * a TextNode, and shove that TextNode into the small tag.
		 */
		var newCompetitionLocationElement = document.createElement("small");
		var newCompetitionLocationTextNode = document.createTextNode(newCompetitionLocation);
		newCompetitionLocationElement.appendChild(newCompetitionLocationTextNode);

		/* Construct the competition information div. */
		newCompetitionElement.appendChild(newCompetitionNameElement);
		newCompetitionElement.appendChild(newCompetitionBulletTextNode);
		newCompetitionElement.appendChild(newCompetitionLocationElement);

		/* Add the competition information div to the list. */
		competitionList.appendChild(newCompetitionElement);
	}
}

/* Update the indicator of the default competition next to the title. */
function populateCompetitionStylishIndicator() {
	/* Find the stylish indicator. Hunt it down, and flash a carving knife menacingly at it,
	 * with a sadistic grin on your face.
	 */
	var competitionStylishIndicator = document.getElementById("currentCompetitionStylishIndicator");

	/* Carve out the insides of the stylish indicator, leaving nothing but a desolate
	 * shell to fill with wonderful, luscious, up-to-date information.
	 */
	while(competitionStylishIndicator.firstChild) {
		competitionStylishIndicator.removeChild(competitionStylishIndicator.firstChild);
	}

	/* Prepare the wonderful, luscious, up-to-date information in a node to be inserted into the
	 * hollow shell of occult Debian sacrilege.
	 */
	var competitionStylishIndicatorTextNode = null;

	if(defaults["competition"] && defaults["competition"]["name"]) {
		competitionStylishIndicatorTextNode = document.createTextNode(defaults["competition"]["name"]);
	} else {
		competitionStylishIndicatorTextNode = document.createTextNode("<no active competition default, set one>");
	}

	/* Put the new information into the stylish indicator. */
	competitionStylishIndicator.appendChild(competitionStylishIndicatorTextNode);
}

/* Updates lists of the competitions. */
function populateCompetitionListings() {
	populateCompetitionSelect();
	populateCompetitionList();
}

/* Downloads the defaults. */
function getDefaults() {
	$.getJSON("/defaults", function(data) {
		if (data != null) {
			defaults = data;
			populateCompetitionStylishIndicator();
			setSelectedCompetition();
		}
	});
}

//This auto-selects the current competition in the select menu
function setSelectedCompetition() {
	var currentCompetitionSelect = document.getElementById("currentCompetitionSelect");
	//console.log(currentCompetitionSelect.options.length);
	//console.log(defaults["competition"]._id);

	//Iterate through the select menu's options
	for(var i = 0; i < currentCompetitionSelect.options.length;i++) {
		//console.log(currentCompetitionSelect.options[i].value);

		//Check if the default competition value equals an option value
		if(defaults["competition"]._id === currentCompetitionSelect.options[i].value){

			//Select it if true
			currentCompetitionSelect.options[i].selected = true;
			//console.log(currentCompetitionSelect.options[i].value);
		}
	}
}

/* Sends a new default competition. */
function sendNewDefaultCompetition() {
	var currentCompetitionSelect = document.getElementById("currentCompetitionSelect");
	var selectedIndex = currentCompetitionSelect.selectedIndex;
	var selectedOptionElement = currentCompetitionSelect.options[selectedIndex];

	var selectedCompetition = null;
	
	/*competitions[0] = "hehe";
	competitions[1] = 
	competitions[1] = 
	competitions[1] = 
	competitions[1] = 
	competitions[1] = 
	competitions[1] = 
	competitions[1] = */

	for(var i = 0; i < competitions.length; i += 1) {
		competition_i = competitions[i];

		if(selectedOptionElement.value == competition_i["_id"]) {
			selectedCompetition = competition_i;
			break;
		}
	}

	if(selectedCompetition == null) {
		alert("Whoa! Selected an option that doesn't exist in the array! (Refresh might fix it)");
	}

	$.ajax({
		url: "/defaults",
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify({"competition": selectedCompetition}),
		processData: false,
		dataType: "json",
		error: function(XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown) },
		success: function() {
			/* If we succeeded, we can change things without making another query. */
			defaults.competition = selectedCompetition;
			populateCompetitionStylishIndicator();
            setSelectedCompetition();
		}
	});
}

document.getElementById("currentCompetitionSelect").onchange = sendNewDefaultCompetition;

function getCompetitions() {
	$.getJSON("/api/competitions", function(data) {
		if(data != null) {
			competitions = data;
			populateCompetitionListings();
		}
	});
}

getCompetitions();
getDefaults();
