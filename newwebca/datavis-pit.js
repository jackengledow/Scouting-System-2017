var pitViewer = $("#pit-viewer");
var pitTeam = $("#pit-team");
var pitStats = [
	{
		display: "Images",
		name: "images"
	},
	{
		display: "Drive Type",
		name: "driveType"
	}, {
		display: "Can Cross Low Bar",
		name: "lowbar"
	}, {
		display: "Can cross ALL Drive Defenses",
		name: "driveDefenses"
	}, {
		display: "Type A Defense Manipulator",
		name: "typeA"
	}, {
		display: "Type C Defense Manipulator Degrees of Freedom",
		name: "typeC"
	}, {
		display: "Type of Shooter",
		name: "shooterType"
	}
];

function updatePitScoutView() {
	pitViewer.empty();

	var opt = pitTeam.find("option:selected");

	var robot = opt.val();
	var team = opt.text();

	var lastComp = "";
	var hasPics = false;

	robots.filter(rob => rob._id === robot).forEach(rob => {
		participations.sort(sortBy("competition_id")).filter(part => part.robot_id === robot).forEach(part => {
			if (part.competition_id !== lastComp) {
				var compName = data.competitions
						.filter(comp => comp._id === part.competition_id)[0].name;
				pitViewer.append($("<h2>").text(compName));

				lastComp = part.competition_id;
			}

			pitStats.forEach(stat => {
				var div = $("<div>")
						.addClass("pit-data panel panel-default");

				var body = $("<div>")
						.addClass("panel-body");

				var header = $("<div>")
						.addClass("panel-heading")
						.text(stat.display);

				if(stat.name === "images") {
					var links = document.createElement("div");
					links.id = "links";
					body.get(0).appendChild(links);

					for(var i = 0; i < part[stat.name].length; i++) {
						var a = document.createElement("a");
						var img = document.createElement("img");
						img.style.maxWidth = "250px";
						img.src = part[stat.name][i];
						a.href = part[stat.name][i];
						//a.target = "_blank";
						a.appendChild(img);
						links.appendChild(a);
						hasPics = true;
					}
				}
				else
					body.append($("<p>").text(part[stat.name]));

				console.log(stat.name);
				div.append(header);
				div.append(body);
				pitViewer.append(div);
			});
		});
	});
	if(hasPics) {
		document.getElementById('links').onclick = function (event) {
			event = event || window.event;
			var target = event.target || event.srcElement,
				link = target.src ? target.parentNode : target,
				options = {index: link, event: event},
				links = this.getElementsByTagName('a');
			blueimp.Gallery(links, options);
		};
	}
}

