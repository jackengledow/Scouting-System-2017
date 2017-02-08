// Author: Tiger Huang

function MultiFile(label,name,DB_IMAGE_NAME,database,change_callback) {
	const BGCOLOR = "#DFDFDF";

	var instance = this;
	var parentNode;
	var team;
	var preview;
	var db = database;

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

		var input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*;capture=camera";
		div.appendChild(input);
		input.addEventListener("change",function() {
			debug("HI");
			var file = this.files[0];
			debug(file.name);
			debug(team);
			instance.saveData(file);
			input.value = "";
		}, false);
		
	}

	this.setTeam = function(teamNumber) {
		team = teamNumber;
		this.refreshList();
		debug(team);
	}

	this.saveData = function(file) {
		debug("Saving File",1);
		var reader = new FileReader();
		reader.onloadend = function() {
			var obj = new Object();
			obj.team = team;
			obj.image = reader.result;

			debug(obj.image);

			var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
			var req;
			try {
				req = store.add(obj);
			} catch (e) {
				throw e;
			}
			req.onsuccess = function (evt) {
				console.log("Image Insertion in DB successful",1);
				instance.refreshList();
			};
			req.onerror = function() {
				console.error("Image DB Insertation error", this.error);
			};
		}
		reader.readAsDataURL(file);
		
	}

	this.refreshList = function() {
		debug("Refreshing Image List",1);

		while(preview.firstChild) {
			preview.removeChild(preview.firstChild);
		}

		var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
		//var req = store.get(team);
		//req.onsuccess = function(event) {
		var index = store.index("team");
		index.openCursor(IDBKeyRange.only(team)).onsuccess = function(event) {
			//store.openCursor().onsuccess = function(event) {
			debug("Testing");
			var cursor = this.result;
			debug(event);
			debug(cursor);
			if (cursor) {
				//var file = JSON.parse(cursor.value.image);
				var file = cursor.value.image;
				debug("Team: " + cursor.key);
				debug(file);

				var div = document.createElement("div");
				div.style.display = "inline-block";
				div.style.textAlign = "center";
				preview.appendChild(div);

				var img = document.createElement("img");
				img.style.maxHeight = "10em";
				img.style.maxWidth = "100%";
				img.src = file;
				div.appendChild(img);
				div.appendChild(document.createElement("br"));

				var link = document.createElement("a");
				link.style.cursor = "pointer";
				link.innerHTML = "Remove";
				div.appendChild(link);
				link.onclick = (function() {
					var cur_index = cursor.value.id;
					return function() {
						debug("Removing",1);
						debug(cur_index);
						debug(cursor,2);
						var store = getObjectStore(DB_IMAGE_NAME, 'readwrite');
						var req = store.delete(cur_index);
						req.onsuccess = function(event) {
							debug("Image deleted",1);
							instance.refreshList();
						}
					}
				})();

				cursor.continue();
			}
		}
		change_callback();
	}
}
