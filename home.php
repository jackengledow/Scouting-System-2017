<!DOCTYPE html>
<!--Scouting System Html-->
<!--this comment is unnesesary, obviously its the scouting system-->
<html lang="en">
	<head>
		<link rel = "stylesheet" href = "tab_stuff.css">
		<script src = "jquery-3.1.1.min.js"></script>
		<meta charset="utf-8">
		<link rel="stylesheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css">
		<script src="scouting.js"></script>
		<style>
			/* Dropdown Button */
			.dropbtn {
				background-color: #4CAF50;
				color: white;
				padding: 16px;
				font-size: 16px;
				border: none;
				cursor: pointer;
			}
			.dropbtn:hover, .dropbtn:focus {
				background-color: #3e8e41;
			}
			.dropdown {
				position: relative;
				display: inline-block;
			}
			.dropdown-content {
				display: none;
				position: absolute;
				background-color: #f9f9f9;
				min-width: 160px;
				box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
				z-index: 1;
			}
			.dropdown-content a {
				color: black;
				padding: 12px 16px;
				text-decoration: none;
				display: block;
			}
			.dropdown-content a:hover {
				background-color: #f1f1f1
			}
			.show {
				display:block;
			}
		</style>
	</head>
	<body>
		<div>
			<center><h1>Competition:</h1></center>
		</div>
		<div>
			<div class="dropdown">
			  <button onclick="dropDown()" class="dropbtn">Dropdown</button>
			  <div id="myDropdown" class="dropdown-content">
				<a href="#">Link 1</a>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
			  </div>
			</div>
		</div>
	</body>
	<script>
		function dropDown() {
			document.getElementById("myDropdown").classList.toggle("show");
		}

		// Close the dropdown menu if the user clicks outside of it
		window.onclick = function(event) {
		  if (!event.target.matches('.dropbtn')) {

			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
			  var openDropdown = dropdowns[i];
			  if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			  }
			}
		  }
		}
	</script>
</html>