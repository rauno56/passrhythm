var test = [
   [-8,2,4],
   [4,5,6],
   [7,2,14]
];

test = Matrix.create(test);

Array.prototype.sum = function () {
	var total = this.reduce(function(a, b) {  
	    return a + b;  
	});
	return total;
}

Array.prototype.sumByElement = function (a) {
	return this.map(function (e, i) {
		return e + ((a && a[i]) || 0);
	});
}

 
Matrix.prototype.$max = Matrix.prototype.max;

Matrix.prototype.max = function () {
	var e = this.transpose().elements;
	var max = [];
	e.forEach(function (a) {
		max.push(Math.max.apply(null, a));
	});
	return Vector.create(max);
};

Matrix.prototype.sum = function () {
	var e = this.transpose().elements;
	var sum = [];
	e.forEach(function (a) {
		sum.push(a.sum());
	});
	return Vector.create(sum);
};

Matrix.prototype.mean = function () {
	var sum = this.sum(),
		l = this.rows();
	
	return Vector.create(sum).map(function (x,i) { return x/l; });
};

Matrix.prototype.estimateVar = function () {
	var means = this.mean().elements,
		squares = this.map(function (x,i,j) { return Math.pow(x-means[j-1], 2); }),
		sum = squares.sum(),
		l = this.rows()-1;
	
	return Vector.create(sum).map(function (x,i) { return x/l; });
};