const DB_NAME = 'prescout-data';
const DB_VERSION = 13;
const DB_DATA_NAME = 'data';
const DB_IMAGE_NAME = 'image';
const DB_TEAM_NAME = 'team';
const DB_DEFAULTS_NAME = 'defaults';

var db;
var team = 0;
var robot_id = "";

function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function openDb(forms) {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        db = this.result;
        console.log("openDb DONE");
        multiView.generateList();
        requestDefaults();
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");

        try {
            evt.currentTarget.result.deleteObjectStore(DB_DATA_NAME);
        } catch(err) {}
        var dataStore = evt.currentTarget.result.createObjectStore(
            DB_DATA_NAME, { keyPath: 'team' });
        for(var i = 0;i < forms.length;i++) {
            dataStore.createIndex(forms[i].getName(),forms[i].getName(),{unique:false});
        }

        try {
            evt.currentTarget.result.deleteObjectStore(DB_IMAGE_NAME);
        } catch(err) {}
        var imageStore = evt.currentTarget.result.createObjectStore(
            DB_IMAGE_NAME, { keyPath: 'id', autoIncrement: true });
        imageStore.createIndex('team','team',{unique:false});
        imageStore.createIndex('image','image',{unique:false});

        try {
            evt.currentTarget.result.deleteObjectStore(DB_TEAM_NAME);
        } catch(err) {}
        var teamStore = evt.currentTarget.result.createObjectStore(
            DB_TEAM_NAME, { keyPath: '_id' });
        teamStore.createIndex("robot_id","robot_id",{unique:false});
        teamStore.createIndex("number","number",{unique:false});

        try {
            evt.currentTarget.result.deleteObjectStore(DB_DEFAULTS_NAME);
        } catch(err) {}
        var defaultsStore = evt.currentTarget.result.createObjectStore(
            DB_DEFAULTS_NAME, { keyPath: 'id' });
    };
}


var forms = new Array();


forms.push(new Multiselect("Drive Type","driveType",
                           ["Normal Wheel", "Swerve", "Mecanum", "Tread"], true, [], true));
forms.push(new Multiselect("Can Cross Low Bar","lowbar",
                           ["Yes","No"], false, [], true));
forms.push(new Multiselect("Can Cross ALL Drive Defenses","driveDefenses",
                           ["Yes","No"], false, [], true));
forms.push(new Multiselect("Type A Defense Manipulator","typeA",
                           ["Static","Dynamic","None"], false, [], true));
forms.push(new Multiselect("Type C Defense Manipulator Degrees of Freedom","typeC",
                           ["1","2","3","4","5","6","No Manipulator"], false, [], true));
forms.push(new Multiselect("Shooter Type","shooterType",
                           ["Wheeled","Catapult", "Puncher"], true, [], true));
var formDiv1 = document.getElementById("formDiv1");
var formDiv2 = document.getElementById("formDiv2");
//var i = 0;
var form_cutoff = 4;
for(var i = 0;i < forms.length;i++) {
    if(i < form_cutoff) {
        forms[i].appendToParent(formDiv1);
    }
    else {
        forms[i].appendToParent(formDiv2);
    }
}

var viewDiv = document.getElementById("viewDiv");
var multiView = new MultiView("Current Data","multiview",DB_DATA_NAME,DB_IMAGE_NAME,db);
multiView.appendToParent(viewDiv);

var fileDiv = document.getElementById("fileDiv");
var multiFile = new MultiFile("Robot Images","robotImages",DB_IMAGE_NAME,db,multiView.generateList);
multiFile.appendToParent(fileDiv);

multiView.setCallback(multiFile.refreshList);

var connectionDiv = document.getElementById("connectionDiv");
var connection = new Connection();
connection.appendToParent(connectionDiv);

openDb(forms);

function saveData() {
    if(team !== 0) {
        debug("Saving");
        var obj = new Object();
        obj.team = team;
        obj.robot_id = robot_id;
        for(var i = 0;i < forms.length;i++) {
            obj[forms[i].getName()] = forms[i].getOutput();
        }

        var store = getObjectStore(DB_DATA_NAME, 'readwrite');
        var req;
        try {
            req = store.put(obj);
        } catch (e) {
            throw e;
        }
        req.onsuccess = function (evt) {
            console.log("Insertion in DB successful");
            multiView.generateList();
            //displayActionSuccess();
            //displayPubList(store);
        };
        req.onerror = function() {
            console.error("DB Insertation error", this.error);
            //displayActionFailure(this.error);
        };
    }
}

