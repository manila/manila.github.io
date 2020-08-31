const canvas = {
	element: document.getElementById("background"),
	context: null,
	width: 80,
	height: 0,
	image: null,
	buffer: null
};

const background = {
	everyXFrames: 2,
	decay: 0.98,
	frames: 0,
	color: "rgb(16,16,16)"
};

const setup = () => {
	setupCanvas();
	setupEvents();
};

const update = () => {
	background.frames++;

	if (background.frames % background.everyXFrames === 0) {
		updateBuffer();
	}
};

const draw = () => {
	canvas.context.putImageData(canvas.buffer, 0, 0);
};

const loop = () => {
	update();
	draw();
	requestAnimationFrame(loop);
};

const updateBuffer = () => {
	const { context, image, width, height } = canvas;
	const { data } = image;

	for (let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			const pixel = (i + j * width) * 4;

			canvas.buffer.data[pixel] =
				(data[pixel + 4] +
					data[pixel - 4] +
					data[pixel + width * 4] +
					data[pixel - width * 4]) /
					2 -
				canvas.buffer.data[pixel];

			canvas.buffer.data[pixel] *= background.decay;

			canvas.buffer.data[pixel + 1] = canvas.buffer.data[
				pixel + 2
			] = canvas.buffer.data[pixel];
		}
	}

	swapBuffers();
};

const swapBuffers = () => {
	const { buffer, image, width, height } = canvas;

	const temp = new ImageData(
		Uint8ClampedArray.from(buffer.data),
		width,
		height
	);
	canvas.buffer = image;
	canvas.image = temp;
};

const setupCanvas = () => {
	setCanvasSize();

	const c = canvas;
	const { width, height, element } = c;

	c.context = element.getContext("2d", {
		alpha: false
	});

	c.image = c.context.getImageData(0, 0, width, height);

	c.buffer = c.image;
};

const setCanvasSize = () => {
	const c = canvas;

	c.element.width = c.width;
	c.element.height = c.height = Math.floor(
		window.innerHeight / (window.innerWidth / c.width)
	);
};

const setPixel = (x, y, color) => {
	const { width, height } = canvas;

	if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
		const pixel = (x + y * width) * 4;
		canvas.buffer.data = canvas.image.data[pixel] = color;
		canvas.buffer.data = canvas.image.data[pixel + 1] = color;
		canvas.buffer.data = canvas.image.data[pixel + 2] = color;
	}
};

const handleClick = event => {
	const { width, height, element } = canvas;

	const x = Math.floor(event.x * (width / element.offsetWidth));
	const y = Math.floor(event.y * (height / element.offsetHeight));

	setPixel(x, y, 255);
	setPixel(x + 1, y, 255);
	setPixel(x - 1, y, 255);
	setPixel(x, y + 1, 255);
	setPixel(x, y - 1, 255);
};

const handleMove = event => {
	const { width, height, element } = canvas;

	const x = Math.floor(event.x * (width / element.offsetWidth));
	const y = Math.floor(event.y * (height / element.offsetHeight));
	setPixel(x, y, 64);
};

const handleResize = event => {
	setupCanvas();

	const { width, height } = canvas;

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (
				i === 2 ||
				i === width - 2 ||
				j === 2 ||
				j === height - 2
			) {
				setPixel(i, j, 64);
			}
		}
	}
};

const setupEvents = () => {
	window.addEventListener("resize", handleResize);
	document.addEventListener("click", handleClick);
	document.addEventListener("mousemove", handleMove);
};

const removeEvents = () => {
	window.removeEventListener("resize", handleResize);
	document.removeEventListener("click", handleClick);
	document.removeEventListener("mousemove", handleMove);
};

const init = () => {
	setup();
	loop();
}

init();
