// Author: Tiger Huang

function Connection() {
	const ONCOLOR = "#00FF00";
	const OFFCOLOR = "#FF0000";
	const HEIGHT = "2.5em";

	var instance = this;
	var parentNode;
	var bold;
	var div;
	var status;

	this.setStatus = function(status) {
		div.style.backgroundColor = status ? ONCOLOR : OFFCOLOR;
		bold.innerHTML = status ? "Connected" : "Not Connected";
	}

	this.appendToParent = function(parent) {
		parentNode = parent;
		div = document.createElement("div");
		div.id = name;
		div.style.height = HEIGHT;
		div.style.lineHeight = HEIGHT;
		div.style.textAlign = "center";
		parent.appendChild(div);

		bold = document.createElement("b");
		bold.style.color = "#0000FF";
		div.appendChild(bold);

		setInterval(instance.testConnection, 500);
	}

	this.testConnection = function() {
		$.ajax({
			url: "ping",
			cache: false,
			async : true,
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				instance.setStatus(false);
				status = false;
			},
			success: function(html){
				instance.setStatus(true);
				status = true;
			}
		});
	}

	this.getStatus = function() {
		return status;
	}
}