function openData(key,restore) {
    debug("Opening");
    console.log(key);

    if(key === "0") {
        return;
    }
    var store = getObjectStore(DB_DATA_NAME, 'readwrite');
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var value = this.result;
        debug(value);
        if (value) {
            if(restore) {
                debug("Restoring");
                for(var i = 0;i < forms.length;i++) {
                    forms[i].setAll(value[forms[i].getName()]);
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
                    forms[i].resetAll();
                }
            }
            else {
                debug("Not in DB, Exporting");

            }
        }
    };
}

function submitParticipationData(participations, images) {
    imagesTeams = Object.keys(images);

    var store = getObjectStore(DB_DATA_NAME, "readwrite");
    var req = store.openCursor();

    req.onsuccess = function(event) {
        var cursor = this.result;

        if(cursor) {
            values = cursor.value;

            for(var i = 0; i < imagesTeams.length; i++){
                //console.log("imageTeam: " + imagesTeams[i]);
                if(imagesTeams[i] === values["team"]){
                    console.log(imagesTeams[i] + " matches " + values["team"]);
                    //console.log(participations);
                    values["images"] = images[imagesTeams[i]];
                    //console.log(JSON.stringify({"images":images[imagesTeams[i]]}));
                }
            }
            for(var i = 0; i < participations.length; i++) {
                if(values.robot_id === participations[i].robot_id){
                    //console.log(participations[i]);
                    delete values["robot_id"];

                    var jsonData = JSON.stringify(values);
                    console.log(jsonData);
                    $.ajax({
                        url: "/api/participations/" + participations[i]._id,
                        type: "PUT",
                        data: jsonData,
                        async: true,
                        error: function() {
                            console.log("AJAX Request Failed");
                        },
                        success: function() {
                            //These need to be redefined so the data can be deleted
                            var store = getObjectStore(DB_DATA_NAME, "readwrite");
                            var req = store.openCursor();
                            req.onsuccess = function(event) {
                                var cursor = this.result;
                                if(cursor){
                                    store.delete(cursor.primaryKey);
                                    cursor.continue();
                                }
                                else {
                                    alert("CONGRATULTIONS YOU'RE THE ONE MILLIONTH VIEWER!!! CLAIM YOUR PRIZE!!!");
                                    window.location.reload();
                                }
                            }
                        }
                    })
                }
            }
            cursor.continue();
        }
    }
}

function syncData(images) {
    $.ajax({
        url: "/api/participations?competition_id=" + defaults_object._id,
        type: "GET",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        success: function(html){
            var participations = html;
            submitParticipationData(participations, images);
            //Don't bother checking if there are participations, since they will already have to exist to Pit Scout
        }
    })
}

function uploadImages() {
    var store = getObjectStore(DB_IMAGE_NAME, "readwrite");
    var req = store.openCursor();

    req.onsuccess = function(event) {
        var cursor = this.result;

        if(cursor) {
            value = cursor.value;

            var imagePostXhr = new XMLHttpRequest();

            imagePostXhr.onreadystatechange = function() {
                var readyState = this.readyState;

                if(readyState == 4) {
                    console.debug(this);

                    if(this.status >= 200 && this.status < 300) {
                        console.log("Image POST was successful.");

                        var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
                        var req = store.openCursor();
                        req.onsuccess = function(event) {
                            var cursor = this.result;
                            if(cursor) {
                                store.delete(cursor.primaryKey);
                            }
                        }
                    }
                    else if(this.status >= 400) {
                        console.log("Image POST wasn't successful :'( (" + this.status + ")");
                        console.log(this.responseText);
                    }
                }
            };

            imagePostXhr.open("POST", "/images/" + value.team);
            imagePostXhr.send(value.image);

            cursor.continue();
        }
        else {
            //update the robot model with GET request here
            $.ajax({
                url: "/images",
                type: "GET",
                cache: false,
                async: true,
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                },
                success: function(html){
                    images = html; //these are global right now for debugging purposes
                    //console.log(images);
                    /*imagesTeams = Object.keys(images);
                      submitParticipationImages(imagesTeams);*/
                    syncData(images);
                }
            });
        }
    }
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

