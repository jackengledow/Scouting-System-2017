"use strict";

function submitCategory(category, data) {
	data[category] = {};

	$("#" + category).find("input, select").each(function() {
		var value = null;

		if ($(this).prop("type") == "checkbox") {
			if ($(this).is(":checked")) {
				value = "yes";
			} else {
				value = "no";
			}
		} else {
			value = $(this).val();
		}

		data[category][$(this).prop("name")] = value;
	});
}

function submitData(event) {
	event.preventDefault();

	var data = {};
	meta.forEach(function(input) {
		data[input.prop("name")] = input.val();
	});

	["auton", "teleop", "penalty", "notes"].forEach(category => {
		submitCategory(category, data);
	});

	db.matches.add(data);

	syncData(event);
}

function syncData(event) {
	event.preventDefault();

	var idsToDelete = [];

	db.matches.each(item => {
		var data = item;
		delete data.id;

		$.ajax({
			url: "/api/records",
			type: "post",
			data: JSON.stringify(data),
			success: (data) => {
				idsToDelete.push(item.id);
				console.log(data);
			},
			error: (data) => {
				console.log(data);
				document.body.innerHTML = data.responseText;
			}
		});
	}).then(function() {
		console.log(idsToDelete);
	});
}

/*function createTouchField() {
  var field = new Touchfield(1, 5);

  field.setColors([{ red: 255, green: 0, blue: 0 }]);
  field.setImage("img/first_field2.png");
  field.appendToParent($("#map-div").get(0));
  }*/

