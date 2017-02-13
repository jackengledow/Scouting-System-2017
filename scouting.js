var makeHighTeleop=0;
var missHighTeleop=0;
var makeHighAuton=0;
var makeLowTeleop=0;
var totalGears =0;
var lowDumpsAuton = [""];
var lowDumpsTeleop = [""];
var lowCountAuton = 0;
var lowCountTeleop = 0;
var smallLoadsAuton = [""];
var smallLoadsTeleop = [""];
var smallCountAuton = 0;
var smallCountTeleop = 0;
var mediumLoadsAuton = [""];
var mediumLoadsTeleop = [""];
var mediumCountAuton = 0;
var mediumCountTeleop = 0;
var bigLoadsAuton = [""];
var bigLoadsTeleop = [""];
var bigCountAuton = 0;
var bigCountTeleop = 0;
var canvas = document.getElementById('cnv');
var gridCounterMake = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var gridCounterMiss = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mouse_x = 0;
var mouse_y = 0;
var fouls = 0;
var technicals = 0;
var clickSmallAuton = false;
var clickMedAuton = false;
var clickBigAuton = false;
var clickSmallTeleop = false;
var clickMedTeleop = false;
var clickBigTeleop = false;
var pathTracer = [];
var pathCount = 0;

var countFouls=function (change) {
	fouls+=change;
	if (fouls<0){
		fouls = 0;
	}
	document.getElementById("addFoul").innerHTML = fouls;
}

var countTechnicals=function (change) {
	technicals+=change;
	if (technicals<0) {
		technicals=0;
	}
	document.getElementById("addTechnical").innerHTML = technicals;
}


var countHighMakeTeleop=function (change){
	makeHighTeleop+=change;
	if (makeHighTeleop<0){
		makeHighTeleop = 0;
	}
	document.getElementById("highScoreTeleop").innerHTML = makeHighTeleop;

}

var countHighMissTeleop=function (change){
	missHighTeleop+=change;
	if (missHighTeleop<0){
		missHighTeleop = 0;
	}
	document.getElementById("highMissTeleop").innerHTML = missHighTeleop;

}

var countHighMakeAuton=function (change){
	makeHighAuton+=change;
	if (makeHighAuton<0){
		makeHighAuton = 0;
	}
	document.getElementById("highScoreAuton").innerHTML = makeHighAuton;

}

var addGears=function (change){
	totalGears+=change;
	if (totalGears<0){
		totalGears = 0;
	}
	if(totalGears > 13) {
		totalGears = 13;
	}
	document.getElementById("gearsTeleop").innerHTML = totalGears;

}

var countLowMake=function (){
	makeLowTeleop++;
	totalLow++;
	console.log(makeLow + " low shots made")
	//console.log(totalLow + " total low shots");
	console.log(Math.round(100*(makeLow/totalLow)) + "% of made low shots");
}

var countLowMiss=function () {
	totalLow++;
	//console.log(totalLow + " total low shots");
	console.log(Math.round(100*(makeLow/totalLow)) + "% of made low shots");
}

var changeGear = function (change){
	totalGears += change;
	console.log(totalGears + " gears collected.")
}

var lowDumpAuton = function(type){
	if(clickSmallAuton || clickMedAuton || clickBigAuton){
		if(type == "Small"){
			if(clickSmallAuton==false){
				lowCountAuton -= 1;
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickSmallAuton = true;
				clickMedAuton = false;
				clickBigAuton = false;
			}
		}
		if(type == "Medium"){
			if(clickMedAuton==false){
				lowCountAuton -= 1;
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickMedAuton = true;
				clickSmallAuton = false;
				clickBigAuton = false;
			}
		}
		if(type == "Big"){
			if(clickBigAuton==false){
				lowCountAuton -=1;
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickBigAuton = true;
				clickMedAuton = false;
				clickSmallAuton = false;
			}
		}
	}
	else{
		if(type == "Small"){
			if(clickSmallAuton==false){
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickSmallAuton = true;
				clickMedAuton = false;
				clickBigAuton = false;
			}
		}
		if(type == "Medium"){
			if(clickMedAuton==false){
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickMedAuton = true;
				clickSmallAuton = false;
				clickBigAuton = false;
			}
		}
		if(type == "Big"){
			if(clickBigAuton==false){
				lowDumpsAuton[lowCountAuton] = type;
				lowCountAuton++;
				console.log("Auton: " + lowDumpsAuton);
				clickBigAuton = true;
				clickMedAuton = false;
				clickSmallAuton = false;
			}
		}
	}
}

