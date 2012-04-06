var Raporter = function (field, div) {
	this.field = field;
	this.oracle = field.oracle;
	this.div = div;
};

Raporter.prototype = {
	cleanup: function () {
		this.div.html("");
	},
	composeLine: function (line, p) {
		var q=[];
		line.forEach(function (e) {
			q.push("<span>"+e+"</span>"); //.toFixed(1)
		});
		return "<div>"+q.join(" ")+"<span class='result'>"+(p ? p.toFixed(6) : -1.000000)+"</span><div>";
	},
	addLine: function (line,p) {
		this.div.append(this.composeLine(line,p));
	},
	reCreate: function () {
		var me = this;
		me.cleanup();
		me.oracle.data.forEach(function (a,b,c) {
			me.addLine(a, me.oracle.getP(b))
		});
	}
};
