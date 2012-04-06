var Dataset = function () {
	var l = arguments.length;
	var args = Array.prototype.slice.call(arguments);
	if (l>1) {
		var i = l;
		while (i) {
			this.push(arguments[l-(i--)]);
		}
	} else if (!!arguments[0]) {
		var a = arguments[0]
		if (typeof a === 'number' && isFinite(a)) {
			this.length = arguments[0]
		} else if (toString.apply(a) === '[object Array]') {
			var l = a.length,
				i = a.length;
			while (i) {
				this.push(a[l-(i--)]);
			}
		}
	}
};

Dataset.prototype = new Array;

Dataset.prototype.mapByElement = function (callback, thisArg) {
	var i = 0,
		j = 0,
		n = this.length,
		k = (this[0] && this[0].length) || 0,
		a = new Dataset(n);
	
	while(i<n) {
		a[i] = new Array(k);
		while(j<k) {
			a[i][j] = callback.call(thisArg, this[i][j], i, j, this);
			j++;
		}
		j=0;
		i++;
	}
	
	return a;
};

Dataset.prototype.sum = function () {
	return this.reduce(function (p,c) {
		return c.sumByElement(p);
	}, []);
};

Dataset.prototype.mean = function () {
	var l = this.length;
	
	return this.sum().map(function (e) {
		return e/l;
	});
};

Dataset.prototype.estimateVar = function () {
	var means = this.mean(),
		squares = this.mapByElement(function (x,i,j) { return Math.pow(x-means[j], 2); }),
		sum = squares.sum(),
		l = this.length-1;
	
	return sum.map(function (x) { return x/l; });
};

r = new Dataset([[1,2,3], [4,5,6], [9,11,13]]);