var meta = null;
var db = null;
$(document).ready(function() {
	//createTouchField();
	$("#submit").click(function(event) {
		event.preventDefault();

		saveData();
		uploadData();
	});

	meta = [
		$("#team-number")
	];

	/*db = new Dexie("tmp-matches");
	  db.version(6)
	  .stores({
	  matches: "++id, team_number, auton, teleop, penalty, notes"
	  });*/

	$(".btn").each(function(){
		if($(this).parent().parent().attr("id") == "yellowCards" || $(this).parent().parent().attr("id") == "redCards"){
		}
	})

		$(".counter").each(function() {
			var span = $("<span>").addClass("input-group-btn");

			var buttonUp = $("<button type='button'>").addClass("btn btn-default up-button");
			var buttonDown = $("<button type='button'>").addClass("btn btn-default down-button");

			span.append(buttonUp);
			buttonUp.text("+").append(buttonUp);
			span.append(buttonDown);
			buttonDown.text("-").append(buttonDown);

			$(this).append(span);

			var $counter = $(this);
			var $input = $counter.find("input");

			$counter.find(".up-button").click(function() {
				var current = new Number($input.val());
				$input.val(current + 1);
			});

			$counter.find(".down-button").click(function(){
				var current = new Number($input.val());
				if(current <= 0) $input.val(0);
				else $input.val(current - 1);
			});
		});

	$(".defense").each(function(){
		var div = $("<div>").addClass("form-group");
		var div2 = $("<div>").attr("data-toggle", "buttons");

		var labels = [];

		div2.attr("class", "btn-group");

		for(var i = 1; i < 6; i++){
			var input = $("<input>").attr("type", "radio");

			labels[i] = $("<label>").addClass("btn btn-default");
			labels[i].text(i).append(labels[i]);

			labels[i].attr("id", "rating" + i);

			labels[i].append(input);

			div2.append(labels[i]);
		}

		div.append(div2);

		$(this).parent().append(div);

		console.log($(this).attr("id"));

		// console.log("SUCCESS");

	});

	var $yellowCard = $(this).find("#yellowCards");
	var $redCard = $(this).find("#redCards");

	$yellowCard.parent().find(".up-button").click(function(){
		var cards = new Number($yellowCard.val());
		var cardsR = new Number($redCard.val());
		if(cards == 2 && cardsR == 0) $redCard.val(cardsR + 1);
	});

	$(".enemy-defense-dropdown").each(function() {
		var dropdown = $(this);
		var disabledOption = $("<option>")
			.text("Select a Defense")
			.attr("selected", "selected")
			.attr("disabled", "disabled")
			.val("0");
		dropdown.append(disabledOption);

		DEFENSES.forEach(function(def) {
			var opt = $("<option>")
				.data("name", def.name)
				.data("display", def.display)
				.text(def.display);
			dropdown.append(opt);
		});

		dropdown.change(function() {
			var cutoff = 4;
			var selectedOption = dropdown.find(":selected");
			var targetSelector = $(this).data("target");
			var targetSelectorLength;
			if (targetSelector !== undefined) targetSelectorLength = targetSelector.length;
			var index = targetSelector.substring(targetSelectorLength - 1, targetSelectorLength) - 1;
			var input = $(targetSelector).parent();
			var orgName = input.find("input").prop("name");
			var flag = true;
			var flag2 = true;
			for(var i = 0; i < forms.length; i++) {
				if(orgName === forms[i].getName()) {
					if(selectedOption.data("name") !== undefined) {
						//Change the form names
						for(var j = 0; j < cutoff; j++) {
							if(selectedOption.data("name") === enemySelectedDefenses[j].name) {
								flag = false;
								alert("You have chosen an enemy defense that has already been previously selected. Please choose again!");
								dropdown.val("0");
								i = forms.length;
								j = cutoff;
							}
						}
						if(!flag) {
							enemySelectedDefenses[index] = {};
							//console.log(targetSelector);
						}
						else {
							forms[i].setName(undefined, selectedOption.data("name"), undefined);
							//Code to change the auton defense select based on whether enough defenses were selected on the starting info tab
							//console.log(orgName);
							enemySelectedDefenses[index] = {name: selectedOption.data("name"), display: selectedOption.data("display")};
							for(var i = 0; i < cutoff; i++){
								if(Object.keys(enemySelectedDefenses[i]).length === 0) {
									flag2 = false;
									i = cutoff;
								}
							}
							var select = document.getElementById("autonDefense");
							if(flag2) {
								while (select.firstChild) {
									select.removeChild(select.firstChild);
								}
								for(var i = -1; i < enemySelectedDefenses.length; i++) {
									var option = document.createElement("option");
									if(i < 0) {
										option.innerHTML = "Select a Defense";
										option.selected = true;
										option.disabled = true;
										option.value = 0;
									}
									else {
										if(i < cutoff)
											option.innerHTML = i + 1;
										else
											option.innerHTML = enemySelectedDefenses[i].display;
										option.value = enemySelectedDefenses[i].name.replace("Crossed","");
									}
									select.appendChild(option);
								}
							}
						}
					}
				}
				if(flag && orgName + "Rating" === forms[i].getName()) {
					var ratingSelector = $(this).data("target") + "RatingDiv";
					if(selectedOption.data("name") !== undefined) {
						while (document.getElementById(ratingSelector.replace("#","")).firstChild) {
							document.getElementById(ratingSelector.replace("#","")).removeChild(document.getElementById(ratingSelector.replace("#","")).firstChild);
						}
						forms[i].appendToParent(document.getElementById(ratingSelector.replace("#",""))).setName(undefined, selectedOption.data("name") + "Rating");
						customOptionsAttribute(selectedOption.data("name") + "Rating",["data-validation","data-validation-error-msg"],["required","You did not choose a defense rating!"]);
					}
				}
			}
			var selects = document.getElementsByClassName("enemy-defense-dropdown");
			disableSelectedDefenseOptions(selects, cutoff, enemySelectedDefenses);
		});
		dropdown.change();
	});

	$('.alliance-defense-dropdown').each(function() {
		var dropdown = $(this);
		dropdown.change(function() {
			var selectedOption = dropdown.find(":selected");
			var value = selectedOption.val();
			var name = dropdown.attr("name");
			var index = name.substring(name.length - 1, name.length) - 1;
			var flag = true;

			for(var i = 0; i < allianceSelectedDefenses.length; i++) {
				if(value === allianceSelectedDefenses[i]) {
					flag = false;
					alert("You have chosen an alliance defense that has already been previously selected. Please choose again!");
					dropdown.val("0");
					i = allianceSelectedDefenses.length;
				}
			}
			if(!flag) {
				allianceSelectedDefenses[index] = "";
			}
			else {
				allianceSelectedDefenses[index] = value;

				var selects = document.getElementsByClassName("alliance-defense-dropdown");
				for(var i = 0; i < selects.length; i++) {
					for(var j = 0; j < selects[i].options.length; j++) {
						if(selects[i].options[j].value !== "0") {
							selects[i].options[j].disabled = false;
						}
						for(var k = 0; k < allianceSelectedDefenses.length; k++) {
							if(allianceSelectedDefenses[k] !== "") {
								//console.log(allianceSelectedDefenses[k] === selects[i].options[j].value);
								//console.log(selects[i].options[j].value);
								if(allianceSelectedDefenses[k] === selects[i].options[j].value) {
									if(!selects[i].options[j].selected) {
										selects[i].options[j].disabled = true;
									}
								}
							}
						}
					}
				}
			}
		})
	});

	var textBox = $("#teleop-struggle-text");

	$("#teleopDefenseStruggle").click(function(){
		var struggle = $(this).is(':checked');

		if(!struggle) {
			textBox.hide();
		} else {
			textBox.show();
		}
	});
	textBox.hide();
});

function disableSelectedDefenseOptions(selects, cutoff, array){
	for(var i = 0; i < selects.length; i++) {
		for(var j = 0; j < selects[i].options.length; j++) {
			if(selects[i].options[j].text !== "Select a Defense") {
				selects[i].options[j].disabled = false;
			}
			for(var k = 0; k < cutoff; k++) {
				if(Object.keys(array[k]).length !== 0) {
					//console.log(array[k].display === selects[i].options[j].text);
					//console.log(selects[i].options[j].text);
					if(array[k].display === selects[i].options[j].text) {
						if(!selects[i].options[j].selected) {
							selects[i].options[j].disabled = true;
						}
					}
				}
			}
		}
	}
}
