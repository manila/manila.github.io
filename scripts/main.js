document.addEventListener("scroll", function () {
	console.log("scrolled");
});

document.body.addEventListener("load", function () {
	setup();
});

function resize() {
	
}

function draw() {

}

function setup() {
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	var canvas = document.getElementById("crt-filter");
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	for (let i = 0; i < canvas.offsetWidth; i += 3)
	{
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.offsetHeight);
		ctx.stroke();
		ctx.strokeStyle = 'green';
		ctx.beginPath();
		ctx.moveTo(i + 1, 0);
		ctx.lineTo(i + 1, canvas.offsetHeight);
		ctx.stroke();
		ctx.strokeStyle = 'blue';
		ctx.beginPath();
		ctx.moveTo(i + 2, 0);
		ctx.lineTo(i + 2, canvas.offsetHeight);
		ctx.stroke();



	}
	for (let i = 0; i < canvas.offsetHeight; i+=4)
	{

		ctx.strokeStyle = 'black'
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(canvas.offsetWidth, i);
		ctx.stroke();
	}
}

setup();
