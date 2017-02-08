//This section is used for generating the inputs of the scouting form

const DB_NAME = 'match-data';
const DB_VERSION = 6;
const DB_DATA_NAME = 'records1';
const DB_DATA_NAME2 = 'records2';
const DB_MATCH_SCHEDULE_NAME = 'match-schedule';
const DB_CURRENT_COMPETITION = 'current-competition';
const DB_TEAM_NAME = 'team';

//Global variables
defaults_object = {};
var submit_flag = 0;
var db;
var rotated;
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
        dataStore.createIndex("position","position",{unique:false});
        //dataStore.createIndex("robotScored","robotScored",{unique:false});
        dataStore.createIndex("competition_name","competition_name",{unique:false});
        dataStore.createIndex("starting_location","starting_location",{unique:false});
        dataStore.createIndex("before","before",{unique:false});
        dataStore.createIndex("after","after",{unique:false});
        dataStore.createIndex("scored","scored",{unique:false});
        dataStore.createIndex("toteLocation","toteLocation",{unique:false});

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
        var competitionStore = evt.currentTarget.result.createObjectStore(
            DB_CURRENT_COMPETITION, { keyPath: 'id' }
        );
        competitionStore.createIndex("name","name",{unique:false});

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

function saveData() {
    debug("Saving");
    var obj = new Object();
    obj.match_number = document.getElementById("matchType").value + document.getElementById("matchNumber").value;
    for(var i = 0;i < forms.length;i++) {
        obj[forms[i].getName()] = forms[i].getOutput();
    }
    //obj["match_number"] = document.getElementById("match_number").value;

    obj["position"] = getAlliancePosition("alliance") + getAlliancePosition("position");
    obj["competition_name"] = defaults_object.name;

    var before = [];
    var after = [];
    var scored = [];
    var location = [];

    for(var i = 0;i < beforeList.length;i++) {
        if (beforeList[i] >= 0) {
            before.push(beforeList[i]);
        }
        if (afterList[i] >= 0) {
            after.push(afterList[i]);
        }
        if (scoredList[i] >= 0) {
            scored.push(scoredList[i]);
        }
        if (scoredList[i] != -1) {
            location.push(locationList[i]);
        }
    }

    obj["before"] = before;
    obj["after"] = after;
    obj["scored"] = scored;
    obj["toteLocation"] = location;

    /*if (document.getElementById("robotScored").checked) {
      obj["robotScored"] = document.getElementById("robotScored").value;
      }
      else {
      obj["robotScored"] = "";
      }*/

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
    var startPos = startField.getPositions();

    storeCoordinates(startPos,0,id);
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
        url: "/api/competitions/" + defaults_object._id + "/teams",
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
    teams.sort(setAsc);
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
            saveData();
        },
        success: function(){
            saveData();
            uploadData();
            //submitData();
        }
    });
}

var forms = new Array();

new generateInput("select",undefined,"form-control input-lg")
    .appendToParent(document.getElementById("matchTypeDiv"))
    .setName("Match Type","matchType")
    .setLabelClass("control-label")
    .setSelect(["qm","qfm","sfm","fm"],["Qualifying","Quarterfinal","Semifinal","Final"],"Select a Match Type")
    .setCustomInputAttribute("data-validation","required")
    .setCustomInputAttribute("data-validation-error-msg","You did not select a match type!");
new generateInput("input","text","form-control input-lg")
    .appendToParent(document.getElementById("matchNumberDiv"))
    .setName("Match Number","matchNumber")
    .setLabelClass("control-label")
    .setCustomInputAttribute("data-validation","required")
    .setCustomInputAttribute("data-validation-error-msg","You did not enter a match number!");
forms.push(new generateInput("select",undefined,"form-control input-lg")
           .appendToParent(document.getElementById("teamDiv"))
           .setName("Team Number","team_number")
           .setLabelClass("control-label")
           .setCustomInputAttribute("onchange","changeTeam(this)")
           .setCustomInputAttribute("data-validation","required")
    .setCustomInputAttribute("data-validation-error-msg","You did not enter a team number!"));