function participationKeys(){
    $.ajax({
        url: "/api/participations?competition_id=" + defaults_object._id,
        type: "GET",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        success: function(html){
            var participations = html;
            var obj = new Object();
            for(var i = -1;i < forms.length;i++) {
                if(i < 0)
                    obj["team"] = "";
                else
                    obj[forms[i].getName()] = "";
            }
            console.log(JSON.stringify(obj));
            for(var i = 0; i < participations.length; i++) {
                var flag = true;
                for(var j = 0; j < forms.length; j++) {
                    if(participations[i].hasOwnProperty(forms[j].getName())){
                        flag = false;
                        console.log(participations[i].robot_id + " has correct properties.");
                        j = forms.length;
                    }
                }
                if(flag) {
                    console.log(participations[i].robot_id + " is missing properties.");
                    var jsonData = JSON.stringify(obj);
                    $.ajax({
                        url: "/api/participations/" + participations[i]._id,
                        type: "PUT",
                        data: jsonData,
                        async: true,
                        error: function() {
                            console.log("AJAX Request Failed");
                        },
                        success: function() {
                        }
                    })
                }
            }
        }
    })
}

function requestDefaults() {
    $.ajax({
        url: "/defaults",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
            defaults_object = new Object();
            var store = getObjectStore(DB_DEFAULTS_NAME, 'readwrite');
            var req = store.openCursor();
            req.onsuccess = function(event) {
                var cursor = this.result;
                if(cursor) {
                    defaults_object = {_id:cursor.value.id};
                    cursor.continue();
                }
                else {
                    requestTeams();
                }
            }
        },
        success: function(html){
            data = html;
            console.log(data.competition.name);
            defaults_object = data.competition;

            var store = getObjectStore(DB_DEFAULTS_NAME, 'readwrite');
            var req = store.openCursor();
            req.onsuccess = function(event) {
                var cursor = this.result;
                if(cursor) {
                    store.delete(cursor.value.id);
                    cursor.continue();
                }
                else {
                    var obj = {id:data.competition._id};
                    var req2 = store.put(obj);
                }
            }
            requestTeams();
            requestRobots();
            participationKeys();
        }
    });
}

var teams;

function requestTeams() {
    $.ajax({
        url: "/api/competitions/" + defaults_object._id + "/teams",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
        },
        success: function(html){
            teams = html;
        }
    });
}

function requestRobots() {
    $.ajax({
        url: "/api/competitions/" + defaults_object._id + "/robots",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
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
                    generateTeams();
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
                        obj["robot_id"] = teams[i].robot_id;
                        obj["number"] = teams[i].number;
                        var req2 = store.put(obj);
                    }
                }
            }
            generateTeams();
        }
    });
}

function generateTeams() {
    teams.sort(setAsc);
    for(var i = -1;i < teams.length;i++) {
        var select = document.getElementById("teamSelect");
        var option = document.createElement("option");
        if(i < 0) {
            option.innerHTML = "Select a Team";
            //Select a team not being disabled is a design feature
            //Allows us to deselect everything, and delete all data
            //option.disabled = true;
            option.selected = true;
            option.value = 0;
        }
        else {
            option.innerHTML = teams[i].number;
            option.value = teams[i].number;
        }
        select.appendChild(option);
        select.onchange = function() {
            if(team > 0) {
                saveData();
            }
            team = select.value;
            for(var i = 0; i < teams.length; i++) {
                if(team === teams[i].number.toString()) robot_id = teams[i].robot_id;
            }
            if(team > 0) {
                console.log("blah");
                multiFile.setTeam(team);
                openData(team,true);
                var titleDiv = document.getElementById("titleDiv");
                titleDiv.innerHTML = "<b>Scouting team: " + team + "</b>";
                titleDiv.hidden = false;
                var fileDiv = document.getElementById("fileDiv");
                fileDiv.hidden = false;
                var formDiv1 = document.getElementById("formDiv1");
                formDiv1.hidden = false;
                var formDiv2 = document.getElementById("formDiv2");
                formDiv2.hidden = false;
            }
            else {
                var titleDiv = document.getElementById("titleDiv");
                titleDiv.innerHTML = "<b>Scouting team: " + team + "</b>";
                titleDiv.hidden = true;
                var fileDiv = document.getElementById("fileDiv");
                fileDiv.hidden = true;
                var formDiv1 = document.getElementById("formDiv1");
                formDiv1.hidden = true;
                var formDiv2 = document.getElementById("formDiv2");
                formDiv2.hidden = true;
            }
        }
    }
}
