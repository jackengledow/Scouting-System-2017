var teams;
var robots;
var participations;

function requestExistingData() {
    $.ajax({
        url: "/api/teams",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(html){
            teams = html;
        }
    });
    $.ajax({
        url: "/api/robots",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(html){
            robots = html;
        }
    });
}

function requestParticipations() {
    var competition_id = document.getElementById("competitionList").value;
    console.log(competition_id);
    $.ajax({
        url: "/api/competitions/" + competition_id +"/participations",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(html){
            participations = html;
        }
    });
}

function competitionList() {
    $.ajax({
        url: "/api/competitions",
        cache: false,
        async: true,
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function(html){
            competitions = html;
            var competitionSelect = document.getElementById("competitionList");
            for(var i = -1;i < competitions.length;i++) {
                var option = document.createElement("option");
                if(i < 0) {
                    option.innerHTML = "Select a Competition";
                    option.selected = true;
                    option.disabled = true;
                    option.value = 0;
                }
                else {
                    option.innerHTML = competitions[i].name;
                    option.value = competitions[i]._id;
                }
                competitionSelect.appendChild(option);
            }
        }
    });
}

function submitTeams() {
    var comp_id = $("#competitionList").val();

    if (comp_id == "0") {
        alert("Select a competition! :(");
        return;
    }

    var teams_string = $("#addTeamList").val();
    var new_teams = teams_string
            .split(/[^0-9]/)
            .filter(function(new_team) { // Filter out empty strings from the split
                return new_team !== "";
            });

    var new_unique_teams = new Set(new_teams); // Filter out duplicated teams
    var submitted_teams = [];

    var check_completion = function() {
        if (submitted_teams.length === new_unique_teams.size) {
            console.log("Created all teams");
            submitRobots(submitted_teams, function(robots) {
                submitParticipations(robots, comp_id, function() {
                    alert("All done!");
                    location.reload();
                });
            });
        }
    };

    for (var team_number of new_unique_teams) {
        var team = teams.find(team => team.number == team_number);

        if (team === undefined) {
            $.ajax("/api/teams", {
                type: "POST",
                data: JSON.stringify({
                    number: team_number
                }),
                success: function(response) {
                    submitted_teams.push(response);
                    check_completion();
                },
                error: function(response) {
                    alert("Could not submit team number " + team_number);
                    console.log("Team submission error:", team_number, response);

                    new_unique_teams.delete(team_number);
                }
            });
        } else {
            submitted_teams.push(team);
            check_completion();
        }
    }
}

function submitRobots(submitted_teams, success) {
    var team_set = new Set(submitted_teams);
    var submitted_robots = [];

    var check_completion = function() {
        if (submitted_robots.length === team_set.size) {
            console.log("All robots created successfully");
            success(submitted_robots);
        }
    };

    for (var team of team_set) {
        var robot = robots.find(robot => robot.team_id == team._id);

        if (robot === undefined) {
            $.ajax("/api/robots", {
                type: "POST",
                data: JSON.stringify({
                    team_id: team._id
                }),
                success: function(response) {
                    submitted_robots.push(response);
                    check_completion();
                },
                error: function(response) {
                    alert("Could not create robot for team number " + team);
                    console.log("Robot submission error:", team, response);

                    team_set.delete(team);
                }
            });
        } else {
            submitted_robots.push(robot);
            check_completion();
        }
    }
}

function submitParticipations(robots, comp_id, success) {
    var robot_set = new Set(robots);
    var submitted_parts = [];

    var check_completion = function() {
        if (submitted_parts.length === robot_set.size) {
            console.log("All participations created successfully");
            success(submitted_parts);
        }
    };

    for (var robot of robot_set) {
        var part = participations.find(part => part.competition_id === comp_id && part.robot_id === robot._id);

        if (part === undefined) {
            $.ajax("/api/participations", {
                type: "POST",
                data: JSON.stringify({
                    competition_id: comp_id,
                    robot_id: robot._id
                }),
                success: function(response) {
                    submitted_parts.push(response);
                    check_completion();
                },
                error: function(response) {
                    alert("Could not create participation for robot " + robot._id);
                    console.log("Robot submission error:", robot, response);

                    robot_set.delete(robot);
                }
            });
        } else {
            submitted_parts.push(part);
            check_completion();
        }
    }
}


function testAllSent(array) {
    var pass = array.every(function(elem,pos) {
        return elem;
    });

    if(pass) {
        alert("All teams have been sent successfully!");

        window.location.reload();

        /* The text area does not nicely reset. */
        document.getElementById("addTeamList").value = "";

        /* Go to the top of the page. */
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    else {
        window.setTimeout(testAllSent,1,array);
    }
}

function getSelectValues(select) {
    var data = [];
    var options = select.options;
    for(var i = 0; i < options.length; i++) {
        if(options[i].selected) {
            data.push(options[i].value);
        }
    }
    return data;
}

document.getElementById("competitionList").onchange = requestParticipations;

competitionList();
requestExistingData();
