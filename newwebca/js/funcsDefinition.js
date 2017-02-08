//----------------------------------------------//
//                                              //
//                                              //
//                                              //
//----------------------------------------------//

var funcs = {
	/*"Team Information": function(base, teamId){
		var store = getObjectStore("teams",'readwrite');

		store.get(teamId).onsuccess = function(event) {
			var keys = Object.keys(this.result);

			keys.forEach(function(e,i,a) {
				base.append("b")
					.html(e + ": ");
				base.append("span")
					.html(+ this.result[e]);
				base.append("br");
			},this);
		}
	},*/
	"Summary": function(base, teamId, matchIds){
    	var totalLandfill = 0;
        var totalHuman = 0;
		var points = 0, num = 0, pointsList = [];
		dbFind("records",
			function(r) {
				return isGoodRecord(r, teamId, matchIds);
			},
			function(r) {
				   var roundPoints = 0;
				   for (var i = 0; i < r.toteLocation.length; i++){
					   if (r.toteLocation[i] === "landfill"){
						   totalLandfill++;
					   }
					   else if (r.toteLocation[i] === "hp"){
						   totalHuman++;
					   }
				   }

				   for(var i = 0; i < r.after.length; i++) {
					   var recordPoints = stackList[parseInt(r.after[i])][3]-stackList[parseInt(r.before[i])][3];
					   roundPoints += recordPoints;
					   points += recordPoints;
				   }

				   pointsList.push({
					   matchId: r.match_id,
					   points: roundPoints
				   });
				   num++;
               },
            function() {
				   base.append("h3")
					   .html("Average Points/Match: <b>" + Math.round(10*points/num)/10 + "</b>")
				   base.append("h3")
					   .html("Reduced Human:Landfill Ratio");
				   base.append("b")
					   .html("<b>1:" + (totalHuman == 0 ? totalLandfill : totalLandfill / totalHuman) + "</b>");
			   });
	},
	/*
	"Robot Pics": function(base, teamId){ //We probably want a better way to see these pictures later. A click to zoom in would work nicely
		dbFind("robots",
			   function(robot) {
				   return robot.team_id == teamId;
			   },
			   function(robot) {
				   console.log(robot);
				   for(var i = 0; i < robot.images.length; i++){
					   base.append("a")
						   .attr("href",robot.images[i])
						   .attr("data-gallery","")
						   .append("img")
						   .attr("src",robot.images[i])
						   .style("max-width","100%");
					   base.append("br");
               function() {
				   if(!(localStorage.getItem("datavisPersistentImages") == "true" || localStorage.getItem("datavisPersistentImages") == null)) {
					   dbFind("robots",
							  function(robot) {
								  return robot.team_id == teamId;
							  },
							  function(robot) {
								  console.log(robot);
								  for(var i = 0; i < robot.images.length; i++){
									  base.append("a")
										  .attr("href",robot.images[i])
										  .attr("data-gallery","")
										  .append("img")
										  .attr("src",robot.images[i])
										  .style("max-width","100%");
									  base.append("br");
								  }
							  },
							 function(){
								 base.append("h3")
									 .html("Average Points/Match: <b>" + Math.round(10*points/num)/10 + "</b>")
								 base.append("h3")
									 .html("Reduced Human:Landfill Ratio");
								 base.append("b")
									 .html("<b>1:" + (totalHuman == 0 ? totalLandfill : totalLandfill / totalHuman) + "</b>");
							 });
				   }
				   else {
					   base.append("h3")
						   .html("Average Points/Match: <b>" + Math.round(10*points/num)/10 + "</b>")
					   base.append("h3")
						   .html("Reduced Human:Landfill Ratio");
					   base.append("b")
						   .html("<b>1:" + (totalHuman == 0 ? totalLandfill : totalLandfill / totalHuman) + "</b>");
				   }
			   });
	},*/

	/*
	"Raw Data": function(base, teamId) {
		var store = getObjectStore("records",'readwrite');
		var index = store.index("team_id");
		var req = index.get(teamId);

		req.onsuccess = function(event) {
			var keys = Object.keys(this.result);

			keys.forEach(function(e,i,a) {
				base.append("b")
					.html(e + ": ");
				base.append("span")
					.html(this.result[e]);
				base.append("br");
			},this);
		}

		req.onerror = function(evt) {
			console.error("openDb:", evt.target.errorCode);
		};

	},*/

	"Notes per Match": function(base, teamId, matchIds) {
		dbFind("records",
			   function(r) {
				   return isGoodRecord(r, teamId, matchIds);
			   },
			   function(r) {
				   console.log(r);
				   if(r.robotNotes !== ""){
					   var p = base.append("p");
					   p.append("b")
						   .html("Robot Issues: ");
					   p.append("span")
						   .html(r.robotNotes);
				   }
				   if(r.autonNotes !== ""){
					   var p = base.append("p");
					   p.append("b")
						   .html("Auton Notes: ");
					   p.append("span")
						   .html(r.autonNotes);
				   }
				   if(r.teleopNotes !== ""){
					   var p = base.append("p");
					   p.append("b")
						   .html("Teleop Notes: ");
					   p.append("span")
						   .html(r.teleopNotes);
				   }
				   if(r.robotNotes == "" && r.teleopNotes == "" && r.autonNotes == "") {
					   var h4 = base.append("h4")
									.html("No notes");
				   }
				   base.append("hr");
			   },
		function() { document.getElementById("sc" + teamId + 'Notes per Match').lastChild.remove(); });
	},

	/*"Point Cloud": function(base, teamId) {
		var xs = [], ys = [], w = 400, h = 400, num = 0, team = [];
		var st1 = "stroke: #009900; fill: #00ff00;", st2 = "stroke: #990099; fill: #ff00ff;";

		dbFind("records",
			   function(r) {
				   return r.team_id == teamId;
			   },
			   function(r) {
				   xs[num] = parseInt(r.x[0])*0.01;
				   ys[num] = parseInt(r.y[0])*0.01;
				   team[num] = parseInt(r.type[0]);
				   num++;
				   ys[num] = parseInt(r.x[1])*0.01;
				   ys[num] = parseInt(r.y[1])*0.01;
				   team[num] = parseInt(r.type[1]);
				   num++;
			   },
			   function() {
				   base = base.append("div")
					   .attr("width", w)
					   .attr("height", h);

				   var svg = base.append("svg")
					   .attr("width", w)
					   .attr("height", h);

				   for(var i = 0; i < num; i++) {
					   svg.append("circle")
						   .attr("cx", xs[i])
						   .attr("cy", ys[i])
						   .attr("style", (team[i] == 0) ? st1:st2);
				   }*/

				   /*base.append("img")
					   .attr("src", "/img/2015/fieldred.png")
					   .attr("width", w)
					   .attr("height, h)
					   .attr("style", "position: absolute;");

			   });
	},*/

	"Auton Performance Graph": function(base, teamId, matchIds) {
		var totes = [], bins = [], num = 0, svg, w = 400, h = 390;
		var style = "fill: #777; fill-opacity: 0.3;";

		dbFind("records",
			   function(r) {
				   return isGoodRecord(r, teamId, matchIds);
			   },
			   function(r) {
				   totes[num] = parseInt(r.autonTotes)*0.33333;
				   bins[num] = parseInt(r.autonBins)*0.33333;
				   num++;
			   },
			   function() {

				   var t = 0, b = 0;

				   var svg = base.append("svg")
					   .attr("width", w)
					   .attr("height", w);

				   for(i = 0; i < num; i++) {
					   t += totes[i];
					   b += bins[i];
				   }
				   t /= num;
				   b /= num;

				   svg.append("rect")
					   .attr("x", 0)
					   .attr("y", h-h*t)
					   .attr("width", 198)
					   .attr("height", h*t)
					   .attr("style", "fill: #daec00; fill-opacity: 0.9;");
				   svg.append("rect")
					   .attr("x", w*0.5)
					   .attr("y", h-h*b)
					   .attr("width", 198)
					   .attr("height", h*b)
					   .attr("style", "fill: #319920; fill-opacity: 0.9;");


				   for(i = 0; i < num; i++) {
					   svg.append("rect")
						   .attr("x", i*w*0.5/num)
						   .attr("y", h-h*totes[i])
						   .attr("width", w*0.5/num-2)
						   .attr("height", h*totes[i])
						   .attr("style", style);
					   svg.append("rect")
						   .attr("x", w*0.5+i*w*0.5/num)
						   .attr("y", h-h*bins[i])
						   .attr("width", w*0.5/num-2)
						   .attr("height", h*bins[i])
						   .attr("style", style);
				   }

				   svg.append("text")
					   .html("Avg Auton Totes: " + (t * 3).toFixed(2))
					   .attr("style", "text-anchor: middle")
					   .attr("x", 100)
					   .attr("y", h-h*t+5);
				   svg.append("text")
					   .html("Avg Auton Bins : " + (b * 3).toFixed(2))
					   .attr("style", "text-anchor: middle")
					   .attr("x", 300)
					   .attr("y", h-h*b+5);

				   totes = [];
				   bins = [];
				   num = 0;
			   });
	},

	/*
	"Ability Chart": function(base, teamId) {
		var r1 = 200, r2 = 160;
		// r1 is outer radius (and size of the svg)
		// r2 is inner radius (for the actual pentagonal map)
		var stats = [0, 0, 0, 0, 0], statNum = 0;

		dbFind("records",
			   function(r) {
				   return r.team_id === teamId;
			   },
			   function(r) {
				   stats[0] += parseInt(r.noodleAbility) || 0;
				   stats[1] += parseInt(r.maneuverability) || 0;
				   stats[2] += parseInt(r.scoringEase) || 0;
				   stats[3] += parseInt(r.orientAbility) || 0;
				   stats[4] += parseInt(r.stackingEase) || 0;
				   statNum++;
			   },
			   function() {
				   for(i = 0; i < 5; i++) {
					   stats[i] /= statNum*5;
				   }
				   var svg = base.append("svg")
					   .attr("width", "100%")
					   .attr("height", "100%")
					   .attr("viewBox", "0 0 " + (r1*2+20) + " " + (r1*2+20));
				   var poly = svg.append("polygon");
				   var p1 = ""; p2 = "";
				   for(i = 0; i < 5; i++) {
					   p1 += (r1+r2*Math.cos(i*1.25663704)) + ", " + (r1+r2*Math.sin(i*1.25663704)) + " ";
					   p2 += (r1 + stats[i]*r2*Math.cos(i*1.25663704)) + ", " + (r1 + stats[i]*r2*Math.sin(i*1.25663704)) + " ";
					   svg.append("line")
						   .attr("style", "stroke: #444444;")
						   .attr("x1", r1+r2*Math.cos(i*1.25663704))
						   .attr("y1", r1+r2*Math.sin(i*1.25663704))
						   .attr("x2", r1)
						   .attr("y2", r1);
					   svg.append("text")
						   .attr("text-anchor", "middle")
						   .attr("x", r1+r2*Math.cos(i*1.25663704))
						   .attr("y", r1+r2*Math.sin(i*1.25663704))
						   .html(abilityNames[i]);
					   for(j = 0; j < 1; j += 0.2) {
						   svg.append("circle")
							   .attr("cx", (r1 + j*r2*Math.cos(i*1.25663704)))
							   .attr("cy", (r1 + j*r2*Math.sin(i*1.25663704)))
							   .attr("r", 2);
					   }
				   }
				   poly.attr("points", p1)
					   .attr("style", "fill: #aaaaaa;");
				   svg.append("polygon")
					   .attr("points", p2)
					   .attr("style", "stroke: #00aaff; fill: #00ffaa; fill-opacity: 0.5;");

				   //reset variables
				   stats = [0, 0, 0, 0, 0];
				   p1 = ""; p2 = "";
				   statNum = 0;

			   });
	},*/

	"Ability Bar Graph": function(base, teamId, matchIds) {
		var abilities = [];
		var averages = {
			noodleAbility: 0,
			moveAbility: 0,
			scoreEase: 0,
			stackEase: 0,
			orientAbility: 0,
		};

		dbFind("records",
				function(r) {
					return isGoodRecord(r, teamId, matchIds);
				},

				function(rec) {
					abilities.push({
						noodleAbility: rec.noodleAbility,
						moveAbility: rec.maneuverability,
						scoreEase: rec.scoringEase,
						stackEase: rec.stackingEase,
						orientAbility: rec.orientAbility,
					});
				},

				function() {
					var total = abilities.length;

					for (var object of abilities) {
						for (var ability in object) {
							if (ability !== "N/A" && typeof object[ability] === "string") {
								averages[ability] += parseFloat(object[ability]);
							}
						}
					}

					for (ability in averages) {
						averages[ability] /= total;
					}

					const RECT_PADDING = 15;
					const RECT_HEIGHT = 360;
					const RECT_WIDTH = 400 / 5 - RECT_PADDING;

					const SUB_RECT_PADDING = 3;

					var svg = base.append("svg")
						.attr("width", 400)
						.attr("height", 400);

					var i = 0;
					for (average in averages) {
						var overlayX = (400 / 5) * i + RECT_PADDING;
						var overlay = svg.append("rect")
							.attr("width", RECT_WIDTH)
							.attr("height", (averages[average] / 5) * RECT_HEIGHT)
							.attr("x", (400 / 5) * i + RECT_PADDING)
							.attr("style", "fill: #88FF88")

						overlay.attr("y", RECT_HEIGHT - overlay.attr("height"));

						var j = 0;
						for (ability of abilities) {
							var rectWidth = RECT_WIDTH / total;

							var rect = svg.append("rect")
								.attr("width", rectWidth - SUB_RECT_PADDING)
								.attr("height", (ability[average] / 5) * RECT_HEIGHT)
								.attr("style", "fill: #000; fill-opacity: 0.3")
								.attr("x", overlayX + rectWidth * j + SUB_RECT_PADDING);

							rect.attr("y", RECT_HEIGHT - rect.attr("height"));

							j++;
						}

						var label = svg.append("text")
							.html(abilityNames[i])
							.attr("x", overlayX)
							.attr("y", 200)
							.attr("text-anchor", "middle");

						label.attr("transform", "rotate(-90, " + label.attr("x") + ", " + label.attr("y") + ")");

						var number = svg.append("text")
							.html(averages[average].toFixed(2))
							.attr("x", overlayX + (RECT_WIDTH / 2))
							.attr("y", 395)
							.attr("style", "font-size: 24; text-anchor: middle");

						i++;
					}

					abilities = [];
					averages = {};
				}
		);

	},

	"Points Contributed": function(base, teamId, matchIds) {
		var points = 0, num = 0, pointsList = [];

		dbFind("records",
			   function(r) {
				   return isGoodRecord(r, teamId, matchIds);
			   },

			function(r) {
				var roundPoints = 0;
				for(var i = 0; i < r.after.length; i++) {
					var recordPoints = stackList[parseInt(r.after[i])][3]-stackList[parseInt(r.before[i])][3];
					   roundPoints += recordPoints;
					   points += recordPoints;
				}
				pointsList.push({
					matchId: r.match_id,
					points: roundPoints
				});
				num++;
			   },

			   function() {
				   base.append("div")
					   .html("Total Contributed Points: ")
					   .attr("style", "font-size: 20px;")
					   .append("b")
					   .html(points)
					   .attr("style", "font-size: 20px;");
				   base.append("div")
					   .html("Average Points/Match: ")
					   .attr("style", "font-size: 20px;")
					   .append("b")
					   .html(Math.round(10*points/num)/10)
					   .attr("style", "font-size: 20px;");
				   points = 0;
				   num = 0;

				   var list = base.append("div")
					   .html("Points Per Match:")
					   .attr("style", "font-size: 20px;")
					   .append("ol");

				   $.each(pointsList, function (index, value) {
					   dbFind("matches",
						   function (m) {
							   return m._id == value.matchId;
						   },
						   function (m) {
							   list.append("li")
								   .attr("value", m.number.number)
								   .html(value.points);
						   });
				   });
			   }
		);
	},

    "Abilities Over Time": function(base, teamId, matchIds) {
		var colors = ["red", "blue", "green", "yellow", "purple"];
		var graph = new TimeChart(base, 400, 400, teamId, matchIds, abilityProperties, abilityNames, colors);
		graph.setDigits(0, 0);

		graph.draw();
    },

	/*"Test Bars": function(base, teamId) {
		var graph = new BarGraph(base, 400, 400, 10, 20);

		graph.currentBar("Bar one", "#F00");
		graph.push(100);
		graph.push(200);

		graph.currentBar("Lopus Arneras", "#0F0");
		graph.push(50);
		graph.push(30);

		graph.currentBar("John Doe", "#00F");
		graph.push(200);
		graph.push(400);

		graph.draw();
	   },*/

	"Auton Totes and Bins Over Time": function(base, teamId, matchIds) {
		var colors = ["yellow", "green"];
		var properties = ["autonTotes", "autonBins"];
		var names = ["Auton Totes", "Auton Bins"];

		var graph = new TimeChart(base, 400, 400, teamId, matchIds, properties, names, colors);
		graph.setDigits(0, 0);

		graph.draw();

		/* A listing of what they did per match. */
		var list = base.append("div")
            .html("Listing:")
            .attr("style", "font-size: 20px;")
            .append("ol");

		dbFind("records",
			function (r) {
				return isGoodRecord(r, teamId, matchIds);
			},
			function (r) {
				dbFind("matches",
					function (m) {
						return m._id == r.match_id;
					},
					function (m) {
						list.append("li")
							.attr("value", m.number.number)
							.html("Totes: " + r.autonTotes + ", Bins: " + r.autonBins);
					});
			});
    },

    "Stacking Modifications": function(base, teamId, matchIds) {
		var chart = new LineGraph(base, 400, 400);
		chart.setDigits(0, 0);
		chart.xOffset = 1;

		var data = [];
		var dates = [];

		dbFind("records",
			function(r) {
				return isGoodRecord(r, teamId, matchIds);
			},

			function(r) {
				var mods = {
					totes: [],
					bins: [],
				};
				for (var i = 0; i < r.before.length; i++) {
					var recDate = new Date(r.created_at);

					var before = stackInfo(r.before[i]);
					var after = stackInfo(r.after[i]);

					if (before.totes === 0) {
						console.log("moved stack:", i);
					}

					var toteDif = after.totes - before.totes;
					var binDif = after.bins - before.bins;
					mods.totes.push(toteDif);
					mods.bins.push(binDif);
				}

				var isNewest = true;
				for (var i = 0; i < dates.length; i++) {
					if (recDate < dates[i]) {
						dates.splice(i, 0, recDate);
						data.splice(i, 0, { totes: sumArr(mods.totes),
											bins: sumArr(mods.bins) });
						isNewest = false;
						break;
					}
				}

				if (isNewest) {
					dates.push(recDate);
					data.push( { totes: sumArr(mods.totes),
								 bins: sumArr(mods.bins) });
				}
			},

			function() {
				chart.xNotches = data.length - 1;

				chart.currentLine("Totes", "#FF0");
				for (var i = 0; i < data.length; i++) {
					chart.push({
						x: i + 1,
						y: data[i].totes
					});
				}

				chart.currentLine("Bins", "#0F0");
				for (var i = 0; i < data.length; i++) {
					chart.push({
						x: i + 1,
						y: data[i].bins
					});
				}

				chart.draw();
			}
		);
	},

	"Match by Match Stack Modifications": function(base, teamId, matchIds) {
        dbFind("records",
               function(r) {
                   return isGoodRecord(r, teamId, matchIds);
               },
            function(r) {
				dbFind("matches",
					function (m) {
						return m._id == r.match_id;
					},
					function (m) {
						var capitalizedType = m.number.type.charAt(0).toUpperCase() + m.number.type.slice(1);
						base.append("h3")
                            .html(capitalizedType + " Match " + m.number.number);
                        for (var i = 0; i < r.after.length; i++){
							base.append("p")
								.html(i == 0 ? ("Modifications this match: " + "<b>" + r.after.length + "</b>") : "");
                            var row = base.append("div")
                                .attr("class", "row");
							var before = row.append("div")
                                .attr("class", "col-md-3");

							if (r.before[i] != 0) {
								before.append("img")
									.attr("src", "img/2015/stacks/" + r.before[i] + ".png")
									.attr("alt", r.before[i]);
							} else {
								before.append("b")
									.html("Nothing");
							}

                            row.append("div")
                                .attr("class", "col-md-6")
                                .html(modificationHTML(r, i));

							var after = row.append("div")
								.attr("class", "col-md-3");

							if (r.after[i] != 0) {
								after.append("img")
									.attr("src", "img/2015/stacks/" + r.after[i] + ".png")
									.attr("alt", r.after[i]);
							} else {
								after.append("b")
									.html("Nothing");
							}

							if (i < r.after.length - 1)
								base.append("hr");
						}
					});
            });
    },

	"Match by Match Scored Stacks": function (base, teamId, matchIds) {
		dbFind("records",
            function(r) {
                return isGoodRecord(r, teamId, matchIds);
            },
            function(r) {
                dbFind("matches",
                    function (m) {
                        return m._id == r.match_id;
                    },
                    function (m) {
                        var capitalizedType = m.number.type.charAt(0).toUpperCase() + m.number.type.slice(1);
                        base.append("h3")
                            .html(capitalizedType + " Match " + m.number.number);
						var scoredStacks = [];
						for (var i = 0; i < r.after.length; i++)
							if (r.scored[i] == 1)
							scoredStacks.push(r.after[i]);

                        for (var i = 0; i < scoredStacks.length; i += 3){
							base.append("p")
								.html(i == 0 ? ("Scores this match: " + "<b>" + scoredStacks.length + "</b>") : "");
                            var row = base.append("div")
								.attr("class", "row");

							for (var j = i; j < i + 3; j++) {
								if (j >= scoredStacks.length)
									break;

								var column = row.append("div")
									.attr("class", "col-md-4");

								if (scoredStacks[j] != 0) {
									column.append("img")
										.attr("src", "img/2015/stacks/" + scoredStacks[j] + ".png")
										.attr("alt", scoredStacks[j]);
								} else {
									column.append("b")
										.html("Nothing");
								}
							}

                            if (i + 2 < r.after.length - 1)
                                base.append("hr");
                        }
                    });
            });
    },

    "Tote Origin Ratio": function(base, teamId, matchIds) {
        var totalLandfill = 0;
        var totalHuman = 0;

        dbFind("records",
               function(r) {
                   return isGoodRecord(r, teamId, matchIds);
               },
               function(r) {
				   for (var i = 0; i < r.toteLocation.length; i++){
					   if (r.toteLocation[i] === "landfill"){
						   totalLandfill++;
					   }
					   else if (r.toteLocation[i] === "hp"){
						   totalHuman++;
					   }
				   }
               },
               function() {
				   base.append("h3")
					   .html("Human:Landfill Ratio");
				   base.append("h4")
					   .html("Expanded Ratio:");
				   base.append("b")
					   .html(totalHuman + ":" + totalLandfill);
				   base.append("h4")
					   .html("Reduced Ratio:");
				   base.append("b")
					   .html("1:" + (totalHuman == 0 ? totalLandfill : totalLandfill / totalHuman));
			   });
    },
	"Auton Positions": function(base, teamId, matchIds) {
		console.log(base.node());

		var heatmap;

		heatmap = new Heatmap(2,100,100);
		heatmap.setDomain(0,100,0,100);
		heatmap.setOffsets(0,0,0,0);
		heatmap.setImage("img/2015/fieldred.png");
		heatmap.setColors([{red:0,green:190,blue:0},{red:132,green:0,blue:168}]);

        dbFind("records",
               function(r) {
                   return isGoodRecord(r, teamId, matchIds);
               },
               function(r) {
				   console.log(r);
				   for(var i = 0;i < r.x.length;i++) {
					   x = r.x;
					   y = r.y;
					   type = r.type;

					   x[i].y = y[i];
					   y[i].type = type[i];

					   heatmap.addPoint(type[i],x[i],y[i]);

					   //console.log(type[i],x[i],y[i]);
					   //heatmap.addPoint(type[i],x[i],y[i]);
				   }
			   },
			   function() {
				   heatmap.process();
				   console.log("process");
				   heatmap.appendToParent(base.node());
				   console.log("append");
			   });
    }
};

