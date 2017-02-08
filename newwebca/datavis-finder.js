const TYPE = {
	numeric: 0,
	bool: 1
};

const PROPERTIES = {
	auton: [
		{
			type: TYPE.bool,

			display: "Reached Outerworks",
			name: "reachedOuterworks"
		}
	],
	teleop: [
		{
			display: "Successful Teleop High Shots",
			name: ""
		}, {
			display: "Total Defenses Crossed",
			get: function(record) {

			}
		}
	]
};

const COMPARITORS = [
	{
		display: "Less Than",
		compare: (val, target) => val < target
	}, {
		display: "Greater Than",
		compare: (val, target) => val > target
	}, {
		display: "Equal To",
		compare: (val, target) => val === target
	}
];

var queries = $("#finder-queries");

function addQuery() {
	var query = $("<div>").addClass("query");

	var property = $("<select>")
			.addClass("property form-control");

	var comparitor = $("<select>")
			.addClass("comparitor form-control");

	var value = $("<input>")
			.addClass("value form-control")
			.prop("type", "number");

	query.append(property);
	query.append($("<h2>").text("is"));
	query.append(comparitor);
	query.append(value);
	//[property, $("<h2>").text("is"), comparitor, value].forEach(query.append);

	queries.append(query);
}

function removeQuery() {
	if (queries.children().length > 1) {
		queries.children().last().remove();
	}
}
