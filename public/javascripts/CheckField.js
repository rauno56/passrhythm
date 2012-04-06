var CheckField = function (field, el, statusEl) {
	var me = this;
	me.field = field;
	me.el = el;
	me.statusEl = statusEl;
	
	el.keypress(function (e) {
		me.keypress.apply(me, arguments);
	});
};

CheckField.prototype = {
	field: null,
	el: null,
	statusEl: null,
	presses: [],
	keypress: RythmField.prototype.keypress,
	start: RythmField.prototype.start,
	composeStatus: Raporter.prototype.composeLine,
	end: function () {
		var p = this.field.oracle.check.call(this.field.oracle, this.presses);
		var line = this.field.oracle.processLine.call(this.field.oracle, this.presses);
		console.log("Result of the check is "+this.presses);
		this.yieldStatus(line, p);
		return p;
	},
	yieldStatus: function (line, p) {
//		this.statusEl.html("Result of<br> 90 323 23 23 23 23<br>is ...");
		this.statusEl.html(this.composeStatus(line, p));
	}
};