new generateCustomOptions("radio", ["1", "2", "3"], false).appendToParent(document.getElementById("positionDiv"))
    .setName("Position Number","position");
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("autonTotesDiv"))
           .setName(undefined,"autonTotes")
           .setReadOnly()
           .setInputAddon("input-group-addon","Totes")
           .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("autonBinsDiv"))
           .setName(undefined,"autonBins")
           .setReadOnly()
           .setInputAddon("input-group-addon","Bins")
           .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("noodlesLandfillDiv"))
           .setName(undefined,"noodlesLandfill")
           .setReadOnly()
           .setInputAddon("input-group-addon","Noodles")
           .setLarge());
forms.push(new generateInput("input","text","form-control addIncDec").appendToParent(document.getElementById("coopTotesDiv"))
           .setName(undefined,"coopTotes")
           .setReadOnly()
           .setInputAddon("input-group-addon","Totes")
           .setLarge());
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], true).appendToParent(document.getElementById("stackingEaseDiv"))
           .setName("Stacking Ease","stackingEase"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], true).appendToParent(document.getElementById("scoringEaseDiv"))
           .setName("Scoring Ease","scoringEase"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], true).appendToParent(document.getElementById("orientAbilityDiv"))
           .setName("Ability to Orient Totes/Bins","orientAbility"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], true).appendToParent(document.getElementById("noodleAbilityDiv"))
           .setName("Ability to Move Noodles to Landfill","noodleAbility"));
forms.push(new generateCustomOptions("radio", ["N/A","1","2","3","4","5"], true).appendToParent(document.getElementById("maneuverabilityDiv"))
           .setName("Maneuverability","maneuverability"));
/*new generateCustomOptions("radio", ["N/A","Landfill","Human Player Zone"], false).appendToParent(document.getElementById("totePickupDiv"))
  .setName("Tote Pickup Location","totePickup");*/
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
           .setName("Auton Notes","autonNotes")
           .setCustomInputAttribute("rows","4")
           .setCustomInputAttribute("cols","21"));
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
           .setName("Teleop Notes","teleopNotes")
           .setCustomInputAttribute("rows","4")
           .setCustomInputAttribute("cols","21"));
forms.push(new generateInput("textarea",undefined,"form-control").appendToParent(document.getElementById("notesDiv"))
           .setName("Robot Issues","robotNotes")
           .setCustomInputAttribute("rows","4")
           .setCustomInputAttribute("cols","21"));



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
var ctx;
var redFieldImg;
var blueFieldImg;
var alliance = "red";
var numStacks = 0;
function changeAlliance(input) {
    //var temp = alliance;
    var val = input.value;

    if(val === "Red"){
        alliance = "red";
        setTeamRed();
    }
    else {
        alliance = "blue";
        setTeamBlue();
    }
    console.log(Xinverted);
    startField.setXInverted(!Xinverted);
    Xinverted = !Xinverted;

    document.getElementById("allianceSpan").innerHTML = val ? val.substring(0, 1) : "?";
}

function changePosition(input) {
    var val = input.value;
    document.getElementById("positionSpan").innerHTML = val || "?";
}

function changeTeam(input) {
    var val = input.value;
    document.getElementById("teamSpan").innerHTML = val || "?";
}

//functions to manage drop down menu for stack scouting

var teleopCtx;
var periodicTableImage;
var beforeIndex = -1;
var afterIndex = -1;
var selectingBefore = true;
//this is the periodic table of stacks except more structured
//format: [# totes, # bins, # noodles, total points]
var list = [[0, 0, 0, 0],
            [1, 0, 0, 2],
            [2, 0, 0, 4],
            [3, 0, 0, 6],
            [4, 0, 0, 8],
            [5, 0, 0, 10],
            [6, 0, 0, 12],
            [0, 1, 0, 0],
            [1, 1, 0, 6],
            [2, 1, 0, 12],
            [3, 1, 0, 18],
            [4, 1, 0, 24],
            [5, 1, 0, 30],
            [6, 1, 0, 36],
            [0, 1, 1, 6],
            [1, 1, 1, 12],
            [2, 1, 1, 18],
            [3, 1, 1, 24],
            [4, 1, 1, 30],
            [5, 1, 1, 36],
            [6, 1, 1, 42]];

//the list of the stack list with only the data we need to pass:
//[before index, after index, scored]
var beforeList = [];
var afterList = [];
var scoredList = [];
var locationList = [];
//the list of all stack indices that were not deleted.
//These are all of the indices in stackList that actually have values.
var stackIndices = [];

function getPosition(element) {
    //finds position of element
    var elemRect = element.getBoundingClientRect();
    return {x: elemRect.left, y: elemRect.top };
}

