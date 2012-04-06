Example = function () {
	
};

Example.prototype = new Array;

Ext.apply(Example.prototype, {
	raw: [],
	isProcessed: false,
	n: 0,
	add: function (x) {
		if (this.isProcessed) {
			var n = this.n = this.raw.push(x);
			this.process();
			return n;
		} else {
			return this.n = this.push(x);
		}
	},
	process: function () {
		line = this.isProcessed ? this.raw : this;
		line = line.slice();
		console.log("Processing line", line);
		
		var base = line.shift(),
			data = [];
//			total = line.pop()-base;

//		console.log("Base and total",base,total);
		line.forEach(function (e,i,a) {
			data.push(e-base);
			base=e;
		});
		
//		console.log("Data", data);
		return data;
	},
	getProcessed: function () {
		return this.isProcessed ? this.processed : this.process();
	}
});