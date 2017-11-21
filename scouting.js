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
var gridCounter = [];
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
var index = 0;
var buttonSize = 0;
var idSelect = 0;

var countFouls=function (change) {
	fouls+=change;
	if (fouls<0){
		fouls = 0;
	}
	document.getElementById("addFoul").innerHTML = fouls;
	document.getElementById("fouls").value = fouls;
}

var countTechnicals=function (change) {
	technicals+=change;
	if (technicals<0) {
		technicals=0;
	}
	document.getElementById("addTechnical").innerHTML = technicals;
	document.getElementById("technicals").value = technicals;
}

var noSelect = function(){
	console.log(buttonSize);
	document.getElementById('shot'+(buttonSize+1)).remove();
}

var countHighMakeTeleop=function (change){
	makeHighTeleop+=change;
	if (makeHighTeleop<0){
		makeHighTeleop = 0;
	}
	document.getElementById("highScoreTeleop").innerHTML = makeHighTeleop;
	document.getElementById("teleopHigh").value = makeHighTeleop;

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
	document.getElementById("autonHigh").value = makeHighAuton;

}

var addGears=function (change){
	totalGears+=change;
	if (totalGears<0){
		totalGears = 0;
	}
	if(totalGears > 18) {
		totalGears = 18;
	}
	document.getElementById("gearsTeleop").innerHTML = totalGears;
	document.getElementById("teleopGears").value = totalGears;

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

/*function dotClicked(makemiss, change){
	this.points = document.getElementById("demo").innerHTML;
	this.amount = change;
	this.makemiss = makemiss;
	this.save = function() {

    };
}
*/
var incButtonSize = function(){
	buttonSize++;
	console.log(buttonSize + "buttonsize");
}
var changeColors = function (id){
	id = id.substring(6);
	idSelect = id;
	for(i = 1; i<=buttonSize; i++){
		document.getElementById('button'+i).style.opacity = 1;
	}
	for(i = 1; i<id; i++){
		document.getElementById('button'+i).style.opacity = 0.3; 
	}
	for(i = parseInt(id)+1; i <= buttonSize; i++){
		document.getElementById('button'+i).style.opacity = 0.3;
	}
	for(i = 1; i<=buttonSize; i++){
		document.getElementById('shot'+i).style.opacity = 0.4;
	}
	document.getElementById('shot'+id).style.opacity = 1;
}

var deletePoint = function (){
	document.getElementById('shot'+idSelect).remove();
	console.log(idSelect);
	for(i = parseInt(idSelect)+1; i<= buttonSize; i++){
		document.getElementById('shot'+i).id = 'shot' + (parseInt(i)-1).toString();
		document.getElementById('button'+(i-1)).style.backgroundColor = document.getElementById('button'+(i)).style.backgroundColor;
		document.getElementById('button'+(i-1)).style.border = document.getElementById('button'+(i)).style.border;
	}
	for(i = 1; i<=buttonSize; i++){
		document.getElementById('button'+i).style.opacity = 1;
	}
	document.getElementById('button'+buttonSize).remove();
	gridCounter.splice(idSelect-1,1);
	console.log(gridCounter);
	buttonSize--;
}
var resetButtons = function(){
	for(i = 1; i<buttonSize; i++){
		document.getElementById('button'+i).style.opacity = 1;
	}
	for(i = 1; i<buttonSize; i++){
		document.getElementById('shot'+i).style.opacity = 0.4;
	}
}
var clickZone = function (makemiss, change){
	mouse = document.getElementById("demo").innerHTML;
	gridCounter[index] = mouse + ". Amount: " + change + ". MakeMiss: " + makemiss + ".";
	index++;
	console.log(gridCounter);
	document.getElementById("jalensTag").innerHTML = gridCounter;
}
var undo = function(){
	gridCounter.pop();
	for(i = 1; i<=buttonSize; i++){
		document.getElementById('button'+i).style.opacity = 1;
	}
	document.getElementById('shot'+buttonSize).remove();
	document.getElementById('button'+buttonSize).remove();
	buttonSize--;
	
}
var clearPathTracer = function(){
	pathTracer = [];
}
var speedOne = function(){
	document.getElementById("speed").value = 1;
}
var speedTwo = function(){
	document.getElementById("speed").value = 2;
}
var speedThree = function(){
	document.getElementById("speed").value = 3;	
}
var successClimb = function(){
	document.getElementById("climb").value = "1";
}
var failClimb = function(){
	document.getElementById("climb").value = "0";
}
var nullClimb = function(){
	document.getElementById("climb").value = "0";
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

		pathTracer.push("("+Math.round(event.x) + "," + Math.round(event.y)+ ")");
		pathCount++;
		
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
