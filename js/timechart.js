
// Will graph a series of properties over time
function TimeChart(base, width, height, teamId, matchIds, properties, propertyNames, colors) {
	LineGraph.call(this, base, width, height);

	this.teamId = teamId;
	this.matchIds = matchIds;
	this.properties = properties;
	this.propertyNames = propertyNames;
	this.colors = colors;
}

TimeChart.prototype = Object.create(LineGraph.prototype);
TimeChart.prototype.draw = function() {
	var instance = this;
	var dates = [];
	var data = [];

	dbFind("records",
			function(rec) {
				return matchIds ? (matchIds.indexOf(r.match_id) > -1 && rec.team_id === instance.teamId) : r.team_id === instance.teamId;
			},

			function(rec) {
				var recDate = new Date(rec.created_at);

				var isNewest = true;
				for (var i = 0; i < dates.length; i++) {
					if (recDate < dates[i]) {
						dates.splice(i, 0, recDate);
						data.splice(i, 0, rec);
						isNewest = false;
						break;
					}
				}

				if (isNewest) {
					dates.push(recDate);
					data.push(rec);
				}
			},

			function() {
				for (var i = 0; i < instance.properties.length; i++) {
					instance.currentLine(instance.propertyNames[i], instance.colors[i]);

					var curMatch = 0;
					for (var rec of data) {
						var value = rec[instance.properties[i]];
						var y;

						if (value !== "N/A" && typeof value === "string") {
							y = value;
						} else {
							y = 0;
						}

						instance.push({
							x: curMatch + 1,
							y: y
						});

						curMatch++;
					}
				}

				instance.xOffset = 1;
				instance.xNotches = curMatch - 1;
				instance.xDigits = 0;

				LineGraph.prototype.draw.call(instance);
			}
	);
}
TimeChart.prototype.constructor = TimeChart;
