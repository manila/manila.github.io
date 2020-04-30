const PIXEL_RATIO = window.devicePixelRatio || 1;

const overlay = {
	width: window.innerWidth,
	height: window.innerHeight,
	element: null,
	context: null,
	imageData: null,
	frame: 0
}

function setupEventListeners() {
	document.addEventListener("scroll", function () {
		console.log("scrolled");
	});
	window.addEventListener("resize", function () {
		setupOverlay();		
	});
}

function scrollOverlay() {
}

function resizeOverlay() {
	setupOverlay();
}

function clearOverlay() {
	overlay.context.clearRect(0, 0, overlay.width, overlay.height);
}

function drawOverlay() {
	overlay.frame++;
	if (overlay.frame % 15 == 0)
	{
		for (let i = 0; i < overlay.width; i += 3)
		{
			overlay.context.strokeStyle = 'red';
			overlay.context.beginPath();
			overlay.context.moveTo(i, 0);
			overlay.context.lineTo(i, overlay.height);
			overlay.context.stroke();
			overlay.context.strokeStyle = 'green';
			overlay.context.beginPath();
			overlay.context.moveTo(i + 1, 0);
			overlay.context.lineTo(i + 1, overlay.height);
			overlay.context.stroke();
			overlay.context.strokeStyle = 'blue';
			overlay.context.beginPath();
			overlay.context.moveTo(i + 2, 0);
			overlay.context.lineTo(i + 2, overlay.height);
			overlay.context.stroke();
		}
	
	}
	for (let i = 0; i < overlay.height; i+=4)
	{
		overlay.context.strokeStyle = 'black'
		overlay.context.beginPath();
		overlay.context.moveTo(0, i);
		overlay.context.lineTo(overlay.width, i);
		overlay.context.stroke();
	}

}

function setupOverlay() {
	overlay.element = document.getElementById('crt-filter');
	overlay.width = window.innerWidth;
	overlay.height = window.innerHeight;
	overlay.element.width = overlay.width;
	overlay.element.style.width = overlay.width;
	overlay.element.height = overlay.height;
	overlay.element.style.height = overlay.height;
	overlay.context = overlay.element.getContext("2d");
	overlay.imageData = overlay.context.getImageData(0, 0, overlay.width, overlay.height); 
}

function loop() {
	clearOverlay();
	drawOverlay();
	window.requestAnimationFrame(loop);
}

function setup() {
	setupOverlay();
	setupEventListeners();
	loop();
}

setup();
