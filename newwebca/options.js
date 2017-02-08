//User options js file
//hi
$(document).ready(function() {
   restoreData();
});
function getSelectedRadio(name) {
    var radios = document.getElementsByName(name);
    var selected = "";
    for (var i = 0;i < radios.length;i++) {
		if (radios[i].checked) {
			selected = radios[i].value;
			break;
		}
    }
    return selected;
}

function isCheckboxChecked(name) {
	var checkbox = document.getElementsByName(name)[0];

	if(checkbox)
		return checkbox.checked;
	else
		return null;
}

function restoreData() {
	var input = document.getElementsByName("page");
	for (var i = 0; i < input.length; i++) {
		if (input[i].value == localStorage.getItem("pageViewStyle")) {
			input[i].checked = true;
			var title = input[i].parentNode;
			title.className += " active";
		}
	}

	var datavisPersistentImagesCheckbox = document.getElementsByName("datavis-persistent-images")[0];
	if(localStorage.getItem("datavisPersistentImages") == "true" || localStorage.getItem("datavisPersistentImages") == null) {
		datavisPersistentImagesCheckbox.checked = true;
	} else {
		datavisPersistentImagesCheckbox.checked = false;
	}
}

function saveData() {
	var message = "Saved";

	//Time to store stuff
	localStorage.setItem("pageViewStyle", getSelectedRadio("page"));
	localStorage.setItem("datavisPersistentImages", isCheckboxChecked("datavis-persistent-images"));

	if (getSelectedRadio("page") == "tabs")
		message += " - do be aware that no 2015 tabbed scouting form exists as of now.";

	alert(message);
}