function pressRemoveButton(button) {
    var num = button.id;
    for(var i = 0; i < stackIndices.length; i++) {
        if(stackIndices[i] == num) {
            stackIndices.splice(i, 1);
            break;
        }
    }
    beforeList[num] = -1;
    afterList[num] = -1;
    scoredList[num] = -1;
    locationList[num] = -1;
    var stackRow = document.getElementById("stackRow" + num);
    stackRow.parentElement.removeChild(stackRow);
}

function pressSubmitButton() {
    //check to make sure that data is valid for submission
    if(beforeIndex > -1 && afterIndex > -1) {
        var numTotes = list[afterIndex][0] - list[beforeIndex][0];
        var numBins = list[afterIndex][1] - list[beforeIndex][1];
        var numNoodles = list[afterIndex][2] - list[beforeIndex][2];
        var isScored = (document.getElementById("robotScored").checked ? "yes" : "no");
        var toteLocation = function() {
            var value;
            var input = document.getElementsByName("totePickup")
            for (i = 0; i < input.length; i++) {
                if (input[i].type === "radio"){
                    if (input[i].checked) {
                        value = input[i].value;
                        console.log(value);
                    }
                }
            }
            return value;
        }

        //now for the serious stuff
        var div = document.getElementById("stacks");
        div.innerHTML = div.innerHTML +
            "<div class='row' id='stackRow" + numStacks + "'>" +
            "<div class='col-md-2'>" +
            "<span>" + numTotes + "</span>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "<span>" + numBins + "</span>" +
            "</div>" +
            "<div class='col-md-3'>" +
            "<span>" + numNoodles + "</span>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "<span>" + isScored + "</span>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "<span>" + toteLocation() + "</span>" +
            "</div>" +
            "<div class='col-md-1'>" +
            "<input type='button' value='×' class='removeButton' id='" + numStacks + "' onclick='pressRemoveButton(this)'></div>" +
            "</div>" +
            "</div>";
        stackIndices.push(numStacks);
        beforeList[numStacks] = beforeIndex;
        afterList[numStacks] = afterIndex;
        scoredList[numStacks] = (isScored === "yes") ? 1 : 0;
        locationList[numStacks] = toteLocation();

        numStacks++;
        deselectAll();
    }
}
function pressCancelButton() {
    deselectAll();
}
function deselectAll() {
    beforeIndex = -1;
    afterIndex = -1;
    selectingBefore = true;
    //document.getElementById("robotScored").checked = false;
    var input = document.getElementById("robotScored");
    if (input.checked) {
        input.checked = false;
        var title = input.parentNode;
        title.className = "btn btn-default btn-lg";
    }
    var locationInput = document.getElementsByName("totePickup");
    for (i = 0; i < locationInput.length; i++) {
        if (locationInput[i].checked) {
            locationInput[i].checked = false;
            var title = locationInput[i].parentNode;
            title.className = "btn btn-default btn-lg";
        }
    }
}
function select(box) {
    if(box.className === "tote" || box.className === "bin" || box.className === "noodle") {
        box.className += " selected";
    }else {
        box.className = box.className.replace(" selected", "");
    }
}

function startTeleopCanvas() {
    var teleopCanvas = document.getElementById("teleopCanvas");
    teleopCtx = teleopCanvas.getContext("2d");
    periodicTableImage = document.getElementById("periodicTableImage");
    teleopCanvas.addEventListener("click", teleopClick, false);
    teleopLoop();
}
function teleopLoop() {
    //draw background
    teleopCtx.fillStyle = "#ccc";
    teleopCtx.fillRect(0, 0, 525, 300);
    //draw periodic table of stacks
    for(var i = 0; i < list.length; i++) {
        var numTotes = list[i][0];
        var numBins = list[i][1];
        var numNoodles = list[i][2];
        var totalPoints = list[i][3];
        var xValue = i*25;
        var yValue = 250;
        //show selected stack
        if(i == beforeIndex) {
            teleopCtx.fillStyle = "#ff8888";
            teleopCtx.fillRect(xValue, 0, 25, 300);
        }else if(i == afterIndex) {
            teleopCtx.fillStyle = "#8888ff";
            teleopCtx.fillRect(xValue, 0, 25, 300);
        }
        //draws periodic table
        teleopCtx.drawImage(periodicTableImage, 0, 0);
        teleopCtx.fillStyle = "#000";
        teleopCtx.font = "14px Georgia";
        teleopCtx.fillText(""+totalPoints, xValue+6, 295);
    }
    //draw line border around canvas area
    teleopCtx.strokeStyle = "#000";
    teleopCtx.rect(0, 0, 525, 300);
    teleopCtx.stroke();
    //repeat
    setTimeout(teleopLoop, 50);
}
function teleopClick(event) {
    var parentPosition = getPosition(event.currentTarget);
    if(selectingBefore) {
        var temp = beforeIndex;
        beforeIndex = Math.floor((event.clientX - parentPosition.x)/25);
        if(beforeIndex == afterIndex) {
            beforeIndex = temp;
            selectingBefore = !selectingBefore;
        }
    }else {
        var temp = afterIndex;
        afterIndex = Math.floor((event.clientX - parentPosition.x)/25);
        if(beforeIndex == afterIndex) {
            afterIndex = temp;
            selectingBefore = !selectingBefore;
        }
    }
    selectingBefore = !selectingBefore;
}

