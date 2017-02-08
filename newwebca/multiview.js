// Author: Tiger Huang

function MultiView(label,name,DB_DATA_NAME,DB_IMAGE_NAME,database) {
	const BGCOLOR = "#DFDFDF";

	var instance = this;
	var parentNode;
	var preview;
	var callback;
	var db = database;

	this.setCallback = function(func) {
		callback = func;
	}

	this.appendToParent = function(parent) {
		parentNode = parent;
		var div = document.createElement("div");
		div.id = name;
		div.style.backgroundColor = BGCOLOR;
		parent.appendChild(div);

		var bold = document.createElement("b");
		bold.innerHTML = label;
		div.appendChild(bold);

		preview = document.createElement("div");
		div.appendChild(preview);
		
		/*
		  var input = document.createElement("input");
		  input.type = "file";
		  div.appendChild(input);
		  input.addEventListener("change",function() {
		  alert("HI");
		  var file = this.files[0];
		  alert(file.name);
		  alert(team);
		  instance.saveData(file);
		  input.value = "";
		  }, false);
		*/
	}

	this.generateList = function() {
		debug("Generating List",1);
		var store = getObjectStore(DB_DATA_NAME, 'readwrite');
		var req = store.openCursor();
		var teams = new Array();
		req.onsuccess = function(event) {
			var cursor = this.result;
			if(cursor) {
				teams.push(cursor.value);
				debug(cursor.key,4);
				cursor.continue();
			}
			else {
				//Done getting teams
				teams.sort(function(a,b) {
					return Number(a.team) - Number(b.team);
				});
				for(var i = 0;i < teams.length;i++) {
					teams[i].images = new Array();
					teams[i].hasData = true;
				}

				var store2 = getObjectStore(DB_IMAGE_NAME, 'readwrite');
				var req2 = store2.openCursor();
				req2.onsuccess = function(event) {
					var cursor2 = this.result;
					if(cursor2) {
						debug("Value: " + cursor2.value.team,3);
						var arr = teams.filter(function(element) {
							return element.team === cursor2.value.team;
						});
						debug("Length: " + arr.length,3);
						if(arr.length > 0) {
							arr[0].images.push(cursor2.value);
						}
						else {
							var team = new Object();
							team.team = cursor2.value.team;
							team.hasData = false;
							team.images = new Array();
							team.images.push(cursor2.value);
							teams.push(team);
						}
						cursor2.continue();
					}
					else {
						teams.sort(function(a,b) {
							return Number(a.team) - Number(b.team);
						});
						//Time to process the array
						while(preview.firstChild) {
							preview.removeChild(preview.firstChild);
						}
						for(var i = 0;i < teams.length;i++) {
							var div = document.createElement("div");
							preview.appendChild(div);
							preview.appendChild(document.createElement("br"));
							var b = document.createElement("b");
							b.innerHTML = teams[i].team;
							div.appendChild(b);
							if(teams[i].hasData) {
								var bracket1 = document.createTextNode(" [");
								var bracket2 = document.createTextNode("] ");
								var a = document.createElement("a");
								a.innerHTML = "Delete Data";
								a.style.cursor = "pointer";
								div.appendChild(bracket1);
								div.appendChild(a);
								div.appendChild(bracket2);
								a.onclick = (function() {
									var team = teams[i];
									return function() {
										console.log(team);
										for(var j = 0;j < team.images.length;j++) {
											var image = team.images[j];
											debug("Removing Image " + image.id,1);
											var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
											var req = store.delete(image.id);
											req.onsuccess = function() {
												instance.generateList();
												callback();
											};
										}
										debug("Removing " + team.team,1);
										var store = getObjectStore(DB_DATA_NAME, 'readwrite');
										var req = store.delete(team.team);
										req.onsuccess = function() {
											instance.generateList();
											callback();
										};
									}
								})();
							}
							div.appendChild(document.createElement("br"));
							debug("Loop Length " + teams[i].images.length,4);
							debug("Team Number " + teams[i].team,4);
							for(var j = 0;j < teams[i].images.length;j++) {
								var div2 = document.createElement("div");
								div2.style.display = "inline-block";
								div.appendChild(div2);
								var img = document.createElement("img");
								img.style.maxHeight = "5em";
								img.style.maxWidth = "100%";
								img.src = teams[i].images[j].image;
								div2.appendChild(img);
								div2.style.textAlign = "center";
								div2.appendChild(document.createElement("br"));
								var a = document.createElement("a");
								a.style.cursor = "pointer";
								a.innerHTML = "Remove";
								div2.appendChild(a);
								a.onclick = (function() {
									var image = teams[i].images[j];
									return function() {
										debug("Removing Image " + image.id,1);
										var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
										var req = store.delete(image.id);
										req.onsuccess = function() {
											instance.generateList();
											callback();
										};
									}
								})();
							}
						}
					}
				}
			}
		}
	}
}
