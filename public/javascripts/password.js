console.log("init passwrd");

$(document).ready(function () {
	f = new RythmField("#leftContent");
//	initOneField($("#pass"));
});


initField = function (field) {
	$(field).each(function (a,b,c) {
		b.asi="randomstuff"+Math.ceil(Math.random()*10);
		console.log(a,b,b.id+b.name);
	});
};

initOneField = function (field) {
	var el = field.get(0);
	el.start = function () {
		this.presses = [];
		$(this)
	};
	el.presses = [];
	field.keypress(function(event) {
		if ( event.which == 13 ) {
			event.preventDefault();
		}
		console.log(event.timeStamp, event.which);
		debug = event;
	});
};