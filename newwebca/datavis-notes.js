var autonNotes = $("#auton-notes");
var teleopNotes = $("#teleop-notes");
var issuesNotes = $("#issues-notes");

var notesSelect = $("#notes-team");
var notesMatchList = $("#match-list");

function updateNotesViewer() {
	notesMatchList.empty();

	var opt = notesSelect.find("option:selected");

	var team = opt.text();
	var robot = opt.val();

	var lastComp = "";

	participations.sort(sortBy("competition_id")).filter(part => part.robot_id === robot).forEach(part => {
		if (part.competition_id !== lastComp) {
			var compName = data.competitions
					.filter(comp => comp._id === part.competition_id)[0].name;
			notesMatchList.append($("<h2>").text(compName));

			lastComp = part.competition_id;
		}

		records.filter(rec => rec.participation_id === part._id).sort(sortBy("match_number")).forEach(rec => {
			var button = $("<button>").addClass("btn btn-default btn-lg");
			button.text(rec.match_number);

			button.click(function() {
				$("#notes-content > .panel > .panel-body").empty();

				autonNotes.find(".panel-body").append($("<p>").text(rec.autonNotes));
				teleopNotes.find(".panel-body").append($("<p>").text(rec.teleopNotes));
				issuesNotes.find(".panel-body").append($("<p>").text(rec.robotNotes));
			});

			notesMatchList.append(button);
		});
	});
}