var lowDumpTeleop = function(type){
	if(clickSmallTeleop || clickMedTeleop || clickBigTeleop){
		if(type == "Small"){
			if(clickSmallTeleop==false){
				lowCountTeleop -= 1;
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickSmallTeleop = true;
				clickMedTeleop = false;
				clickBigTeleop = false;
			}
		}
		if(type == "Medium"){
			if(clickMedTeleop==false){
				lowCountTeleop -= 1;
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickMedTeleop = true;
				clickSmallTeleop = false;
				clickBigTeleop = false;
			}
		}
		if(type == "Big"){
			if(clickBigTeleop==false){
				lowCountTeleop -=1;
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickBigTeleop = true;
				clickMedTeleop = false;
				clickSmallTeleop = false;
			}
		}
	}
	else{
		if(type == "Small"){
			if(clickSmallTeleop==false){
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickSmallTeleop = true;
				clickMedTeleop = false;
				clickBigTeleop = false;
			}
		}
		if(type == "Medium"){
			if(clickMedTeleop==false){
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickMedTeleop = true;
				clickSmallTeleop = false;
				clickBigTeleop = false;
			}
		}
		if(type == "Big"){
			if(clickBigTeleop==false){
				lowDumpsTeleop[lowCountTeleop] = type;
				lowCountTeleop++;
				console.log("Teleop: " + lowDumpsTeleop);
				clickBigTeleop = true;
				clickMedTeleop = false;
				clickSmallTeleop = false;
			}
		}
	}
}

var dumpPercentAuton = function(percent){
	size = lowDumpsAuton[lowCountAuton-1];
	if (size=="Small"){
		smallLoadsAuton[smallCountAuton]=percent;
		smallCountAuton++;
		console.log("Small Auton: " + smallLoadsAuton);
	}
	if (size=="Medium"){
		mediumLoadsAuton[mediumCountAuton]=percent;
		mediumCountAuton++;
		console.log("Medium Auton: " + mediumLoadsAuton);
	}
	if (size=="Big"){
		bigLoadsAuton[bigCountAuton]=percent;
		bigCountAuton++;
		console.log("Big Auton: " + bigLoadsAuton);
	}
	clickBigAuton = false;
	clickMedAuton = false;
	blickSmallAuton = false;
}

var dumpPercentTeleop = function(percent){
	size = lowDumpsTeleop[lowCountTeleop-1];
	if (size=="Small"){
		smallLoadsTeleop[smallCountTeleop]=percent;
		smallCountTeleop++;
		console.log("Small Teleop: " + smallLoadsTeleop);
	}
	if (size=="Medium"){
		mediumLoadsTeleop[mediumCountTeleop]=percent;
		mediumCountTeleop++;
		console.log("Medium Teleop: " + mediumLoadsTeleop);
	}
	if (size=="Big"){
		bigLoadsTeleop[bigCountTeleop]=percent;
		bigCountTeleop++;
		console.log("Big Teleop: " + bigLoadsTeleop);
	}
	clickBigTeleop = false;
	clickMedTeleop = false;
	blickSmallTeleop = false;
}

var setGridClickPos = function(x,y){
	mouse_x = x;
	mouse_y = y;
}

var clickZone = function (makemiss, change){
	if(mouse_x>=138 && mouse_x<211){
		index_x = 0;
	}
	if(mouse_x>=211 && mouse_x<290){
		index_x = 1;
	}
	if(mouse_x>=290 && mouse_x<364){
		index_x = 2;
	}
	if(mouse_x>=364 && mouse_x<438){
		index_x = 3;
	}
	if(mouse_x>=438 && mouse_x<509){
		index_x = 4;
	}
	
	
	if(mouse_y>=399 && mouse_y<479){
		index_y = 0;
	}
	if(mouse_y>=479 && mouse_y<558){
		index_y = 1;
	}
	if(mouse_y>=558 && mouse_y<639){
		index_y = 2;
	}
	if(mouse_y>=639 && mouse_y<720){
		index_y = 3;
	}
	if(mouse_y>=720 && mouse_y<795){
		index_y = 4;
	}
	
	if(makemiss == "Make"){
		gridCounterMake[index_x][index_y] += change;
		if (gridCounterMake[index_x][index_y] < 0){
			gridCounterMake[index_x][index_y] = 0;
		}
	}
	if(makemiss == "Miss"){
		gridCounterMiss[index_x][index_y] += change;
		if (gridCounterMiss[index_x][index_y] < 0){
			gridCounterMiss[index_x][index_y] = 0;
		}
	}
	console.log("When shooting from spot " + index_x + "," + index_y + ". Make: " + gridCounterMake[index_x][index_y] + ". Miss: " + gridCounterMiss[index_x][index_y] + ". Percent: " + 100*gridCounterMake[index_x][index_y]/(gridCounterMake[index_x][index_y]+gridCounterMiss[index_x][index_y])+ "%.");
}

