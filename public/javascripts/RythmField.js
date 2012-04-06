var RythmField = function (id, options) {
	var me = this;
	me.id = id;
	var el = me.el = $(id+" input.trainField");
	me.checkEl = new CheckField(this, $(id+" input.checkField"), $(id+" .checkStatus"));	
	
	console.log(id);
	this.raporter = new Raporter(this, $(id+" div.raport"));
	
	el.keypress(function (e) {
		me.keypress.apply(me, arguments);
	});
	el.focusout(function (e) {
		me.focusOut.apply(me, arguments);
	});
	el.focusin(function (e) {
		me.focusIn.apply(me, arguments);
	});
	
};

RythmField.prototype = {
	id: null,
	el: null,
	checkEl: null,
	presses: new Example(),
	trainingData: [],
	oracle: new Oracle(),
	start: function () {
		console.log("Started");
		this.presses = new Example();
		this.el.val("");
	},
	keypress: function (e) { 
		if (this.el.val().length<=0) {
			this.start();
		}
		if ( event.which == 13 ) {
			event.preventDefault();
			this.end();
			this.start();
		} else {
			this.presses.add(e.timeStamp);	
		}
//		console.log(event.timeStamp, event.which);
	},
	focusIn: function () {
		this.start();
	},
	focusOut: function () {
//		this.end();
	},
	end: function () {
		this.trainingData.push(this.presses);
		this.train();
		this.raporter.reCreate();
		console.log(this.presses);
	},
	train: function () {
		this.cleanUpTrainingData();
		return this.oracle.train.call(this.oracle, this.trainingData);
	},
	cleanUpTrainingData: function () {
		var data = this.trainingData,
			len = data[0].length;
		
		for (var i = 1; i<data.length; i++) {
			if (data[i].length!==len) {
				console.log("# WARNING A result with length of "+data[i].length+" got thrown away: "+data[i]);
				data.splice(i,1);
			}
		}
		return data;
	},
	clear: function () {
		this.trainingData = [];
		this.start();
	},
	checkLast: function () {
		var check = this.presses.length>0 ? this.presses : this.trainingData[this.trainingData.length-1];
		console.log("Checking", check);
		return this.oracle.check.call(this.oracle, check);
	}
};



/*,
	extractLine2: function (line) {
		if (line.length<=1) {
			return [];
		}
		var base = line[0],
			data = [],
			max = Math.max.apply(null, line);
			total = line[line.length-1]-line[0];
		
		line.forEach(function (l) {
			data.push(l-base);
			base=a.timeStamp;
		});
		
		data[0] = 1;
		
		data.push(total);
		
		return data;
	},
	extractData2: function () {
		var data = [];
		this.trainingData.forEach(function (l) {
			data.push(this.extractLine2(l));
		});
		
		return data;
	}
	*/