////////////////////////////////////////
// Starting Field //////////////////////
////////////////////////////////////////

var startField;

function startField() {
    startField = new Touchfield(1,4);
    var div = document.getElementById("startDiv");
    startField.setDomain(0,100,0,100);
    startField.setOffsets(0,0,0,0);
    startField.setDouble(true);
    startField.setImage("img/2015/fieldred.png");
    startField.setColors([{red:0,green:190,blue:0},
                          {red:132,green:0,blue:168}]);

    startField.appendToParent(div);
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

window.onbeforeunload = function(){ window.scrollTo(0,0); }

//Retrieve the data from the localStorage
function retrieveLocalData(blah) {
    var value = localStorage.getItem(blah);
    console.log(blah + " => " + value);
    return value;
}

//Restore data from the localStorage back to the page
function restoreAlliancePosition(blah){
    var input = document.getElementsByName(blah);
    var value = retrieveLocalData(blah);
    for (i = 0; i < input.length; i++) {
        if (input[i].value === value) {
            input[i].checked = true;
            var title = input[i].parentNode;
            title.className += " active";
        }
    }

    if(blah === "alliance"){
        if(value === "Blue"){
            setTeamBlue();
            startField.setXInverted(!Xinverted);
            Xinverted = !Xinverted;
        }
        console.log("Changing start field");
    }

    if (typeof value === "string"){
        document.getElementById(blah + "Span").innerHTML = value === "undefined" ? "?" : value.substring(0, 1);
    }
}

//Grabs the values from the custom radio buttons for alliance and position
//This function also gets used in saveData()
function getAlliancePosition(blah) {
    var input = document.getElementsByName(blah);
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

    var image = startField.getImage();

    if (rotated !== null) {
        console.log(rotated);
        if(rotated) {
            startField.setXInverted(!Xinverted);
            startField.setYInverted(!Yinverted);
            Xinverted = !Xinverted;
            Yinverted = !Yinverted;
            image.style.WebkitTransform = "rotate(180deg)";
            image.style.msTransform = "rotate(180deg)";
            image.style.transform = "rotate(180deg)";
        }
        else {
            startField.setXInverted(Xinverted);
            startField.setYInverted(Yinverted);
        }
    }
    else {
        console.log("rotated is null");
        startField.setYInverted(false);
        rotated = false;
    }
}

function setRotation(rotated) {
    var image = startField.getImage();
    if(rotated) {
        image.style.WebkitTransform = "rotate(180deg)";
        image.style.msTransform = "rotate(180deg)";
        image.style.transform = "rotate(180deg)";
    }
    else {
        image.style.WebkitTransform = "none";
        image.style.msTransform = "none";
        image.style.transform = "none";
    }
    startField.setXInverted(!Xinverted);
    startField.setYInverted(!Yinverted);
    Xinverted = !Xinverted;
    Yinverted = !Yinverted;
}

function rotateField() {
    rotated = !rotated;
    setRotation(rotated);
}

//Functions to be run at the start
startTeleopCanvas();
openDb(forms);
startField();
//////////////////////////////////

var Xinverted = startField.getXInverted();
var Yinverted = startField.getYInverted();

//Functions that add custom attributes to the customOptions
//These are necessary because it's a pain to add attributes to each input in a group

customOptionsAttribute("position",["onchange","data-validation","data-validation-error-msg"],["changePosition(this);","required","You did not select a position!"]);