var __slice = Array.prototype.slice;
(function($) {
  var Sketch;
  $.fn.sketch = function() {
    var args, key, sketch;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (this.length > 1) {
      $.error('Sketch.js can only be called on one element at a time.');
    }
    sketch = this.data('sketch');
    if (typeof key === 'string' && sketch) {
      if (sketch[key]) {
        if (typeof sketch[key] === 'function') {
          return sketch[key].apply(sketch, args);
        } else if (args.length === 0) {
          return sketch[key];
        } else if (args.length === 1) {
          return sketch[key] = args[0];
        }
      } else {
        return $.error('Sketch.js did not recognize the given command.');
      }
    } else if (sketch) {
      return sketch;
    } else {
      this.data('sketch', new Sketch(this.get(0), key));
      return this;
    }
  };
  Sketch = (function() {
    function Sketch(el, opts) {
      this.el = el;
      this.canvas = $(el);
      this.context = el.getContext('2d');
      this.options = $.extend({
        toolLinks: true,
        defaultTool: 'marker',
        defaultColor: '#000000',
        defaultSize: 5
      }, opts);
      this.painting = false;
      this.color = this.options.defaultColor;
      this.size = this.options.defaultSize;
      this.tool = this.options.defaultTool;
      this.actions = [];
      this.action = [];
      this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', this.onEvent);
      if (this.options.toolLinks) {
        $('body').delegate("a[href=\"#" + (this.canvas.attr('id')) + "\"]", 'click', function(e) {
          var $canvas, $this, key, sketch, _i, _len, _ref;
          $this = $(this);
          $canvas = $($this.attr('href'));
          sketch = $canvas.data('sketch');
          _ref = ['color', 'size', 'tool'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if ($this.attr("data-" + key)) {
              sketch.set(key, $(this).attr("data-" + key));
            }
          }
          if ($(this).attr('data-download')) {
            sketch.download($(this).attr('data-download'));
          }
          return false;
        });
      }
    }
    Sketch.prototype.download = function(format) {
      var mime;
      format || (format = "png");
      if (format === "jpg") {
        format = "jpeg";
      }
      mime = "image/" + format;
      return window.open(this.el.toDataURL(mime));
    };
    Sketch.prototype.set = function(key, value) {
      this[key] = value;
      return this.canvas.trigger("sketch.change" + key, value);
    };
    Sketch.prototype.startPainting = function() {
      this.painting = true;
      return this.action = {
        tool: this.tool,
        color: this.color,
        size: parseFloat(this.size),
        events: []
      };
    };
    Sketch.prototype.stopPainting = function() {
      if (this.action) {
        this.actions.push(this.action);
      }
      this.painting = false;
      this.action = null;
      return this.redraw();
    };
    Sketch.prototype.onEvent = function(e) {
      if (e.originalEvent && e.originalEvent.targetTouches) {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
      }
      $.sketch.tools[$(this).data('sketch').tool].onEvent.call($(this).data('sketch'), e);
      e.preventDefault();
      return false;
    };
    Sketch.prototype.redraw = function() {
      var sketch;
      this.el.width = this.canvas.width();
      this.context = this.el.getContext('2d');
      sketch = this;
      $.each(this.actions, function() {
        if (this.tool) {
          return $.sketch.tools[this.tool].draw.call(sketch, this);
        }
      });
      if (this.painting && this.action) {
        return $.sketch.tools[this.action.tool].draw.call(sketch, this.action);
      }
    };
    return Sketch;
  })();
  $.sketch = {
    tools: {}
  };
  $.sketch.tools.marker = {
    onEvent: function(e) {
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          this.startPainting();
          break;
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.stopPainting();
      }
      if (this.painting) {
        this.action.events.push({
          x: e.pageX - this.canvas.offset().left,
          y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        return this.redraw();
      }
    },
    draw: function(action) {
      var event, previous, _i, _len, _ref;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(action.events[0].x, action.events[0].y);
      _ref = action.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.context.lineTo(event.x, event.y);
		if(pathCount%0==0){
			pathTracer.push("("+Math.floor(event.x) + "," + Math.floor(event.y)+ ")");
			pathTracer.download = "pathTracer.txt";
			pathCount++;
		}
		else{
			pathCount++;
		}
		console.log(pathTracer);
        previous = event;
      }
      this.context.strokeStyle = action.color;
      this.context.lineWidth = action.size;
      return this.context.stroke();
    }
  };
  return $.sketch.tools.eraser = {
    onEvent: function(e) {
      return $.sketch.tools.marker.onEvent.call(this, e);
    },
    draw: function(action) {
      var oldcomposite;
      oldcomposite = this.context.globalCompositeOperation;
      this.context.globalCompositeOperation = "copy";
      action.color = "rgba(0,0,0,0)";
      $.sketch.tools.marker.draw.call(this, action);
      return this.context.globalCompositeOperation = oldcomposite;
    }
  };
})(jQuery);