//-----------------------other functions-----------------
var abilityNames = ["Noodle Ability", "Maneuverability", "Ease of Scoring", "Tote Orientability", "Stacking Ease"];
var abilityProperties = ["noodleAbility", "maneuverability", "scoringEase", "orientAbility", "stackingEase"];

var stackList = [[0, 0, 0, 0],
			[1, 0, 0, 2],
			[2, 0, 0, 4],
			[3, 0, 0, 6],
			[4, 0, 0, 8],
			[5, 0, 0, 10],
			[6, 0, 0, 12],
			[0, 1, 0, 0],
			[1, 1, 0, 6],
			[2, 1, 0, 12],
			[3, 1, 0, 18],
			[4, 1, 0, 24],
			[5, 1, 0, 30],
			[6, 1, 0, 36],
			[0, 1, 1, 6],
			[1, 1, 1, 12],
			[2, 1, 1, 18],
			[3, 1, 1, 24],
			[4, 1, 1, 30],
			[5, 1, 1, 36],
			[6, 1, 1, 42]];

function sumArr(arr) {
	var total = 0;
	for (val of arr) {
		total += val;
	}

	return total;
}

// Returns info about a stack from an index into the stack array on the Scouting Form
function stackInfo(i) {  // 14
	var totes = 0, bins = 0, noodle = false;
	totes = i % 7;

	if (i >= 14) {
		bins = 1;
		noodle = true;
	} else if (i >= 7) {
		bins = 1;
	}

	return {
		totes: totes,
		bins: bins,
		noodle: noodle
	};
}

// A stacking modification HTML.
function modificationHTML (record, index) {
	var modificationString = "";

	if (record.toteLocation[index] == "hp" || record.toteLocation[index] == "landfill") {
		if (record.toteLocation[index] == "hp")
			modificationString = "+ Human Player ";
		else if (record.toteLocation[index] == "landfill")
			modificationString = "+ Landfill ";
		else
			modificationString = "+ " + record.toteLocation[index] + " ";
	}

	modificationString += "&rarr;";

	if (record.scored[index] == 1)
		modificationString += "<br />Scored";

	return modificationString;
}

/* r for record */
function isGoodRecord(r, teamId, matchIds) {
    return matchIds ? (matchIds.indexOf(r.match_id) > -1 && r.team_id == teamId) : r.team_id == teamId;
}
