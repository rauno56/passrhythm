var Oracle = function (data) {
	if (data) {
		this.train(data);	
	}
};

Oracle.prototype = {
	data: null,
	mu: null,
	sigma2: null,
	train: function (data) {
		console.log("Training...");
		var me = this,
			data = new Dataset(data);
		data.forEach(function (line, i, a) {
			a[i] = me.processLine(line);
		});
		this.data = data;
		this.mu = data.mean();
		this.sigma2 = data.estimateVar();
		return this;
	},
	check: function (data) {
		if (!this.mu || !this.mu.length) {
			console.log("not enough training examples("+((this.data && this.data.rows && this.data.rows()) || 0)+").");
			return null;
		}
		data = this.processLine(data);
		
		var me = this,
			mu = this.mu,
			sigma2 = this.sigma2,
			mult = 1;
//		console.log(data);
		for (var i=0; i<data.length; i++) {
			var x = data[i],
				p = me.p(x, mu[i], sigma2[i]);
			mult*=p*100;
		}
		return mult;
	},
	getP: function (i) {
		var data = this.data[i],
			me = this,
			mu = this.mu,
			sigma2 = this.sigma2,
			mult = 1;
		
		for (var i=0; i<data.length; i++) {
			var x = data[i],
				p = me.p(x, mu[i], sigma2[i]);
			mult*=p*100;
		}
		return mult;
	},
	p: function (x,mu,sigma2) {
//		console.log("Calc p with",x,mu,sigma2);
		return Math.exp(-Math.pow(x-mu, 2)/(2*sigma2))/Math.sqrt(2*Math.PI*sigma2);
	},
	processLine: function (line) {
		line = line.slice();
		console.log("Processing line", line);
		if (line.length<=2) {
			return [];
		}
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
	}
};